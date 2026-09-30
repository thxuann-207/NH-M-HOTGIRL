import { Language, Currency } from '../types/job';

export interface TranslationDictionary {
  // Search & Filter Module
  searchPlaceholder: string;
  searchBtn: string;
  keywordLabel: string;
  keywordHelper: string;
  salaryFilterTitle: string;
  minSalary: string;
  maxSalary: string;
  currencyLabel: string;
  locationFilterTitle: string;
  cityLabel: string;
  districtLabel: string;
  radiusLabel: string;
  radiusKm: string;
  currentLocation: string;
  usingCurrentLocation: string;
  workTypeTitle: string;
  industryTitle: string;
  resetFilters: string;
  resultsCount: string;
  sortBy: string;
  sortBestMatch: string;
  sortDistance: string;
  sortSalaryHigh: string;
  sortRecent: string;

  // Company Images & Environment Module
  companyPhotosTitle: string;
  companyPhotosSubtitle: string;
  tagAll: string;
  tagOffice: string;
  tagPantry: string;
  tagTeamBuilding: string;
  viewSlider: string;
  viewGrid: string;
  zoomPhoto: string;
  closeLightbox: string;
  prevPhoto: string;
  nextPhoto: string;
  photoCount: string;

  // Job Requirements Module
  jobRequirementsTitle: string;
  hardSkillsTitle: string;
  softSkillsTitle: string;
  experienceAndDegreeTitle: string;
  minExperience: string;
  years: string;
  noExperienceNeeded: string;
  educationLevel: string;
  languageCertificates: string;
  requiredCertificate: string;
  candidateFitBreakdown: string;
  matchedScore: string;
  matchedItems: string;
  missingItems: string;

  // Candidate Preferences Module
  candidatePreferencesTitle: string;
  candidatePreferencesSubtitle: string;
  prefWorkTypes: string;
  prefDesiredPositions: string;
  maxPositionsHint: string;
  prefExpectedSalary: string;
  applyPreferencesFilter: string;
  preferencesSaved: string;
  positionsLimitReached: string;

