import React from 'react';
import { Scale, ShieldAlert, Heart, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ScreenType } from './Navbar.tsx';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t-4 border-amber-800">
      {/* Legal disclaimer banner */}
      <div className="bg-amber-950/80 border-b border-amber-900/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm sm:text-base text-amber-200 leading-relaxed font-medium">
            <strong className="text-white">Lưu ý quan trọng:</strong> Toàn bộ thông tin được cung cấp trên hệ thống chỉ mang tính chất tham khảo, giáo dục nếp sống văn minh và phổ biến kiến thức pháp luật cộng đồng. Thông tin này <span className="underline decoration-amber-400 underline-offset-2 font-semibold text-white">không thay thế các văn bản pháp luật chính thức</span> hoặc kết luận của cơ quan có thẩm quyền.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1: System info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-700 text-amber-100 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white font-serif tracking-tight">
                Tín Ngưỡng Văn Minh
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Trang web mở công khai, hỗ trợ người dân dễ dàng tra cứu ranh giới giữa niềm tin tâm linh truyền thống tốt đẹp và các hành vi vi phạm pháp luật, mê tín dị đoan tại Việt Nam.
            </p>
            <div className="inline-flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700 text-xs text-amber-300 font-mono">
              <span>Địa chỉ web:</span>
              <a
                href="https://tinnguongvanminh.ai.studio/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white flex items-center gap-1"
              >
                https://tinnguongvanminh.ai.studio/
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-base uppercase tracking-wider text-xs">
              Điều hướng các màn hình
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 text-stone-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded bg-stone-800 text-amber-400 text-xs flex items-center justify-center font-semibold">1</span>
                  Màn hình 1: Trang chủ & Tìm kiếm nhanh
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('lookup'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 text-stone-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded bg-stone-800 text-amber-400 text-xs flex items-center justify-center font-semibold">2</span>
                  Màn hình 2: Kết quả tra cứu & Mức phạt quy định
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('qa'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 text-stone-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded bg-stone-800 text-amber-400 text-xs flex items-center justify-center font-semibold">3</span>
                  Màn hình 3: Hỏi đáp tình huống bằng mô tả lời nói
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 text-stone-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded bg-stone-800 text-amber-400 text-xs flex items-center justify-center font-semibold">4</span>
                  Màn hình 4: Giới thiệu dự án thực tập
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('references'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 text-stone-300 transition-colors flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded bg-stone-800 text-amber-400 text-xs flex items-center justify-center font-semibold">5</span>
                  Màn hình 5: Danh mục Nguồn văn bản luật
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Internship Credits required */}
          <div className="bg-stone-800/90 rounded-xl p-5 border border-stone-700/80 space-y-3">
            <h4 className="text-amber-400 font-semibold text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span>Đề tài Thực tập Tốt nghiệp</span>
            </h4>
            <div className="text-sm space-y-1.5 text-stone-300 leading-relaxed">
              <p className="font-medium text-white">
                Sản phẩm thực tập của sinh viên: <span className="text-amber-300 font-bold">Trương Văn Quý</span>
              </p>
              <p>Mã sinh viên: <span className="font-mono bg-stone-900 px-1.5 py-0.5 rounded text-amber-200 font-semibold">PH68121</span></p>
              <p>Nhóm thực hiện: <span className="font-semibold text-white">Nhóm 2</span></p>
              <p className="text-xs text-stone-400 pt-1 border-t border-stone-700/60">
                Chương trình Thực tập sinh Đợt 15<br />
                <strong className="text-stone-300">FPT Polytechnic</strong> phối hợp cùng <strong className="text-stone-300">IMTA TECH</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Tín Ngưỡng Văn Minh. Phát triển vì lợi ích cộng đồng văn hóa Việt Nam.</p>
          <p className="flex items-center gap-1">
            Giao diện tối ưu đa thiết bị (Máy tính & Điện thoại) • Bảng mã UTF-8 chuẩn
          </p>
        </div>
      </div>
    </footer>
  );
};
