/**
 * Global Stock & Market Hub (YouTube + Major Economic News Reports)
 * 순수 JavaScript로 동작하는 증시 영상 및 실제 경제신문/증권 리포트 큐레이션 시스템
 */

// ==========================================
// 1. 초기 큐레이션 데이터 (유튜브 영상)
// ==========================================
const INITIAL_VIDEOS = [
  {
    id: "us-1",
    youtubeId: "V5d9pU-y6_4",
    title: "[미국증시 마감 브리핑] 뉴욕증시 3대 지수 흐름 & 엔비디아·빅테크 실적 관전 포인트",
    channel: "삼프로TV 경제의신과함께",
    market: "us",
    category: "closing",
    date: "2026-10-19",
    duration: "18:24",
    description: "간밤 뉴욕증시 주요 지표 점검 및 연준(Fed) 금리 정책 전망, 매그니피센트 7 빅테크 실적 시즌 주요 변수 분석.",
    tags: ["미국증시", "나스닥", "S&P500", "엔비디아", "빅테크"]
  },
  {
    id: "kr-1",
    youtubeId: "vBqO_6QnL1s",
    title: "[국내증시 오전 라이브] 코스피 공방 & 반도체·2차전지 외국인 수급 분석",
    channel: "한국경제TV",
    market: "kr",
    category: "opening",
    date: "2026-10-20",
    duration: "25:10",
    description: "오늘 장 초반 국내 증시 수급 상황 점검. 삼성전자, SK하이닉스 및 주요 테마주 외국인/기관 매매 동향 체크.",
    tags: ["국내증시", "코스피", "코스닥", "삼성전자", "외국인수급"]
  },
  {
    id: "us-2",
    youtubeId: "wN6pYc4tE6E",
    title: "미국 CPI 물가 지표 발표 후 증시 방향성 총정리 (S&P500, 나스닥 선물)",
    channel: "슈카월드",
    market: "us",
    category: "macro",
    date: "2026-10-18",
    duration: "22:45",
    description: "미국 인플레이션 지표와 국채 금리 급등락이 주식 시장과 달러 환율에 미치는 파급 효과를 알기 쉽게 해설합니다.",
    tags: ["CPI", "금리", "연준", "달러환율", "거시경제"]
  },
  {
    id: "kr-2",
    youtubeId: "Y8E_Hl5b9gA",
    title: "오늘의 코스피·코스닥 장마감 시황 | K-반도체와 밸류업 프로그램 수혜주",
    channel: "이리온 스튜디오",
    market: "kr",
    category: "closing",
    date: "2026-10-19",
    duration: "15:30",
    description: "기업 밸류업 프로그램 및 배당 확대 수혜 금융/지주사 동향, 코스닥 테마별 순환매 장세 전략 요약.",
    tags: ["장마감", "밸류업", "코스피", "배당주", "주식전략"]
  },
  {
    id: "both-1",
    youtubeId: "k0VXZm7138U",
    title: "한미 증시 동조화와 디커플링: 환율 변동성 속 투자 포트폴리오 대응법",
    channel: "달란트투자",
    market: "both",
    category: "strategy",
    date: "2026-10-17",
    duration: "19:12",
    description: "원/달러 환율 변동성에 따른 서학개미와 국내 투자자의 자산 배분 비법. 미국 배당 ETF vs 국내 고배당주 비교.",
    tags: ["환율", "자산배분", "미국주식", "국내주식", "ETF"]
  },
  {
    id: "us-3",
    youtubeId: "1p0mRzB3tO0",
    title: "월가 헤지펀드 거물들의 최신 포트폴리오 공개! 13F 보고서 심층 분석",
    channel: "소수몽키",
    market: "us",
    category: "analysis",
    date: "2026-10-16",
    duration: "16:40",
    description: "워런 버핏의 버크셔 해서웨이와 글로벌 기관들이 최근 매집하거나 처분한 미국 유망 종목 리스트 정리.",
    tags: ["워런버핏", "13F", "미국주식", "월가", "가치투자"]
  },
  {
    id: "kr-3",
    youtubeId: "P_z-3A7Ff6E",
    title: "K-배터리와 바이오 섹터 바닥 쳤나? 하반기 국내 주도주 후보 3가지",
    channel: "머니투데이 방송 MTN",
    market: "kr",
    category: "analysis",
    date: "2026-10-18",
    duration: "21:05",
    description: "2차전지 및 바이오 섹터의 밸류에이션 점검과 턴어라운드 신호, 증권가 애널리스트 실적 컨센서스 정리.",
    tags: ["2차전지", "바이오", "유망주", "애널리스트", "투자전략"]
  },
  {
    id: "both-2",
    youtubeId: "M1fC-9OeqeM",
    title: "글로벌 유동성과 비트코인·금·주식 시장 상관관계 완벽 분석",
    channel: "신사임당 / 디스커버리",
    market: "both",
    category: "macro",
    date: "2026-10-15",
    duration: "28:15",
    description: "달러 인덱스, 금값 신고가, 글로벌 M2 유동성 지표로 보는 글로벌 자산 시장의 현재 사이클 진단.",
    tags: ["거시경제", "금", "원자재", "비트코인", "자산시장"]
  }
];

