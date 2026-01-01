import React, { useState } from 'react';

// 초기 샘플 메시지 데이터
const INITIAL_MESSAGES = [
  { id: 1, nickname: 'BOICE_Forever', message: '씨앤블루 16주년 진심으로 축하해요! 여러분의 음악이 제 인생의 사운드트랙이에요.', timestamp: '2026.01.14 14:30', seat: 'A-01' },
  { id: 2, nickname: '정용화사랑', message: '용화오빠, 정신오빠, 민혁오빠! 16년 동안 변함없이 멋진 음악 들려줘서 고마워요.', timestamp: '2026.01.14 13:22', seat: 'A-02' },
  { id: 3, nickname: 'BlueMoon', message: '16년이라는 시간 동안 함께해줘서 감사합니다. CNBLUE의 음악은 언제나 저에게 힘이 됩니다.', timestamp: '2026.01.14 12:15', seat: 'A-03' },
  { id: 4, nickname: 'RockWithCNB', message: '밴드 씨앤블루 화이팅! 앞으로도 멋진 무대 기대할게요. 16주년 축하드려요!', timestamp: '2026.01.14 11:00', seat: 'A-04' },
  { id: 5, nickname: 'LoveGirl', message: 'Love Girl 노래처럼 언제나 사랑스러운 우리 밴드! 20주년까지 쭉 가자!', timestamp: '2026.01.14 10:30', seat: 'A-05' },
  { id: 6, nickname: '직감', message: '내 직감이 말하고 있어.. 이번 16주년 콘서트는 역대급일 거라고!', timestamp: '2026.01.14 09:15', seat: 'A-06' },
  { id: 7, nickname: '외톨이야', message: '외톨이야 외톨이야~ 노래방 18번곡! 영원해라 씨엔블루!', timestamp: '2026.01.14 08:30', seat: 'A-07' },
  { id: 8, nickname: 'InMyHead', message: 'In My Head 진짜 명곡... 라이브 듣고 싶어요!', timestamp: '2026.01.14 08:00', seat: 'A-08' },
];

// 바코드 SVG
const Barcode = () => (
  <svg className="w-full h-8" viewBox="0 0 200 40">
    {[...Array(40)].map((_, i) => (
      <rect key={i} x={i * 5} y="0" width={Math.random() > 0.5 ? 3 : 1.5} height="40" fill="currentColor" opacity={0.7} />
    ))}
  </svg>
);

