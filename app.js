const STORAGE_KEYS = {
  profile: "answerme_profile_v1",
  questions: "answerme_questions_v1",
  votes: "answerme_votes_v1",
  session: "answerme_session_v1",
  comments: "answerme_comments_v1",
  reports: "answerme_reports_v1",
  banned: "answerme_banned_v1",
  favorites: "answerme_favorites_v1",
  shuffled: "answerme_shuffled_v1",
  cleared: "answerme_cleared_v1",
  clearedCompare: "answerme_cleared_compare_v1",
  commentsSeeded: "answerme_comments_seeded_v1",
  lastSeenComments: "answerme_last_seen_comments_v1",
  adminLogs: "answerme_admin_logs_v1",
  hiddenQuestions: "answerme_hidden_questions_v1",
  warnings: "answerme_warnings_v1",
  extraBanned: "answerme_extra_banned_v1",
  adminNotice: "answerme_admin_notice_v1",
  votesClearedAt: "answerme_votes_cleared_at_v1"
};


const TEST_PROFILE = { nickname: "", gender: "male", age: 0, mbti: "", password: "", lastNickChangeAt: 0 };

const bannedWords = [
  "씨발","시발","병신","좆","존나","개새끼","새끼","미친놈","미친년","꺼져","썅","시발놈",
  "섹스","성교","자위","보지","자지","유두","가슴만져","애무","오르가즘","딸딸이","야동",
  "강간","성폭행","몰카","음란","창녀","걸레","난교","정액","사정","성노예",
  "ㅅㅂ","ㅂㅅ","ㅈㄴ","ㅅㅅ","ㅈㅈ","ㅂㅈ","ㅈㅅ",
  "정치","대통령","국회","국회의원","정당","선거","투표","국힘","민주당","진보","보수"
];

const maskWords = [
  "씨발","시발","병신","좆","존나","개새끼","새끼","미친놈","미친년","꺼져","썅",
  "섹스","성교","자위","보지","자지","야동","강간","성폭행","음란","창녀","걸레"
];

const itemSvg = (label) => `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'><rect width='100%' height='100%' fill='%23f2f2f2'/><rect x='120' y='140' width='360' height='520' rx='24' fill='%23e0e0e0'/><text x='50%' y='52%' font-size='32' text-anchor='middle' fill='%23888' font-family='Arial'>${label}</text></svg>`;
const compareSvg = (label) => `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'><rect width='100%' height='100%' fill='%23f3f3f3'/><text x='50%' y='52%' font-size='30' text-anchor='middle' fill='%23888' font-family='Arial'>${label}</text></svg>`;

const singleTitles = [
  "샤넬 블랙 퀼팅 체인백","샤넬 베이지 숄더백","샤넬 미니 플랩백","샤넬 체인 지갑백","샤넬 클래식 플랩백",
  "롤렉스 데이저스트","롤렉스 서브마리너","롤렉스 GMT 마스터","롤렉스 데이토나","롤렉스 익스플로러",
  "포르쉐 마칸","포르쉐 카이엔","BMW X5","BMW X3","벤츠 GLC",
  "벤츠 GLE","렉서스 RX","아우디 Q5","아우디 Q7","테슬라 모델 Y",
  "무신사 미니 블랙 원피스","무신사 롱 슬립 원피스","무신사 니트 원피스","무신사 셔츠 원피스","무신사 플리츠 원피스",
  "MZ 스트릿 후디 세트","MZ 미니 크로스백","MZ 러닝 스니커즈","MZ 캐주얼 셋업","MZ 레더 자켓",
  "명품 카드지갑","명품 미니 토트백","명품 선글라스","명품 스카프","명품 로퍼",
  "MZ 트렌드 러닝화","MZ 컬러 선글라스","MZ 패딩 베스트","MZ 데님 팬츠","MZ 캔버스 토트백",
  "명품 벨트","명품 반지갑","명품 브레이슬릿","명품 시그니처 향수","명품 캐시미어 머플러",
  "MZ 미니 카고백","MZ 패턴 가디건","MZ 스웨트 셋업","MZ 톤온톤 셔츠","MZ 테크 팬츠"
];

const compareTitles = [
  "샤넬 클래식 플랩 vs 에르메스 켈리","샤넬 보이백 vs 디올 새들백","샤넬 2.55 vs 프라다 호보","에르메스 버킨 vs 루이비통 카퓌신","보테가 베네타 조디 vs 셀린느 트리옹프",
  "롤렉스 데이토나 vs 오메가 스피드마스터","롤렉스 서브마리너 vs 튜더 블랙베이","롤렉스 GMT 마스터 vs 태그호이어 카레라","롤렉스 데이저스트 vs 까르띠에 탱크","롤렉스 익스플로러 vs IWC 파일럿",
  "포르쉐 카이엔 vs BMW X5","포르쉐 마칸 vs 벤츠 GLC","BMW X3 vs 아우디 Q5","벤츠 GLE vs 아우디 Q7","렉서스 RX vs 테슬라 모델 Y",
  "무신사 블랙 미니원피스 vs 화이트 롱원피스","무신사 니트원피스 vs 셔츠원피스","플리츠 원피스 vs 슬립 원피스","미니 원피스 vs 롱 원피스","톤온톤 룩 vs 포인트 컬러 룩",
  "MZ 러닝화 vs 클래식 스니커즈","후디 셋업 vs 셔츠 셋업","미니 크로스백 vs 버킷백","레더 자켓 vs 테크 자켓","테크 팬츠 vs 와이드 팬츠",
  "명품 카드지갑 vs 명품 반지갑","명품 미니백 vs 명품 토트백","명품 스니커즈 vs 명품 로퍼","명품 스카프 vs 명품 머플러","명품 향수 vs 명품 뷰티 키트",
  "MZ 크롭 자켓 vs 오버핏 자켓","MZ 미니백 vs 크로스백","MZ 데님 팬츠 vs 카고 팬츠","MZ 레더 자켓 vs 바시티 자켓","MZ 후디 vs 니트",
  "샤넬 체인백 vs 에르메스 린디","구찌 마몽 vs 생로랑 카산드라","프라다 리에디션 vs 미우미우 아르카디","셀린느 박스백 vs 로에베 퍼즐",
  "롤렉스 서브마리너 vs 브라이틀링 내비타이머","오메가 씨마스터 vs 태그호이어 아쿠아레이서","까르띠에 산토스 vs 불가리 옥토",
  "포르쉐 마칸 vs 아우디 Q5","BMW X5 vs 벤츠 GLE","렉서스 RX vs 아우디 Q7",
  "무신사 니트 원피스 vs 플리츠 원피스","무신사 셔츠 원피스 vs 롱 원피스","미니 원피스 vs 슬립 원피스",
  "MZ 테크 팬츠 vs 카고 팬츠","MZ 레이어드 티셔츠 vs 크롭 자켓","MZ 와이드 팬츠 vs 데님 팬츠",
  "MZ 크로스백 vs 토트백","MZ 후디 vs 후드집업","명품 선글라스 vs 명품 스카프","명품 향수 vs 명품 로션"
];

const seedComments = [
  "나도 사고싶다","얼마에요?","사이트 공유해줘요","이거 나도 어제봄","무조건 사야지",
  "색감 예쁘다","실물 궁금해요","저도 살까 고민중","사이즈가 뭐에요?","이거 유명한 제품인가요",
  "가격만 괜찮으면 살듯","후기 있나요?","선물용으로 좋겠다","이런 스타일 좋아함","재고 있나요?",
  "나중에 다시 보자","품절 되기 전에 사야지","내일 다시 결정할래","이거 진짜 예쁨","링크 보내주실 수 있나요",
  "어디서 보셨어요?","이건 컬러가 포인트","배송 얼마나 걸려요","고민하다가 품절될듯","퀄리티 좋아 보임",
  "이거 탐난다","사진보다 더 예쁠 듯","나도 위시리스트에 넣음","베이직해서 오래 쓸듯","살까 말까 무한반복"
];

const defaultQuestions = [];

let currentProfile = null;
let questions = [];
let votes = {};
let comments = {};
let reports = {};
let bannedUsers = {};
let favorites = {};
let session = { sort: "latest", currentQueue: [], currentIndex: 0 };

let activeQuestionId = null;
let countdownTimer = null;
let countdownValue = 6;
let askCountdownTimer = null;
let askCountdownValue = 30;
let canVote = false;
let repeatMode = false;

