import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, onValue, runTransaction } from 'firebase/database';
import { Heart, Vote, Music, CheckCircle2 } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// 🎵 Track Vote Component (Firebase + Heart UI + 2 Selections)
// ═══════════════════════════════════════════════════════════════════════════════

// 트랙 데이터
const INITIAL_TRACKS = [
  { id: 1, title: "Ready, Set, Go!", titleKr: null },
  { id: 2, title: "Killer Joy", titleKr: null, isTitle: true },
  { id: 3, title: "Lowkey", titleKr: null },
  { id: 4, title: "To The Moon And Back", titleKr: null },
  { id: 5, title: "Bliss", titleKr: null },
  { id: 6, title: "그러나 꽃이었다", titleKr: "Still, a Flower" },
  { id: 7, title: "우리 다시 만나는 날", titleKr: "Again" },
  { id: 8, title: "기억의 온도", titleKr: "The Temperature of Memory" },
  { id: 9, title: "사소한 것들이 좋아서", titleKr: "Little Things" },
  { id: 10, title: "인생찬가", titleKr: "Anthem of Life" },
];

// ✨ 커스텀 하트 체크박스 컴포넌트
const CustomCheckbox = ({ checked, disabled }) => {
  return (
    <div className={`
      relative w-6 h-6 rounded-full border-2 transition-all duration-300 flex items-center justify-center shrink-0
      ${checked
        ? 'bg-white border-white'
        : disabled
          ? 'border-white/10 cursor-not-allowed'
          : 'border-white/40 group-hover:border-white/80'
      }
    `}>
      {checked && (
        <Heart size={12} className="text-black fill-black animate-scale-in" />
      )}
    </div>
  );
};

