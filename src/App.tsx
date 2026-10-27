/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ScreenType } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { Screen1Home } from './components/Screen1Home.tsx';
import { Screen2Lookup } from './components/Screen2Lookup.tsx';
import { Screen3QA } from './components/Screen3QA.tsx';
import { Screen4About } from './components/Screen4About.tsx';
import { Screen5References } from './components/Screen5References.tsx';
import { ViolationModal } from './components/ViolationModal.tsx';
import { VIOLATIONS_DATA, Violation } from './data/violations.ts';
import { ArrowUp, Sparkles, Search } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedViolationId, setSelectedViolationId] = useState<string | null>(null);
  const [qaPrompt, setQaPrompt] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Monitor scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleFontSize = () => {
    setFontSize((prev) => (prev === 'normal' ? 'large' : 'normal'));
  };

  const handleHomeSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentScreen('lookup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectViolation = (id: string) => {
    setSelectedViolationId(id);
  };

  const handleAskAboutViolation = (tenLoi: string) => {
    setQaPrompt(`Quy định xử phạt và căn cứ pháp lý đối với hành vi: "${tenLoi}" trong thực tế áp dụng như thế nào?`);
    setCurrentScreen('qa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedViolation = selectedViolationId
    ? VIOLATIONS_DATA.find((v) => v.id === selectedViolationId) || null
    : null;

  return (
    <div className={`min-h-screen flex flex-col ${fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
      {/* Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        fontSize={fontSize}
        onToggleFontSize={handleToggleFontSize}
      />

      {/* Main Content Rendered By Screen */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <Screen1Home
            onSearch={handleHomeSearch}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectViolation={handleSelectViolation}
            fontSize={fontSize}
          />
        )}

        {currentScreen === 'lookup' && (
          <Screen2Lookup
            initialSearch={searchKeyword}
            onSelectViolation={handleSelectViolation}
            onAskAboutSituation={handleAskAboutViolation}
            fontSize={fontSize}
          />
        )}

        {currentScreen === 'qa' && (
          <Screen3QA
            initialPrompt={qaPrompt}
            onSelectViolation={handleSelectViolation}
            fontSize={fontSize}
          />
        )}

        {currentScreen === 'about' && (
          <Screen4About
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            fontSize={fontSize}
          />
        )}

        {currentScreen === 'references' && (
          <Screen5References fontSize={fontSize} />
        )}
      </main>

      {/* Floating Bottom Shortcuts for Quick Mobile Access */}
      <aside aria-label="Phím tắt nhanh" className="fixed bottom-5 right-5 z-30 flex flex-col gap-2.5">
        {currentScreen !== 'qa' && (
          <button
            onClick={() => {
              setCurrentScreen('qa');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            title="Mở hỏi đáp tình huống"
            className="bg-amber-800 hover:bg-amber-900 text-white p-3.5 rounded-full shadow-xl hover:scale-110 transition-all flex items-center justify-center cursor-pointer border-2 border-amber-400"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span className="sr-only">Hỏi đáp tình huống</span>
          </button>
        )}

        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Lên đầu trang"
            className="bg-white/90 hover:bg-white text-stone-700 p-3 rounded-full shadow-lg border border-stone-200 transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="sr-only">Lên đầu trang</span>
          </button>
        )}
      </aside>

      {/* Violation Detail Modal */}
      <ViolationModal
        violation={selectedViolation}
        onClose={() => setSelectedViolationId(null)}
        onAskAboutSituation={handleAskAboutViolation}
      />

      {/* Footer */}
      <Footer
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