// ==========================================
// 2. 초기 큐레이션 데이터 (실제 경제지 리포트 허브 & 실시간 링크)
// ==========================================
const INITIAL_REPORTS = [
  {
    id: "rep-kr-1",
    source: "한국경제 (Hankyung Consensus)",
    title: "[한경 컨센서스] 삼성전자 및 반도체 증권사 리포트 종합 (실적 추정치 & 목표주가)",
    market: "kr",
    category: "analysis",
    date: "2026-10-20",
    link: "https://markets.hankyung.com/consensus",
    highlights: [
      "국내 주요 증권사(KB, 미래에셋, NH 등)의 삼성전자 실적 컨센서스 실시간 제공",
      "HBM 수급 동향, 파운드리 수율 및 범용 D램 판가 전망 보고서 열람 가능",
      "애널리스트 목표주가 컨센서스 및 투자의견(Buy/Hold) 변동 추이 요약"
    ],
    fullBody: `<h4>1. 한경 컨센서스 실시간 리포트 서비스 안내</h4>
한국경제 '한경코리아마켓 컨센서스'는 국내 증권사 리서치센터에서 발간하는 종목 및 산업 분석 리포트 원문을 무료로 열람하고 PDF로 다운로드할 수 있는 공식 금융 허브입니다.

<h4>2. 핵심 반도체 관전 포인트</h4>
삼성전자와 SK하이닉스를 둘러싼 AI 메모리(HBM3E, HBM4) 공급 경쟁과 서버용 D램 계약 가격 흐름, 그리고 외국인/기관 수급 분석 보고서를 실시간으로 확인하실 수 있습니다.

<h4>3. 원문 열람 안내</h4>
하단 '원문 기사/리포트 열람' 버튼을 클릭하시면 한경 컨센서스 공식 리포트 센터로 이동하여 최신 전문을 보실 수 있습니다.`,
    tags: ["한국경제", "한경컨센서스", "삼성전자", "반도체", "증권사리포트"]
  },
  {
    id: "rep-kr-2",
    source: "네이버페이 증권 (Research)",
    title: "[네이버페이 증권 리서치] 코스피·코스닥 시황 및 기업별 애널리스트 분석 리포트 모음",
    market: "kr",
    category: "opening",
    date: "2026-10-20",
    link: "https://finance.naver.com/research/",
    highlights: [
      "대신·신한·하나·키움 등 국내 전 증권사 일일 모닝 브리핑 및 주간 시황 리포트",
      "기업분석, 산업분석, 시황정보, 경제분석 카테고리별 실시간 PDF 제공",
      "코스피/코스닥 당일 수급 주체별 매매 동향과 특징주 브리핑"
    ],
    fullBody: `<h4>1. 네이버페이 증권 리서치 센터 개요</h4>
국내 투자자들이 가장 많이 참고하는 공신력 있는 리포트 플랫폼으로, 매일 아침 장 개장 전 발간되는 주요 증권사의 모닝 브리핑 리포트를 한 번에 확인하실 수 있습니다.

<h4>2. 시황 및 밸류업 프로그램 체크</h4>
정부의 기업 밸류업 지수 리밸런싱, 금융지주사 및 배당 유망주에 관한 애널리스트들의 심층 의견을 무료로 열람 가능합니다.`,
    tags: ["네이버증권", "모닝브리핑", "기업분석", "코스피시황", "국내증시"]
  },
  {
    id: "rep-kr-3",
    source: "매일경제 (Maeil Business)",
    title: "[매경 증권 레이더] 국내 증시 실시간 시황 및 마켓 뉴스 종합 브리핑",
    market: "kr",
    category: "closing",
    date: "2026-10-19",
    link: "https://www.mk.co.kr/news/stock",
    highlights: [
      "여의도 증권가 장마감 분석 및 섹터별 순환매 자금 흐름 점검",
      "외국인/기관 순매수 상위 종목 및 코스피 밸류에이션 점검",
      "2차전지, 바이오, 방산 등 주요 테마별 급등락 요인 브리핑"
    ],
    fullBody: `<h4>1. 매일경제 증권 데스크 실시간 속보</h4>
매일경제 증권 섹션의 핵심 기사로, 오늘 장 마감 후 발표된 주요 공시와 외국인 매매 동향, 코스피/코스닥 시장의 주요 수급 분석 기사를 제공합니다.

<h4>2. 특징주 및 테마 진단</h4>
실적 시즌 어닝 서프라이즈 종목과 저평가 지주사들의 주주환원 정책을 다룬 심층 기사를 확인하실 수 있습니다.`,
    tags: ["매일경제", "증권뉴스", "장마감", "특징주", "수급분석"]
  },
  {
    id: "rep-us-1",
    source: "월스트리트저널 (WSJ Markets)",
    title: "[WSJ 미국증시 리포트] 뉴욕증시 S&P 500 & 나스닥 지수 흐름 및 빅테크 실적 관전평",
    market: "us",
    category: "closing",
    date: "2026-10-19",
    link: "https://www.wsj.com/market-data",
    highlights: [
      "월가 주요 지수(S&P 500, Dow, Nasdaq) 마감 시황 및 미국채 10년물 금리 동향",
      "애플, 엔비디아, 마이크로소프트 등 M7 빅테크 실적 발표 전후 시장 반응",
      "연준(Fed) 기준금리 인하 경로에 대한 글로벌 투자은행(IB)들의 전망"
    ],
    fullBody: `<h4>1. WSJ Market Data 실시간 개요</h4>
세계 최대 경제지 월스트리트저널(Wall Street Journal)의 금융 시장 데이터 센터로, 뉴욕증시 주요 지수, 미 국채 수익률, 원자재 및 달러 인덱스 현황을 제공합니다.

<h4>2. 글로벌 매크로 분석</h4>
미국 경제 연착륙(Soft Landing) 기대와 기술주 밸류에이션 부담에 관한 월가 전문가들의 정밀 리포트를 제공합니다.`,
    tags: ["WSJ", "미국증시", "S&P500", "나스닥", "빅테크"]
  },
  {
    id: "rep-us-2",
    source: "블룸버그 (Bloomberg Markets)",
    title: "[블룸버그 글로벌 마켓] 미 국채 금리와 달러 인덱스 변동성 & 글로벌 유동성 진단",
    market: "us",
    category: "macro",
    date: "2026-10-18",
    link: "https://www.bloomberg.com/markets",
    highlights: [
      "미국 10년물 국채 금리 및 달러 강세에 따른 아시아 신흥국 통화 파급효과",
      "글로벌 원자재(WTI 원유, 금 신고가) 및 M2 유동성 동향 진단",
      "월가 헤지펀드 및 대형 자산운용사의 자산 배분(Asset Allocation) 전략"
    ],
    fullBody: `<h4>1. 블룸버그 글로벌 마켓 인텔리전스</h4>
전 세계 금융 기관과 트레이더들이 가장 많이 참고하는 블룸버그의 글로벌 마켓 종합 페이지입니다.

<h4>2. 환율 및 금리 동향</h4>
원/달러 환율과 엔/달러 환율, 그리고 연준의 통화 정책 회의(FOMC) 전망에 관한 실시간 글로벌 인사이트를 확인하실 수 있습니다.`,
    tags: ["블룸버그", "거시경제", "국채금리", "달러인덱스", "환율"]
  }
];