// 티켓 카드 컴포넌트
const TicketCard = ({ ticket, isNew }) => {
  const seatNumber = ticket.seat || `VIP-${String(ticket.id).slice(-2)}`;
  const ticketNumber = `16TH-${String(ticket.id).padStart(4, '0')}`;

  return (
    // ✨ [애니메이션 변경] isNew일 때 'animate-print-out' 적용 (위에서 아래로 출력되는 효과)
    <div className={`relative group transition-all duration-500 ${isNew ? 'animate-print-out z-50' : ''}`}>
      <div className="relative bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628] border border-[#00C2FF]/30 rounded-lg overflow-visible shadow-lg shadow-[#00C2FF]/10 hover:shadow-[#00C2FF]/30 hover:border-[#00C2FF]/60 transition-all duration-300 flex flex-col font-['Neo']">
        
        {/* 상단 정보 */}
        <div className="p-5 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] font-mono tracking-[0.3em] text-[#00C2FF]/70 mb-1">TICKET NO.</div>
              <div className="text-xs font-mono text-white/90">{ticketNumber}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#00C2FF]/70 mb-1">SEAT</div>
              <div className="text-xl font-black text-[#00C2FF]">{seatNumber}</div>
            </div>
          </div>
        </div>

        {/* 절취선 및 펀칭 구멍 */}
        <div className="relative w-full h-8 my-1 flex items-center">
             <div className="w-full border-t border-dashed border-[#00C2FF]/30 mx-4"></div>
             <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d1f3c] px-2 text-[8px] font-mono text-[#00C2FF]/50 tracking-widest z-10">DETACH HERE</span>
             <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full border-r border-[#00C2FF]/30 shadow-inner z-20"></div>
             <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full border-l border-[#00C2FF]/30 shadow-inner z-20"></div>
        </div>

        {/* 하단 메시지 영역 */}
        <div className="p-5 pt-2 flex-1 flex flex-col justify-between">
          <div className="mb-4">
            <div className="text-[10px] font-mono tracking-[0.2em] text-[#00C2FF]/70 mb-2">MESSAGE</div>
            <p className="text-sm text-white/90 leading-relaxed break-keep font-medium">
              {ticket.message}
            </p>
          </div>

          <div>
             <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-[#00C2FF]/70 mb-1">FROM</div>
                  <div className="text-sm font-bold text-white truncate max-w-[80px]">{ticket.nickname}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono tracking-[0.2em] text-[#00C2FF]/70 mb-1">DATE</div>
                  <div className="text-xs font-mono text-white/70">{ticket.timestamp.split(' ')[0]}</div>
                </div>
             </div>
             <div className="pt-3 border-t border-[#00C2FF]/20">
                <div className="text-[#00C2FF]/50 opacity-80"><Barcode /></div>
             </div>
          </div>
        </div>

        {/* 홀로그램 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/5 via-transparent to-[#00C2FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
      </div>
    </div>
  );
};

// 메인 컴포넌트
const Guestbook = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [newTicketId, setNewTicketId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9);
  
  // ✨ [추가] 발권 중인지 확인하는 상태 (애니메이션 트리거)
  const [isPrinting, setIsPrinting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim() || !message.trim()) return;

    // 1. 발권 시작! (버튼 비활성화 & 스캔 애니메이션 시작)
    setIsPrinting(true);

    const now = new Date();
    const timestamp = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const maxId = messages.length > 0 ? Math.max(...messages.map(t => t.id)) : 0;
    const nextId = maxId + 1;

    const newTicket = {
      id: nextId,
      nickname: nickname.trim(),
      message: message.trim(),
      timestamp,
      seat: `VIP-${String(nextId).padStart(2, '0')}`,
    };

    // 2. 약간의 딜레이(1.2초) 후 티켓 "뿅" 하고 등장
    setTimeout(() => {
      setNewTicketId(newTicket.id);
      setMessages([newTicket, ...messages]);
      setNickname('');
      setMessage('');
      setIsPrinting(false); // 발권 끝

      // 3. 등장 애니메이션 끝난 후 ID 초기화
      setTimeout(() => setNewTicketId(null), 800);
    }, 1200); // 1.2초 동안 기계 돌아가는 척 함
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="w-full h-full flex flex-col bg-transparent text-white overflow-hidden">
      <style>{`
        @font-face {
          font-family: 'Neo';
          src: url('/neo.ttf') format('truetype');
        }
        @font-face {
          font-family: 'English';
          src: url('/english.ttf') format('truetype');
        }
        
        /* ✨ 티켓 출력 애니메이션 (위에서 아래로 미끄러져 내려옴) */
        @keyframes print-out {
          0% { 
            opacity: 0; 
            transform: translateY(-50px) scale(0.95); 
          }
          60% {
             opacity: 1;
             transform: translateY(10px) scale(1.02);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        .animate-print-out { 
          animation: print-out 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; 
        }

        /* ✨ 스캔 레이저 애니메이션 (입력창 위를 훑고 지나감) */
        @keyframes scan-light {
          0% { left: -50%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 150%; opacity: 0; }
        }
        .animate-scan {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          background: linear-gradient(90deg, transparent, rgba(0, 194, 255, 0.4), transparent);
          transform: skewX(-20deg);
          animation: scan-light 1.2s ease-in-out;
          pointer-events: none;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 194, 255, 0.3); border-radius: 4px; }
      `}</style>

      {/* 헤더 및 입력 폼 섹션 */}
      <div className="flex-none px-4 py-8">
        <div className="text-center mb-6">
          <div className="inline-block">
            <div className="text-[10px] md:text-xs tracking-[0.4em] text-[#00C2FF]/70 mb-1 font-['English']">
              TICKET OFFICE
            </div>
            <h1 className="text-2xl md:text-4xl tracking-tight drop-shadow-md font-['English']">
              <span className="text-white">16th Anniversary</span><span className="text-[#00C2FF]"> Message</span>
            </h1>
            <div className="text-xs md:text-sm text-white/50 mt-1 tracking-widest font-['English']">
              To. CNBLUE
            </div>
          </div>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto font-['Neo']">
          {/* ✨ overflow-hidden 추가: 스캔 빛이 밖으로 안 나가게 */}
          <div className="relative bg-gradient-to-r from-[#0a1628] via-[#0d1f3c] to-[#0a1628] border border-[#00C2FF]/40 rounded-lg p-5 shadow-[0_0_20px_rgba(0,194,255,0.15)] overflow-hidden">
            
            {/* ✨ 스캔 애니메이션 (isPrinting일 때만 나타남) */}
            {isPrinting && <div className="animate-scan"></div>}
            
            <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00C2FF] to-transparent opacity-60" />
            
            <div className="flex flex-col md:flex-row gap-4 items-end justify-center relative z-10">
              
              <div className="flex-none md:w-48 w-full text-center">
                <label className="block text-[10px] font-mono tracking-[0.2em] text-[#00C2FF]/70 mb-2">FROM</label>
                <input 
                  type="text" 
                  value={nickname} 
                  onChange={(e) => setNickname(e.target.value)} 
                  placeholder="BOICE" 
                  maxLength={10} 
                  disabled={isPrinting} // 발권 중엔 수정 불가
                  className="w-full bg-black/40 border border-[#00C2FF]/30 rounded px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00C2FF] transition-all text-center disabled:opacity-50" 
                />
              </div>

              <div className="flex-1 w-full text-center">
                <label className="block text-[10px] font-mono tracking-[0.2em] text-[#00C2FF]/70 mb-2">MESSAGE</label>
                <input 
                  type="text" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="축하 메시지를 남겨주세요!" 
                  maxLength={100} 
                  disabled={isPrinting} // 발권 중엔 수정 불가
                  className="w-full bg-black/40 border border-[#00C2FF]/30 rounded px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00C2FF] transition-all text-center disabled:opacity-50" 
                />
              </div>

              <div className="flex-none w-full md:w-auto">
                <button 
                  type="submit" 
                  disabled={!nickname.trim() || !message.trim() || isPrinting} 
                  className={`w-full px-8 py-3 bg-gradient-to-r ${isPrinting ? 'from-gray-700 to-gray-600' : 'from-[#00C2FF] to-[#0088cc]'} text-black font-bold text-sm tracking-wider rounded transition-all shadow-lg flex items-center justify-center gap-2`}
                >
                  {/* ✨ 버튼 텍스트 변경 */}
                  {isPrinting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      PRINTING...
                    </>
                  ) : (
                    'ISSUE'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 메시지 리스트 */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {messages.slice(0, visibleCount).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} isNew={ticket.id === newTicketId} />
            ))}
          </div>

          {messages.length > visibleCount && (
            <div className="text-center mt-10 mb-6">
              <button 
                onClick={handleLoadMore} 
                className="font-['Neo'] px-10 py-3 bg-black/40 border border-[#00C2FF]/30 rounded-full text-[#00C2FF] text-sm tracking-widest hover:bg-[#00C2FF]/10 hover:border-[#00C2FF] hover:shadow-[0_0_15px_rgba(0,194,255,0.3)] transition-all duration-300"
              >
                + LOAD MORE TICKETS
              </button>
            </div>
          )}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
};

export default Guestbook;