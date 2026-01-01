// ✨ React 필수 도구들
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// ✨ 아이콘 도구들
import { X, ArrowRight, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

// 컴포넌트 import
import TrackVote from './components/TrackVote';
import FloatingLyrics from './components/FloatingLyrics';
import Guestbook from './components/Guestbook';
import Luckydraw from './components/Luckydraw';
import PreReleasePlayer from './components/PreReleasePlayer';

// 로고 이미지 import
import logoImg from './assets/logo.png';

// 배경 비디오 (public 폴더의 로컬 파일 - base URL 적용)
const backgroundVideo = `${import.meta.env.BASE_URL}background.mp4`;
const mobileBackgroundVideo = `${import.meta.env.BASE_URL}mobilebackground.mp4`;

// 무빙 포스터 썸네일 이미지
const movingPosterThumbnail = `${import.meta.env.BASE_URL}moving.jpg`;

// 선공개 포스터 썸네일 이미지
const flower = `${import.meta.env.BASE_URL}flower.png`;

// 스티커 이미지 import (3D 카드에 사용)
import sticker14 from './assets/stickers/3logy-images/img14.jpeg';
import sticker15 from './assets/stickers/3logy-images/img15.jpeg';

// Concept Photos 1 - Individual (개인)
import cp1_1 from './assets/stickers/3logy-images/concept1-1.jpeg';
import cp1_2 from './assets/stickers/3logy-images/concept1-2.jpeg';
import cp1_3 from './assets/stickers/3logy-images/concept1-3.jpeg';
import cp2_1 from './assets/stickers/3logy-images/concept2-1.jpeg';
import cp2_2 from './assets/stickers/3logy-images/concept2-2.jpeg';
import cp2_3 from './assets/stickers/3logy-images/concept2-3.jpeg';
import cp3_1 from './assets/stickers/3logy-images/concept3-1.jpeg';
import cp3_2 from './assets/stickers/3logy-images/concept3-2.jpeg';
import cp3_3 from './assets/stickers/3logy-images/concept3-3.jpeg';

// Concept Photos 1 - Group (단체)
import cp4_1 from './assets/stickers/3logy-images/concept4-1.jpeg';
import cp4_2 from './assets/stickers/3logy-images/concept4-2.jpeg';
import cp4_3 from './assets/stickers/3logy-images/concept4-3.jpeg';

// Concept Photos 2 - Individual (개인)
import cp5_1 from './assets/stickers/3logy-images/concept5-1.jpeg';
import cp5_2 from './assets/stickers/3logy-images/concept5-2.jpeg';
import cp5_3 from './assets/stickers/3logy-images/concept5-3.jpeg';
import cp6_1 from './assets/stickers/3logy-images/concept6-1.jpeg';
import cp6_2 from './assets/stickers/3logy-images/concept6-2.jpeg';
import cp6_3 from './assets/stickers/3logy-images/concept6-3.jpeg';
import cp7_1 from './assets/stickers/3logy-images/concept7-1.jpeg';
import cp7_2 from './assets/stickers/3logy-images/concept7-2.jpeg';
import cp7_3 from './assets/stickers/3logy-images/concept7-3.jpeg';

// Concept Photos 2 - Group (단체)
import cp8_1 from './assets/stickers/3logy-images/concept8-1.jpeg';
import cp8_2 from './assets/stickers/3logy-images/concept8-2.jpeg';
import cp8_3 from './assets/stickers/3logy-images/concept8-3.jpeg';

// ═══════════════════════════════════════════════════════════════════════════════
// 📱 모바일 감지 훅
// ═══════════════════════════════════════════════════════════════════════════════
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// ═══════════════════════════════════════════════════════════════════════════════
// ⏱️ RealTimeClock (카운트다운)
// ═══════════════════════════════════════════════════════════════════════════════
const RealTimeClock = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const targetDate = new Date("2026-01-07T18:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft("D-DAY OPEN");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `D-${days} ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-right">
      <div className="font-['Wild'] text-[#00C2FF] text-[8px] md:text-xs tracking-widest mb-1 animate-pulse">
        COMEBACK COUNTDOWN
      </div>
      <div className="font-['Godic'] text-sm md:text-2xl text-white font-bold tracking-wider tabular-nums">
        {timeLeft}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 카드 데이터
// ═══════════════════════════════════════════════════════════════════════════════
const CARDS_DATA = [
  {
    id: 1,
    title: 'TRACK',
    subtitle: 'LIST',
    category: '2025.12.23 (TUE)',
    image: sticker15,
    description: '',
    year: '2025',
    isLocked: false
  },
  {
    id: 2,
    title: 'LYRIC',
    subtitle: 'POSTER',
    category: '2025.12.24 (WED)',
    image: sticker14,
    description: '음악의 메시지를 담은 가사 포스터.',
    year: '2025',
    isLocked: false
  },
  {
    id: 3,
    title: 'CONCEPT',
    subtitle: 'PHOTO #1',
    category: '2025.12.25 (THU)',
    image: cp4_1,
    galleryImages: [
      { src: cp1_1, position: 'top' },
      { src: cp1_2, position: 'top' },
      { src: cp1_3, position: 'center' },
      { src: cp2_1, position: 'top' },
      { src: cp2_2, position: 'top' },
      { src: cp2_3, position: 'top' },
      { src: cp3_1, position: 'top' },
      { src: cp3_2, position: 'top' },
      { src: cp3_3, position: 'top' }
    ],
    groupImages: [
      { src: cp4_1, position: 'top' },
      { src: cp4_2, position: 'center' },
      { src: cp4_3, position: 'center' }
    ],
    description: '',
    year: '2025',
    isLocked: false
  },
  {
    id: 4,
    title: 'CONCEPT',
    subtitle: 'PHOTO #2',
    category: '2025.12.27 (SAT)',
    image: cp8_1,
    galleryImages: [
      { src: cp5_1, position: 'top' },
      { src: cp5_2, position: 'top' },
      { src: cp5_3, position: 'top' },
      { src: cp6_1, position: 'top' },
      { src: cp6_2, position: 'top' },
      { src: cp6_3, position: 'top' },
      { src: cp7_1, position: 'center' },
      { src: cp7_2, position: 'top' },
      { src: cp7_3, position: 'top' }
    ],
    groupImages: [
      { src: cp8_1, position: 'top' },
      { src: cp8_2, position: 'center' },
      { src: cp8_3, position: 'center' }
    ],
    description: '',
    year: '2025',
    isLocked: false
  },
  {
    id: 5,
    title: 'HIGHLIGHT',
    subtitle: 'MEDLEY',
    category: '2025.12.30 (TUE)',
    image: null,
    description: '앨범 전곡 미리듣기.',
    year: '2025',
    isLocked: false,
    isHighlightMedley: true
  },
  {
    id: 6,
    title: 'MOVING',
    subtitle: 'POSTER',
    category: '2025.12.31 (WED)',
    image: movingPosterThumbnail,
    description: '움직이는 포스터로 앨범의 분위기를 느껴보세요.',
    year: '2025',
    isLocked: false,
    isMovingPoster: true
  },
  {
    id: 7,
    title: 'PRE',
    subtitle: 'RELEASE',
    category: '2026.01.01 (THU)',
    image: flower,
    description: '새해의 시작과 함께 공개되는 선공개 곡.',
    year: '2026',
    isLocked: false,
    isPreReleaseCard: true,
    youtubeUrl: 'https://www.youtube.com/embed/YgwGBgZEKaM?autoplay=1&rel=0'
  },
  {
    id: 8,
    title: 'MV',
    subtitle: 'TEASER 1',
    category: '2026.01.05 (MON)',
    image: null,
    description: '타이틀곡 뮤직비디오 첫 번째 티저.',
    year: '2026',
    isLocked: true
  },
  {
    id: 9,
    title: 'MV',
    subtitle: 'TEASER 2',
    category: '2026.01.06 (TUE)',
    image: null,
    description: '마지막 티저. Locked And Loaded.',
    year: '2026',
    isLocked: true
  },
  {
    id: 10,
    title: 'MV',
    subtitle: 'RELEASE',
    category: '2026.01.07 (WED)',
    image: null,
    description: 'CNBLUE 3RD FULL ALBUM [3LOGY] 공식 발매.',
    year: '2026',
    isLocked: true
  },
  /*
  {
    id: 11,
    title: 'LUCKY',
    subtitle: 'DRAW',
    category: 'SPECIAL EVENT',
    image: '/gachathumbnail.jpg',
    description: '오늘의 럭키 송을 뽑아보세요!',
    year: '2026',
    isLocked: false,
    isLuckyDrawCard: true
  },
  {
    id: 12,
    title: '16TH',
    subtitle: 'GUESTBOOK',
    category: 'SPECIAL',
    image: sticker14,
    description: 'CNBLUE 16주년 축하 메시지를 남겨주세요!',
    year: '2026',
    isLocked: false,
    isGuestbookCard: true
  }
  */
];

// ═══════════════════════════════════════════════════════════════════════════════
// Stage 1: 인트로 화면 (모바일 최적화 - 100dvh 적용)
// ═══════════════════════════════════════════════════════════════════════════════
const IntroStage = ({ onEnter, isExiting }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const isMobile = useIsMobile();

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black transition-all duration-1000 ease-out ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{ height: '100dvh' }}
    >
      {/* 음소거 토글 버튼 */}
      <button
        onClick={handleToggleMute}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 group"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/30 rounded-full bg-black/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300">
          {isMuted ? (
            <VolumeX size={18} className="text-white/70 group-hover:text-white transition-colors" />
          ) : (
            <Volume2 size={18} className="text-white group-hover:scale-110 transition-transform" />
          )}
          {!isMuted && (
            <span className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-30" />
          )}
        </div>
        <span className="hidden md:block absolute top-full right-0 mt-2 px-3 py-1 text-[10px] font-mono tracking-widest text-white/70 bg-black/80 backdrop-blur-sm border border-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {isMuted ? 'SOUND ON' : 'SOUND OFF'}
        </span>
      </button>

      {/* 비디오 배경 */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          ref={videoRef}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <source src={isMobile ? mobileBackgroundVideo : backgroundVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 노이즈 텍스처 */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 중앙 콘텐츠 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-8">
        <div className="mb-8 md:mb-16 animate-fade-in-up mix-blend-screen">
          <img
            src={logoImg}
            alt="3LOGY"
            className="w-[80vw] md:w-[55vw] lg:w-[45vw] max-w-[800px] h-auto mix-blend-screen"
          />
        </div>

        <button
          onClick={onEnter}
          className="group relative animate-fade-in-up-delay-2"
        >
          <span
            className="flex items-center gap-2 md:gap-3 text-white text-lg md:text-2xl lg:text-3xl tracking-wide"
            style={{
              fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
              fontWeight: 300,
            }}
          >
            Locked And Loaded
            <ArrowRight
              size={24}
              strokeWidth={1.5}
              className="group-hover:translate-x-3 transition-transform duration-500 ease-out"
            />
          </span>
          <div className="relative mt-2 h-[2px] md:h-[3px] bg-white/40 overflow-hidden">
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </div>
        </button>
      </div>

      {/* 하단 정보 */}
      <footer className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 md:px-16 py-4 md:py-8">
        <div className="text-white/40 font-mono text-[10px] md:text-xs tracking-widest">
          <div>2025.01.07</div>
          <div className="mt-1">Killer Joy</div>
        </div>
        <div className="text-white/40 font-mono text-[10px] md:text-xs tracking-widest text-right">
          <div>FNC ENTERTAINMENT</div>
          <div className="mt-1">© 2025</div>
        </div>
      </footer>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Stage 2: 3D 회전 캐러셀 (모바일 최적화 - 터치 이벤트 추가)
// ═══════════════════════════════════════════════════════════════════════════════
const Carousel3D = ({ onCardClick, selectedCard, mousePosition }) => {
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragRotation, setDragRotation] = useState(0);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const isMobile = useIsMobile();

  const cardCount = CARDS_DATA.length;
  const anglePerCard = 360 / cardCount;

  // 📱 모바일/PC별 반지름 계산
  const radius = useMemo(() => {
    const cardWidth = isMobile ? 180 : 280;
    return Math.round((cardWidth / 2) / Math.tan(Math.PI / cardCount));
  }, [cardCount, isMobile]);

  // 자동 회전
  useEffect(() => {
    if (!autoRotate || selectedCard) return;

    let lastTime = performance.now();
    const rotationSpeed = 0.015;

    const animate = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      setRotation(prev => prev + rotationSpeed * delta * 0.01);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate, selectedCard]);

  // 마우스 패럴랙스 (PC only)
  const parallaxX = useMemo(() => {
    if (isMobile) return 0;
    return (mousePosition.x - window.innerWidth / 2) * 0.02;
  }, [mousePosition.x, isMobile]);

  const parallaxY = useMemo(() => {
    if (isMobile) return 0;
    return (mousePosition.y - window.innerHeight / 2) * 0.01;
  }, [mousePosition.y, isMobile]);

  // 🖱️ 마우스 드래그 핸들러
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setDragStart(e.clientX);
    setDragRotation(rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart;
    setRotation(dragRotation + delta * 0.3);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 2000);
  };

  // 📱 터치 핸들러
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setDragStart(e.touches[0].clientX);
    setDragRotation(rotation);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStart;
    setRotation(dragRotation + delta * 0.5);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 2000);
  };

  // 카드 클릭 핸들러
  const handleCardClick = (card, index) => {
    const targetRotation = -index * anglePerCard;
    setRotation(targetRotation);
    setAutoRotate(false);
    setTimeout(() => onCardClick(card), 300);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden touch-pan-y"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* 3D Scene */}
      <div
        className="relative preserve-3d"
        style={{
          perspective: isMobile ? '800px' : '1200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* 3D Carousel Container */}
        <div
          className="relative preserve-3d transition-transform"
          style={{
            transformStyle: 'preserve-3d',
            transform: `
              rotateX(${parallaxY}deg)
              rotateY(${rotation + parallaxX}deg)
            `,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          {CARDS_DATA.map((card, index) => {
            const angle = index * anglePerCard;

            return (
              <div
                key={card.id}
                className="absolute preserve-3d cursor-pointer transition-all duration-500 z-10"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `
                    rotateY(${angle}deg)
                    translateZ(${radius}px)
                  `,
                  left: '50%',
                  top: '50%',
                  marginLeft: isMobile ? '-90px' : '-140px',
                  marginTop: isMobile ? '-115px' : '-180px',
                }}
                onClick={() => handleCardClick(card, index)}
              >
                <Card3D card={card} isMobile={isMobile} />
              </div>
            );
          })}
        </div>
      </div>

      {/* 네비게이션 화살표 */}
      <button
        onClick={() => setRotation(prev => prev + anglePerCard)}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all z-20 bg-black/30 backdrop-blur-sm"
      >
        <ChevronLeft size={20} className="text-white/70" />
      </button>
      <button
        onClick={() => setRotation(prev => prev - anglePerCard)}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all z-20 bg-black/30 backdrop-blur-sm"
      >
        <ChevronRight size={20} className="text-white/70" />
      </button>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3D 카드 컴포넌트 (모바일 최적화 - 크기 조절)
// ═══════════════════════════════════════════════════════════════════════════════
const Card3D = ({ card, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isLocked = card.isLocked;
  const isHighlightMedley = card.isHighlightMedley;
  const isMovingPoster = card.isMovingPoster;

  // 📱 모바일/PC별 카드 크기
  const cardWidth = isMobile ? 'w-[180px]' : 'w-[280px]';
  const cardHeight = isMobile ? 'h-[230px]' : 'h-[360px]';

  return (
    <div
      className={`relative ${cardWidth} ${cardHeight} transition-all duration-500 ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      <div
        className={`absolute inset-0 bg-black border transition-all duration-500 overflow-hidden ${
          isHovered ? 'border-white' : 'border-white/20'
        }`}
      >
        {isLocked ? (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            <span
              className={`text-6xl md:text-9xl font-black text-white/20 transition-all duration-500 ${
                isHovered ? 'scale-125 text-white/40' : 'scale-100'
              }`}
              style={{ fontFamily: "'Impact', sans-serif" }}
            >
              ?
            </span>
            <div className="absolute bottom-1/3 font-mono text-[10px] md:text-xs tracking-[0.3em] text-white/40">
              COMING SOON
            </div>
          </div>
        ) : isHighlightMedley ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
            {/* 재생 버튼 아이콘 */}
            <div className={`relative transition-all duration-500 ${isHovered ? 'scale-125' : 'scale-100'}`}>
              <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                isHovered ? 'border-[#00C2FF] bg-[#00C2FF]/20' : 'border-white/30 bg-white/5'
              }`}>
                <svg
                  className={`w-6 h-6 md:w-10 md:h-10 ml-1 transition-colors duration-500 ${
                    isHovered ? 'text-[#00C2FF]' : 'text-white/60'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className={`absolute bottom-1/4 font-mono text-[10px] md:text-xs tracking-[0.3em] transition-colors duration-500 ${
              isHovered ? 'text-[#00C2FF]' : 'text-white/40'
            }`}>
              PLAY VIDEO
            </div>
          </div>
        ) : (
          <div className="absolute inset-0">
            <img
              src={card.image}
              alt={card.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-80'
              }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${
              isHovered ? 'opacity-90' : 'opacity-70'
            }`} />

            {/* 무빙 포스터 카드일 때 재생 아이콘 오버레이 */}
            {isMovingPoster && (
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#00C2FF] bg-[#00C2FF]/20 flex items-center justify-center backdrop-blur-sm">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 ml-1 text-[#00C2FF]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6">
          <span className={`font-mono text-[10px] md:text-xs tracking-[0.2em] mb-1 md:mb-2 transition-all duration-500 ${
            isHovered ? 'text-white' : 'text-white/50'
          }`}>
            {card.category}
          </span>

          <h3
            className="text-xl md:text-3xl font-black text-white leading-none break-words"
            style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
          >
            {card.title}
          </h3>
          <h4
            className={`text-lg md:text-2xl font-black leading-none mt-0.5 md:mt-1 transition-colors duration-500 ${
              isHovered ? 'text-white' : 'text-white/70'
            }`}
            style={{ fontFamily: "'Arial Black', 'Impact', sans-serif" }}
          >
            {card.subtitle}
          </h4>

          <div className={`mt-2 md:mt-4 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="h-px w-8 md:w-12 bg-white/50 mb-2 md:mb-3" />
            <p className="text-white/60 text-[10px] md:text-xs font-mono">
              {isLocked ? 'LOCKED' : 'VIEW'}
            </p>
          </div>
        </div>

        <div className={`absolute top-2 right-2 md:top-4 md:right-4 font-mono text-[10px] md:text-xs transition-colors duration-500 ${
          isHovered ? 'text-white' : 'text-white/30'
        }`}>
          {String(card.id).padStart(2, '0')}
        </div>
      </div>

      <div
        className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-white/5 to-transparent blur-lg"
        style={{ transform: 'rotateX(90deg) translateZ(-4px)' }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Stage 3: 디테일 모달 (모바일 최적화 - 세로 배치)
// ═══════════════════════════════════════════════════════════════════════════════
const DetailModal = ({ card, onClose, isVisible }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [focusedImage, setFocusedImage] = useState(null);
  const [galleryPage, setGalleryPage] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      setGalleryPage(0);
    } else {
      setIsAnimating(false);
      setFocusedImage(null);
    }
  }, [isVisible]);

  if (!card) return null;

  const isTrackList = card.id === 1;
  const isLyricPoster = card.id === 2;
  const isGallery = card.galleryImages && card.galleryImages.length > 0;
  const hasGroupPhotos = card.groupImages && card.groupImages.length > 0;
  const isGuestbookCard = card.isGuestbookCard === true;
  const isLuckyDrawCard = card.isLuckyDrawCard === true;
  const isPreReleaseCard = card.isPreReleaseCard === true;

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] transition-all duration-700 overflow-hidden ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ height: '100dvh' }}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
        <div className="absolute inset-0 flex items-center justify-center p-2 md:p-8 overflow-y-auto">
          <div className={`relative w-full transition-all duration-700 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            } ${isGallery || isGuestbookCard || isLuckyDrawCard || isPreReleaseCard ? 'max-w-4xl h-[85dvh]' : 'max-w-6xl'}`}>

            {/* [CASE 0] 방명록 */}
            {isGuestbookCard ? (
              <div className="w-full h-full px-2 md:px-4">
                <Guestbook />
              </div>
            )
            /* [CASE 0.5] 럭키드로우 */
            : isLuckyDrawCard ? (
              <div className="w-full h-full px-2 md:px-4">
                <Luckydraw />
              </div>
            )
            /* [CASE 0.6] 선공개 곡 */
            : isPreReleaseCard ? (
              <div className="w-full h-full px-2 md:px-4">
                <PreReleasePlayer />
              </div>
            )
            /* [CASE 1] 트랙리스트 */
            : isTrackList ? (
              <div className="w-full max-w-6xl mx-auto px-2 md:px-4">
                <TrackVote tracklistImage={card.image} />
              </div>
            )
            /* [CASE 2] 리릭 포스터 */
            : isLyricPoster ? (
              <div className="relative w-full max-w-screen-lg mx-auto h-auto aspect-[3/4] max-h-[80dvh] overflow-hidden group rounded-lg border border-white/10 bg-black">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                <FloatingLyrics />
              </div>
            )
            /* [CASE 3] 갤러리 */
            : isGallery ? (
              <div className="flex flex-col h-full relative px-2 md:px-0">
                <div className="flex-none mb-4 md:mb-6 text-center relative">
                  <span className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-white/50 block mb-1 md:mb-2">{card.category}</span>
                  <h2 className="text-xl md:text-3xl font-black text-white" style={{ fontFamily: "'Arial Black', sans-serif" }}>{card.title} {card.subtitle}</h2>
                  {hasGroupPhotos && (
                    <div className="flex items-center justify-center gap-4 mt-3 md:mt-4 font-mono text-[10px] tracking-widest">
                      <button
                        onClick={() => setGalleryPage(0)}
                        className={`px-3 py-1 border transition-colors ${galleryPage === 0 ? 'border-[#00C2FF] text-[#00C2FF]' : 'border-white/20 text-white/30'}`}
                      >
                        INDIVIDUAL
                      </button>
                      <button
                        onClick={() => setGalleryPage(1)}
                        className={`px-3 py-1 border transition-colors ${galleryPage === 1 ? 'border-[#00C2FF] text-[#00C2FF]' : 'border-white/20 text-white/30'}`}
                      >
                        GROUP
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-h-0 relative overflow-hidden">
                  {/* PAGE 0: 개인 사진 */}
                  {galleryPage === 0 && (
                    <div className="grid grid-cols-3 gap-1 md:gap-3 h-full overflow-y-auto pr-1 md:pr-2 custom-scrollbar animate-fade-in-up">
                      {card.galleryImages.map((item, index) => {
                        const imgSrc = item.src || item;
                        const imgPos = item.position || 'center';
                        return (
                          <div key={`indiv-${index}`} onClick={() => setFocusedImage(imgSrc)} className="relative aspect-[3/4] overflow-hidden border border-white/10 group cursor-pointer bg-white/5">
                            <img src={imgSrc} alt={`Individual ${index + 1}`} style={{ objectPosition: imgPos }} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 text-white font-mono text-[10px] md:text-xs tracking-widest border border-white/50 px-2 md:px-3 py-1">VIEW</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* PAGE 1: 단체 사진 */}
                  {galleryPage === 1 && (
                    <div className="flex flex-col gap-2 md:gap-4 h-full overflow-y-auto pr-1 md:pr-2 custom-scrollbar animate-fade-in-up">
                      {card.groupImages.map((item, index) => {
                        const imgSrc = item.src || item;
                        const imgPos = item.position || 'center';
                        return (
                          <div key={`group-${index}`} onClick={() => setFocusedImage(imgSrc)} className="relative w-full aspect-video overflow-hidden border border-white/10 group cursor-pointer bg-white/5 shrink-0">
                            <img src={imgSrc} alt={`Group ${index + 1}`} style={{ objectPosition: imgPos }} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 text-white font-mono text-[10px] md:text-xs tracking-widest border border-white/50 px-2 md:px-3 py-1">FULL</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
            /* [CASE 4] 기본 카드 */
            : (
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-16 items-center px-2 md:px-0">
                <div className="relative w-full aspect-[3/4] max-h-[50dvh] md:max-h-none overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 border border-white/20" />
                </div>
                <div className="flex flex-col justify-center text-center md:text-left">
                  <span className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-white/50 mb-2 md:mb-4">{card.category}</span>
                  <h2 className="text-3xl md:text-7xl font-black text-white leading-none" style={{ fontFamily: "'Arial Black', sans-serif" }}>{card.title}</h2>
                  <h3 className="text-2xl md:text-6xl font-black text-white/80 leading-none mt-1 md:mt-2" style={{ fontFamily: "'Arial Black', sans-serif" }}>{card.subtitle}</h3>
                  <div className="h-px w-16 md:w-24 bg-white/30 my-4 md:my-8 mx-auto md:mx-0" />
                  <p className="text-white/60 text-sm md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">{card.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 닫기 버튼 - 모바일에서 더 큰 터치 영역 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-8 md:right-8 w-11 h-11 md:w-14 md:h-14 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 z-10 rounded-full bg-black/50 backdrop-blur-md"
        >
          <X size={20} />
        </button>

        <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-xs text-white/30 tracking-widest pointer-events-none">
          PRESS ESC OR CLICK OUTSIDE TO CLOSE
        </div>
      </div>

      {/* 포커스 이미지 */}
      {focusedImage && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-2 md:p-4 animate-fade-in-up duration-300" onClick={() => setFocusedImage(null)}>
          <img src={focusedImage} alt="Full View" className="max-w-full max-h-full object-contain shadow-2xl shadow-white/10" />
          <button onClick={() => setFocusedImage(null)} className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors">
            <X size={32} />
          </button>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 메인 앱 컴포넌트
// ═══════════════════════════════════════════════════════════════════════════════
// 하이라이트 메들리 비디오 경로
const highlightMedleyVideo = `${import.meta.env.BASE_URL}medly.MP4`;

// 무빙 포스터 비디오 경로
const movingPosterVideo = `${import.meta.env.BASE_URL}movingposter.mp4`;

const OneFile = () => {
  const [currentStage, setCurrentStage] = useState('intro');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMovingPosterOpen, setIsMovingPosterOpen] = useState(false);

  // 마우스 위치 추적
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isVideoOpen) {
          setIsVideoOpen(false);
        } else if (isMovingPosterOpen) {
          setIsMovingPosterOpen(false);
        } else if (selectedCard) {
          handleCloseDetail();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCard, isVideoOpen, isMovingPosterOpen]);

  const handleEnterExperience = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStage('main');
      setIsTransitioning(false);
    }, 1000);
  }, []);

  const handleCardClick = useCallback((card) => {
    // 하이라이트 메들리 카드 클릭 시 비디오 오버레이 열기
    if (card.isHighlightMedley) {
      setIsVideoOpen(true);
      return;
    }
    // 무빙 포스터 카드 클릭 시 비디오 오버레이 열기
    if (card.isMovingPoster) {
      setIsMovingPosterOpen(true);
      return;
    }
    setSelectedCard(card);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedCard(null);
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden" style={{ height: '100dvh' }}>
      {/* CSS 애니메이션 정의 */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 1s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-3 {
          animation: fade-in-up 1s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        ::-webkit-scrollbar {
          width: 2px;
        }
        ::-webkit-scrollbar-track {
          background: #000;
        }
        ::-webkit-scrollbar-thumb {
          background: #fff;
        }

        /* 터치 최적화 */
        .touch-pan-y {
          touch-action: pan-y;
        }
      `}</style>

      {/* Stage 1: 인트로 */}
      {currentStage === 'intro' && (
        <IntroStage
          onEnter={handleEnterExperience}
          isExiting={isTransitioning}
        />
      )}

      {/* Stage 2: 메인 (3D 캐러셀) */}
      {currentStage === 'main' && (
        <div className="fixed inset-0 flex flex-col" style={{ height: '100dvh' }}>
          {/* 헤더 */}
          <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-start p-3 md:p-6 mix-blend-difference text-white">
            <button
              onClick={() => window.location.reload()}
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src={logoImg}
                alt="CNBLUE Logo"
                className="w-20 md:w-40 h-auto object-contain"
              />
            </button>
            <RealTimeClock />
          </header>

          {/* 3D 캐러셀 */}
          <div className="flex-1 relative">
            <Carousel3D
              onCardClick={handleCardClick}
              selectedCard={selectedCard}
              mousePosition={mousePosition}
            />
          </div>

          {/* 하단 정보 */}
          <footer className="flex items-center justify-between px-4 md:px-16 py-3 md:py-6 z-30">
            <div className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest">
              <span>{CARDS_DATA.length} ITEMS</span>
            </div>
            <div className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest">
              2025.01.07 RELEASE
            </div>
          </footer>

          {/* 노이즈 오버레이 */}
          <div
            className="fixed inset-0 pointer-events-none z-20 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />

          {/* 배경 그라디언트 */}
          <div className="fixed inset-0 pointer-events-none z-10">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)] opacity-40" />
          </div>
        </div>
      )}

      {/* Stage 3: 디테일 모달 */}
      <DetailModal
        card={selectedCard}
        onClose={handleCloseDetail}
        isVisible={!!selectedCard}
      />

      {/* 하이라이트 메들리 비디오 오버레이 */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center animate-fade-in-up"
          style={{ height: '100dvh' }}
          onClick={() => setIsVideoOpen(false)}
        >
          {/* 비디오 컨테이너 */}
          <div
            className="relative w-[95vw] md:w-[85vw] max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={highlightMedleyVideo}
              autoPlay
              controls
              className="w-full h-full object-contain rounded-lg shadow-2xl shadow-white/10"
            />

            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 md:-top-4 md:-right-14 w-10 h-10 md:w-12 md:h-12 border border-white/30 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
          </div>

          {/* 하단 안내 텍스트 */}
          <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/30 tracking-widest">
            PRESS ESC OR CLICK OUTSIDE TO CLOSE
          </div>
        </div>
      )}

      {/* 무빙 포스터 비디오 오버레이 */}
      {isMovingPosterOpen && (
        <div
          className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex items-center justify-center animate-fade-in-up"
          style={{ height: '100dvh' }}
          onClick={() => setIsMovingPosterOpen(false)}
        >
          {/* 비디오 컨테이너 */}
          <div
            className="relative w-[95vw] md:w-[85vw] max-w-5xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={movingPosterVideo}
              autoPlay
              controls
              className="w-full h-full object-contain rounded-lg shadow-2xl shadow-white/10"
            />

            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsMovingPosterOpen(false)}
              className="absolute -top-12 right-0 md:-top-4 md:-right-14 w-10 h-10 md:w-12 md:h-12 border border-white/30 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-300"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
          </div>

          {/* 하단 안내 텍스트 */}
          <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs text-white/30 tracking-widest">
            PRESS ESC OR CLICK OUTSIDE TO CLOSE
          </div>
        </div>
      )}
    </div>
  );
};

export default OneFile;