const splashWindow = document.getElementById("splashWindow");
const exitWindow = document.getElementById("exitWindow");
const welcomeWindow = document.getElementById("welcomeWindow");
const appWindow = document.getElementById("appWindow");
const nicknameInput = document.getElementById("nicknameInput");
const genderSelect = document.getElementById("genderSelect");
const ageInput = document.getElementById("ageInput");
const mbtiSelect = document.getElementById("mbtiSelect");
const passwordInput = document.getElementById("passwordInput");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const profileMessage = document.getElementById("profileMessage");
const consentCheck = document.getElementById("consentCheck");

const screens = {
  home: document.getElementById("screen-home"),
  ask: document.getElementById("screen-ask"),
  my: document.getElementById("screen-my"),
  admin: document.getElementById("screen-admin"),
  notifications: document.getElementById("screen-notifications")
};

const navLinks = [...document.querySelectorAll(".nav-link")];
const statusText = document.getElementById("statusText");
const questionTotalText = document.getElementById("questionTotalText");

const sortLatestBtn = document.getElementById("sortLatestBtn");
const sortPopularBtn = document.getElementById("sortPopularBtn");
const goAskBtn = document.getElementById("goAskBtn");
const homeFeedArea = document.getElementById("homeFeedArea");

const questionInput = document.getElementById("questionInput");
const questionCount = document.getElementById("questionCount");
const imageInput = document.getElementById("imageInput");
const imageInput2 = document.getElementById("imageInput2");
const questionType = document.getElementById("questionType");
const compareBlock = document.getElementById("compareBlock");

const submitQuestionBtn = document.getElementById("submitQuestionBtn");
const backHomeFromAskBtn = document.getElementById("backHomeFromAskBtn");
const askMessage = document.getElementById("askMessage");

const myNickLabel = document.getElementById("myNickLabel");
const myQuestionCount = document.getElementById("myQuestionCount");
const myVoteCount = document.getElementById("myVoteCount");
const myQuestionList = document.getElementById("myQuestionList");
const nicknameEdit = document.getElementById("nicknameEdit");
const saveProfileEditBtn = document.getElementById("saveProfileEditBtn");
const myMessage = document.getElementById("myMessage");
const adminReportList = document.getElementById("adminReportList");
let adminLogs = [];
let hiddenQuestions = {};
let warnings = {};
let extraBanned = [];
let adminContentSearchTerm = "";
let adminNotice = "";

function makeId(){
  return "q_" + Math.random().toString(36).slice(2,10) + Date.now().toString(36);
}

function loadLocal(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch(e){
    return fallback;
  }
}

