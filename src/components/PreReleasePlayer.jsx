import React from 'react';

const PreReleasePlayer = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-10 md:justify-center bg-black/90 p-4 md:p-10 overflow-y-auto">
      
      {/* 닫기 안내 */}
      <div className="text-white/50 mb-4 font-['Neo'] text-sm">
        ▼ 영상이 자동으로 재생됩니다
      </div>

      {/* 유튜브 플레이어 컨테이너 */}
      <div className="relative w-full max-w-5xl aspect-video shadow-[0_0_50px_rgba(0,194,255,0.2)] rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/YgwGBgZEKaM?autoplay=1&rel=0"
          title="CNBLUE (씨엔블루) ‘그러나 꽃이었다 (Still, a Flower)' LYRIC VIDEO"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      </div>
      
      {/* 곡 제목 (여백 유지) */}
      <h2 className="text-white mt-16 mb-8 text-2xl md:text-3xl font-['English'] tracking-wider text-center">
        그러나 꽃이었다 (Still, a Flower)
      </h2>

      {/* ✨ [디자인  수정] 투명한 흰색 박스 적용 ✨
          - bg-white/50: 아주 연한(10% 투명도) 흰색 배경
          - backdrop-blur-md: 배경을 흐리게 해서 유리 같은 느낌
          - border-white/20: 테두리도 흰색으로 맞춰줌
          - text-white/90: 글자색을 밝게 해서 가독성 높임
      */}
      <div className="max-w-3xl text-white/90 font-['Neo'] text-sm md:text-base leading-relaxed space-y-6 text-justify break-keep pb-8 border border-white/20 rounded-xl p-8 md:p-10 bg-white/10 backdrop-blur-md mb-20 mx-4 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
        <p>
          선공개 곡 ‘그러나 꽃이었다 (Still, a Flower)’는 아날로그 신시사이저와 깊이감이 느껴지는 기타 사운드가 어우러진 모던 록 트랙으로, 
          따스하게 번지는 화음 위로 섬세한 감정선을 담은 정용화의 보컬이 잔잔한 위로를 전한다. 
          상처와 어둠 속에서도 다시 피어나는 꽃처럼, 서늘한 현실 속에서도 끝내 자신만의 향기를 되찾는 순간의 찬란함을 표현했다.
        </p>
        <p>
          ‘그러나 꽃이었다 (Still, a Flower)’는 정규 3집 ‘3LOGY’의 타이틀곡과는 완전히 다른 무드의 곡으로, 정용화가 작사와 작곡에 참여했다. 
          풍성하게 채워지는 밴드 사운드와 정용화의 섬세한 보컬이 어우러지며 씨엔블루만의 깊이 있는 감성이 선명하게 드러난다.
        </p>
        <p>
          정용화는 가사에 담긴 따뜻한 위로의 메시지가 리스너들에게 온전히 전달되길 바라는 마음을 담았다. 
          특히 새해를 맞아, 각자의 자리에서 버텨 온 이들에게 진심 어린 위로를 건네고자 했다. 
          ‘그러나 꽃이었다 (Still, a Flower)’는 조용히 담담하게 듣는 이의 마음을 어루만진다.
        </p>
      </div>
    </div>
  );
};

export default PreReleasePlayer;