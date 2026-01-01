import React, { useState, useRef, useMemo } from 'react';
import html2canvas from 'html2canvas';

// 이미지 경로
import gachaMachineImg from '../assets/gacha_machine.png';
import paperTextureImg from '../assets/paper_texture.png';
import logoImg from '../assets/3logy_logo_white.png';
import cnblueTopLogoImg from '../assets/cnblue_logo.png';

// 🎵 데이터
const CNBLUE_SONGS = [
  "외톨이야", "직감", "LOVE", "I'm Sorry", "Can't Stop",
  "이렇게 예뻤나", "헷갈리게", "과거 현재 미래", "싹둑",
  "Love Light", "Cinderella", "Radio", "Coffee Shop",
  "Domino", "In My Head", "Ryu Can Do It", "Tatto", "99%",
  "Lady", "Try Again, Smile Again"
];

const stringToBinary = (str) => str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');

const SongReceipt = ({ songTitle, isPrinting, innerRef }) => {
    if (!songTitle) return null;

    const { binaryCode1, binaryCode2, visualDots, barcodeBars } = useMemo(() => {
        const bin1 = stringToBinary(songTitle.slice(0, 2));
        const bin2 = songTitle.length > 2 ? stringToBinary(songTitle.slice(2, 4)) : "";
        const dots = Array(24).fill(0).map(() => Math.random() > 0.5 ? '●' : '○').join('');
        const bars = Array(40).fill(0).map((_, i) => ({
            id: i,
            x: i * 2.5,
            width: Math.random() > 0.5 ? 1.5 : 0.5
        }));
        return { binaryCode1: bin1, binaryCode2: bin2, visualDots: dots, barcodeBars: bars };
    }, [songTitle]);

    const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const dotLine1 = visualDots.slice(0, 12);
    const dotLine2 = visualDots.slice(12, 24);

    return (
        <div
            ref={innerRef}
            className={`relative w-[340px] bg-[#f8f4e8] text-[#333] font-['Galmuri11'] p-8 shadow-xl mx-auto origin-top overflow-hidden ${isPrinting ? 'animate-receipt-print' : ''}`}
            style={{
                clipPath: 'polygon(0% 0%, 2% 1%, 4% 0%, 6% 1%, 8% 0%, 10% 1%, 12% 0%, 14% 1%, 16% 0%, 18% 1%, 20% 0%, 22% 1%, 24% 0%, 26% 1%, 28% 0%, 30% 1%, 32% 0%, 34% 1%, 36% 0%, 38% 1%, 40% 0%, 42% 1%, 44% 0%, 46% 1%, 48% 0%, 50% 1%, 52% 0%, 54% 1%, 56% 0%, 58% 1%, 60% 0%, 62% 1%, 64% 0%, 66% 1%, 68% 0%, 70% 1%, 72% 0%, 74% 1%, 76% 0%, 78% 1%, 80% 0%, 82% 1%, 84% 0%, 86% 1%, 88% 0%, 90% 1%, 92% 0%, 94% 1%, 96% 0%, 98% 1%, 100% 0%, 100% 100%, 98% 99%, 96% 100%, 94% 99%, 92% 100%, 90% 99%, 88% 100%, 86% 99%, 84% 100%, 82% 99%, 80% 100%, 78% 99%, 76% 100%, 74% 99%, 72% 100%, 70% 99%, 68% 100%, 66% 99%, 64% 100%, 62% 99%, 60% 100%, 58% 99%, 56% 100%, 54% 99%, 52% 100%, 50% 99%, 48% 100%, 46% 99%, 44% 100%, 42% 99%, 40% 100%, 38% 99%, 36% 100%, 34% 99%, 32% 100%, 30% 99%, 28% 100%, 26% 99%, 24% 100%, 22% 99%, 20% 100%, 18% 99%, 16% 100%, 14% 99%, 12% 100%, 10% 99%, 8% 100%, 6% 99%, 4% 100%, 2% 99%, 0% 100%)',
                backgroundImage: `url(${paperTextureImg})`,
                backgroundBlendMode: 'multiply',
            }}
        >
            <div
                className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `url(${logoImg})`,
                    backgroundPosition: 'center',
                    backgroundSize: '80%',
                    backgroundRepeat: 'no-repeat',
                    filter: 'invert(1) opacity(0.08)',
                }}
            />
            <div className="relative z-10">
                <div className="text-center mb-6 border-b-2 border-[#555] border-dashed pb-4 flex flex-col items-center">
                    <img src={cnblueTopLogoImg} alt="CNBLUE Logo" className="w-36 mb-2 grayscale opacity-90" />
                    <h2 className="text-2xl font-bold tracking-widest mb-1">LUCKY TRACK</h2>
                    <p className="text-xs opacity-70">CNBLUE 16TH ANNIVERSARY</p>
                </div>
                <div className="mb-6 space-y-5 text-sm font-mono">
                    <div className="flex justify-between font-bold border-b border-[#777] border-dashed pb-2">
                        <span>DATE / TIME</span><span>{today}</span>
                    </div>
                    <div className="py-2">
                        <p className="text-xs opacity-60 mb-1">YOUR LUCKY SONG IS...</p>
                        <p className="text-3xl font-bold leading-tight break-keep text-center py-4 border-y-2 border-[#333]">[ {songTitle} ]</p>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-[#e9e4d4]/80 p-2 rounded text-xs tracking-tight leading-relaxed break-all font-mono border border-[#d3cebf] backdrop-blur-sm">
                            <p className="text-[10px] opacity-50 mb-1">BINARY CODE</p>
                            {binaryCode1}<br/>{binaryCode2}{songTitle.length > 4 && "..."}
                        </div>
                        <div className="border-t border-[#777] border-dashed pt-3">
                            <p className="text-[10px] opacity-50 mb-1 flex justify-between"><span>VISUAL CODE</span><span>(DATA)</span></p>
                            <div className="tracking-[0.5em] font-bold text-lg leading-relaxed text-center break-all">
                                {dotLine1}<br/>{dotLine2}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center pt-4 border-t-2 border-[#555] border-dashed">
                    <svg className="w-full h-10 mb-3 opacity-80 mix-blend-multiply" viewBox="0 0 100 30" preserveAspectRatio="none">
                        {barcodeBars.map((bar) => (
                            <rect key={bar.id} x={bar.x} y="0" width={bar.width} height="30" fill="#333" />
                        ))}
                    </svg>
                    <p className="text-lg font-bold tracking-[0.3em] mb-1">HAVE A NICE DAY!</p>
                    <p className="text-xs opacity-60">ENJOY YOUR MUSIC</p>
                </div>
            </div>
        </div>
    );
};