function saveLocal(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function shuffleArray(arr){
  const a = [...arr];
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function resetFileInput(el){
  if(!el) return;
  el.value = "";
  el.type = "";
  el.type = "file";
}

function resetAskForm(){
  questionInput.value = "";
  questionCount.textContent = "0";
  resetFileInput(imageInput);
  resetFileInput(imageInput2);
  questionType.value = "";
  compareBlock.style.display = "none";
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
  if(askMessage){
    askMessage.textContent = "";
    askMessage.className = "error";
  }
}

function initData(){
  currentProfile = loadLocal(STORAGE_KEYS.profile, TEST_PROFILE);
  questions = loadLocal(STORAGE_KEYS.questions, defaultQuestions);
  votes = loadLocal(STORAGE_KEYS.votes, {});
  comments = loadLocal(STORAGE_KEYS.comments, {});
  reports = loadLocal(STORAGE_KEYS.reports, {});
  bannedUsers = loadLocal(STORAGE_KEYS.banned, {});
  favorites = loadLocal(STORAGE_KEYS.favorites, {});
  adminLogs = loadLocal(STORAGE_KEYS.adminLogs, []);
  hiddenQuestions = loadLocal(STORAGE_KEYS.hiddenQuestions, {});
  warnings = loadLocal(STORAGE_KEYS.warnings, {});
  extraBanned = loadLocal(STORAGE_KEYS.extraBanned, []);
  adminNotice = loadLocal(STORAGE_KEYS.adminNotice, "");
  session = loadLocal(STORAGE_KEYS.session, {
    sort: "latest",
    currentQueue: [],
    currentIndex: 0
  });
  session.sort = "latest";

  const clearedOnce = loadLocal(STORAGE_KEYS.cleared, false);
  if(!clearedOnce){
    questions = [...defaultQuestions];
    saveLocal(STORAGE_KEYS.questions, questions);
    saveLocal(STORAGE_KEYS.cleared, true);
  }

  const shuffledOnce = loadLocal(STORAGE_KEYS.shuffled, false);
  if(!shuffledOnce && Array.isArray(questions) && questions.length > 0){
    questions = shuffleArray(questions);
    saveLocal(STORAGE_KEYS.questions, questions);
    saveLocal(STORAGE_KEYS.shuffled, true);
  }

  if(!currentProfile || !currentProfile.nickname || !currentProfile.password){
    currentProfile = {...TEST_PROFILE};
    saveLocal(STORAGE_KEYS.profile, currentProfile);
  }

  if(!currentProfile.gender) currentProfile.gender = "male";
  if(!currentProfile.age) currentProfile.age = 24;
  if(!currentProfile.mbti) currentProfile.mbti = "";
  if(!currentProfile.lastNickChangeAt) currentProfile.lastNickChangeAt = 0;

  if(!Array.isArray(questions)){
    questions = [];
    saveLocal(STORAGE_KEYS.questions, questions);
  }

  if(typeof votes !== "object" || votes === null){
    votes = {};
    saveLocal(STORAGE_KEYS.votes, votes);
  }

  if(!session || !Array.isArray(session.currentQueue)){
    session = { sort: "latest", currentQueue: [], currentIndex: 0 };
    saveLocal(STORAGE_KEYS.session, session);
  }

  if(typeof favorites !== "object" || favorites === null){
    favorites = {};
    saveLocal(STORAGE_KEYS.favorites, favorites);
  }
  if(!Array.isArray(adminLogs)){
    adminLogs = [];
    saveLocal(STORAGE_KEYS.adminLogs, adminLogs);
  }
  if(typeof hiddenQuestions !== "object" || hiddenQuestions === null){
    hiddenQuestions = {};
    saveLocal(STORAGE_KEYS.hiddenQuestions, hiddenQuestions);
  }
  if(typeof warnings !== "object" || warnings === null){
    warnings = {};
    saveLocal(STORAGE_KEYS.warnings, warnings);
  }
  if(!Array.isArray(extraBanned)){
    extraBanned = [];
    saveLocal(STORAGE_KEYS.extraBanned, extraBanned);
  }
  if(typeof adminNotice !== "string"){
    adminNotice = "";
    saveLocal(STORAGE_KEYS.adminNotice, adminNotice);
  }

  const todayKey = new Date().toISOString().slice(0,10);
  const lastCleared = loadLocal(STORAGE_KEYS.votesClearedAt, "");
  if(lastCleared !== todayKey){
    votes = {};
    saveLocal(STORAGE_KEYS.votes, votes);
    saveLocal(STORAGE_KEYS.votesClearedAt, todayKey);
  }

  const seeded = loadLocal(STORAGE_KEYS.commentsSeeded, false);
  if(!seeded){
    const targetQuestions = questions.filter(q => q.type !== "compare");
    targetQuestions.forEach(q => {
      if(!comments[q.id] || comments[q.id].length === 0){
        comments[q.id] = seedComments.map((text, i) => ({
          text,
          author: "seed",
          createdAt: Date.now() - i * 1000
        }));
      }
    });
    saveLocal(STORAGE_KEYS.comments, comments);
    saveLocal(STORAGE_KEYS.commentsSeeded, true);
  }
}

function boot(){
  initData();
  nicknameInput.value = currentProfile.nickname || "";
  genderSelect.value = currentProfile.gender || "male";
  ageInput.value = currentProfile.age || "";
  passwordInput.value = currentProfile.password || "";
  if(mbtiSelect) mbtiSelect.value = currentProfile.mbti || "";

  openSplash();
}

function openSplash(){
  // splash disabled
  openWelcome();
}

function openWelcome(){
  if(splashWindow) splashWindow.classList.add("hidden");
  exitWindow.classList.add("hidden");
  welcomeWindow.classList.remove("hidden");
  appWindow.classList.add("hidden");
}

function openExit(){
  if(splashWindow) splashWindow.classList.add("hidden");
  welcomeWindow.classList.add("hidden");
  appWindow.classList.add("hidden");
  exitWindow.classList.remove("hidden");
}

function openApp(){
  if(splashWindow) splashWindow.classList.add("hidden");
  exitWindow.classList.add("hidden");
  welcomeWindow.classList.add("hidden");

  const banInfo = bannedUsers[currentProfile.nickname];
  if(banInfo && banInfo.bannedUntil && Date.now() < banInfo.bannedUntil){
    const left = Math.ceil((banInfo.bannedUntil - Date.now()) / (24*60*60*1000));
    alert(`이용이 제한되었습니다. ${left}일 후 재이용 가능합니다.`);
    return;
  }

  appWindow.classList.remove("hidden");
  myNickLabel.textContent = currentProfile.nickname;
  session.currentIndex = 0;
  buildQueueIfNeeded(true);
  if(!getCurrentQuestion() && questions.length){
    votes = {};
    saveLocal(STORAGE_KEYS.votes, votes);
    session.currentIndex = 0;
    buildQueueIfNeeded(true);
  }

  if(warnings[currentProfile.nickname]){
    alert("경고가 누적되었습니다. 이용 시 주의해주세요.");
    warnings[currentProfile.nickname] = Math.max(0, warnings[currentProfile.nickname] - 1);
    saveLocal(STORAGE_KEYS.warnings, warnings);
  }

  updateCounts();
  showScreen("home");
  renderNotice();
  safeRenderFeed();
  renderMyPage();
  updateNotifications();
  renderNotifications();
}

function makeDraggable(win){
  const bar = win.querySelector('.titlebar');
  if(!bar) return;
  let startX=0, startY=0, lastX=0, lastY=0, dragging=false;
  const onStart = (e) => {
    dragging = true;
    const p = e.touches ? e.touches[0] : e;
    startX = p.clientX; startY = p.clientY;
    const t = win.dataset.translate ? win.dataset.translate.split(',').map(Number) : [0,0];
    lastX = t[0]; lastY = t[1];
  };
  const onMove = (e) => {
    if(!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    const dx = p.clientX - startX;
    const dy = p.clientY - startY;
    const nx = lastX + dx;
    const ny = lastY + dy;
    win.dataset.translate = `${nx},${ny}`;
    win.style.transform = `translate(${nx}px, ${ny}px)`;
  };
  const onEnd = () => { dragging = false; };
  bar.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);
  bar.addEventListener('touchstart', onStart, {passive:true});
  window.addEventListener('touchmove', onMove, {passive:true});
  window.addEventListener('touchend', onEnd);
}

function showScreen(name){
  Object.values(screens).forEach(el => el.classList.add("hidden"));
  screens[name].classList.remove("hidden");
  statusText.textContent = name === "home" ? "Home" : name === "ask" ? "질문하기" : name === "admin" ? "Admin" : name === "notifications" ? "댓글" : "마이페이지";

  // 페이지 이동 시 안내/오류 문구 초기화
  if(askMessage){
    askMessage.textContent = "";
    askMessage.className = "error";
  }

  if(name === "ask"){
    resetAskForm();
    if(questionInput) questionInput.placeholder = '예: 지금 안사면 후회할까?';
    stopAskCountdown();
  } else {
    stopAskCountdown();
  }

  if(askMessage){
    askMessage.textContent = "";
    askMessage.className = "error";
  }

  if(name === "home"){
    renderNotice();
  }

  if(name === "notifications"){
    const last = Date.now();
    saveLocal(STORAGE_KEYS.lastSeenComments, last);
    const dot = document.getElementById("notifyDot");
    if(dot) dot.style.display = "none";
  }
}

function updateCounts(){
  const totalCount = getSortedQuestions().length;
  questionTotalText.textContent = "Questions: " + totalCount;
  const myQuestions = questions.filter(q => q.author === currentProfile.nickname);
  const myVotes = Object.keys(votes).length;
  myQuestionCount.textContent = myQuestions.length;
  myVoteCount.textContent = myVotes;
  myNickLabel.textContent = currentProfile.nickname;
}

function sanitize(text){
  return text.replace(/\s+/g, " ").trim();
}

function normalizeText(text){
  return text.toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[0@]/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/[3]/g, "e")
    .replace(/[5\$]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/[\._\-]/g, "");
}

function containsBannedWord(text){
  const normalized = normalizeText(text);
  const all = [...bannedWords, ...(extraBanned || [])];
  return all.some(word => normalized.includes(word));
}

function maskText(text){
  if(!text) return "";
  let out = text;
  maskWords.forEach(w => {
    const re = new RegExp(w, "gi");
    out = out.replace(re, "*".repeat(w.length));
  });
  return out;
}

function validateProfile(nick, pw, age){
  if(!nick || nick.length < 2 || nick.length > 12){
    return "닉네임은 2~12자여야 합니다.";
  }
  if(!pw || pw.length < 4){
    return "비밀번호는 4자 이상이어야 합니다.";
  }
  if(!age || age < 18){
    return "나이는 18세 이상이어야 합니다.";
  }
  if(containsBannedWord(nick)){
    return "닉네임에 부적절한 표현이 포함되어 있습니다.";
  }
  return "";
}

function validateQuestion(q){
  if(q && q.length > 60) return "캡션은 60자 이하만 가능합니다.";
  if(q && containsBannedWord(q)){
    return "정치/성적/차별 관련 표현은 사용할 수 없습니다.";
  }
  return "";
}

function getSortedQuestions(){
  let arr = [...questions].filter(q => !reports[q.id] && !hiddenQuestions[q.id]);

  // 최신: 사라/마라, 인기: 이거/저거
  if(session.sort === "latest"){
    arr = arr.filter(q => q.type !== "compare");
  }else if(session.sort === "popular"){
    arr = arr.filter(q => q.type === "compare");
  }

  if(session.sort === "popular"){
    arr.sort((a,b) => (b.v1 + b.v2) - (a.v1 + a.v2));
  }else{
    arr.sort((a,b) => b.createdAt - a.createdAt);
  }
  return arr;
}

function buildQueueIfNeeded(forceReset=false){
  const sortedIds = getSortedQuestions().map(q => q.id);

  if(forceReset || session.currentQueue.length === 0){
    session.currentQueue = sortedIds;
    session.currentIndex = 0;
    saveSession();
    return;
  }

  const existingSet = new Set(session.currentQueue);
  sortedIds.forEach(id => {
    if(!existingSet.has(id)) session.currentQueue.push(id);
  });

  session.currentQueue = session.currentQueue.filter(id => sortedIds.includes(id));

  if(session.currentIndex >= session.currentQueue.length){
    session.currentIndex = session.currentQueue.length;
  }

  saveSession();
}

function saveSession(){
  saveLocal(STORAGE_KEYS.session, session);
}

function isNewQuestion(q){
  if(!q || !q.createdAt) return false;
  return (Date.now() - q.createdAt) < 1 * 60 * 60 * 1000;
}

function getCurrentQuestion(){
  const allAnswered = session.currentQueue.length > 0 && session.currentQueue.every(id => votes[id]);
  if(allAnswered){
    repeatMode = true;
    session.currentIndex = 0;
    saveSession();
    const id = session.currentQueue[0];
    return questions.find(q => q.id === id) || null;
  }
  repeatMode = false;

  while(session.currentIndex < session.currentQueue.length){
    const id = session.currentQueue[session.currentIndex];
    const q = questions.find(q => q.id === id) || null;
    if(q && !votes[id]) return q;
    session.currentIndex += 1;
  }
  return null;
}

function renderFeed(){
  clearCountdown();
  homeFeedArea.innerHTML = "";

  setSortButtons();

  let q = getCurrentQuestion();

  if(!q){
    buildQueueIfNeeded(true);
    q = getCurrentQuestion();
  }

  if(!q){
    homeFeedArea.innerHTML = `
      <div class="empty-box">
        현재 등록된 질문이 없습니다.<br>
        질문을 등록해주세요.
        <div class="footer-note">질문 등록 후 바로 홈에 표시됩니다.</div>
        <div style="margin-top:10px;">
          <button class="btn" id="writeFromFeedBtn">질문 등록</button>
        </div>
      </div>
    `;
    const writeFromFeedBtn = document.getElementById("writeFromFeedBtn");
    if(writeFromFeedBtn){
      writeFromFeedBtn.addEventListener("click", () => showScreen("ask"));
    }
    return;
  }

  const total = q.v1 + q.v2;
  const alreadyVoted = Boolean(votes[q.id]) && !repeatMode;
  const authorName = q.author || currentProfile.nickname || "anonymous";
  const authorAge = q.authorAge || currentProfile.age || "-";
  const authorGender = q.authorGender || (currentProfile.gender === "male" ? "남" : currentProfile.gender === "female" ? "여" : "-");
  const authorMbti = q.authorMbti || currentProfile.mbti || "-";

  const shell = document.createElement("div");
  shell.className = "question-shell";
  shell.innerHTML = `
    <div class="card question-card" id="questionCard">

      <div class="card" style="background:#fff; padding:0; overflow:hidden;">
        ${q.type === "compare" ? `
          <div class="compare-carousel" aria-label="THIS/THAT swipe">
            <div class="compare-slide">
              <img src="${q.image || ''}" alt="item1">
            </div>
            <div class="compare-slide">
              <img src="${q.image2 || ''}" alt="item2">
            </div>
          </div>
        ` : `
          <img src="${q.image || ''}" alt="item" style="width:100%; display:block;" id="mainImage">
        `}
      </div>
      <div class="home-actions">
        <button class="icon-btn" id="commentIcon" title="댓글">
          <svg viewBox="0 0 24 24"><rect x="5" y="6" width="14" height="10" rx="3" fill="none" stroke="#111" stroke-width="1.8"/><path d="M10 16l-2 2v-2" fill="none" stroke="#111" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
        <button class="icon-btn" id="reportIcon" title="신고">
          <svg viewBox="0 0 24 24"><path d="M12 5.5l7.5 13H4.5z" fill="none" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 10v4" stroke="#111" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="#111"/></svg>
        </button>
      </div>
      ${q.q ? `<p class="q-title" style="margin-top:6px;">${escapeHtml(maskText(q.q))}${isNewQuestion(q) ? ' <span class=\"new-badge\">N</span>' : ''}</p>` : ""}
      <div class="muted" style="margin:4px 0 8px;">
        ${escapeHtml(authorName)} · ${authorAge} · ${authorGender} · ${authorMbti}
      </div>

      <div id="countdownArea" class="${alreadyVoted ? 'hidden' : ''}" style="margin-top:6px;">
        <div class="progress-shell" id="countdownBar">
          <span class="progress-seg"></span>
          <span class="progress-seg"></span>
          <span class="progress-seg"></span>
          <span class="progress-seg"></span>
          <span class="progress-seg"></span>
          <span class="progress-seg"></span>
          <span class="progress-seg"></span>
          <span class="progress-seg"></span>
          <span class="progress-seg"></span>
          <span class="progress-seg"></span>
        </div>
      </div>

      <div id="commentArea" style="padding-bottom:2px;">
        <span id="resultMini" class="muted" style="display:block; margin:4px 0 8px;"></span>

        <div class="vote-bar" id="voteArea">
          <button class="btn option-btn" id="vote1Btn">${q.type === "compare" ? "THIS" : "BUY"}</button>
          <button class="btn option-btn" id="vote2Btn">${q.type === "compare" ? "THAT" : "PASS"}</button>
        </div>

        <div id="commentList" style="margin-top:8px; display:none;"></div>
      </div>
    </div>
  `;
  homeFeedArea.appendChild(shell);

  activeQuestionId = q.id;
  canVote = false;

  const vote1Btn = document.getElementById("vote1Btn");
  const vote2Btn = document.getElementById("vote2Btn");
  const favBtn = document.getElementById("favBtn");
  const resultMini = document.getElementById("resultMini");
  const nextBtn = document.getElementById("nextBtn");
  const questionCard = document.getElementById("questionCard");
  const writeFromFeedBtn = document.getElementById("writeFromFeedBtn");
  const reportIcon = document.getElementById("reportIcon");
  const commentIcon = document.getElementById("commentIcon");
  const commentArea = document.getElementById("commentArea");
  const commentList = document.getElementById("commentList");
  const commentModal = document.getElementById("commentModal");
  const commentModalList = document.getElementById("commentModalList");
  const commentModalInput = document.getElementById("commentModalInput");
  const commentModalSubmit = document.getElementById("commentModalSubmit");
  const commentModalClose = document.getElementById("commentModalClose");

  if(writeFromFeedBtn){
    writeFromFeedBtn.addEventListener("click", () => showScreen("ask"));
  }

  if(favBtn){
    if(favorites[q.id]) favBtn.classList.add("active");
    favBtn.addEventListener("click", () => {
      favorites[q.id] = !favorites[q.id];
      if(!favorites[q.id]) delete favorites[q.id];
      saveLocal(STORAGE_KEYS.favorites, favorites);
      favBtn.classList.toggle("active", !!favorites[q.id]);
      renderMyPage();
    });
  }

  if(reportIcon){
    reportIcon.addEventListener("click", () => openReportModal(q));
  }
  if(commentIcon){
    commentIcon.addEventListener("click", () => {
      if(!commentModal) return;
      renderComments(q.id, commentModalList);
      commentModal.style.display = "flex";
      document.body.classList.add("no-scroll");

      const onModalTouch = (e) => {
        if(e.target.closest('#commentModalList')) return;
        e.preventDefault();
      };
      commentModal.addEventListener('touchmove', onModalTouch, {passive:false});
      if(commentModalList){
        commentModalList.style.overflowY = 'scroll';
      }

      commentModalSubmit.onclick = () => {
        const text = sanitize(commentModalInput.value);
        if(!text) return;
        if(containsBannedWord(text)){
          alert("부적절한 표현이 포함되어 있습니다.");
          return;
        }
        const list = comments[q.id] || [];
        list.unshift({ text, author: currentProfile.nickname, createdAt: Date.now() });
        comments[q.id] = list.slice(0, 20);
        saveLocal(STORAGE_KEYS.comments, comments);
        commentModalInput.value = "";
        commentModalInput.blur();
        renderComments(q.id, commentModalList);
        updateNotifications();
      };
      commentModalClose.onclick = () => {
        commentModal.style.display = "none";
        document.body.classList.remove("no-scroll");
        commentModal.removeEventListener('touchmove', onModalTouch);
      };
    });
  }

  renderMiniResult(q, resultMini);

  if(alreadyVoted){
    vote1Btn.disabled = true;
    vote2Btn.disabled = true;
    renderComments(q.id, commentList);
    if(nextBtn) nextBtn.addEventListener("click", () => moveNextWithSwipe(questionCard));
    setTimeout(() => moveNextWithSwipe(questionCard), 200);
  }else{
    canVote = true;
    vote1Btn.disabled = false;
    vote2Btn.disabled = false;
    startCountdown(() => {
      moveNextWithSwipe(questionCard);
    });

    vote1Btn.addEventListener("click", () => handleVote(q.id, 1, resultMini, vote1Btn, vote2Btn, nextBtn, commentList));
    vote2Btn.addEventListener("click", () => handleVote(q.id, 2, resultMini, vote1Btn, vote2Btn, nextBtn, commentList));
  }

}

function safeRenderFeed(){
  renderFeed();
  if(homeFeedArea && homeFeedArea.children.length === 0){
    buildQueueIfNeeded(true);
    renderFeed();
  }
  if(homeFeedArea && homeFeedArea.children.length === 0){
    questions = [...defaultQuestions];
    saveLocal(STORAGE_KEYS.questions, questions);
    session.currentQueue = [];
    session.currentIndex = 0;
    buildQueueIfNeeded(true);
    renderFeed();
  }
}

function renderPopular(){
  const list = getSortedQuestions();
  if(list.length === 0){
    homeFeedArea.innerHTML = `<div class="empty-box">인기 질문이 없습니다.</div>`;
    return;
  }

  const top = list.slice(0, 100);
  const wrap = document.createElement("div");
  wrap.className = "question-shell";

  wrap.innerHTML = top.map((q, idx) => {
    const total = q.v1 + q.v2;
    const p1 = total ? Math.round((q.v1 / total) * 100) : 0;
    const p2 = total ? Math.round((q.v2 / total) * 100) : 0;
    return `
      <div class="card question-card">
        <div class="muted" style="margin-bottom:6px;">인기 질문 TOP ${idx + 1}</div>
        <p class="q-title">Q. ${escapeHtml(maskText(q.q))}</p>
        <div class="muted" style="margin-bottom:8px;">작성자: ${escapeHtml(q.author || "anonymous")}</div>
        <div class="poll-wrap">
          <span class="poll-label">YES</span>
          <div class="poll-bar"><div class="poll-fill" style="width:${p1}%;"></div></div>
          <span class="poll-label">${p1}%</span>
        </div>
        <div class="poll-wrap" style="margin-top:6px;">
          <span class="poll-label">NO</span>
          <div class="poll-bar"><div class="poll-fill" style="width:${p2}%; background:#6b6b6b;"></div></div>
          <span class="poll-label">${p2}%</span>
        </div>
        <div class="muted" style="margin-top:8px;">참여 ${total}</div>
        <div class="hr"></div>
        <label class="label" style="margin-top:0;">한줄 댓글</label>
        <input class="input" data-pop-comment="${q.id}" maxlength="40" placeholder="댓글을 입력하세요">
        <div class="home-actions">
          <button class="btn" data-pop-submit="${q.id}">댓글 등록</button>
        </div>
        <div class="muted" data-pop-list="${q.id}"></div>
      </div>
    `;
  }).join("");

  homeFeedArea.appendChild(wrap);

  top.forEach(q => {
    const input = wrap.querySelector(`[data-pop-comment="${q.id}"]`);
    const btn = wrap.querySelector(`[data-pop-submit="${q.id}"]`);
    const listEl = wrap.querySelector(`[data-pop-list="${q.id}"]`);
    if(listEl) renderComments(q.id, listEl);
    if(btn && input){
      btn.addEventListener("click", () => {
        const text = sanitize(input.value);
        if(!text) return;
        if(containsBannedWord(text)){
          statusText.textContent = "부적절한 표현이 포함되어 있습니다.";
          return;
        }
        const list = comments[q.id] || [];
        list.unshift({ text, author: currentProfile.nickname, createdAt: Date.now() });
        comments[q.id] = list.slice(0, 20);
        saveLocal(STORAGE_KEYS.comments, comments);
        input.value = "";
        if(listEl) renderComments(q.id, listEl);
      });
    }
  });
}

function startCountdown(onDone){
  clearCountdown();
  countdownValue = 5;
  const countdownBar = document.getElementById("countdownBar");
  const segs = countdownBar ? countdownBar.querySelectorAll('.progress-seg') : [];
  let ticks = 0;

  segs.forEach(s => s.classList.remove('on'));

  countdownTimer = setInterval(() => {
    ticks += 1;
    const percent = Math.min((ticks / 5), 1);
    const fillCount = Math.round(segs.length * percent);
    segs.forEach((s, i) => s.classList.toggle('on', i < fillCount));

    if(ticks >= 5){
      clearCountdown();
      onDone();
    }
  }, 1000);
}

function clearCountdown(){
  if(countdownTimer){
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

function startAskCountdown(){
  stopAskCountdown();




  askCountdownValue = 60;
  const el = document.getElementById("centerCycle");
  if(el){
    el.style.color = "#0a0a0a";
    el.textContent = askCountdownValue;
  }
  stopCenterCycle();
  askCountdownTimer = setInterval(() => {
    askCountdownValue -= 1;
    if(el) el.textContent = askCountdownValue;
    if(askCountdownValue <= 0){
      stopAskCountdown();
    }
  }, 1000);
}

function stopAskCountdown(){
  if(askCountdownTimer){
    clearInterval(askCountdownTimer);
    askCountdownTimer = null;
  }
  const el = document.getElementById("centerCycle");
  if(el){
    el.style.color = "#0a0a0a";
    el.textContent = cycleWords[cycleIndex];
  }
  startCenterCycle();
}

function handleVote(questionId, pick, resultMini, vote1Btn, vote2Btn, nextBtn, commentList){
  if(!canVote) return;
  const q = questions.find(item => item.id === questionId);
  if(!q) return;

  // 반복 모드에서는 투표 기록 유지하면서 다음으로 넘김
  if(votes[questionId] && repeatMode){
    const questionCard = document.getElementById("questionCard");
    if(nextBtn) nextBtn.onclick = () => moveNextWithSwipe(questionCard);
    return setTimeout(() => moveNextWithSwipe(questionCard), 200);
  }

  if(votes[questionId]) return;

  if(pick === 1) q.v1 += 1;
  else q.v2 += 1;

  votes[questionId] = {
    pick,
    nickname: currentProfile.nickname,
    votedAt: Date.now()
  };

  saveLocal(STORAGE_KEYS.questions, questions);
  saveLocal(STORAGE_KEYS.votes, votes);

  canVote = false;
  vote1Btn.disabled = true;
  vote2Btn.disabled = true;

  renderComments(q.id, commentList);

  updateCounts();
  clearCountdown();

  const questionCard = document.getElementById("questionCard");
  if(nextBtn) nextBtn.onclick = () => moveNextWithSwipe(questionCard);
  setTimeout(() => moveNextWithSwipe(questionCard), 200);
}

function renderMiniResult(q, container){
  const total = q.v1 + q.v2;
  const p1 = total ? Math.round((q.v1 / total) * 100) : 0;
  const p2 = total ? Math.round((q.v2 / total) * 100) : 0;
  const labelA = q.type === "compare" ? "THIS" : "BUY";
  const labelB = q.type === "compare" ? "THAT" : "PASS";
  container.innerHTML = `
    <div class="poll-wrap">
      <span class="poll-label">${labelA}</span>
      <div class="poll-bar"><div class="poll-fill" style="width:${p1}%;"></div></div>
      <span class="poll-label">${p1}%</span>
    </div>
    <div class="poll-wrap" style="margin-top:6px;">
      <span class="poll-label">${labelB}</span>
      <div class="poll-bar"><div class="poll-fill" style="width:${p2}%; background:#6b6b6b;"></div></div>
      <span class="poll-label">${p2}%</span>
    </div>
  `;
}

function moveNextWithSwipe(cardEl){
  if(!cardEl) return;
  cardEl.classList.add("swipe-out");
  setTimeout(() => {
    session.currentIndex += 1;
    saveSession();
    renderFeed();
  }, 500);
}

function moveNextImmediate(){
  session.currentIndex += 1;
  saveSession();
  renderFeed();
}

function renderMyPage(){
  updateCounts();

  const savedProfile = loadLocal(STORAGE_KEYS.profile, currentProfile);
  if(savedProfile && savedProfile.nickname){
    currentProfile.nickname = savedProfile.nickname;
  }
  nicknameEdit.value = currentProfile.nickname || "";

  const myQuestions = [...questions]
    .filter(q => q.author === currentProfile.nickname)
    .sort((a,b) => b.createdAt - a.createdAt);

  const votedIds = Object.keys(votes);
  const votedQuestions = questions.filter(q => votedIds.includes(q.id));
  if(myQuestionCount) myQuestionCount.textContent = myQuestions.length;
  if(myVoteCount) myVoteCount.textContent = votedQuestions.length;
  myQuestionList.innerHTML = "";

  if(myQuestions.length === 0 && votedQuestions.length === 0){
    myQuestionList.innerHTML = `
      <div class="empty-box">
        아직 작성/결정한 질문이 없습니다.
      </div>
    `;
    return;
  }

  const sections = {
    my: { title: "내 질문", listId: "myList", toggleId: "toggleMyList", items: myQuestions },
    voted: { title: "내 투표현황", listId: "voteList", toggleId: "toggleVoteList", items: votedQuestions }
  };

  const makeSection = (key) => {
    const sec = sections[key];
    if(!sec.items.length) return null;
    const wrap = document.createElement("div");
    wrap.className = "card";
    wrap.id = `section-${key}`;
    wrap.innerHTML = `
      <div id="${sec.listId}" style="display:none;"></div>
    `;
    const listEl = wrap.querySelector(`#${sec.listId}`);
    if(key === "my") listEl.style.display = "block";

    sec.items.forEach(q => {
      const total = q.v1 + q.v2;
      const item = document.createElement("div");
      item.className = "card";
      item.innerHTML = `
        <div class="row-between" style="margin-bottom:6px;">
          <span class="badge">투표 ${total}</span>
          ${key === "my" ? `<button class="btn btn-danger" data-del="${q.id}">삭제</button>` : ""}
        </div>
        <div class="row-between" style="gap:8px;">
          <span class="q-title" style="margin:0;">Q. ${escapeHtml(q.q)}</span>
          <span class="muted">${q.type === "compare" ? "THIS" : "BUY"} ${total ? Math.round((q.v1/total)*100) : 0}% · ${q.type === "compare" ? "THAT" : "PASS"} ${total ? Math.round((q.v2/total)*100) : 0}%</span>
        </div>
      `;
      if(key === "my"){
        const delBtn = item.querySelector('[data-del]');
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = delBtn.dataset.del;
          questions = questions.filter(q => q.id !== id);
          saveLocal(STORAGE_KEYS.questions, questions);
          renderMyPage();
        });
      }
      listEl.appendChild(item);
    });

    return wrap;
  };

  const myWrap = makeSection("my");
  const votedWrap = makeSection("voted");
  [myWrap, votedWrap].forEach(w => { if(w) myQuestionList.appendChild(w); });

  const hookToggle = (btnId, sectionId, listId) => {
    const btn = document.getElementById(btnId);
    const section = document.getElementById(sectionId);
    if(!btn || !section) return;
    btn.onclick = () => {
      const listEl = section.querySelector(`#${listId}`);
      if(!listEl) return;
      const isOpen = listEl.style.display === "block";
      listEl.style.display = isOpen ? "none" : "block";
      section.scrollIntoView({behavior:"smooth", block:"start"});
    };
  };

  hookToggle("btnMyQuestions", "section-my", "myList");
  hookToggle("btnMyVotes", "section-voted", "voteList");
}

function updateNotifications(){
  const dot = document.getElementById("notifyDot");
  const btn = document.getElementById("notifyBtn");
  if(btn && btn.dataset.bound !== "1"){
    btn.dataset.bound = "1";
    btn.style.pointerEvents = "auto";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showScreen("notifications");
      renderNotifications();
      const last = Date.now();
      saveLocal(STORAGE_KEYS.lastSeenComments, last);
      if(dot) dot.style.display = "none";
    });
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showScreen("notifications");
      renderNotifications();
      const last = Date.now();
      saveLocal(STORAGE_KEYS.lastSeenComments, last);
      if(dot) dot.style.display = "none";
    }, {passive:false});
  }
  if(!dot) return;
  const lastSeen = loadLocal(STORAGE_KEYS.lastSeenComments, 0);
  const myIds = questions.filter(q => q.author === currentProfile.nickname).map(q => q.id);
  const newest = myIds.reduce((acc, id) => {
    const list = comments[id] || [];
    const latest = list[0]?.createdAt || 0;
    return Math.max(acc, latest);
  }, 0);
  dot.style.display = newest > lastSeen ? "block" : "none";
}

