import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Scale,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
  BookOpen,
  Info
} from 'lucide-react';
import { VIOLATIONS_DATA, VIOLATION_GROUPS, Violation } from '../data/violations.ts';

interface Screen2LookupProps {
  initialSearch?: string;
  onSelectViolation: (id: string) => void;
  onAskAboutSituation: (tenLoi: string) => void;
  fontSize: 'normal' | 'large';
}

export const Screen2Lookup: React.FC<Screen2LookupProps> = ({
  initialSearch = '',
  onSelectViolation,
  onAskAboutSituation,
  fontSize,
}) => {
  const [searchKeyword, setSearchKeyword] = useState(initialSearch);
  const [selectedGroup, setSelectedGroup] = useState<string>('Tất cả');
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');

  // Filter and sort logic
  const filteredViolations = useMemo(() => {
    let result = [...VIOLATIONS_DATA];

    // Filter by group
    if (selectedGroup !== 'Tất cả') {
      result = result.filter((v) => v.nhomLoi === selectedGroup);
    }

    // Filter by search keyword
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.tenLoi.toLowerCase().includes(q) ||
          v.nhomLoi.toLowerCase().includes(q) ||
          v.tenVanBan.toLowerCase().includes(q) ||
          v.dieuKhoanApDung.toLowerCase().includes(q) ||
          v.moTaThucTe.toLowerCase().includes(q) ||
          v.hinhPhatBoSung.toLowerCase().includes(q)
      );
    }

    // Sort by fine
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.mucPhatThapNhat - b.mucPhatThapNhat);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.mucPhatCaoNhat - a.mucPhatCaoNhat);
    }

    return result;
  }, [searchKeyword, selectedGroup, sortOrder]);

  const handleResetFilters = () => {
    setSearchKeyword('');
    setSelectedGroup('Tất cả');
    setSortOrder('default');
  };

  const isLarge = fontSize === 'large';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Màn hình 2 • Dữ liệu chuẩn 15 lỗi</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              Tra Cứu Vi Phạm & Mức Phạt Quy Định
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-1">
              Hiển thị chi tiết khung phạt tiền, hình phạt bổ sung và căn cứ pháp lý chính thức đối với từng hành vi.
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs sm:text-sm text-amber-950 shrink-0 max-w-sm">
            <p className="font-semibold flex items-center gap-1.5 text-amber-900">
              <Info className="w-4 h-4 shrink-0 text-amber-700" />
              Quy định công khai
            </p>
            <p className="mt-1 text-stone-600 leading-relaxed">
              Dữ liệu được cập nhật từ Nghị định 38/2021, NĐ 144/2021, NĐ 15/2020 và Bộ luật Hình sự.
            </p>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="pt-4 border-t border-stone-200 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-7 lg:col-span-8 relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm theo tên lỗi, hành vi (bói toán, đốt vàng mã, bùa ngải, tiền lẻ...)"
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-base font-medium transition-all"
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-600 bg-stone-200 hover:bg-stone-300 px-2 py-0.5 rounded-full"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Sort order */}
            <div className="sm:col-span-5 lg:col-span-4">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full py-3 px-3.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 font-medium focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-sm"
              >
                <option value="default">Sắp xếp: Mặc định (Theo thứ tự danh mục)</option>
                <option value="desc">Mức phạt cao nhất → Thấp nhất</option>
                <option value="asc">Mức phạt thấp nhất → Cao nhất</option>
              </select>
            </div>
          </div>

          {/* Group Filter Chips */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Lọc theo nhóm hành vi:
            </span>
            <div className="flex flex-wrap gap-2">
              {VIOLATION_GROUPS.map((group) => {
                const isSelected = selectedGroup === group;
                return (
                  <button
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-800 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Result Counter & Active Filter summary */}
      <div className="flex items-center justify-between text-sm text-stone-600 px-1">
        <p>
          Tìm thấy <strong className="text-stone-900">{filteredViolations.length}</strong> / {VIOLATIONS_DATA.length} hành vi vi phạm phù hợp
        </p>
        {(searchKeyword || selectedGroup !== 'Tất cả' || sortOrder !== 'default') && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-amber-800 hover:text-amber-950 font-semibold text-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt lại bộ lọc</span>
          </button>
        )}
      </div>

      {/* Violations List */}
      {filteredViolations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredViolations.map((v, index) => {
            return (
              <article
                key={v.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                {/* Top: Group Badge & Title */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-lg border border-amber-300">
                      {v.nhomLoi}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      Mã: {v.id} • Mục #{index + 1}
                    </span>
                  </div>

                  <h3 className={`font-extrabold text-stone-900 leading-snug font-serif ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
                    {v.tenLoi}
                  </h3>
                </div>

                {/* Middle: Fine & Supplementary penalties (Highlight) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Fine Box */}
                  <div className="md:col-span-5 bg-red-50/90 rounded-2xl p-5 border-2 border-red-200 space-y-1 flex flex-col justify-center">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                      Khung tiền phạt vi phạm
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-red-700 font-serif">
                      {v.mucPhatText}
                    </div>
                    <p className="text-xs text-red-900/70 font-medium">
                      (Tối thiểu: {v.mucPhatThapNhat.toLocaleString('vi-VN')} đ — Tối đa: {v.mucPhatCaoNhat.toLocaleString('vi-VN')} đ)
                    </p>
                  </div>

                  {/* Supplementary Penalties Box */}
                  <div className="md:col-span-7 bg-amber-50/70 rounded-2xl p-5 border border-amber-200 space-y-1.5 flex flex-col justify-center">
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      Hình phạt bổ sung & Khắc phục hậu quả
                    </span>
                    <p className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed">
                      {v.hinhPhatBoSung}
                    </p>
                  </div>
                </div>

                {/* Legal Grounds (Căn cứ pháp lý) */}
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                    <Scale className="w-4 h-4 text-stone-800" />
                    <span>Căn cứ pháp lý chính thức</span>
                  </div>
                  <div className="text-sm sm:text-base text-stone-900 space-y-1">
                    <p className="font-semibold text-stone-900">
                      📜 Văn bản: {v.tenVanBan}
                    </p>
                    <p className="text-amber-900 font-medium">
                      ⚖️ Điều khoản áp dụng: <span className="font-bold underline decoration-amber-500">{v.dieuKhoanApDung}</span>
                    </p>
                  </div>
                </div>

                {/* Criminal warning if exists */}
                {v.canCuHinhSu && (
                  <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 space-y-1">
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Lưu ý trách nhiệm hình sự (Điều 320 hoặc Điều 174 Bộ luật Hình sự)
                    </span>
                    <p className="text-xs sm:text-sm text-rose-950 font-medium leading-relaxed">
                      {v.canCuHinhSu}
                    </p>
                  </div>
                )}

                {/* Situation & Civic advice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1 bg-stone-50/60 p-4 rounded-xl border border-stone-200">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Tình huống thực tế thường gặp:
                    </span>
                    <p className="text-stone-700 italic leading-relaxed text-xs sm:text-sm">
                      "{v.moTaThucTe}"
                    </p>
                  </div>

                  <div className="space-y-1 bg-emerald-50/60 p-4 rounded-xl border border-emerald-200">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Lời khuyên ứng xử văn minh:
                    </span>
                    <p className="text-emerald-950 font-medium leading-relaxed text-xs sm:text-sm">
                      {v.loiKhuyenVanMinh}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectViolation(v.id)}
                    className="text-amber-800 hover:text-amber-950 font-bold text-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Xem toàn bộ chi tiết</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onAskAboutSituation(v.tenLoi)}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Hỏi đáp AI về tình huống này
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-800">
            Không tìm thấy lỗi nào khớp với từ khóa "{searchKeyword}"
          </h3>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            Vui lòng thử tìm với từ khóa khác (ví dụ: bói, vàng mã, tiền, mạng xã hội, lừa đảo) hoặc đặt lại bộ lọc.
          </p>
          <button
            onClick={handleResetFilters}
            className="bg-amber-800 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-amber-900 transition-colors cursor-pointer text-sm"
          >
            Xem tất cả 15 lỗi vi phạm
          </button>
        </div>
      )}

      {/* Bottom Legal Disclaimer */}
      <div className="bg-stone-100 rounded-2xl p-4 text-center border border-stone-200 text-xs sm:text-sm text-stone-600">
        ⚖️ <strong>Căn cứ minh bạch:</strong> Mọi kết quả xử phạt đều được hiển thị kèm văn bản và điều khoản áp dụng. Thông tin mang tính tham khảo, hướng dẫn nếp sống văn minh và không thay thế văn bản pháp luật chính thức.
      </div>
    </div>
  );
};