// ==========================================
// 3. 로컬스토리지 관리
// ==========================================
const VIDEO_STORAGE_KEY = 'ytube_market_videos_data_v3';
const REPORT_STORAGE_KEY = 'ytube_market_reports_data_v3';

function getStoredVideos() {
  const saved = localStorage.getItem(VIDEO_STORAGE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { console.error(e); }
  }
  return INITIAL_VIDEOS;
}

function saveStoredVideos(videos) {
  localStorage.setItem(VIDEO_STORAGE_KEY, JSON.stringify(videos));
}

function getStoredReports() {
  const saved = localStorage.getItem(REPORT_STORAGE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { console.error(e); }
  }
  return INITIAL_REPORTS;
}

function saveStoredReports(reports) {
  localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(reports));
}

// ==========================================
// 4. 상태 관리
// ==========================================
let currentViewMode = 'videos'; // 'videos' | 'reports'
let currentMarket = 'all';      // 'all' | 'us' | 'kr'
let currentCategory = 'all';    // 'all' | 'closing' | 'opening' | 'macro' | 'analysis' | 'strategy'
let searchQuery = '';
let currentSort = 'latest';     // 'latest' | 'title'

// ==========================================
// 5. DOM 요소 참조
// ==========================================
const mainContentGrid = document.getElementById('mainContentGrid');
const modeBtnVideos = document.getElementById('modeBtnVideos');
const modeBtnReports = document.getElementById('modeBtnReports');
const videoCountBadge = document.getElementById('videoCountBadge');
const reportCountBadge = document.getElementById('reportCountBadge');
const resultCountLabel = document.getElementById('resultCountLabel');
const addBtnText = document.getElementById('addBtnText');