function openReportModal(q){
  const modal = document.getElementById("reportModal");
  const list = document.getElementById("reportReasons");
  const confirmBtn = document.getElementById("reportConfirm");
  const cancelBtn = document.getElementById("reportCancel");
  if(!modal || !list || !confirmBtn || !cancelBtn) return;
  let selected = "";
  list.querySelectorAll('.reason').forEach(btn => {
    btn.classList.remove('active');
    btn.onclick = () => {
      list.querySelectorAll('.reason').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selected = btn.dataset.reason;
    };
  });
  confirmBtn.onclick = () => {
    if(!selected){
      alert("신고 사유를 선택해주세요.");
      return;
    }
    reports[q.id] = { reportedAt: Date.now(), reason: selected, question: q };
    saveLocal(STORAGE_KEYS.reports, reports);
    statusText.textContent = "신고가 접수되었습니다.";
    modal.style.display = "none";
    renderAdmin();
  };
  cancelBtn.onclick = () => { modal.style.display = "none"; };
  modal.style.display = "flex";
}


function renderNotifications(){
  const wrap = document.getElementById("notificationList");
  if(!wrap) return;
  const myIds = questions.filter(q => q.author === currentProfile.nickname).map(q => q.id);
  const items = [];
  myIds.forEach(id => {
    (comments[id] || []).forEach(c => items.push({ id, ...c }));
  });
  if(items.length === 0){
    wrap.innerHTML = `
      <div class="empty-box">
        아직 표시할 내용이 없습니다
        <div class="footer-note">회원님의 콘텐츠에 달린 댓글이 여기 표시됩니다.</div>
      </div>
    `;
    return;
  }
  wrap.innerHTML = items.map(c => `
    <div class="card">
      <div class="q-title" style="font-size:14px; margin-bottom:6px;">${escapeHtml(c.author)}</div>
      <div class="muted">${escapeHtml(c.text)}</div>
    </div>
  `).join("");
}

