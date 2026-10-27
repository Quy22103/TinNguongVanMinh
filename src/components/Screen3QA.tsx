import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  AlertTriangle,
  Scale,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Info,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { Violation } from '../data/violations.ts';

interface Screen3QAProps {
  initialPrompt?: string;
  onSelectViolation: (id: string) => void;
  fontSize: 'normal' | 'large';
}

interface AnalysisResult {
  hasViolation: boolean;
  tieuDeKetLuan: string;
  phanTichChiTiet: string;
  loiKhuyenVanMinh: string;
  thongDiepLuuY: string;
  matchedViolations: Violation[];
}

export const Screen3QA: React.FC<Screen3QAProps> = ({
  initialPrompt = '',
  onSelectViolation,
  fontSize,
}) => {
  const [situationText, setSituationText] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [copied, setCopied] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (initialPrompt) {
      setSituationText(initialPrompt);
    }
  }, [initialPrompt]);

  // Web Speech API for voice input if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'vi-VN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSituationText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Trình duyệt hiện tại chưa hỗ trợ ghi âm trực tiếp. Bạn vui lòng gõ phím để nhập mô tả nhé.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Không thể bắt đầu ghi âm:', err);
        setIsRecording(false);
      }
    }
  };

  const sampleSituations = [
    {
      title: 'Bói toán & gọi hồn lấy tiền',
      text: 'Hàng xóm tôi tự xưng là thầy xem bói bài tây và gọi hồn người chết tại nhà, mỗi lần xem thu 500.000 đồng của người khác thì có bị phạt tiền không?',
      isViolationExpected: true,
    },
    {
      title: 'Livestream bán bùa ngải',
      text: 'Một tài khoản TikTok livestream bán bùa yêu, bùa tài lộc giá 2 triệu đồng và hứa hẹn ai mua sẽ giàu nhanh và giữ được người yêu.',
      isViolationExpected: true,
    },
    {
      title: 'Rải tiền lẻ giếng cổ & tượng Phật',
      text: 'Tôi đi lễ đền chùa thấy nhiều người ném tiền lẻ xuống giếng cổ và cài tiền vào tay tượng Phật thì hành vi này pháp luật quy định thế nào?',
      isViolationExpected: true,
    },
    {
      title: 'Thờ cúng tổ tiên tại nhà',
      text: 'Gia đình tôi thắp nén nhang thành kính trên bàn thờ gia tiên và cúng cơm ngày giỗ ông bà trong nhà thì có vi phạm quy định pháp luật nào không?',
      isViolationExpected: false,
    },
  ];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const query = (textToAnalyze !== undefined ? textToAnalyze : situationText).trim();
    if (!query) {
      setError('Vui lòng nhập hoặc mô tả tình huống cần đối chiếu.');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-situation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ situation: query }),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.message || 'Không thể xử lý tình huống.');
      }

      setAnalysisResult(resData.analysis);
    } catch (err: any) {
      console.error('Lỗi phân tích:', err);
      setError(err?.message || 'Có lỗi xảy ra trong quá trình đối chiếu pháp lý. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyResult = () => {
    if (!analysisResult) return;
    const text = `[KẾT QUẢ ĐỐI CHIẾU PHÁP LÝ TÍN NGƯỠNG VĂN MINH]
Tình huống: ${situationText}
Kết luận: ${analysisResult.tieuDeKetLuan}
Phân tích: ${analysisResult.phanTichChiTiet}
Lời khuyên: ${analysisResult.loiKhuyenVanMinh}
${analysisResult.matchedViolations.map((v) => `• ${v.tenLoi} | Mức phạt: ${v.mucPhatText} | Căn cứ: ${v.tenVanBan} (${v.dieuKhoanApDung})`).join('\n')}
Lưu ý: ${analysisResult.thongDiepLuuY}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLarge = fontSize === 'large';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Màn hình 3 • Đối chiếu pháp lý tự động</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          Hỏi Đáp Tình Huống Bằng Lời Nói & Chữ Viết
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Mô tả câu chuyện thực tế bạn chứng kiến hoặc thắc mắc. Hệ thống đối chiếu nghiêm ngặt với <strong className="text-stone-900">Danh mục 15 lỗi quy định</strong>. Nếu chưa đủ căn cứ, hệ thống sẽ trả lời rõ ràng là <strong className="text-amber-900">chưa đủ căn cứ</strong>, tuyệt đối không tự suy đoán mức phạt.
        </p>
      </div>

      {/* Input Form Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-200 shadow-md space-y-6">
        <div className="space-y-2">
          <label className="flex items-center justify-between text-stone-800 font-bold text-base sm:text-lg">
            <span>Mô tả chi tiết tình huống thực tế của bạn:</span>
            <span className="text-xs font-medium text-stone-500">Tiếng Việt có dấu</span>
          </label>
          <div className="relative">
            <textarea
              rows={4}
              value={situationText}
              onChange={(e) => {
                setSituationText(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Ví dụ: Đi hội chùa đầu năm, tôi thấy có người lập bàn bói chỉ tay thu 200 nghìn, hoặc rải tiền lẻ xuống giếng cổ; hay nhà tôi làm lễ giỗ tổ tiên..."
              className={`w-full p-4 pr-14 bg-stone-50 border rounded-2xl text-stone-900 placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden transition-all ${
                isLarge ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
              } ${error ? 'border-red-400' : 'border-stone-300'}`}
            />

            {/* Mic button */}
            <button
              type="button"
              onClick={toggleRecording}
              title={isRecording ? 'Dừng ghi âm' : 'Nói bằng giọng nói'}
              className={`absolute right-3.5 bottom-4 p-2.5 rounded-xl transition-all cursor-pointer ${
                isRecording
                  ? 'bg-red-600 text-white animate-pulse shadow-md'
                  : 'bg-stone-200 hover:bg-amber-100 text-stone-700 hover:text-amber-900'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>
          {isRecording && (
            <p className="text-xs text-red-600 font-semibold animate-pulse flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Đang lắng nghe giọng nói tiếng Việt của bạn... Hãy nói to, rõ ràng.
            </p>
          )}
          {error && (
            <p className="text-xs sm:text-sm text-red-600 font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Action button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            {situationText && (
              <button
                type="button"
                onClick={() => {
                  setSituationText('');
                  setAnalysisResult(null);
                  setError(null);
                }}
                className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Nhập lại</span>
              </button>
            )}
          </div>

          <button
            type="button"
            disabled={loading || !situationText.trim()}
            onClick={() => handleAnalyze()}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-900 hover:to-stone-900 disabled:opacity-50 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2.5 text-base cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Đang đối chiếu pháp lý...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Phân tích & Tra cứu căn cứ</span>
              </>
            )}
          </button>
        </div>

        {/* Sample situations for testing */}
        <div className="pt-4 border-t border-stone-200 space-y-2.5">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Bấm chọn tình huống mẫu để thử nghiệm ngay:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sampleSituations.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSituationText(item.text);
                  handleAnalyze(item.text);
                }}
                className="text-left p-3 rounded-xl border border-stone-200 hover:border-amber-400 bg-stone-50 hover:bg-amber-50/60 transition-all text-xs sm:text-sm text-stone-700 hover:text-stone-900 space-y-1 cursor-pointer"
              >
                <div className="font-semibold text-amber-950 flex items-center justify-between">
                  <span>{item.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    item.isViolationExpected ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.isViolationExpected ? 'Có vi phạm' : 'Lành mạnh'}
                  </span>
                </div>
                <p className="line-clamp-2 text-stone-600 text-xs">{item.text}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Result Box */}
      {analysisResult && (
        <section className="space-y-6 animate-in slide-in-from-bottom duration-300">
          <div className={`rounded-3xl p-6 sm:p-8 border-2 shadow-xl ${
            analysisResult.hasViolation
              ? 'bg-white border-red-300'
              : 'bg-white border-emerald-300'
          }`}>
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="flex items-start sm:items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                  analysisResult.hasViolation
                    ? 'bg-red-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {analysisResult.hasViolation ? (
                    <AlertTriangle className="w-7 h-7" />
                  ) : (
                    <CheckCircle2 className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-1 ${
                    analysisResult.hasViolation
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {analysisResult.hasViolation
                      ? 'Có dấu hiệu vi phạm pháp luật'
                      : 'Chưa đủ căn cứ xác định vi phạm'}
                  </span>
                  <h3 className={`font-serif font-extrabold text-stone-900 ${
                    isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                  }`}>
                    {analysisResult.tieuDeKetLuan}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleCopyResult}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 text-stone-700 transition-colors shrink-0 self-start sm:self-center cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép kết luận'}</span>
              </button>
            </div>

            {/* Content Details */}
            <div className="py-6 space-y-6">
              {/* Phân tích tình huống */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-stone-700" />
                  Phân tích pháp lý đối chiếu:
                </h4>
                <p className={`text-stone-800 leading-relaxed font-medium bg-stone-50 p-4 rounded-2xl border border-stone-200 ${
                  isLarge ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
                }`}>
                  {analysisResult.phanTichChiTiet}
                </p>
              </div>

              {/* Lời khuyên văn minh */}
              <div className="bg-emerald-50/70 border border-emerald-200 p-4 sm:p-5 rounded-2xl space-y-1.5">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Lời khuyên thực hành tín ngưỡng văn minh:
                </h4>
                <p className={`text-emerald-950 font-medium leading-relaxed ${
                  isLarge ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                }`}>
                  {analysisResult.loiKhuyenVanMinh}
                </p>
              </div>

              {/* Danh sách lỗi vi phạm nếu có */}
              {analysisResult.hasViolation && analysisResult.matchedViolations.length > 0 && (
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    Lỗi có khả năng áp dụng cùng căn cứ pháp lý trong tệp dữ liệu:
                  </h4>

                  <div className="space-y-4">
                    {analysisResult.matchedViolations.map((v) => (
                      <div
                        key={v.id}
                        className="bg-white rounded-2xl p-5 border-2 border-red-200 shadow-sm space-y-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded border border-amber-300">
                            {v.nhomLoi}
                          </span>
                          <span className="text-xs text-stone-400 font-mono">Mã: {v.id}</span>
                        </div>

                        <h5 className="font-bold text-stone-900 text-lg leading-snug">
                          {v.tenLoi}
                        </h5>

                        {/* Mức phạt & hình phạt bổ sung */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <div className="bg-red-50 p-3 rounded-xl border border-red-200">
                            <span className="text-xs text-red-700 font-semibold block uppercase">
                              Khung tiền phạt:
                            </span>
                            <span className="text-xl font-extrabold text-red-700 font-serif">
                              {v.mucPhatText}
                            </span>
                          </div>
                          <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                            <span className="text-xs text-amber-900 font-semibold block uppercase">
                              Hình phạt bổ sung:
                            </span>
                            <span className="text-stone-800 font-medium text-xs sm:text-sm">
                              {v.hinhPhatBoSung}
                            </span>
                          </div>
                        </div>

                        {/* Căn cứ pháp lý */}
                        <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs sm:text-sm space-y-1">
                          <p className="font-semibold text-stone-900">
                            📜 Căn cứ: {v.tenVanBan}
                          </p>
                          <p className="text-amber-900 font-bold">
                            👉 Điều khoản áp dụng: {v.dieuKhoanApDung}
                          </p>
                        </div>

                        {/* Nút xem modal */}
                        <div className="pt-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onSelectViolation(v.id)}
                            className="text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-500 underline-offset-2 cursor-pointer"
                          >
                            Xem toàn văn điều khoản quy định &rarr;
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Case when no violation found */}
              {!analysisResult.hasViolation && (
                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-3 text-stone-700 text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Bảo đảm quyền tự do tín ngưỡng lành mạnh</span>
                  </div>
                  <p className="leading-relaxed">
                    Theo quy định tại <strong className="text-stone-900">Điều 6 Luật Tín ngưỡng, tôn giáo 2016</strong>, mọi người dân đều có quyền tự do tín ngưỡng, tôn giáo, theo hoặc không theo một tôn giáo nào; bày tỏ niềm tin tín ngưỡng, thực hành nghi lễ thờ cúng tổ tiên truyền thống phù hợp với thuần phong mỹ tục của dân tộc Việt Nam.
                  </p>
                  <p className="text-xs text-stone-500 italic">
                    * Tuyệt đối không tự suy đoán mức phạt khi hành vi không có trong danh mục hoặc không vi phạm pháp luật.
                  </p>
                </div>
              )}
            </div>

            {/* Disclaimer in result card */}
            <div className="pt-4 border-t border-stone-200 text-xs text-stone-500 italic flex items-center gap-2">
              <Info className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{analysisResult.thongDiepLuuY}</span>
            </div>
          </div>
        </section>
      )}

      {/* Principles box */}
      <div className="bg-stone-100 rounded-2xl p-5 border border-stone-200 text-xs sm:text-sm text-stone-700 space-y-2">
        <h4 className="font-bold text-stone-900 flex items-center gap-1.5 uppercase tracking-wider text-xs">
          <Scale className="w-4 h-4 text-amber-800" />
          Nguyên tắc xử lý của trợ lý pháp lý
        </h4>
        <p className="leading-relaxed">
          1. Chỉ viện dẫn các mức phạt và văn bản pháp luật đã được định nghĩa trong danh mục dữ liệu chuẩn.<br />
          2. Nếu không tìm thấy căn cứ trong tệp dữ liệu, hệ thống trả lời là <strong>chưa đủ căn cứ</strong>, tuyệt đối không tự suy đoán mức phạt.<br />
          3. Mọi kết quả đều hiển thị kèm căn cứ văn bản và điều khoản pháp luật chính thức.
        </p>
      </div>
    </div>
  );
};