  // General Nav & UI
  home: string;
  searchJobs: string;
  applications: string;
  cvBuilder: string;
  savedJobs: string;
  messages: string;
  careerTest: string;
  profile: string;
  applyNow: string;
  applied: string;
  saveJob: string;
  saved: string;
  chatWithRecruiter: string;
  fullTime: string;
  partTime: string;
  remote: string;
  hybrid: string;
  nightShift: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  vi: {
    searchPlaceholder: 'Tìm kiếm việc làm, kỹ năng, vị trí công ty...',
    searchBtn: 'Tìm kiếm',
    keywordLabel: 'Từ khóa tìm kiếm',
    keywordHelper: 'Hỗ trợ tìm kiếm chéo đa ngôn ngữ Việt - Anh - Hàn',
    salaryFilterTitle: 'Khoảng lương kỳ vọng',
    minSalary: 'Lương tối thiểu',
    maxSalary: 'Lương tối đa',
    currencyLabel: 'Đơn vị tiền tệ',
    locationFilterTitle: 'Vị trí & Bán kính',
    cityLabel: 'Tỉnh / Thành phố',
    districtLabel: 'Quận / Huyện',
    radiusLabel: 'Bán kính tìm kiếm',
    radiusKm: 'km quanh vị trí',
    currentLocation: 'Vị trí hiện tại của bạn',
    usingCurrentLocation: 'Đang định vị quanh bạn',
    workTypeTitle: 'Hình thức làm việc',
    industryTitle: 'Ngành nghề',
    resetFilters: 'Xóa bộ lọc',
    resultsCount: 'việc làm phù hợp',
    sortBy: 'Sắp xếp theo',
    sortBestMatch: 'Phù hợp nhất',
    sortDistance: 'Gần tôi nhất',
    sortSalaryHigh: 'Lương cao nhất',
    sortRecent: 'Mới đăng',

    companyPhotosTitle: 'Hình ảnh & Môi trường làm việc',
    companyPhotosSubtitle: 'Khám phá văn phòng thực tế, khu nghỉ ngơi và hoạt động đội ngũ',
    tagAll: 'Tất cả ảnh',
    tagOffice: 'Phòng làm việc (Office)',
    tagPantry: 'Khu vực giải trí (Pantry)',
    tagTeamBuilding: 'Hoạt động tập thể (Team Building)',
    viewSlider: 'Dạng trượt (Slider)',
    viewGrid: 'Dạng lưới (Grid)',
    zoomPhoto: 'Phóng to xem chi tiết',
    closeLightbox: 'Đóng',
    prevPhoto: 'Ảnh trước',
    nextPhoto: 'Ảnh tiếp theo',
    photoCount: 'Ảnh',

    jobRequirementsTitle: 'Yêu cầu của nhà tuyển dụng',
    hardSkillsTitle: 'Kỹ năng chuyên môn (Hard Skills)',
    softSkillsTitle: 'Kỹ năng mềm (Soft Skills)',
    experienceAndDegreeTitle: 'Kinh nghiệm & Bằng cấp',
    minExperience: 'Kinh nghiệm tối thiểu',
    years: 'năm',
    noExperienceNeeded: 'Chấp nhận chưa có kinh nghiệm',
    educationLevel: 'Trình độ học vấn',
    languageCertificates: 'Chứng chỉ ngoại ngữ yêu cầu',
    requiredCertificate: 'Bắt buộc',
    candidateFitBreakdown: 'Mức độ tương thích với hồ sơ của bạn',
    matchedScore: 'Độ phù hợp',
    matchedItems: 'Kỹ năng & tiêu chí bạn đã đáp ứng',
    missingItems: 'Kỹ năng đang cần bổ sung thêm',

    candidatePreferencesTitle: 'Nhu cầu tìm việc của ứng viên',
    candidatePreferencesSubtitle: 'Tùy chỉnh mong muốn nghề nghiệp để nhận gợi ý việc làm chính xác nhất',
    prefWorkTypes: 'Hình thức làm việc mong muốn',
    prefDesiredPositions: 'Vị trí / Ngành nghề ưu tiên (Tối đa 3)',
    maxPositionsHint: 'Bạn chỉ có thể chọn tối đa 3 vị trí ưu tiên',
    prefExpectedSalary: 'Mức lương kỳ vọng',
    applyPreferencesFilter: 'Lọc việc làm theo mong muốn của tôi',
    preferencesSaved: 'Đã lưu mong muốn tìm việc thành công!',
    positionsLimitReached: 'Đã đạt giới hạn tối đa 3 vị trí ưu tiên',

    home: 'Trang chủ',
    searchJobs: 'Tìm việc làm',
    applications: 'Hồ sơ ứng tuyển',
    cvBuilder: 'Tạo CV ATS',
    savedJobs: 'Việc đã lưu',
    messages: 'Tin nhắn',
    careerTest: 'Trắc nghiệm nghề nghiệp',
    profile: 'Hồ sơ cá nhân',
    applyNow: 'Ứng tuyển ngay',
    applied: 'Đã nộp đơn',
    saveJob: 'Lưu việc',
    saved: 'Đã lưu',
    chatWithRecruiter: 'Nhắn tin HR',
    fullTime: 'Toàn thời gian',
    partTime: 'Bán thời gian',
    remote: 'Làm việc từ xa',
    hybrid: 'Linh hoạt (Hybrid)',
    nightShift: 'Ca tối',
  },
  en: {
    searchPlaceholder: 'Search jobs, salary, company location, skills...',
    searchBtn: 'Search',
    keywordLabel: 'Keyword Search',
    keywordHelper: 'Supports cross-lingual search across Vietnamese - English - Korean',
    salaryFilterTitle: 'Expected Salary Range',
    minSalary: 'Min Salary',
    maxSalary: 'Max Salary',
    currencyLabel: 'Currency',
    locationFilterTitle: 'Location & Radius',
    cityLabel: 'Province / City',
    districtLabel: 'District / County',
    radiusLabel: 'Search Radius',
    radiusKm: 'km around location',
    currentLocation: 'Your current location',
    usingCurrentLocation: 'Locating around you',
    workTypeTitle: 'Work Arrangement',
    industryTitle: 'Industry',
    resetFilters: 'Reset Filters',
    resultsCount: 'matching jobs',
    sortBy: 'Sort by',
    sortBestMatch: 'Best Match',
    sortDistance: 'Nearest to Me',
    sortSalaryHigh: 'Highest Salary',
    sortRecent: 'Recently Posted',

    companyPhotosTitle: 'Company Images & Work Environment',
    companyPhotosSubtitle: 'Explore real office spaces, pantry lounges, and team building moments',
    tagAll: 'All Photos',
    tagOffice: 'Office Spaces',
    tagPantry: 'Pantry & Lounge',
    tagTeamBuilding: 'Team Building & Activities',
    viewSlider: 'Slider View',
    viewGrid: 'Grid View',
    zoomPhoto: 'Click to zoom in (Lightbox)',
    closeLightbox: 'Close',
    prevPhoto: 'Previous Photo',
    nextPhoto: 'Next Photo',
    photoCount: 'Photo',

    jobRequirementsTitle: 'Job Requirements & Qualifications',
    hardSkillsTitle: 'Hard & Technical Skills',
    softSkillsTitle: 'Soft Skills & Mindset',
    experienceAndDegreeTitle: 'Experience & Qualifications',
    minExperience: 'Minimum Experience',
    years: 'years',
    noExperienceNeeded: 'No experience required',
    educationLevel: 'Education Level',
    languageCertificates: 'Required Language Certificates',
    requiredCertificate: 'Mandatory',
    candidateFitBreakdown: 'Compatibility with your Profile',
    matchedScore: 'Match Score',
    matchedItems: 'Skills & qualifications you match',
    missingItems: 'Recommended skills to develop',

    candidatePreferencesTitle: 'Candidate Career Preferences',
    candidatePreferencesSubtitle: 'Set your career expectations to receive curated job matches',
    prefWorkTypes: 'Preferred Work Arrangements',
    prefDesiredPositions: 'Target Roles & Industries (Max 3)',
    maxPositionsHint: 'You can choose up to 3 priority positions',
    prefExpectedSalary: 'Expected Salary',
    applyPreferencesFilter: 'Filter jobs matching my preferences',
    preferencesSaved: 'Career preferences updated successfully!',
    positionsLimitReached: 'Maximum 3 target positions reached',

    home: 'Home',
    searchJobs: 'Search Jobs',
    applications: 'Applications',
    cvBuilder: 'ATS CV Builder',
    savedJobs: 'Saved Jobs',
    messages: 'Messages',
    careerTest: 'Career Quiz',
    profile: 'My Profile',
    applyNow: 'Apply Now',
    applied: 'Applied',
    saveJob: 'Save',
    saved: 'Saved',
    chatWithRecruiter: 'Chat with HR',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    remote: 'Remote',
    hybrid: 'Hybrid',
    nightShift: 'Night Shift',
  },
  ko: {
    searchPlaceholder: '직무, 급여, 회사 위치, 전문 기술 검색...',
    searchBtn: '검색',
    keywordLabel: '키워드 검색',
    keywordHelper: '한국어 - 영어 - 베트남어 다국어 상호 검색 자동 지원',
    salaryFilterTitle: '희망 급여 범위',
    minSalary: '최소 급여',
    maxSalary: '최대 급여',
    currencyLabel: '통화 단위',
    locationFilterTitle: '근무 위치 및 반경',
    cityLabel: '도시 / 성(Province)',
    districtLabel: '구 / 군(District)',
    radiusLabel: '검색 반경',
    radiusKm: 'km 반경 내',
    currentLocation: '현재 내 위치',
    usingCurrentLocation: '현재 위치 기반 검색 중',
    workTypeTitle: '근무 형태',
    industryTitle: '산업 분야',
    resetFilters: '필터 초기화',
    resultsCount: '개의 일치하는 채용공고',
    sortBy: '정렬 기준',
    sortBestMatch: '적합도 높은 순',
    sortDistance: '거리 가까운 순',
    sortSalaryHigh: '급여 높은 순',
    sortRecent: '최신 등록 순',

    companyPhotosTitle: '회사 사진 및 근무 환경',
    companyPhotosSubtitle: '실제 사무실 공간, 휴게실(Pantry), 팀 빌딩 활동 사진을 확인하세요',
    tagAll: '전체 사진',
    tagOffice: '사무실 (Office)',
    tagPantry: '휴게실/팬트리 (Pantry)',
    tagTeamBuilding: '팀 빌딩 활동 (Team Building)',
    viewSlider: '슬라이더 보기 (Slider)',
    viewGrid: '그리드 보기 (Grid)',
    zoomPhoto: '라이트박스 확대 보기',
    closeLightbox: '닫기',
    prevPhoto: '이전 사진',
    nextPhoto: '다음 사진',
    photoCount: '사진',

    jobRequirementsTitle: '채용 요건 및 자격 기준',
    hardSkillsTitle: '전문 기술 (Hard Skills)',
    softSkillsTitle: '소프트 스킬 (Soft Skills)',
    experienceAndDegreeTitle: '경력 및 학력 요건',
    minExperience: '최소 요구 경력',
    years: '년',
    noExperienceNeeded: '경력 무관 (신입 환영)',
    educationLevel: '최종 학력',
    languageCertificates: '어학 자격증 요건',
    requiredCertificate: '필수 제출',
    candidateFitBreakdown: '내 프로필과의 적합도 분석',
    matchedScore: '매칭 적합도',
    matchedItems: '보유 중인 일치 요건',
    missingItems: '추가 개발 권장 기술',

    candidatePreferencesTitle: '구직자 희망 조건 (Candidate Preferences)',
    candidatePreferencesSubtitle: '희망 직무와 급여 조건을 설정하여 맞춤형 공고를 받아보세요',
    prefWorkTypes: '희망 근무 형태',
    prefDesiredPositions: '희망 직무/포지션 (최대 3개)',
    maxPositionsHint: '최대 3개 포지션까지만 선택하실 수 있습니다',
    prefExpectedSalary: '희망 급여',
    applyPreferencesFilter: '내 희망 조건으로 공고 필터링',
    preferencesSaved: '희망 조건이 성공적으로 저장되었습니다!',
    positionsLimitReached: '최대 3개 희망 직무가 이미 선택되었습니다',

    home: '홈',
    searchJobs: '일자리 검색',
    applications: '지원 현황',
    cvBuilder: 'ATS 이력서 생성',
    savedJobs: '저장한 공고',
    messages: '메시지',
    careerTest: '진로 적성 검사',
    profile: '내 프로필',
    applyNow: '즉시 지원',
    applied: '지원 완료',
    saveJob: '스크랩',
    saved: '스크랩됨',
    chatWithRecruiter: '인사담당자 채팅',
    fullTime: '풀타임 (Full-time)',
    partTime: '파트타임 (Part-time)',
    remote: '재택근무 (Remote)',
    hybrid: '하이브리드 (Hybrid)',
    nightShift: '야간 근무',
  },
};