function renderNotice(){
  const bar = document.getElementById("noticeBar");
  if(!bar) return;
  const text = (adminNotice || "").trim();
  if(!text){
    bar.classList.add("hidden");
    bar.textContent = "";
    return;
  }
  bar.classList.remove("hidden");
  bar.textContent = text;
}

function addAdminLog(action, detail){
  adminLogs.unshift({ action, detail, at: Date.now() });
  adminLogs = adminLogs.slice(0, 50);
  saveLocal(STORAGE_KEYS.adminLogs, adminLogs);
}

function renderAdminLogs(){
  const logWrap = document.getElementById("adminLogList");
  if(!logWrap) return;
  const filtered = adminLogs.filter(l => !["신고 해제","숨김 해제","콘텐츠 복구","숨김 해제","금지어 추가"].includes(l.action));
  if(filtered.length === 0){
    logWrap.innerHTML = `<div class="muted">처리 로그가 없습니다.</div>`;
    return;
  }
  const formatDate = (ts) => {
    const d = new Date(ts);
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    const h = String(d.getHours()).padStart(2,'0');
    const min = String(d.getMinutes()).padStart(2,'0');
    return `${y}.${m}.${day} ${h}:${min}`;
  };

  logWrap.innerHTML = filtered.map((l, i) => `
    <div class="card admin-log" data-log>
      <div class="row-between admin-log-header" data-log-header>
        <div class="q-title" style="font-size:13px;">${escapeHtml(l.action)}</div>
        <div class="muted" style="font-size:11px;">${formatDate(l.at)}</div>
      </div>
      <div class="muted admin-log-body" style="margin-top:6px; display:none;">${escapeHtml(l.detail || "")}</div>
    </div>
  `).join("");

  logWrap.querySelectorAll('[data-log]').forEach(card => {
    const header = card.querySelector('[data-log-header]');
    const body = card.querySelector('.admin-log-body');
    if(header && body){
      header.onclick = () => {
        body.style.display = body.style.display === 'none' ? 'block' : 'none';
      };
    }
  });
}


