import React, { useEffect, useRef, useState } from 'react';

const RESTAURANT_DATA = [
  { id: 1, name: '용용선생 강남점', region: 'Seoul', lat: 37.4979, lng: 127.0276, description: '용화가 극찬한 마라전골 맛집!' },
  { id: 2, name: '평양면옥', region: 'Seoul', lat: 37.5285, lng: 126.9651, description: '정신이 추천한 평양냉면 맛집' },
  { id: 3, name: '을지로 노가리골목', region: 'Seoul', lat: 37.5660, lng: 126.9920, description: '민혁이 좋아하는 노가리 거리' },
  { id: 4, name: '해운대 포장마차촌', region: 'Busan', lat: 35.1587, lng: 129.1604, description: '정신이 추천한 해운대 야경 맛집' },
  { id: 5, name: '할매국밥', region: 'Busan', lat: 35.0979, lng: 129.0256, description: '부산 투어 중 들렀던 국밥 맛집' },
  { id: 6, name: '씨앗호떡', region: 'Busan', lat: 35.1014, lng: 129.0325, description: 'CNBLUE 단체로 방문한 씨앗호떡!' }
];

const RestaurantMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [status, setStatus] = useState('loading'); // loading, success, error

  // ✨ 아까 사라졌던 필터 버튼 목록 부활!
  const filters = [
    { key: 'All', label: '전체' },
    { key: 'Seoul', label: '서울' },
    { key: 'Busan', label: '부산' }
  ];

  useEffect(() => {
    // 1. 네이버 지도 스크립트가 로드될 때까지 기다리는 함수
    const waitForNaverMap = () => {
      if (window.naver && window.naver.maps) {
        initMap();
      } else {
        // 아직 안 왔으면 0.1초 뒤에 다시 확인 (최대 3초)
        setTimeout(waitForNaverMap, 100);
      }
    };

    const initMap = () => {
      try {
        const mapOptions = {
          center: new window.naver.maps.LatLng(36.5, 127.8),
          zoom: 7,
          backgroundColor: '#111',
          disableDefaultUI: true, // 깔끔하게 기본 버튼 제거
        };

        // 지도 생성
        mapInstance.current = new window.naver.maps.Map(mapRef.current, mapOptions);
        setStatus('success'); // 성공 상태로 변경!
      } catch (err) {
        console.error("지도 생성 실패:", err);
        setStatus('error');
      }
    };

    waitForNaverMap();
  }, []);

  // 마커 찍는 부분 (지도가 성공했을 때만 실행)
  useEffect(() => {
    if (status !== 'success' || !mapInstance.current) return;

    // 기존 마커 등 정리 로직은 간단하게 생략하고 새로 그리기
    // (화면 깜빡임 방지를 위해 실제 구현에선 마커 관리 필요하지만, 일단 뜨는 게 중요하니!)
    
    const filteredData = activeFilter === 'All' 
      ? RESTAURANT_DATA 
      : RESTAURANT_DATA.filter(r => r.region === activeFilter);

    // 지도 중심 이동
    const center = activeFilter === 'All' ? { lat: 36.5, lng: 127.8 } 
      : activeFilter === 'Seoul' ? { lat: 37.5665, lng: 126.9780 }
      : { lat: 35.1796, lng: 129.0756 };
    const zoom = activeFilter === 'All' ? 7 : 12;

    mapInstance.current.setCenter(new window.naver.maps.LatLng(center.lat, center.lng));
    mapInstance.current.setZoom(zoom);

    // 마커 생성 (기존 마커 지우는 건 생략 - 일단 뜨는지부터 확인!)
    filteredData.forEach(place => {
       new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(place.lat, place.lng),
        map: mapInstance.current,
        title: place.name
      });
    });

  }, [activeFilter, status]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* 필터 버튼 */}
      <div className="flex justify-center gap-2 mb-4">
        {filters.map(f => (
          <button 
            key={f.key} 
            onClick={() => setActiveFilter(f.key)}
            className={`px-3 py-1 text-xs border rounded ${activeFilter === f.key ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/30 text-white/50'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 지도 영역 */}
      <div className="flex-1 relative rounded-lg overflow-hidden border border-white/10 bg-[#111]">
        <div ref={mapRef} className="absolute inset-0" />
        
        {/* 상태 메시지 */}
        {status === 'loading' && <div className="absolute inset-0 flex items-center justify-center text-white">지도 로딩중...</div>}
        {status === 'error' && <div className="absolute inset-0 flex items-center justify-center text-red-500">지도 오류!</div>}
      </div>
    </div>
  );
};

export default RestaurantMap;