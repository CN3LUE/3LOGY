import React from 'react';

const PreReleasePlayer = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 p-4 md:p-10">
      {/* 닫기 안내 (선택사항) */}
      <div className="text-white/50 mb-4 font-['Neo'] text-sm">
        ▼ 영상이 자동으로 재생됩니다
      </div>

      {/* 유튜브 플레이어 컨테이너 */}
      <div className="relative w-full max-w-5xl aspect-video shadow-[0_0_50px_rgba(0,194,255,0.2)] rounded-xl overflow-hidden border border-white/10">
        <iframe
          width="100%"
          height="100%"
          // ✨ 여기에 요청하신 영상 링크를 넣었습니다 (autoplay=1: 자동재생)
          src="https://www.youtube.com/embed/YgwGBgZEKaM?autoplay=1&rel=0"
          title="CNBLUE (씨엔블루) ‘그러나 꽃이었다 (Still, a Flower)' LYRIC VIDEO"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
      
      <h2 className="text-white mt-6 text-xl md:text-2xl font-['English'] tracking-wider">
        Still, a Flower
      </h2>
    </div>
  );
};

export default PreReleasePlayer;