function renderAdminUserResults(){
  const wrap = document.getElementById("adminUserResults");
  if(!wrap) return;
  const users = new Set();
  Object.values(reports).forEach(rep => {
    const author = rep.question?.author || "unknown";
    if(author) users.add(author);
  });
  const list = [...users];
  if(list.length === 0){
    wrap.innerHTML = `<div class="muted">신고된 작성자가 없습니다.</div>`;
    return;
  }
  wrap.innerHTML = list.map(u => {
    const warn = warnings[u] || 0;
    const banned = bannedUsers[u] ? "(차단됨)" : "";
    return `
      <div class="card">
        <div class="q-title" style="font-size:13px;">${escapeHtml(u)} ${banned}</div>
        <div class="muted">경고: ${warn}회</div>
        <div class="home-actions" style="margin-top:8px;">
          <button class="btn" data-warn="${escapeHtml(u)}">경고</button>
          <button class="btn" data-ban="${escapeHtml(u)}">차단</button>
        </div>
      </div>
    `;
  }).join("");

  wrap.querySelectorAll("button").forEach(btn => {
    if(btn.dataset.warn){
      btn.addEventListener("click", () => {
        const name = btn.dataset.warn;
        warnings[name] = (warnings[name] || 0) + 1;
        saveLocal(STORAGE_KEYS.warnings, warnings);
        addAdminLog("사용자 경고", name);
        renderAdminUserResults();
      });
    }
    if(btn.dataset.ban){
      btn.addEventListener("click", () => {
        const name = btn.dataset.ban;
        bannedUsers[name] = { bannedAt: Date.now() };
        saveLocal(STORAGE_KEYS.banned, bannedUsers);
        addAdminLog("사용자 차단", name);
        renderAdminUserResults();
      });
    }
  });
}

function renderAdminStats(){
  const dau = new Set(questions.map(q => q.author)).size;
  const commentsCount = Object.values(comments).reduce((acc, list) => acc + list.length, 0);
  const reportsCount = Object.keys(reports).length;
  const recentUsers = new Set(questions.filter(q => Date.now() - q.createdAt < 24*60*60*1000).map(q => q.author)).size;

  const elDau = document.getElementById("adminMetricDau");
  const elNew = document.getElementById("adminMetricNew");
  const elReports = document.getElementById("adminMetricReports");
  const elComments = document.getElementById("adminMetricComments");
  if(elDau) elDau.textContent = dau || 0;
  if(elNew) elNew.textContent = recentUsers || 0;
  if(elReports) elReports.textContent = reportsCount || 0;
  if(elComments) elComments.textContent = commentsCount || 0;
}

function renderAdminSettings(){
  const wrap = document.getElementById("adminSettingsList");
  if(!wrap) return;
  const notice = (adminNotice || "").trim();
  const noticeBlock = notice ? `
    <div class="card">
      <div class="q-title" style="font-size:13px;">공지</div>
      <div class="muted">${escapeHtml(notice)}</div>
    </div>
  ` : "";

  const bannedBlock = (!extraBanned || extraBanned.length === 0)
    ? ""
    : extraBanned.map(w => `
        <div class="card">
          <div class="q-title" style="font-size:13px;">${escapeHtml(w)}</div>
        </div>
      `).join("");

  wrap.innerHTML = `${noticeBlock}${bannedBlock}`;
}

function initAdminTabs(){
  const tabs = document.querySelectorAll(".admin-tab-btn");
  const contents = document.querySelectorAll(".admin-tab-content");
  if(tabs.length === 0) return;
  tabs.forEach(btn => {
    if(btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      const target = btn.dataset.adminTab;
      tabs.forEach(b => b.classList.toggle("active", b === btn));
      contents.forEach(c => c.classList.toggle("active", c.dataset.adminContent === target));
    });
  });
}

