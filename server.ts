import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { VIOLATIONS_DATA, REFERENCE_DOCUMENTS } from './src/data/violations.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const PORT = Number(process.env.PORT) || 3000;

// Initialize GoogleGenAI client (Server-side only)
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Endpoint to fetch violation dataset
app.get('/api/violations', (_req, res) => {
  res.json({
    success: true,
    data: VIOLATIONS_DATA,
    references: REFERENCE_DOCUMENTS,
  });
});

// Endpoint to analyze citizen situation
app.post('/api/analyze-situation', async (req, res) => {
  try {
    const { situation } = req.body;

    if (!situation || typeof situation !== 'string' || situation.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp mô tả tình huống cần tra cứu.',
      });
    }

    const trimmedSituation = situation.trim();

    // Prepare violations dataset context for Gemini
    const datasetSummary = VIOLATIONS_DATA.map((v) => ({
      id: v.id,
      tenLoi: v.tenLoi,
      nhomLoi: v.nhomLoi,
      mucPhatThapNhat: v.mucPhatThapNhat,
      mucPhatCaoNhat: v.mucPhatCaoNhat,
      mucPhatText: v.mucPhatText,
      hinhPhatBoSung: v.hinhPhatBoSung,
      tenVanBan: v.tenVanBan,
      dieuKhoanApDung: v.dieuKhoanApDung,
      moTaThucTe: v.moTaThucTe,
      loiKhuyenVanMinh: v.loiKhuyenVanMinh,
      canCuHinhSu: v.canCuHinhSu || '',
    }));

    // If Gemini client is available, prompt Gemini with strict groundings
    if (ai) {
      const systemInstruction = `
Bạn là chuyên gia pháp lý số tận tâm, hỗ trợ người dân Việt Nam thực hành tín ngưỡng văn minh, đúng pháp luật.
Nhiệm vụ duy nhất của bạn: Đọc mô tả tình huống của người dân, đối chiếu NGHIÊM NGẶT với Danh mục 15 lỗi vi phạm dưới đây.

DANH MỤC 15 LỖI VI PHẠM ĐƯỢC PHÉP ÁP DỤNG:
${JSON.stringify(datasetSummary, null, 2)}

QUY TẮC PHÁP LÝ BẮT BUỘC:
1. CHỈ được nhận định là có vi phạm nếu tình huống người dân mô tả có dấu hiệu rõ ràng tương ứng với một hoặc nhiều lỗi trong Danh mục 15 lỗi trên.
2. NẾU KHÔNG TÌM THẤY CĂN CỨ TRONG DANH MỤC 15 LỖI TRÊN (ví dụ: hành vi thờ cúng tổ tiên bình thường, thắp hương trong nhà, phong tục văn hóa hợp pháp, hoặc tình huống quá mơ hồ/không thuộc 15 lỗi quy định):
   - Bạn PHẢI trả lời: hasViolation = false
   - Trả lời rõ ràng là: "Chưa đủ căn cứ xác định hành vi vi phạm trong danh mục quy định".
   - TUYỆT ĐỐI KHÔNG ĐƯỢC TỰ SUY ĐOÁN MỨC PHẠT, không được bịa đặt điều luật hay số tiền phạt ngoài 15 lỗi đã cung cấp.
3. Khi phát hiện lỗi phù hợp, matchedViolationIds phải chứa chính xác các mã lỗi (ví dụ: ["VIOLATION_01"]) có trong danh mục.
4. Trình bày ngôn ngữ tiếng Việt trong sáng, dễ hiểu cho người dân không có kiến thức pháp lý, nhưng chuẩn mực về mặt pháp lý.
5. Luôn nhắc nhở: "Thông tin chỉ mang tính tham khảo, không thay thế văn bản pháp luật chính thức."
`;

      const promptText = `Tình huống của người dân cần tư vấn đối chiếu:
"${trimmedSituation}"

Hãy phân tích và trả về kết quả theo cấu trúc JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hasViolation: {
                type: Type.BOOLEAN,
                description: 'True nếu hành vi khớp với ít nhất một lỗi trong danh mục 15 lỗi, False nếu không tìm thấy căn cứ hoặc là tín ngưỡng lành mạnh.',
              },
              matchedViolationIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Danh sách ID các lỗi khớp từ danh mục (ví dụ VIOLATION_01). Rỗng nếu hasViolation = false.',
              },
              tieuDeKetLuan: {
                type: Type.STRING,
                description: 'Tiêu đề ngắn gọn kết luận (ví dụ: "Có dấu hiệu vi phạm quy định về bói toán trục lợi" hoặc "Chưa đủ căn cứ xác định vi phạm trong danh mục")',
              },
              phanTichChiTiet: {
                type: Type.STRING,
                description: 'Phân tích chi tiết hành vi đối chiếu với luật pháp bằng ngôn từ bình dân, dễ hiểu cho người dân.',
              },
              loiKhuyenVanMinh: {
                type: Type.STRING,
                description: 'Lời khuyên thực hành tín ngưỡng văn minh, đúng mực và giải pháp ứng xử.',
              },
              thongDiepLuuY: {
                type: Type.STRING,
                description: 'Dòng lưu ý pháp lý: Thông tin chỉ mang tính tham khảo, không thay thế văn bản pháp luật chính thức.',
              },
            },
            required: ['hasViolation', 'matchedViolationIds', 'tieuDeKetLuan', 'phanTichChiTiet', 'loiKhuyenVanMinh'],
          },
        },
      });

      const responseText = response.text || '';
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      if (parsed) {
        // Hydrate full violation objects from dataset for matched IDs
        const matchedViolations = (parsed.matchedViolationIds || [])
          .map((id: string) => VIOLATIONS_DATA.find((v) => v.id === id))
          .filter(Boolean);

        return res.json({
          success: true,
          analysis: {
            hasViolation: parsed.hasViolation && matchedViolations.length > 0,
            tieuDeKetLuan: parsed.tieuDeKetLuan,
            phanTichChiTiet: parsed.phanTichChiTiet,
            loiKhuyenVanMinh: parsed.loiKhuyenVanMinh,
            thongDiepLuuY:
              parsed.thongDiepLuuY ||
              'Lưu ý quan trọng: Toàn bộ thông tin chỉ mang tính tham khảo, tuyên truyền phổ biến pháp luật, không thay thế văn bản pháp luật chính thức hoặc quyết định của cơ quan nhà nước có thẩm quyền.',
            matchedViolations,
          },
        });
      }
    }

    // Fallback engine if Gemini API Key is missing or service temporarily unavailable
    // Strict matching against 15 predefined violations
    const lowerSituation = trimmedSituation.toLowerCase();
    const matched = VIOLATIONS_DATA.filter((v) => {
      const keywords = [
        ...v.tenLoi.toLowerCase().split(/[ ,()]+/),
        ...v.moTaThucTe.toLowerCase().split(/[ ,()]+/),
      ].filter((w) => w.length > 3);

      const hitCount = keywords.filter((k) => lowerSituation.includes(k)).length;
      return hitCount >= 2;
    });

    if (matched.length > 0) {
      return res.json({
        success: true,
        analysis: {
          hasViolation: true,
          tieuDeKetLuan: `Có dấu hiệu liên quan đến ${matched.length} hành vi vi phạm trong danh mục quy định`,
          phanTichChiTiet: `Dựa trên tình huống được mô tả: "${trimmedSituation}", hệ thống đối chiếu và xác định có các dấu hiệu tương ứng với các quy định xử phạt vi phạm hành chính trong danh mục quy định của pháp luật Việt Nam.`,
          loiKhuyenVanMinh: matched[0].loiKhuyenVanMinh,
          thongDiepLuuY:
            'Lưu ý quan trọng: Toàn bộ thông tin chỉ mang tính tham khảo, tuyên truyền phổ biến pháp luật, không thay thế văn bản pháp luật chính thức hoặc quyết định của cơ quan nhà nước có thẩm quyền.',
          matchedViolations: matched,
        },
      });
    }

    // Explicit response when no matching basis is found
    return res.json({
      success: true,
      analysis: {
        hasViolation: false,
        tieuDeKetLuan: 'Chưa đủ căn cứ xác định hành vi vi phạm trong danh mục quy định',
        phanTichChiTiet:
          'Hệ thống đã đối chiếu toàn bộ tình huống bạn cung cấp với danh mục 15 hành vi vi phạm pháp luật về tín ngưỡng, văn hóa và trật tự công cộng. Hiện tại tình huống chưa đủ cơ sở hoặc không trùng khớp với các hành vi vi phạm bị xử phạt đã quy định trong dữ liệu chuẩn. Nếu đây là hoạt động thờ cúng tổ tiên, sinh hoạt tín ngưỡng truyền thống lành mạnh thì hoàn toàn được Hiến pháp và Luật Tín ngưỡng, tôn giáo bảo đảm tự do thực hiện.',
        loiKhuyenVanMinh:
          'Thực hành tín ngưỡng đúng đạo lý uống nước nhớ nguồn, giữ lòng thành kính, trang nghiêm, tiết kiệm và đảm bảo vệ sinh môi trường, an toàn phòng cháy chữa cháy.',
        thongDiepLuuY:
          'Lưu ý quan trọng: Toàn bộ thông tin chỉ mang tính tham khảo, tuyên truyền phổ biến pháp luật, không thay thế văn bản pháp luật chính thức hoặc quyết định của cơ quan nhà nước có thẩm quyền.',
        matchedViolations: [],
      },
    });
  } catch (err: any) {
    console.error('Lỗi khi phân tích tình huống:', err);
    return res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra trong quá trình đối chiếu pháp lý. Vui lòng thử lại sau giây lát.',
      error: err?.message,
    });
  }
});

// Configure Vite middlewares in dev mode, or static file serving in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Tín Ngưỡng Văn Minh đang chạy tại cổng http://localhost:${PORT}`);
  });
}

startServer();
