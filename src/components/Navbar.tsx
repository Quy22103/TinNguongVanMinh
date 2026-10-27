import React, { useState } from 'react';
import {
  Home,
  Search,
  HelpCircle,
  Info,
  BookOpen,
  Menu,
  X,
  Scale,
  ShieldCheck,
  Type as TypeIcon,
  Sparkles
} from 'lucide-react';

export type ScreenType = 'home' | 'lookup' | 'qa' | 'about' | 'references';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  fontSize: 'normal' | 'large';
  onToggleFontSize: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  fontSize,
  onToggleFontSize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ScreenType; label: string; icon: React.ReactNode; number: string }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Home className="w-5 h-5" />, number: '1' },
    { id: 'lookup', label: 'Tra cứu mức phạt', icon: <Search className="w-5 h-5" />, number: '2' },
    { id: 'qa', label: 'Hỏi đáp tình huống', icon: <HelpCircle className="w-5 h-5" />, number: '3' },
    { id: 'about', label: 'Giới thiệu', icon: <Info className="w-5 h-5" />, number: '4' },
    { id: 'references', label: 'Nguồn tham khảo', icon: <BookOpen className="w-5 h-5" />, number: '5' },
  ];

  const handleSelectScreen = (screen: ScreenType) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-amber-900 text-amber-50 px-3 py-1 text-xs sm:text-sm font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center justify-center bg-amber-700/80 text-amber-100 px-1.5 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider">
              Cổng thông tin mở
            </span>
            <span className="truncate">Tuyên truyền thực hành tín ngưỡng văn minh & tuân thủ pháp luật</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs opacity-90 shrink-0">
            <span>🌐 tinnguongvanminh.ai.studio</span>
            <span>•</span>
            <span className="text-amber-200">Không cần đăng nhập</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <button
            onClick={() => handleSelectScreen('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-800 to-amber-950 text-amber-200 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-amber-950 font-serif">
                  Tín Ngưỡng Văn Minh
                </span>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-300">
                  Việt Nam
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden sm:block">
                Cẩm nang pháp lý & ứng xử tâm linh đúng luật
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectScreen(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all focus:outline-hidden ${
                    isActive
                      ? 'bg-amber-100 text-amber-950 font-semibold shadow-xs ring-1 ring-amber-300'
                      : 'text-stone-700 hover:text-amber-900 hover:bg-stone-100'
                  }`}
                >
                  <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[11px] font-bold ${
                    isActive ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {item.number}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Font Size Toggle & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleFontSize}
              title="Phóng to chữ cho người lớn tuổi"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                fontSize === 'large'
                  ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                  : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200'
              }`}
            >
              <TypeIcon className="w-4 h-4" />
              <span>{fontSize === 'large' ? 'Chữ lớn (Đang bật)' : 'Chữ lớn'}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-hidden"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-2">
            Chọn màn hình truy cập
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectScreen(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-left transition-all ${
                    isActive
                      ? 'bg-amber-100 text-amber-950 font-semibold ring-1 ring-amber-300'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                      isActive ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {item.number}
                    </span>
                    <span className="text-base">{item.label}</span>
                  </div>
                  <span className="text-stone-400">{item.icon}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-200 text-xs text-stone-500 px-2 space-y-1">
            <p>🌟 Ứng dụng web mở phục vụ người dân toàn quốc</p>
            <p>🏛️ Sinh viên: Trương Văn Quý - MSV: PH68121 (Nhóm 2)</p>
          </div>
        </div>
      )}
    </header>
  );
};