const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const marketTabs = document.querySelectorAll('.market-tab-btn');
const categoryTags = document.querySelectorAll('.tag-btn');
const sortSelect = document.getElementById('sortSelect');

// 모달 요소 (비디오)
const playerModal = document.getElementById('playerModal');
const playerFrame = document.getElementById('playerFrame');
const modalTitle = document.getElementById('modalTitle');
const modalChannel = document.getElementById('modalChannel');
const modalDesc = document.getElementById('modalDesc');
const modalYtLink = document.getElementById('modalYtLink');
const closePlayerBtn = document.getElementById('closePlayerBtn');

// 모달 요소 (리포트)
const reportDetailModal = document.getElementById('reportDetailModal');
const reportModalTitle = document.getElementById('reportModalTitle');
const reportModalSource = document.getElementById('reportModalSource');
const reportModalMarket = document.getElementById('reportModalMarket');
const reportModalDate = document.getElementById('reportModalDate');
const reportModalBody = document.getElementById('reportModalBody');
const reportOriginalLink = document.getElementById('reportOriginalLink');
const closeReportModalBtn = document.getElementById('closeReportModalBtn');

// 모달 요소 (등록 폼)
const addModal = document.getElementById('addModal');
const openAddModalBtn = document.getElementById('openAddModalBtn');
const closeAddModalBtn = document.getElementById('closeAddModalBtn');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const addCustomForm = document.getElementById('addCustomForm');
const addTypeSelect = document.getElementById('addTypeSelect');
const contentUrlLabel = document.getElementById('contentUrlLabel');
const contentAuthorLabel = document.getElementById('contentAuthorLabel');

