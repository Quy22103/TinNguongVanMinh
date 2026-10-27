import React from 'react';
import { X, Scale, AlertTriangle, ShieldCheck, BookOpen, Share2, Check } from 'lucide-react';
import { Violation } from '../data/violations.ts';

interface ViolationModalProps {
  violation: Violation | null;
  onClose: () => void;
  onAskAboutSituation?: (tenLoi: string) => void;
}

export const ViolationModal: React.FC<ViolationModalProps> = ({
  violation,
  onClose,
  onAskAboutSituation,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!violation) return null;

  const handleCopy = () => {
    const text = `[TÍN NGƯỠNG VĂN MINH - QUY ĐỊNH PHÁP LUẬT]
Hành vi: ${violation.tenLoi}
Nhóm: ${violation.nhomLoi}
Mức phạt tiền: ${violation.mucPhatText}
Hình phạt bổ sung: ${violation.hinhPhatBoSung}
Căn cứ: ${violation.tenVanBan} (${violation.dieuKhoanApDung})
${violation.canCuHinhSu ? `Lưu ý hình sự: ${violation.canCuHinhSu}` : ''}
Lời khuyên: ${violation.loiKhuyenVanMinh}
(Nguồn: tinnguongvanminh.ai.studio - Chỉ mang tính tham khảo)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-start justify-between gap-4 z-10">
          <div>
            <span className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-md mb-1.5 border border-amber-300">
              {violation.nhomLoi}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
              {violation.tenLoi}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Mức phạt nổi bật */}
          <div className="bg-red-50/80 border-2 border-red-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider block">
                Khung tiền phạt vi phạm hành chính
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-red-700 font-serif">
                {violation.mucPhatText}
              </p>
            </div>
            <div className="sm:text-right text-xs text-red-900/80 font-medium">
              <span>Thấp nhất: <strong>{violation.mucPhatThapNhat.toLocaleString('vi-VN')} đ</strong></span>
              <br />
              <span>Cao nhất: <strong>{violation.mucPhatCaoNhat.toLocaleString('vi-VN')} đ</strong></span>
            </div>
          </div>

          {/* Hình phạt bổ sung */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-1">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Hình phạt bổ sung & Biện pháp khắc phục hậu quả
            </h4>
            <p className="text-sm sm:text-base text-amber-950 font-medium leading-relaxed">
              {violation.hinhPhatBoSung}
            </p>
          </div>

          {/* Căn cứ pháp lý */}
          <div className="border border-stone-200 rounded-xl p-4 space-y-2 bg-stone-50/60">
            <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-stone-700" />
              Căn cứ pháp lý áp dụng
            </h4>
            <div className="text-sm sm:text-base space-y-1">
              <p className="font-semibold text-stone-900">{violation.tenVanBan}</p>
              <p className="text-amber-800 font-medium">
                👉 Điều khoản: <span className="underline decoration-amber-500 font-bold">{violation.dieuKhoanApDung}</span>
              </p>
            </div>
          </div>

          {/* Căn cứ hình sự nếu có */}
          {violation.canCuHinhSu && (
            <div className="bg-rose-50 border border-rose-300 rounded-xl p-4 space-y-1.5">
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Cảnh báo trách nhiệm hình sự (Bộ luật Hình sự)
              </h4>
              <p className="text-sm sm:text-base text-rose-950 leading-relaxed font-medium">
                {violation.canCuHinhSu}
              </p>
            </div>
          )}

          {/* Tình huống thực tế */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Tình huống thực tế thường gặp
            </h4>
            <p className="text-sm sm:text-base text-stone-700 bg-white p-3.5 rounded-lg border border-stone-200 leading-relaxed italic">
              "{violation.moTaThucTe}"
            </p>
          </div>

          {/* Lời khuyên văn minh */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 space-y-1.5">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Lời khuyên thực hành tín ngưỡng văn minh
            </h4>
            <p className="text-sm sm:text-base text-emerald-950 leading-relaxed font-medium">
              {violation.loiKhuyenVanMinh}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Đã sao chép nội dung' : 'Sao chép thông tin'}</span>
          </button>

          <div className="flex items-center gap-2">
            {onAskAboutSituation && (
              <button
                onClick={() => {
                  onAskAboutSituation(violation.tenLoi);
                  onClose();
                }}
                className="bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs"
              >
                Hỏi đáp thêm về lỗi này
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
