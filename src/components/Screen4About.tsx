import React from 'react';
import {
  GraduationCap,
  Building2,
  Users,
  Award,
  Globe,
  Scale,
  ShieldCheck,
  Heart,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Laptop,
  Smartphone
} from 'lucide-react';
import { ScreenType } from './Navbar.tsx';

interface Screen4AboutProps {
  onNavigate: (screen: ScreenType) => void;
  fontSize: 'normal' | 'large';
}

export const Screen4About: React.FC<Screen4AboutProps> = ({ onNavigate, fontSize }) => {
  const isLarge = fontSize === 'large';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-150">
      {/* Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Màn hình 4 • Thông tin dự án</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          Giới Thiệu Ứng Dụng Tín Ngưỡng Văn Minh
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Nền tảng công nghệ số cộng đồng hỗ trợ người dân Việt Nam nâng cao nhận thức pháp lý, bảo tồn văn hóa tâm linh truyền thống tốt đẹp và bài trừ tệ nạn mê tín dị đoan.
        </p>
      </div>

      {/* Mandatory Internship Banner */}
      <section className="bg-gradient-to-br from-amber-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 border-2 border-amber-600/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-amber-300 text-xs font-bold uppercase tracking-wider block">
              Báo cáo sản phẩm thực tế
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Thông Tin Thực Tập Sinh & Đơn Vị Đào Tạo
            </h2>
          </div>
        </div>

        {/* Detailed Credit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
            <span className="text-xs text-amber-200 font-semibold uppercase tracking-wider block">
              Sinh viên thực hiện
            </span>
            <p className="text-xl sm:text-2xl font-extrabold text-amber-300 font-serif">
              Trương Văn Quý
            </p>
            <div className="space-y-1 text-stone-200 text-sm pt-1">
              <p>Mã sinh viên: <span className="font-mono bg-stone-900/60 px-2 py-0.5 rounded text-amber-300 font-bold">PH68121</span></p>
              <p>Nhóm đề tài: <span className="font-bold text-white">Nhóm 2</span></p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
            <span className="text-xs text-amber-200 font-semibold uppercase tracking-wider block">
              Chương trình & Đơn vị phối hợp
            </span>
            <p className="text-lg sm:text-xl font-bold text-white leading-snug">
              Chương trình Thực tập sinh Đợt 15
            </p>
            <div className="space-y-1 text-stone-200 text-sm pt-1">
              <p className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Trường Cao đẳng FPT Polytechnic</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Công ty Cổ phần Công nghệ IMTA TECH</span>
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/80 border border-amber-800/80 text-xs sm:text-sm text-amber-100 flex items-start gap-2.5">
          <Globe className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <p>
            <strong>Tên miền ứng dụng:</strong>{' '}
            <a
              href="https://tinnguongvanminh.ai.studio/"
              target="_blank"
              rel="noreferrer"
              className="text-white underline font-mono font-semibold hover:text-amber-300"
            >
              https://tinnguongvanminh.ai.studio/
            </a>{' '}
            — Website mở, cho phép mọi công dân truy cập công khai 24/7 không cần đăng nhập hay cài đặt phức tạp.
          </p>
        </div>
      </section>

      {/* Mục tiêu & Sứ mệnh */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif flex items-center gap-2">
          <Heart className="w-6 h-6 text-amber-800" />
          <span>Mục Tiêu & Ý Nghĩa Xã Hội Của Dự Án</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-stone-900 text-base">Bảo tồn bản sắc văn hóa</h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Tôn vinh truyền thống thờ cúng tổ tiên, tri ân tiền nhân và các phong tục tín ngưỡng tốt đẹp của 54 dân tộc Việt Nam.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-stone-900 text-base">Bình dân hóa kiến thức pháp luật</h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Chuyển hóa các văn bản luật khô khan, phức tạp thành ngôn ngữ dễ hiểu, minh bạch mức phạt tiền và hình phạt bổ sung cho mọi tầng lớp nhân dân.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-stone-900 text-base">Ứng dụng AI có kiểm soát</h4>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Tích hợp trí tuệ nhân tạo Gemini đọc tình huống thực tế, đối chiếu dữ liệu chuẩn, nói không với suy đoán bừa bãi hay bịa đặt điều luật.
            </p>
          </div>
        </div>
      </section>

      {/* Thiết kế tối ưu cho người dân */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <span>Cam Kết Tiện Ích & Trải Nghiệm Người Dùng</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-stone-700">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
            <Laptop className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block">Tối ưu máy tính & điện thoại</strong>
              <span>Giao diện tự động co giãn linh hoạt, nút bấm to bản dễ thao tác cho cả người lớn tuổi.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
            <Smartphone className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block">Nhập giọng nói tiếng Việt</strong>
              <span>Hỗ trợ micro cho người ngại gõ phím hoặc muốn kể nhanh câu chuyện thực tế.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block">Hoàn toàn mở & Miễn phí</strong>
              <span>Không thu phí, không bắt buộc đăng nhập, không thu thập dữ liệu cá nhân của người dùng.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
            <Scale className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-900 block">Bảng mã chuẩn UTF-8</strong>
              <span>Hiển thị đầy đủ dấu tiếng Việt, tương thích tuyệt đối với mọi trình duyệt hiện đại.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() => onNavigate('lookup')}
          className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer text-sm sm:text-base shadow-sm"
        >
          Tra cứu 15 lỗi vi phạm
        </button>
        <button
          onClick={() => onNavigate('references')}
          className="bg-stone-200 hover:bg-stone-300 text-stone-900 font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer text-sm sm:text-base"
        >
          Xem các văn bản luật tham khảo
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 text-center text-xs sm:text-sm text-amber-950 space-y-1">
        <p className="font-bold">⚠️ Tuyên bố miễn trừ trách nhiệm pháp lý:</p>
        <p className="text-stone-700">
          Ứng dụng được xây dựng trong khuôn khổ học tập và thực tập tốt nghiệp nhằm mục đích tuyên truyền nếp sống văn minh và phổ biến pháp luật. Mọi thông tin chỉ mang tính chất tham khảo và không thay thế văn bản quy phạm pháp luật chính thức của Nhà nước.
        </p>
      </div>
    </div>
  );
};