/**
 * Cross-lingual synonym groups:
 * If user queries any word in a group, all other related words in KO, EN, VI are matched!
 */
export const SYNONYM_GROUPS: string[][] = [
  // 1. Tech & Developer
  [
    'developer', 'lập trình viên', 'lập trình', 'dev', 'frontend', 'backend',
    'react', 'it', 'công nghệ', 'công nghệ thông tin', 'software', 'engineer',
    '개발자', '개발', '프론트엔드', '백엔드', '소프트웨어', '프로그래머', '엔지니어'
  ],
  // 2. Korean Language & Education
  [
    'korean', 'tiếng hàn', 'trợ giảng', 'giáo dục', 'topik', 'ngoại ngữ', 'sư phạm',
    '한국어', '한국', '강사', '튜터', '교육', '토픽', '어학', '한국어 강사', '조교'
  ],
  // 3. Customer Service
  [
    'cskh', 'chăm sóc khách hàng', 'customer service', 'support', 'tư vấn', 'tổng đài',
    '고객센터', '상담', '고객 지원', 'cs', '고객 서비스'
  ],
  // 4. Translation & Interpretation
  [
    'dịch thuật', 'biên dịch', 'phiên dịch', 'translator', 'translation', 'interpreter',
    'dịch', 'phụ đề', '번역', '통역', '통번역', '번역가', '통역사'
  ],
  // 5. Sales & Business
  [
    'kinh doanh', 'bán hàng', 'sales', 'nhân viên kinh doanh', 'telesales', 'thu ngân',
    'quầy', 'bán lẻ', 'retail', '영업', '판매', '세일즈', '매장 관리'
  ],
  // 6. Marketing & Media
  [
    'marketing', 'truyền thông', 'content', 'sáng tạo', 'tiktok', 'media', 'quảng cáo',
    '마케팅', '콘텐츠', '기획', '미디어', '홍보', 'sns'
  ],
  // 7. Food & Beverage / Restaurant
  [
    'phục vụ', 'barista', 'nhà hàng', 'waiter', 'service', 'f&b', 'bồi bàn', 'pha chế',
    'ẩm thực', '서빙', '바리스타', '레스토랑', '식음료', '카페'
  ],
  // 8. Design & Creative
  [
    'thiết kế', 'designer', 'ui/ux', 'graphic', 'đồ họa', 'canva',
    '디자인', '디자이너', '그래픽'
  ],
  // 9. Internship & Entry Level
  [
    'thực tập', 'thực tập sinh', 'intern', 'internship', 'trainee', 'junior',
    'mới bắt đầu', 'chưa có kinh nghiệm', '인턴', '실습생', '주니어', '신입'
  ],
  // 10. Part-time & Night Shift
  [
    'part-time', 'bán thời gian', 'ca tối', 'linh hoạt', 'part time',
    '파트타임', '알바', '아르바이트', '야간', '시간제'
  ],
  // 11. Remote
  [
    'remote', 'từ xa', 'tại nhà', 'work from home', 'wfh', '재택', '재택근무', '원격'
  ],
];

/**
 * Expand a user query with all cross-lingual equivalents
 */
export function getExpandedSearchTerms(query: string): string[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const terms = new Set<string>([clean]);
  
  // Split query into words to match tokens
  const words = clean.split(/\s+/).filter(Boolean);

  for (const group of SYNONYM_GROUPS) {
    const matchesGroup = group.some((keyword) => {
      // Check full match or substring match
      return clean.includes(keyword) || keyword.includes(clean) || words.some((w) => keyword.includes(w));
    });

    if (matchesGroup) {
      group.forEach((item) => terms.add(item));
    }
  }

  return Array.from(terms);
}