const GachaMachine = ({ onDraw, isDrawing }) => {
    return (
        <div className="relative w-full max-w-[500px] mx-auto group cursor-pointer lg:w-auto" onClick={onDraw}>
            <img
                src={gachaMachineImg}
                alt="Gacha Machine"
                className={`w-full h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] relative z-10 transition-all duration-300 ${!isDrawing && 'group-hover:scale-105 group-hover:-rotate-1'}`}
            />
            <div className="absolute inset-0 z-20"></div>
        </div>
    );
};

const LuckyDraw = () => {
  const [isGachaDrawing, setIsGachaDrawing] = useState(false);
  const [isReceiptPrinting, setIsReceiptPrinting] = useState(false);
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [pickedSong, setPickedSong] = useState(null);
  const scrollRef = useRef(null);
  const captureRef = useRef(null);

  const handleGachaDraw = () => {
      if (isGachaDrawing || isReceiptPrinting) return;
      setIsGachaDrawing(true);
      setPickedSong(null);
      setShowDownloadBtn(false);
      setTimeout(() => {
          const randomSong = CNBLUE_SONGS[Math.floor(Math.random() * CNBLUE_SONGS.length)];
          setPickedSong(randomSong);
          setIsGachaDrawing(false);
          setIsReceiptPrinting(true);
          setTimeout(() => {
              setIsReceiptPrinting(false);
              setShowDownloadBtn(true);
              if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 2500);
      }, 2000);
  };

  const handleDownload = async () => {
      if (!captureRef.current) return;
      try {
          const canvas = await html2canvas(captureRef.current, {
              scale: 3, backgroundColor: null, useCORS: true, logging: false,
              onclone: (clonedDoc) => {
                  const clonedElement = clonedDoc.querySelector(`[data-html2canvas-ignore="true"]`)?.parentNode || clonedDoc.body;
                  Array.from(clonedElement.querySelectorAll("*")).forEach(el => {
                      const computedStyle = window.getComputedStyle(el);
                      if (computedStyle.fontFamily.includes('Galmuri11')) { el.style.fontFamily = "'Galmuri11', monospace"; }
                  });
              }
          });
          const link = document.createElement('a');
          link.download = `CNBLUE_Receipt_${pickedSong}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
      } catch (err) { console.error("다운로드 실패:", err); alert("영수증 저장에 실패했습니다."); }
  };

  return (
      <section className="relative px-4 py-32 bg-[#0a0a0a] overflow-hidden w-full min-h-screen flex items-center justify-center">
          <style>{`
            @font-face {
                font-family: 'Minecraft';
                src: url('/fonts/Minecraft.ttf') format('truetype'),
                     url('/fonts/Mincraft.ttf') format('truetype'); 
            }
            @keyframes receipt-print {
                0% { max-height: 0; opacity: 0; transform: translateY(-50px) perspective(500px) rotateX(20deg); }
                100% { max-height: 800px; opacity: 1; transform: translateY(0) perspective(500px) rotateX(0deg); }
            }
            .animate-receipt-print { animation: receipt-print 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; overflow: hidden; }
          `}</style>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(100,50,255,0.15)_0%,_rgba(0,0,0,0.8)_70%)] pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse pointer-events-none"></div>

          <div className="max-w-7xl mx-auto relative z-10 w-full">
              <div className="text-center mb-16">
                  <span 
                    className="text-indigo-300 text-sm tracking-[0.6em] border border-indigo-500/30 px-4 py-2 rounded-full mb-6 inline-block animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                    style={{ fontFamily: "'Minecraft', sans-serif" }}
                  >
                    SPECIAL EVENT
                  </span>
                  
                  <h2 
                    className="text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-800 mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]" 
                    style={{ fontFamily: "'Minecraft', sans-serif" }}
                  >
                      LUCKY TRACK GACHA
                  </h2>
                  
                  <p className="text-white/70 text-xl" style={{ fontFamily: 'Neo, sans-serif' }}>
                      오늘 나에게 필요한 CNBLUE 노래는? 캡슐을 뽑아 확인하세요!
                  </p>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-24">
                  <div className="flex-none relative group perspective-1000 flex justify-center w-full lg:w-auto">
                      {/* ✨ [핵심 수정] 후광 색상 변경: 보라 -> 인디고 블루 */}
                      <div className="absolute -inset-10 bg-gradient-to-r from-indigo-600 to-blue-800 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500"></div>
                      <GachaMachine onDraw={handleGachaDraw} isDrawing={isGachaDrawing} />
                  </div>

                  <div className="flex-1 w-full max-w-md flex flex-col items-center relative">
                       <div className="w-[380px] h-16 bg-[#222] rounded-t-2xl border-t-4 border-x-4 border-[#333] flex items-end justify-center shadow-[0_-10px_20px_rgba(0,0,0,0.5)] relative z-20 overflow-hidden">
                            <div className="w-[340px] h-3 bg-black/80 rounded-t-md mb-1 shadow-inner"></div>
                            {isReceiptPrinting && <div className="absolute inset-0 bg-blue-500/20 animate-pulse z-30"></div>}
                       </div>
                       <div className="relative w-full z-10 min-h-[500px] flex flex-col items-center pt-2" ref={scrollRef}>
                            {pickedSong ? (
                                <>
                                    <SongReceipt songTitle={pickedSong} isPrinting={isReceiptPrinting} innerRef={captureRef} />
                                    {showDownloadBtn && (
                                        <button onClick={handleDownload} className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-[#00C2FF] hover:text-white transition-all duration-300 flex items-center gap-2 animate-bounce relative z-50" style={{ fontFamily: 'Neo, sans-serif' }}>
                                            <span className="material-symbols-outlined text-lg">download</span>
                                            영수증 저장하기
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="mt-12 text-center opacity-40 border-4 border-dashed border-white/10 p-10 rounded-3xl bg-white/5 backdrop-blur-sm" style={{ fontFamily: 'Neo, sans-serif' }}>
                                    <div className="text-7xl mb-6 animate-pulse grayscale">🧾</div>
                                    <p className="text-lg">왼쪽 기계를 클릭하세요!</p>
                                </div>
                            )}
                       </div>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default LuckyDraw;