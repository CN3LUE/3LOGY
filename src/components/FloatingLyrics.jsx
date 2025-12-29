import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

const lyricsData = [
  { text: "I mean\nI don’t want it to fade away", type: "gothic" },
  { text: "얼룩진 달의 그림자라도", type: "moon" }, 
  { text: "흐르는 시간 속에", type: "brush" },
  { text: "한 번 더\nTrigger Rush", type: "gothic" },
  { text: "오늘 밤을 우리 밤을", type: "brush" },
  { text: "거친 길에 불빛 하나도 없던", type: "gothic" },
  { text: "C' mon now, hear your voice", type: "gothic" },
  // ▼▼▼ [변경 포인트 1] 여기 type을 "nanum"으로 변경! ▼▼▼
  { text: "하루 종일 떠나지 않는 너일까", type: "nanum" },
  { text: "사랑이란 불씨만 남아", type: "brush" },
  { text: "껴안은 채 버텨", type: "gothic" }
];

const FloatingLyrics = () => {
  const constraintsRef = useRef(null);

  const floatingItems = useMemo(() => {
    return lyricsData.map((item, index) => ({
      ...item,
      id: index,
      top: Math.random() * 60 + 20,
      left: Math.random() * 60 + 20,
      duration: Math.random() * 20 + 25,
      moveX: [0, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400, 0],
      moveY: [0, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400, 0],
      rotate: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, 0],
    }));
  }, []);

  const getStylesByType = (type) => {
    switch (type) {
      case 'brush': // Wild (거친 붓글씨)
        return {
          className: 'font-["Wild"] text-white/90 tracking-wider',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          textShadow: '2px 4px 6px rgba(0,0,0,0.8)'
        };
      case 'moon': // Moon (달빛 포인트)
        return {
          className: 'font-["Moon"] text-white/95 tracking-widest font-normal',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          textShadow: '0px 0px 10px rgba(255,255,255,0.3)'
        };
      // ▼▼▼ [변경 포인트 2] nanum 스타일 추가! ▼▼▼
      case 'nanum': 
        return {
          className: 'font-["Nanum"] text-white/90 tracking-widest font-normal',
          fontSize: 'clamp(1.2rem, 3vw, 2.4rem)', // 붓글씨와 비슷한 크기감
          textShadow: '1px 1px 3px rgba(0,0,0,0.5)' // 깔끔한 그림자
        };
      default: // gothic (기본)
        return {
          className: 'font-["Godic"] font-normal text-white/80 tracking-widest',
          fontSize: 'clamp(1rem, 2vw, 1.8rem)',
          textShadow: 'none'
        };
    }
  };

  return (
    <motion.div 
      ref={constraintsRef} 
      className="absolute inset-0 overflow-hidden z-10"
    >
      {floatingItems.map((item) => {
        const styles = getStylesByType(item.type);

        return (
          <motion.div
            key={item.id}
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            className="absolute cursor-grab active:cursor-grabbing hover:z-50"
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
            }}
            whileDrag={{ scale: 1.1 }}
          >
            <motion.div
              animate={{
                x: item.moveX,
                y: item.moveY,
                rotate: item.rotate,
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "mirror"
              }}
              // CSS 클래스와 인라인 스타일 적용
              className={`whitespace-pre text-center mix-blend-screen select-none ${styles.className}`}
              style={{
                fontSize: styles.fontSize,
                textShadow: styles.textShadow,
              }}
            >
              {item.text}
            </motion.div>
          </motion.div>
        );
      })}
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)] opacity-40 pointer-events-none" />
    </motion.div>
  );
};

export default FloatingLyrics;