// ==========================================
// 6. 데이터 필터링 및 렌더링
// ==========================================
function updateBadges() {
  const videos = getStoredVideos();
  const reports = getStoredReports();
  videoCountBadge.textContent = videos.length;
  reportCountBadge.textContent = reports.length;
}

function renderContent() {
  updateBadges();

  let list = currentViewMode === 'videos' ? getStoredVideos() : getStoredReports();

  // 1. 시장 필터
  if (currentMarket !== 'all') {
    list = list.filter(item => item.market === currentMarket || item.market === 'both');
  }

  // 2. 카테고리 필터
  if (currentCategory !== 'all') {
    list = list.filter(item => item.category === currentCategory);
  }

  // 3. 검색 필터
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(item => {
      const titleMatch = item.title && item.title.toLowerCase().includes(q);
      const authorMatch = (item.channel || item.source || '').toLowerCase().includes(q);
      const descMatch = (item.description || item.fullBody || '').toLowerCase().includes(q);
      const tagMatch = item.tags && item.tags.some(t => t.toLowerCase().includes(q));
      const highlightMatch = item.highlights && item.highlights.some(h => h.toLowerCase().includes(q));
      return titleMatch || authorMatch || descMatch || tagMatch || highlightMatch;
    });
  }

  // 4. 정렬
  if (currentSort === 'latest') {
    list.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (currentSort === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  // 카운트 표시 업데이트
  const typeText = currentViewMode === 'videos' ? '유튜브 증시 영상' : '경제신문 리포트';
  resultCountLabel.innerHTML = `총 <strong>${list.length}</strong>개의 ${typeText}이(가) 있습니다.`;

  // 데이터가 없을 때 빈 화면
  if (list.length === 0) {
    mainContentGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📰</div>
        <div class="empty-text">조건에 일치하는 ${typeText}이 없습니다.</div>
        <div class="empty-subtext">검색어를 수정하거나 다른 시장/카테고리 탭을 선택해보세요.</div>
      </div>
    `;
    return;
  }

  // 뷰 모드에 따른 HTML 생성
  if (currentViewMode === 'videos') {
    renderVideosGrid(list);
  } else {
    renderReportsGrid(list);
  }
}

// 유튜브 비디오 카드 렌더링
function renderVideosGrid(videos) {
  mainContentGrid.innerHTML = videos.map(item => {
    const marketLabel = item.market === 'us' ? '미국증시 🇺🇸' : (item.market === 'kr' ? '한국증시 🇰🇷' : '한·미 글로벌 🌐');
    const thumbUrl = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;

    return `
      <div class="video-card" onclick="openPlayer('${item.youtubeId}', '${escapeHtml(item.title)}', '${escapeHtml(item.channel)}', '${escapeHtml(item.description)}')">
        <div class="thumbnail-wrap">
          <img src="${thumbUrl}" alt="${escapeHtml(item.title)}" class="thumbnail-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80'">
          <span class="market-badge ${item.market}">${marketLabel}</span>
          <span class="video-duration">${item.duration || '재생'}</span>
          <div class="play-overlay">
            <div class="play-btn-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
        <div class="card-info">
          <div class="card-meta-top">
            <span class="card-publisher">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
                <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2"/>
              </svg>
              ${escapeHtml(item.channel)}
            </span>
            <span>${item.date}</span>
          </div>
          <h3 class="card-title" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3>
          <p class="card-description">${escapeHtml(item.description)}</p>
          <div class="card-footer">
            <div class="card-tags">
              ${(item.tags || []).slice(0, 3).map(tag => `<span class="subtag">#${escapeHtml(tag)}</span>`).join('')}
            </div>
            <button class="btn-action-view">시청하기 ▶</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 경제신문 리포트 카드 렌더링
function renderReportsGrid(reports) {
  mainContentGrid.innerHTML = reports.map(item => {
    const marketLabel = item.market === 'us' ? '미국증시 🇺🇸' : (item.market === 'kr' ? '한국증시 🇰🇷' : '한·미 글로벌 🌐');
    const highlightsHtml = (item.highlights || []).map(h => `
      <div class="report-summary-point">${escapeHtml(h)}</div>
    `).join('');

    return `
      <div class="report-card ${item.market}" onclick="openReportDetail('${item.id}')">
        <div class="report-header-badge-row">
          <span class="news-source-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            ${escapeHtml(item.source)}
          </span>
          <span class="report-market-indicator">${marketLabel}</span>
          <span class="report-date">${item.date}</span>
        </div>
        <h3 class="report-title">${escapeHtml(item.title)}</h3>
        <div class="report-summary-box">
          ${highlightsHtml || `<div class="report-summary-point">${escapeHtml(item.description || '핵심 요약 정보가 제공됩니다.')}</div>`}
        </div>
        <div class="card-footer" style="padding-top: 10px;">
          <div class="card-tags">
            ${(item.tags || []).slice(0, 3).map(tag => `<span class="subtag">#${escapeHtml(tag)}</span>`).join('')}
          </div>
          <button class="btn-action-view">리포트 원문 보기 📖</button>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// 7. 모달 열기 및 닫기
// ==========================================

// 유튜브 비디오 모달
function openPlayer(youtubeId, title, channel, description) {
  modalTitle.textContent = title;
  modalChannel.textContent = channel;
  modalDesc.textContent = description;
  modalYtLink.href = `https://www.youtube.com/watch?v=${youtubeId}`;
  playerFrame.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  playerModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePlayer() {
  playerModal.classList.remove('show');
  playerFrame.src = '';
  document.body.style.overflow = '';
}

// 경제신문 리포트 상세 모달
function openReportDetail(reportId) {
  const reports = getStoredReports();
  const report = reports.find(r => r.id === reportId);
  if (!report) return;

  const marketLabel = report.market === 'us' ? '미국증시 🇺🇸' : (report.market === 'kr' ? '한국증시 🇰🇷' : '한·미 글로벌 🌐');
  reportModalTitle.textContent = report.title;
  reportModalSource.textContent = report.source;
  reportModalMarket.textContent = marketLabel;
  reportModalDate.textContent = report.date;
  reportModalBody.innerHTML = report.fullBody || `
    <h4>핵심 요약 리포트</h4>
    <p>${escapeHtml(report.description || '상세 내용이 제공되지 않았습니다.')}</p>
  `;
  reportOriginalLink.href = report.link || 'https://markets.hankyung.com/consensus';

  reportDetailModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeReportDetail() {
  reportDetailModal.classList.remove('show');
  document.body.style.overflow = '';
}

// ==========================================
// 8. 보조 유틸 함수
// ==========================================
function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return m;
    }
  });
}

// ==========================================
// 9. 이벤트 리스너 등록
// ==========================================
function setupEventListeners() {
  // 모드 전환 (유튜브 vs 경제신문)
  modeBtnVideos.addEventListener('click', () => {
    currentViewMode = 'videos';
    modeBtnVideos.classList.add('active');
    modeBtnReports.classList.remove('active');
    addBtnText.textContent = '영상 직접 등록하기';
    addTypeSelect.value = 'video';
    updateFormLabels('video');
    renderContent();
  });

  modeBtnReports.addEventListener('click', () => {
    currentViewMode = 'reports';
    modeBtnReports.classList.add('active');
    modeBtnVideos.classList.remove('active');
    addBtnText.textContent = '리포트/기사 등록하기';
    addTypeSelect.value = 'report';
    updateFormLabels('report');
    renderContent();
  });

  // 시장 탭 클릭
  marketTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      marketTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMarket = btn.dataset.market;
      renderContent();
    });
  });

  // 카테고리 태그 클릭
  categoryTags.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryTags.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderContent();
    });
  });

  // 검색 인풋
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    renderContent();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderContent();
    searchInput.focus();
  });

  // 정렬 선택
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderContent();
  });

  // 비디오 모달 닫기
  closePlayerBtn.addEventListener('click', closePlayer);
  playerModal.addEventListener('click', (e) => {
    if (e.target === playerModal) closePlayer();
  });

  // 리포트 모달 닫기
  closeReportModalBtn.addEventListener('click', closeReportDetail);
  reportDetailModal.addEventListener('click', (e) => {
    if (e.target === reportDetailModal) closeReportDetail();
  });

  // ESC 키로 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (playerModal.classList.contains('show')) closePlayer();
      if (reportDetailModal.classList.contains('show')) closeReportDetail();
      if (addModal.classList.contains('show')) closeAddModal();
    }
  });

  // 콘텐츠 추가 모달 관련
  openAddModalBtn.addEventListener('click', () => {
    addModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  function closeAddModal() {
    addModal.classList.remove('show');
    document.body.style.overflow = '';
    addCustomForm.reset();
  }

  closeAddModalBtn.addEventListener('click', closeAddModal);
  cancelAddBtn.addEventListener('click', closeAddModal);
  addModal.addEventListener('click', (e) => {
    if (e.target === addModal) closeAddModal();
  });

  function updateFormLabels(type) {
    if (type === 'video') {
      contentUrlLabel.textContent = '유튜브 영상 링크 (URL) *';
      contentAuthorLabel.textContent = '유튜브 채널명 *';
    } else {
      contentUrlLabel.textContent = '경제신문 기사/리포트 원문 링크 (URL) *';
      contentAuthorLabel.textContent = '언론사명 (예: 한국경제, WSJ 등) *';
    }
  }

  addTypeSelect.addEventListener('change', (e) => {
    updateFormLabels(e.target.value);
  });

  // 콘텐츠 폼 제출
  addCustomForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = addTypeSelect.value;
    const url = document.getElementById('contentUrlInput').value.trim();
    const title = document.getElementById('contentTitleInput').value.trim();
    const author = document.getElementById('contentAuthorInput').value.trim();
    const market = document.getElementById('contentMarketSelect').value;
    const category = document.getElementById('contentCategorySelect').value;
    const tagsStr = document.getElementById('contentTagsInput').value.trim();
    const desc = document.getElementById('contentDescInput').value.trim();

    const parsedTags = tagsStr ? tagsStr.split(',').map(s => s.trim()).filter(Boolean) : ['직접등록'];

    if (type === 'video') {
      const ytId = extractYouTubeId(url);
      if (!ytId) {
        alert('올바른 유튜브 링크(URL)를 입력해주세요.');
        return;
      }
      const newVideo = {
        id: 'custom-v-' + Date.now(),
        youtubeId: ytId,
        title: title,
        channel: author,
        market: market,
        category: category,
        date: new Date().toISOString().split('T')[0],
        duration: '영상',
        description: desc || '사용자가 직접 등록한 증시 영상입니다.',
        tags: parsedTags
      };
      const vList = getStoredVideos();
      vList.unshift(newVideo);
      saveStoredVideos(vList);
      alert('새로운 증시 영상이 등록되었습니다!');
    } else {
      const newReport = {
        id: 'custom-r-' + Date.now(),
        source: author,
        title: title,
        market: market,
        category: category,
        date: new Date().toISOString().split('T')[0],
        link: url,
        highlights: desc ? desc.split('\n').filter(Boolean) : ['사용자가 등록한 경제 기사 리포트입니다.'],
        fullBody: `<h4>리포트 본문 요약</h4><p>${escapeHtml(desc || '등록된 상세 내용이 없습니다.')}</p>`,
        tags: parsedTags
      };
      const rList = getStoredReports();
      rList.unshift(newReport);
      saveStoredReports(rList);
      alert('새로운 경제신문 리포트가 등록되었습니다!');
    }

    closeAddModal();
    renderContent();
  });
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  renderContent();
});