function initAdminSections(){
  document.querySelectorAll(".admin-section-header").forEach(header => {
    if(header.dataset.bound === "1") return;
    header.dataset.bound = "1";
    header.addEventListener("click", (e) => {
      if(e.target.closest(".btn")) return;
      const card = header.closest(".admin-section");
      if(card) card.classList.toggle("collapsed");
    });
  });
}

function renderAdmin(){
  adminReportList.innerHTML = "";
  const entries = Object.entries(reports);
  if(entries.length === 0){
    adminReportList.innerHTML = ``;
  }else{
    entries.forEach(([id, rep]) => {
      const q = rep.question || questions.find(x => x.id === id) || { q: "(삭제됨)", author:"unknown" };
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="q-title">Q. ${escapeHtml(q.q)}</div>
        <div class="muted">작성자: ${escapeHtml(q.author || "unknown")}</div>
        <div class="home-actions" style="margin-top:10px;">
          <button class="btn btn-danger" data-action="delete" data-id="${id}">삭제</button>
          <button class="btn" data-action="warn" data-author="${escapeHtml(q.author || "unknown")}">경고</button>
          <button class="btn" data-action="ban" data-author="${escapeHtml(q.author || "unknown")}">차단</button>
        </div>
      `;
      adminReportList.appendChild(card);
    });

    adminReportList.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        if(action === "delete"){
          questions = questions.filter(q => q.id !== id);
          delete reports[id];
          saveLocal(STORAGE_KEYS.questions, questions);
          saveLocal(STORAGE_KEYS.reports, reports);
          addAdminLog("콘텐츠 삭제", id);
          renderAdmin();
        }
        if(action === "warn"){
          const author = btn.dataset.author;
          if(author && author !== "unknown"){
            warnings[author] = (warnings[author] || 0) + 1;
            saveLocal(STORAGE_KEYS.warnings, warnings);
            addAdminLog("사용자 경고", author);
          }
          renderAdmin();
        }
        if(action === "ban"){
          const author = btn.dataset.author;
          if(author && author !== "unknown"){
            bannedUsers[author] = { bannedAt: Date.now(), bannedUntil: Date.now() + 15 * 24 * 60 * 60 * 1000 };
            saveLocal(STORAGE_KEYS.banned, bannedUsers);
            addAdminLog("사용자 차단", author);
          }
          renderAdmin();
        }
      });
    });
  }

  renderAdminLogs();
  renderAdminStats();
  renderAdminSettings();

  const showReportedUsersBtn = document.getElementById("adminShowReportedUsers");
  const userWrap = document.getElementById("adminUserResults");
  if(showReportedUsersBtn){
    showReportedUsersBtn.onclick = () => {
      if(userWrap){
        const next = userWrap.style.display === "none" || !userWrap.style.display ? "block" : "none";
        userWrap.style.display = next;
      }
      renderAdminUserResults();
    };
  }

  const manageBannedBtn = document.getElementById("adminManageBannedBtn");
  const noticeBtn = document.getElementById("adminNoticeBtn");
  const promptModal = document.getElementById("adminPromptModal");
  const promptTitle = document.getElementById("adminPromptTitle");
  const promptInput = document.getElementById("adminPromptInput");
  const promptList = document.getElementById("adminPromptList");
  const promptCancel = document.getElementById("adminPromptCancel");
  const promptConfirm = document.getElementById("adminPromptConfirm");

  let promptMode = "";
  const renderPromptList = () => {
    if(!promptList) return;
    if(promptMode === "banned"){
      if(!extraBanned || extraBanned.length === 0){
        promptList.innerHTML = `<div class="muted">등록된 금지어 없음</div>`;
        return;
      }
      promptList.innerHTML = `
        <div class="section-title">등록된 금지어</div>
        ${extraBanned.map((w, i) => `
          <div class="list-item">
            <span>${escapeHtml(w)}</span>
            <button class="btn" data-remove-banned="${i}">삭제</button>
          </div>
        `).join("")}
      `;
      promptList.querySelectorAll('[data-remove-banned]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number(btn.dataset.removeBanned);
          extraBanned.splice(idx, 1);
          saveLocal(STORAGE_KEYS.extraBanned, extraBanned);
          addAdminLog("금지어 삭제", "");
          renderPromptList();
          renderAdminSettings();
        });
      });
    }
    if(promptMode === "notice"){
      const notice = (adminNotice || "").trim();
      promptList.innerHTML = `
        <div class="section-title">현재 공지</div>
        <div class="muted" style="margin-bottom:8px;">${notice ? escapeHtml(notice) : "공지 없음"}</div>
        ${notice ? `<button class="btn" id="adminNoticeClear">공지 삭제</button>` : ""}
      `;
      const clearBtn = document.getElementById("adminNoticeClear");
      if(clearBtn){
        clearBtn.onclick = () => {
          adminNotice = "";
          saveLocal(STORAGE_KEYS.adminNotice, adminNotice);
          addAdminLog("공지 삭제", "");
          renderPromptList();
          renderAdminSettings();
          renderNotice();
        };
      }
    }
  };

  const openPrompt = (mode, title, placeholder) => {
    if(!promptModal) return;
    promptMode = mode;
    promptTitle.textContent = title;
    promptInput.value = "";
    promptInput.placeholder = placeholder;
    promptModal.style.display = "flex";
    document.body.classList.add("no-scroll");
    renderPromptList();
    setTimeout(() => promptInput.focus(), 0);
  };
  const closePrompt = () => {
    if(!promptModal) return;
    promptModal.style.display = "none";
    document.body.classList.remove("no-scroll");
  };

  if(promptCancel){
    promptCancel.onclick = closePrompt;
  }
  if(promptConfirm){
    promptConfirm.onclick = () => {
      const clean = sanitize((promptInput.value || "").trim());
      if(!clean) return closePrompt();
      if(promptMode === "banned"){
        extraBanned.push(clean);
        saveLocal(STORAGE_KEYS.extraBanned, extraBanned);
        addAdminLog("금지어 추가", clean);
        renderAdminSettings();
        renderPromptList();
      }
      if(promptMode === "notice"){
        adminNotice = clean;
        saveLocal(STORAGE_KEYS.adminNotice, adminNotice);
        addAdminLog("공지 설정", clean);
        renderAdminSettings();
        renderNotice();
        renderPromptList();
      }
      promptInput.value = "";
    };
  }

  if(manageBannedBtn){
    manageBannedBtn.onclick = () => openPrompt("banned", "금지어 관리", "추가할 금지어 입력");
  }
  if(noticeBtn){
    noticeBtn.onclick = () => openPrompt("notice", "공지 설정", "공지 내용을 입력");
  }

  const showReportsBtn = document.getElementById("adminShowReports");
  const showLogsBtn = document.getElementById("adminShowLogs");
  if(showReportsBtn){
    showReportsBtn.onclick = () => {
      const card = showReportsBtn.closest('.admin-section');
      if(card) card.classList.toggle('collapsed');
    };
  }
  if(showLogsBtn){
    showLogsBtn.onclick = () => {
      const card = showLogsBtn.closest('.admin-section');
      if(card) card.classList.toggle('collapsed');
    };
  }

  initAdminTabs();
  initAdminSections();
}

function setSortButtons(){
  if(session.sort === "latest"){
    sortLatestBtn.classList.add("active");
    sortPopularBtn.classList.remove("active");
  }else{
    sortLatestBtn.classList.remove("active");
    sortPopularBtn.classList.add("active");
  }
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}

function renderComments(qid, container){
  const list = comments[qid] || [];
  container.innerHTML = list.map(c => {
    const text = maskText(escapeHtml(c.text));
    return `<div class="muted"><strong>${escapeHtml(c.author)}</strong> ${text}</div>`;
  }).join("") || "<div class=\"muted\">아직 댓글이 없습니다.</div>";
}

function enableSwipe(cardEl, onSwipe){
  if(!cardEl) return;
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  const start = (e) => {
    dragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    cardEl.style.transition = "none";
  };

  const move = (e) => {
    if(!dragging) return;
    currentX = (e.touches ? e.touches[0].clientX : e.clientX);
    const dx = Math.max(0, currentX - startX);
    cardEl.style.transform = `translateX(${dx}px)`;
  };

  const end = () => {
    if(!dragging) return;
    dragging = false;
    const dx = Math.max(0, currentX - startX);
    cardEl.style.transition = "transform .2s ease";
    if(dx > 80){
      onSwipe();
    }
    cardEl.style.transform = "translateX(0)";
  };

  cardEl.addEventListener("mousedown", start);
  cardEl.addEventListener("mousemove", move);
  cardEl.addEventListener("mouseup", end);
  cardEl.addEventListener("mouseleave", end);
  cardEl.addEventListener("touchstart", start, {passive:true});
  cardEl.addEventListener("touchmove", move, {passive:true});
  cardEl.addEventListener("touchend", end);
}

saveProfileBtn.addEventListener("click", () => {
  if(consentCheck && !consentCheck.checked){
    profileMessage.className = "error";
    profileMessage.textContent = "동의 후에만 시작할 수 있습니다.";
    return;
  }
  const nick = sanitize(nicknameInput.value);
  const gender = genderSelect.value;
  const age = parseInt(ageInput.value, 10);
  const mbti = mbtiSelect ? mbtiSelect.value : "";
  const pw = passwordInput.value.trim();
  const err = validateProfile(nick, pw, age);
  profileMessage.className = "error";
  profileMessage.textContent = err;
  if(err) return;
  currentProfile = { nickname: nick, gender, age, mbti, password: pw };
  saveLocal(STORAGE_KEYS.profile, currentProfile);

  if(!loadLocal(STORAGE_KEYS.questions, null)){
    saveLocal(STORAGE_KEYS.questions, questions);
  }

  openApp();
});


if(saveProfileEditBtn){
  saveProfileEditBtn.onclick = () => alert("닉네임 변경은 월 1회만 가능합니다.");
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = link.dataset.nav;
    if(askMessage){
      askMessage.textContent = "";
      askMessage.className = "error";
    }
    showScreen(target);
    if(target === "home") safeRenderFeed();
    if(target === "my") { renderMyPage(); updateCounts(); }
    if(target === "admin") renderAdmin();
    if(target === "notifications") renderNotifications();

    document.querySelectorAll('.bottom-nav .nav-link').forEach(n => n.classList.remove('active'));
    const active = document.querySelector(`.bottom-nav .nav-link[data-nav="${target}"]`);
    if(active) active.classList.add('active');
  });
});

sortLatestBtn.addEventListener("click", () => {
  session.sort = "latest";
  buildQueueIfNeeded(true);
  saveSession();
  renderFeed();
});

sortPopularBtn.addEventListener("click", () => {
  session.sort = "popular";
  buildQueueIfNeeded(true);
  saveSession();
  renderFeed();
});


if(goAskBtn){
  goAskBtn.addEventListener("click", () => {
    if(askMessage){
      askMessage.textContent = "";
      askMessage.className = "error";
    }
    showScreen("ask");
  });
}
backHomeFromAskBtn.addEventListener("click", () => {
  stopAskCountdown();
  const el = document.getElementById("askCountdown");
  if(el) el.textContent = "";
  if(askMessage){
    askMessage.textContent = "";
    askMessage.className = "error";
  }
  session.currentIndex = 0;
  buildQueueIfNeeded(true);
  showScreen("home");
  safeRenderFeed();
});

questionInput.addEventListener("input", () => {
  questionCount.textContent = questionInput.value.length;
});

questionType.addEventListener("change", () => {
  const isCompare = questionType.value === "compare";
  compareBlock.style.display = isCompare ? "block" : "none";
});

document.querySelectorAll('.type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.dataset.type;
    questionType.value = type;
    compareBlock.style.display = type === 'compare' ? 'block' : 'none';
    if(questionInput){
      questionInput.placeholder = type === 'compare'
        ? '예: 나중에 중고가치 좋은쪽은?'
        : '예: 지금 안사면 후회할까?';
    }
    startAskCountdown();
  });
});

document.addEventListener('click', (e) => {
  const btn = e.target.closest('#notifyBtn');
  if(!btn) return;
  showScreen('notifications');
  renderNotifications();
});

document.addEventListener('touchstart', (e) => {
  const btn = e.target.closest('#notifyBtn');
  if(!btn) return;
  e.preventDefault();
  showScreen('notifications');
  renderNotifications();
}, {passive:false});


submitQuestionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const q = sanitize(questionInput.value);
  if(bannedUsers[currentProfile.nickname]){
    askMessage.className = "error";
    askMessage.textContent = "이용이 제한된 계정입니다.";
    return;
  }

  const isCompare = questionType.value === "compare";
  if(!imageInput.files || imageInput.files.length === 0){
    askMessage.className = "error";
    askMessage.textContent = "1번 이미지를 업로드해주세요.";
    return;
  }
  if(containsBannedWord(q)){
    askMessage.className = "error";
    askMessage.textContent = "정치/성적/차별 이슈가 될 수 있는 내용은 등록할 수 없습니다.";
    return;
  }
  if(isCompare){
    if(!imageInput2.files || imageInput2.files.length === 0){
      askMessage.className = "error";
      askMessage.textContent = "저것 이미지를 업로드해주세요.";
      return;
    }
  }

  const err = validateQuestion(q);
  askMessage.className = err ? "error" : "ok";
  askMessage.textContent = err || "등록되었습니다.";
  if(err) return;

  const file1 = imageInput.files[0];
  const reader1 = new FileReader();
  reader1.onload = () => {
    if(!isCompare){
      const newQuestion = {
        id: makeId(),
        q,
        type: "single",
        image: reader1.result,
        a1: "사라",
        a2: "마라",
        v1: 0,
        v2: 0,
        author: currentProfile.nickname,
        authorAge: currentProfile.age || "-",
        authorGender: currentProfile.gender === "male" ? "남" : currentProfile.gender === "female" ? "여" : "-",
        authorMbti: currentProfile.mbti || "-",
        createdAt: Date.now()
      };
      questions.push(newQuestion);
      saveLocal(STORAGE_KEYS.questions, questions);
      updateCounts();
      renderMyPage();
      resetAskForm();

      session.sort = "latest";
      session.currentIndex = 0;
      buildQueueIfNeeded(true);
      showScreen("home");
      safeRenderFeed();
      return;
    }

    const file2 = imageInput2.files[0];
    const reader2 = new FileReader();
    reader2.onload = () => {
      const newQuestion = {
        id: makeId(),
        q,
        type: "compare",
        image: reader1.result,
        image2: reader2.result,
        label1: "이것",
        label2: "저것",
        a1: "이것",
        a2: "저것",
        v1: 0,
        v2: 0,
        author: currentProfile.nickname,
        authorAge: currentProfile.age || "-",
        authorGender: currentProfile.gender === "male" ? "남" : currentProfile.gender === "female" ? "여" : "-",
        authorMbti: currentProfile.mbti || "-",
        createdAt: Date.now()
      };

      questions.push(newQuestion);
      saveLocal(STORAGE_KEYS.questions, questions);
      updateCounts();
      renderMyPage();
      resetAskForm();

      session.sort = "popular";
      session.currentIndex = 0;
      buildQueueIfNeeded(true);
      showScreen("home");
      safeRenderFeed();
    };
    reader2.readAsDataURL(file2);
  };
  reader1.readAsDataURL(file1);
});


saveProfileEditBtn.addEventListener("click", () => {
  const nextNick = nicknameEdit.value.trim();
  const now = Date.now();
  const monthMs = 30 * 24 * 60 * 60 * 1000;

  if(!nextNick || nextNick.length < 2 || nextNick.length > 12){
    myMessage.className = "error";
    myMessage.textContent = "닉네임은 2~12자여야 합니다.";
    return;
  }
  if(containsBannedWord(nextNick)){
    myMessage.className = "error";
    myMessage.textContent = "닉네임에 부적절한 표현이 포함되어 있습니다.";
    return;
  }
  if(nextNick !== currentProfile.nickname){
    currentProfile.nickname = nextNick;
    currentProfile.lastNickChangeAt = now;
  }
  saveLocal(STORAGE_KEYS.profile, currentProfile);
  updateCounts();
  myMessage.className = "ok";
  myMessage.textContent = "프로필이 저장되었습니다.";
});


makeDraggable(welcomeWindow);
makeDraggable(appWindow);

const cycleWords = ["BUY","PASS","THIS","THAT"];
let cycleIndex = 0;
let centerCycleTimer = null;
function startCenterCycle(){
  const el = document.getElementById("centerCycle");
  if(!el) return;
  el.style.color = "#0a0a0a";
  if(centerCycleTimer) return;
  centerCycleTimer = setInterval(() => {
    cycleIndex = (cycleIndex + 1) % cycleWords.length;
    el.textContent = cycleWords[cycleIndex];
  }, 1000);
}
function stopCenterCycle(){
  if(centerCycleTimer){
    clearInterval(centerCycleTimer);
    centerCycleTimer = null;
  }
}

startCenterCycle();
boot();
