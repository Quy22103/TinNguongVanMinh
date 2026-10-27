import React, { useState } from 'react';
import {
  BookOpen,
  Scale,
  ShieldAlert,
  Search,
  ExternalLink,
  FileText,
  Calendar,
  Building,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { REFERENCE_DOCUMENTS } from '../data/violations.ts';

interface Screen5ReferencesProps {
  fontSize: 'normal' | 'large';
}

export const Screen5References: React.FC<Screen5ReferencesProps> = ({ fontSize }) => {
  const [searchDoc, setSearchDoc] = useState('');

  const filteredDocs = REFERENCE_DOCUMENTS.filter((doc) => {
    if (!searchDoc.trim()) return true;
    const q = searchDoc.toLowerCase().trim();
    return (
      doc.ten.toLowerCase().includes(q) ||
      doc.coQuanBanHanh.toLowerCase().includes(q) ||
      doc.phamVi.toLowerCase().includes(q) ||
      doc.dieuKhoanTrongYeu.toLowerCase().includes(q)
    );
  });

  const isLarge = fontSize === 'large';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-150">
      {/* Header section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Màn hình 5 • Căn cứ pháp luật chính thức</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          Danh Mục Nguồn Văn Bản Tham Khảo
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Tất cả 15 lỗi vi phạm và mức tiền phạt trong hệ thống đều được xây dựng chặt chẽ, viện dẫn trực tiếp từ các Luật, Nghị định và Thông tư hiện hành của Nhà nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
        </p>

        {/* Quick Search */}
        <div className="pt-2 relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            placeholder="Tìm theo tên văn bản, cơ quan ban hành hoặc điều luật..."
            className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-sm sm:text-base font-medium"
          />
        </div>
      </div>

      {/* Legal documents list */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm text-stone-600 px-1">
          <span>Hiển thị {filteredDocs.length} / {REFERENCE_DOCUMENTS.length} văn bản quy phạm pháp luật</span>
        </div>

        {filteredDocs.map((doc, idx) => (
          <article
            key={doc.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all space-y-5"
          >
            {/* Title & Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                <Bookmark className="w-3 h-3 text-amber-700" />
                Văn bản pháp luật #{idx + 1}
              </span>
              <span className="text-xs text-stone-400 font-mono">Mã: {doc.id}</span>
            </div>

            <h3 className={`font-serif font-extrabold text-stone-900 leading-snug ${
              isLarge ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
            }`}>
              {doc.ten}
            </h3>

            {/* Meta info: Issuer, Date, Validity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-0.5">
                <span className="text-stone-500 font-medium flex items-center gap-1 text-[11px] uppercase">
                  <Building className="w-3.5 h-3.5" />
                  Cơ quan ban hành
                </span>
                <span className="font-semibold text-stone-900 block">{doc.coQuanBanHanh}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-0.5">
                <span className="text-stone-500 font-medium flex items-center gap-1 text-[11px] uppercase">
                  <Calendar className="w-3.5 h-3.5" />
                  Ngày ban hành
                </span>
                <span className="font-semibold text-stone-900 block">{doc.ngayBanHanh}</span>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-0.5">
                <span className="text-stone-500 font-medium flex items-center gap-1 text-[11px] uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Hiệu lực
                </span>
                <span className="font-semibold text-emerald-800 block">{doc.hieuLuc}</span>
              </div>
            </div>

            {/* Scope */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Phạm vi điều chỉnh & Nội dung cơ bản:
              </h4>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed bg-stone-50/60 p-4 rounded-xl border border-stone-200">
                {doc.phamVi}
              </p>
            </div>

            {/* Key articles referenced */}
            <div className="bg-amber-50/70 border border-amber-200 p-4 sm:p-5 rounded-2xl space-y-1.5">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-700" />
                Các điều khoản trọng yếu được trích dẫn trong ứng dụng:
              </h4>
              <p className="text-stone-900 text-sm sm:text-base font-medium leading-relaxed">
                {doc.dieuKhoanTrongYeu}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Official Legal Portals Notice */}
      <section className="bg-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-3">
        <h4 className="text-stone-900 font-bold text-base flex items-center gap-2 font-serif">
          <Scale className="w-5 h-5 text-amber-800" />
          <span>Tra cứu toàn văn văn bản gốc</span>
        </h4>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Người dân có thể tra cứu toàn văn các văn bản quy phạm pháp luật chính thức được lưu trữ và cập nhật tại:
        </p>
        <ul className="text-xs sm:text-sm text-stone-700 space-y-1 list-disc pl-5">
          <li>Cổng Thông tin điện tử Chính phủ nước CHXHCN Việt Nam (<span className="font-mono text-amber-900">chinhphu.vn</span>)</li>
          <li>Cơ sở dữ liệu quốc gia về văn bản pháp luật (<span className="font-mono text-amber-900">vbpl.vn</span>)</li>
          <li>Cổng thông tin Bộ Tư pháp và Bộ Văn hóa, Thể thao và Du lịch</li>
        </ul>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-950 text-amber-100 rounded-3xl p-6 sm:p-8 border border-amber-800 space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
          <ShieldAlert className="w-5 h-5" />
          <span>Lưu ý quan trọng</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-200 leading-relaxed font-medium">
          Mọi thông tin trên website chỉ mang tính chất tham khảo, tuyên truyền phổ biến giáo dục pháp luật và hướng dẫn người dân thực hành nếp sống văn minh, không thay thế văn bản quy phạm pháp luật chính thức hoặc quyết định xử lý của cơ quan nhà nước có thẩm quyền trong từng vụ việc cụ thể.
        </p>
      </div>
    </div>
  );
};
