import React, { useState } from 'react';
import {
  Search,
  Scale,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Flame,
  Globe,
  Coins,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { VIOLATIONS_DATA } from '../data/violations.ts';
import { ScreenType } from './Navbar.tsx';

interface Screen1HomeProps {
  onSearch: (keyword: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onSelectViolation: (id: string) => void;
  fontSize: 'normal' | 'large';
}

export const Screen1Home: React.FC<Screen1HomeProps> = ({
  onSearch,
  onNavigate,
  onSelectViolation,
  fontSize,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const quickSearchTags = [
    'Bói toán lấy tiền',
    'Livestream bùa ngải TikTok',
    'Đốt vàng mã ở chung cư',
    'Ném tiền lẻ xuống giếng cổ',
    'Gọi hồn trừ tà',
    'Cướp lộc đền chùa',
    'Chiếm đoạt tiền công đức'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    } else {
      onNavigate('lookup');
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchInput(tag);
    onSearch(tag);
  };

  const textSizeClass = fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg';

  return (
    <div className="space-y-16 pb-12 animate-in fade-in duration-150">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-900 via-amber-950 to-stone-900 text-white pt-12 pb-18 px-4 sm:px-6 lg:px-8 rounded-b-3xl sm:rounded-b-[2.5rem] shadow-xl">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-800/80 text-amber-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-amber-600/60 shadow-xs">
            <Scale className="w-4 h-4 text-amber-300" />
            <span>Phổ biến pháp luật & Nếp sống văn minh</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-amber-50 leading-tight">
            Thực Hành Tín Ngưỡng <br className="hidden sm:inline" />
            <span className="text-amber-300 underline decoration-amber-500/80 decoration-wavy decoration-2">
              Văn Minh & Đúng Luật
            </span>
          </h1>

          {/* Description */}
          <p className={`text-stone-300 max-w-2xl mx-auto leading-relaxed ${textSizeClass}`}>
            Cẩm nang số giúp mọi người dân dễ dàng tra cứu quy định pháp luật, nhận diện ranh giới giữa niềm tin tâm linh chân chính và mê tín dị đoan, mức phạt tiền và biện pháp xử lý.
          </p>

          {/* Search Box - Prominent */}
          <div className="pt-2 max-w-2xl mx-auto">
            <form
              onSubmit={handleFormSubmit}
              className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl border-2 border-amber-400/80 focus-within:ring-4 focus-within:ring-amber-400/40 transition-all"
            >
              <div className="pl-4 text-stone-400">
                <Search className="w-6 h-6 text-amber-800" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Nhập hành vi, tình huống (vd: bói bài, đốt vàng mã, bùa ngải...)"
                className="w-full px-3 py-3.5 text-stone-900 placeholder:text-stone-400 focus:outline-hidden text-base sm:text-lg font-medium"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-semibold px-5 sm:px-7 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <span>Tra cứu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick search keywords */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
              <span className="text-amber-200/80 font-medium">Gợi ý tra nhanh:</span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="bg-amber-950/60 hover:bg-amber-800/80 text-amber-100 px-3 py-1 rounded-full border border-amber-700/50 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
            <button
              onClick={() => onNavigate('lookup')}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Xem danh sách 15 lỗi & mức phạt</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('qa')}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Hỏi đáp tình huống bằng lời</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core educational guide: Tín ngưỡng văn minh vs Mê tín dị đoan */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-amber-800 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Cẩm nang nhận diện
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              Phân Biệt Tín Ngưỡng Lành Mạnh & Mê Tín Dị Đoan
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Pháp luật Việt Nam tôn trọng và bảo hộ quyền tự do tín ngưỡng của người dân, đồng thời nghiêm cấm các hành vi lợi dụng tâm linh để lừa dối, trục lợi hoặc gây nguy hiểm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cột 1: Tín ngưỡng văn minh */}
            <div className="bg-emerald-50/60 rounded-2xl p-6 sm:p-8 border-2 border-emerald-200 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-950 font-serif">
                    Tín Ngưỡng Văn Minh
                  </h3>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-sm">
                    Được pháp luật bảo hộ
                  </span>
                </div>
              </div>

              <ul className="space-y-3.5 text-stone-700 text-sm sm:text-base">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-lg leading-none mt-0.5">✓</span>
                  <span><strong>Uống nước nhớ nguồn:</strong> Thờ cúng ông bà, tổ tiên, tưởng nhớ các anh hùng dân tộc có công với đất nước.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-lg leading-none mt-0.5">✓</span>
                  <span><strong>Thanh tịnh & trang nghiêm:</strong> Đi lễ chùa, đền miếu với lòng thành kính; cầu bình an cho gia đình, giữ tâm an lạc.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-lg leading-none mt-0.5">✓</span>
                  <span><strong>Tiết kiệm & bảo vệ môi trường:</strong> Đốt ít vàng mã hoặc không đốt vàng mã; không rải tiền bừa bãi.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 font-bold text-lg leading-none mt-0.5">✓</span>
                  <span><strong>Tự nguyện công đức:</strong> Bỏ tiền giọt dầu trực tiếp vào hòm công đức để tu bổ di tích chung.</span>
                </li>
              </ul>
            </div>

            {/* Cột 2: Mê tín dị đoan */}
            <div className="bg-rose-50/60 rounded-2xl p-6 sm:p-8 border-2 border-rose-200 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
                  <XCircle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-950 font-serif">
                    Mê Tín Dị Đoan & Vi Phạm
                  </h3>
                  <span className="text-xs font-semibold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-sm">
                    Bị xử phạt hành chính hoặc hình sự
                  </span>
                </div>
              </div>

              <ul className="space-y-3.5 text-stone-700 text-sm sm:text-base">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-lg leading-none mt-0.5">✗</span>
                  <span><strong>Hoang đường, sợ hãi:</strong> Tin vào bói toán, gọi hồn, phán số mệnh ma quỷ làm hoang mang tinh thần.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-lg leading-none mt-0.5">✗</span>
                  <span><strong>Trục lợi tài sản:</strong> Thu tiền làm đàn lễ giải hạn bạc triệu, bán bùa ngải tình duyên, chữa bệnh tà ma.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-lg leading-none mt-0.5">✗</span>
                  <span><strong>Hành vi phản cảm:</strong> Nhét tiền lẻ vào tay tượng phật, ném tiền xuống giếng cổ, tranh cướp lộc xô đẩy.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold text-lg leading-none mt-0.5">✗</span>
                  <span><strong>Gây nguy hiểm xã hội:</strong> Đốt vàng mã khổng lồ gây nguy cơ hỏa hoạn, truyền bá mê tín trên TikTok/Facebook.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 4 Topic Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-amber-800 font-bold text-xs uppercase tracking-wider">Các chủ đề trọng tâm</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                Nhóm Lỗi Vi Phạm Thường Gặp
              </h2>
            </div>
            <button
              onClick={() => onNavigate('lookup')}
              className="text-amber-900 hover:text-amber-700 font-semibold text-sm flex items-center gap-1 cursor-pointer"
            >
              <span>Xem toàn bộ 15 lỗi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div
              onClick={() => { onSearch('bói toán'); onNavigate('lookup'); }}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer group space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 group-hover:text-amber-900 transition-colors">
                Bói Toán & Mê Tín Dị Đoan
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Xem bói lấy tiền, gọi hồn, cúng trừ tà, dâng sao giải hạn trục lợi. Phạt đến 5 triệu VNĐ hoặc phạt tù.
              </p>
              <div className="text-xs text-amber-800 font-bold flex items-center gap-1 pt-1">
                <span>Khám phá quy định</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => { onSearch('vàng mã'); onNavigate('lookup'); }}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer group space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 group-hover:text-orange-900 transition-colors">
                Lễ Hội & Nơi Thờ Tự
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Đốt vàng mã sai quy định, rải tiền lẻ, cướp lộc, chen lấn xô đẩy chốn linh thiêng.
              </p>
              <div className="text-xs text-orange-800 font-bold flex items-center gap-1 pt-1">
                <span>Khám phá quy định</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => { onSearch('mạng xã hội'); onNavigate('lookup'); }}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer group space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 group-hover:text-blue-900 transition-colors">
                Mạng Xã Hội & Không Gian Ảo
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Livestream bói online, buôn bán bùa ngải, lan truyền mê tín câu view trên TikTok, Facebook. Phạt đến 20 triệu VNĐ.
              </p>
              <div className="text-xs text-blue-800 font-bold flex items-center gap-1 pt-1">
                <span>Khám phá quy định</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => { onSearch('công đức'); onNavigate('lookup'); }}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer group space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-stone-900 group-hover:text-purple-900 transition-colors">
                Tiền Công Đức & Di Tích
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Biển thủ tiền công đức, xâm hại cổ vật bia đá, cờ bạc trá hình tại lễ hội. Xử lý nghiêm theo pháp luật.
              </p>
              <div className="text-xs text-purple-800 font-bold flex items-center gap-1 pt-1">
                <span>Khám phá quy định</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </section>

        {/* Highlighted Top 3 Violations */}
        <section className="bg-gradient-to-br from-amber-50 to-stone-100 rounded-3xl p-6 sm:p-10 border border-amber-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-amber-800 font-bold text-xs uppercase tracking-wider">Quy định điển hình</span>
              <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                3 Hành Vi Phổ Biến Người Dân Cần Đặc Biệt Lưu Ý
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VIOLATIONS_DATA.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectViolation(item.id)}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="inline-block bg-amber-100 text-amber-900 text-xs font-semibold px-2 py-0.5 rounded">
                    {item.nhomLoi}
                  </span>
                  <h4 className="font-bold text-stone-900 text-base leading-snug line-clamp-2">
                    {item.tenLoi}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2">
                    {item.moTaThucTe}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 space-y-1">
                  <div className="text-xs text-stone-500">Mức phạt tiền quy định:</div>
                  <div className="text-lg font-bold text-red-600 font-serif">
                    {item.mucPhatText}
                  </div>
                  <div className="text-[11px] text-amber-900 font-medium truncate">
                    📜 {item.dieuKhoanApDung}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature highlight: AI Situation Assistant */}
        <section className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-xl z-10">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Công nghệ đối chiếu tự động
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-50 font-serif leading-tight">
              Bạn Đang Gặp Tình Huống Tâm Linh Khó Phân Biệt?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Mô tả tình huống thực tế của bạn bằng ngôn ngữ đời thường (như chuyện xóm giềng, đi lễ đền chùa, mua bán trên mạng). Trợ lý số sẽ đọc và đối chiếu chính xác với 15 lỗi vi phạm trong quy định pháp luật.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('qa')}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-base"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Mở màn hình hỏi đáp tình huống</span>
              </button>
            </div>
          </div>

          <div className="bg-stone-800/90 border border-stone-700 p-6 rounded-2xl max-w-sm w-full z-10 space-y-3">
            <div className="text-xs uppercase font-bold text-amber-400">Cam kết nguyên tắc</div>
            <ul className="text-xs sm:text-sm space-y-2 text-stone-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Chỉ căn cứ trên các điều khoản pháp luật hiện hành.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Nếu chưa đủ căn cứ trong danh mục, báo rõ chưa đủ căn cứ.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Tuyệt đối không tự suy đoán mức phạt.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Miễn phí 100%, không cần tài khoản hay thông tin cá nhân.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