const TrackVote = ({ tracklistImage }) => {
  const [tracks, setTracks] = useState(INITIAL_TRACKS.map(t => ({ ...t, votes: 0 })));
  const [selectedTracks, setSelectedTracks] = useState([]); // 선택한 트랙 ID들
  const [hasVoted, setHasVoted] = useState(false); // 투표 여부
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_SELECTIONS = 2; // ✨ 최대 2개 선택

  // 1. 파이어베이스 데이터 실시간 동기화
  useEffect(() => {
    const tracksRef = ref(database, 'tracks');
    const unsubscribe = onValue(tracksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTracks(prevTracks => prevTracks.map(track => ({
          ...track,
          votes: data[track.id] || 0
        })));
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. 트랙 선택/해제 핸들러
  const handleToggle = (id) => {
    if (hasVoted) return; // 이미 투표했으면 클릭 금지

    setSelectedTracks(prev => {
      // 이미 선택된거면 해제
      if (prev.includes(id)) {
        return prev.filter(trackId => trackId !== id);
      }
      // 선택 안 된거고, 갯수 여유 있으면 추가
      if (prev.length < MAX_SELECTIONS) {
        return [...prev, id];
      }
      return prev; // 꽉 찼으면 무시
    });
  };

  // 3. 투표 전송 핸들러 (Firebase Transaction)
  const handleSubmitVote = async () => {
    if (selectedTracks.length === 0) return;
    setIsSubmitting(true);

    // 선택한 트랙들 각각 투표수 +1
    const updates = selectedTracks.map(id => {
      const voteRef = ref(database, `tracks/${id}`);
      return runTransaction(voteRef, (currentVotes) => (currentVotes || 0) + 1);
    });

    try {
      await Promise.all(updates); // 모든 업데이트가 끝날 때까지 대기
      setHasVoted(true);
      // 로컬스토리지에 저장 (새로고침해도 투표 완료 상태 유지하려면 주석 해제)
      // localStorage.setItem('hasVoted', 'true');
    } catch (error) {
      console.error("투표 실패:", error);
      alert("투표 중 오류가 발생했습니다 ㅠㅠ");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 총 투표수 계산 (퍼센트 바용)
  const totalVotes = tracks.reduce((acc, curr) => acc + curr.votes, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-5xl mx-auto items-start">
      {/* 🟢 왼쪽: 트랙리스트 이미지 */}
      <div className="relative shadow-2xl border border-white/20 rounded-lg overflow-hidden group aspect-[3/4] md:aspect-auto md:h-[70vh]">
        <img
          src={tracklistImage}
          alt="Track List"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 text-white/50 font-mono text-xs tracking-widest">
          CNBLUE 3RD FULL ALBUM [3LOGY]
        </div>
      </div>

      {/* 🟢 오른쪽: 투표 패널 */}
      <div className="flex flex-col h-auto md:h-[70vh] min-h-0">
        
        {/* 헤더 */}
        <div className="mb-4 shrink-0 text-center md:text-left">
          <p className="text-[#00C2FF] font-mono text-xs tracking-[0.3em] mb-1 animate-pulse">
            {hasVoted ? 'VOTING RESULTS' : `SELECT UP TO ${MAX_SELECTIONS} SONGS`}
          </p>
          <h2 className="text-3xl md:text-4xl font-['Wild'] text-white">
            {hasVoted ? "BOICE'S CHOICE" : "WHICH IS YOUR PICK?"}
          </h2>
        </div>

        {/* 리스트 영역 */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
          {tracks.map((track, index) => {
            const isSelected = selectedTracks.includes(track.id);
            const isMaxReached = selectedTracks.length >= MAX_SELECTIONS;
            const isDisabled = !isSelected && isMaxReached;
            const percent = totalVotes > 0 ? (track.votes / totalVotes) * 100 : 0;

            return (
              <div
                key={track.id}
                onClick={() => handleToggle(track.id)}
                className={`
                  relative group p-3 rounded-lg border transition-all duration-300
                  ${hasVoted
                    ? 'border-transparent bg-white/5'
                    : isSelected
                      ? 'bg-white/10 border-white/50'
                      : isDisabled
                        ? 'border-white/5 opacity-50 cursor-not-allowed'
                        : 'border-white/10 hover:border-white/30 hover:bg-white/5 cursor-pointer'
                  }
                `}
              >
                {/* 투표 결과 배경 바 */}
                {hasVoted && (
                  <div
                    className="absolute inset-y-0 left-0 bg-[#00C2FF]/10 rounded-lg transition-all duration-1000"
                    style={{ width: `${percent}%` }}
                  />
                )}

                <div className="relative flex items-center justify-between z-10 gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* 1. 번호 */}
                    <span className={`font-mono text-sm w-5 shrink-0 ${isSelected || hasVoted ? 'text-[#00C2FF]' : 'text-white/30'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* 2. 하트 체크박스 */}
                    {!hasVoted && (
                      <div className="shrink-0">
                        <CustomCheckbox checked={isSelected} disabled={isDisabled} />
                      </div>
                    )}

                    {/* 3. 곡 정보 */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className={`
                          font-['Godic'] text-sm truncate transition-colors
                          ${isSelected ? 'text-white font-bold' : 'text-white/70'}
                        `}>
                          {track.title}
                        </span>
                        {track.isTitle && (
                          <span className="px-1 py-0.5 rounded bg-white text-black text-[9px] font-bold leading-none shrink-0">
                            TITLE
                          </span>
                        )}
                      </div>
                      {track.titleKr && (
                        <span className="text-white/40 text-xs truncate font-light">
                          {track.titleKr}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 4. 우측 정보 */}
                  <div className="shrink-0">
                    {hasVoted ? (
                      <div className="text-right">
                        <span className="text-[#00C2FF] font-bold font-mono text-sm block">
                          {track.votes}
                        </span>
                        <span className="text-white/30 text-[10px] font-mono">
                          {percent.toFixed(1)}%
                        </span>
                      </div>
                    ) : (
                      <Music
                        size={14}
                        className={`transition-opacity duration-300 ${isSelected ? 'text-[#00C2FF] opacity-100' : 'text-white/20 opacity-0 group-hover:opacity-100'}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 하단 투표 버튼 */}
        {!hasVoted && (
          <div className="mt-4 pt-4 border-t border-white/10 shrink-0">
            <button
              onClick={handleSubmitVote}
              disabled={selectedTracks.length === 0 || isSubmitting}
              className={`
                w-full py-4 font-['Wild'] text-xl tracking-widest transition-all duration-300 flex items-center justify-center gap-2 rounded
                ${selectedTracks.length > 0
                  ? 'bg-white text-black hover:bg-[#00C2FF] hover:text-white hover:scale-[1.02] shadow-lg shadow-white/10'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                "..."
              ) : (
                <>
                  <Vote size={20} />
                  VOTE ({selectedTracks.length}/{MAX_SELECTIONS})
                </>
              )}
            </button>
          </div>
        )}

        {/* 투표 완료 메시지 */}
        {hasVoted && (
          <div className="mt-4 pt-4 border-t border-white/10 text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 text-[#00C2FF] mb-2">
              <CheckCircle2 size={16} />
              <span className="font-['Godic'] font-bold text-sm">COMPLETED</span>
            </div>
            <p className="text-white/40 text-xs font-light">
              참여해 주셔서 감사합니다!
            </p>
          </div>
        )}
      </div>
      
      {/* CSS Animation for Heart */}
      <style>{`
        @keyframes scale-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TrackVote;