import { AssessmentQuestion } from '../types/job';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: 'Khi rảnh rỗi vào buổi tối hoặc cuối tuần, hoạt động nào khiến bạn cảm thấy hào hứng và tái tạo năng lượng nhất?',
    scenario: 'Sở thích & Xu hướng nạp năng lượng',
    options: [
      {
        label: 'Gặp gỡ bạn bè, trò chuyện, giao lưu văn hóa hoặc khám phá các quán cà phê mới',
        value: 'social_explore',
        trait: 'Giao tiếp & Dịch vụ xã hội',
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 3, 'Chăm sóc khách hàng': 3, 'Giáo dục & Ngôn ngữ': 2 },
      },
      {
        label: 'Học một ngoại ngữ mới, xem phim có phụ đề nước ngoài hoặc đọc sách tìm hiểu văn hóa',
        value: 'language_culture',
        trait: 'Ngoại ngữ & Khám phá tri thức',
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Biên phiên dịch & Ngôn ngữ': 4, 'Chăm sóc khách hàng': 2 },
      },
      {
        label: 'Tự tay lập kế hoạch, viết lách, thiết kế hình ảnh hoặc dựng video ngắn trên điện thoại',
        value: 'creative_content',
        trait: 'Sáng tạo & Truyền thông',
        scoreMap: { 'Marketing & Truyền thông': 4, 'Biên phiên dịch & Ngôn ngữ': 2 },
      },
      {
        label: 'Tìm hiểu công nghệ, ứng dụng AI, tối ưu hóa máy tính hoặc giải các câu đố logic',
        value: 'tech_logic',
        trait: 'Tư duy kỹ thuật & Hệ thống',
        scoreMap: { 'Công nghệ thông tin': 4, 'Phân tích dữ liệu': 3 },
      },
    ],
  },
  {
    id: 2,
    question: 'Nếu được phân công một nhiệm vụ trong nhóm học tập hoặc dự án làm việc, bạn thường tự tin đảm nhận vai trò nào nhất?',
    scenario: 'Phong cách làm việc đội nhóm',
    options: [
      {
        label: 'Người kết nối, lắng nghe nhu cầu của các thành viên và thuyết trình ý tưởng trước mọi người',
        value: 'communicator',
        trait: 'Thuyết phục & Truyền cảm hứng',
        scoreMap: { 'Giáo dục & Ngôn ngữ': 3, 'Chăm sóc khách hàng': 3, 'Dịch vụ F&B & Bán lẻ': 2 },
      },
      {
        label: 'Người cẩn thận biên soạn nội dung, kiểm tra câu chữ, dịch thuật hoặc tra cứu tài liệu',
        value: 'researcher',
        trait: 'Tỉ mỉ & Chi tiết chuẩn xác',
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 4, 'Giáo dục & Ngôn ngữ': 2 },
      },
      {
        label: 'Người năng nổ lo hậu cần, sắp xếp công việc thực tế, xử lý nhanh các tình huống phát sinh',
        value: 'organizer',
        trait: 'Hành động nhanh & Vận hành',
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 4, 'Hành chính & Nhân sự': 3 },
      },
      {
        label: 'Người xây dựng cấu trúc giải pháp, thiết kế trang trình chiếu hoặc viết code kỹ thuật',
        value: 'builder',
        trait: 'Giải pháp kỹ thuật',
        scoreMap: { 'Công nghệ thông tin': 4, 'Marketing & Truyền thông': 2 },
      },
    ],
  },
  {
    id: 3,
    question: 'Khi gặp một vị khách hoặc người đối diện đang bối rối hoặc có thắc mắc khó, phản xạ đầu tiên của bạn là gì?',
    scenario: 'Thấu cảm & Kỹ năng ứng xử',
    options: [
      {
        label: 'Kiên nhẫn lắng nghe hết câu chuyện, tươi cười và tìm cách hỗ trợ họ từng bước nhẹ nhàng',
        value: 'empathy_patient',
        trait: 'Thấu cảm cao & Kiên nhẫn',
        scoreMap: { 'Chăm sóc khách hàng': 4, 'Giáo dục & Ngôn ngữ': 4, 'Dịch vụ F&B & Bán lẻ': 3 },
      },
      {
        label: 'Tra cứu thông tin chính xác từ tài liệu hoặc quy định rồi giải thích một cách gãy gọn',
        value: 'structured_clarity',
        trait: 'Tư duy logic & Minh bạch',
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 3, 'Chăm sóc khách hàng': 2 },
      },
      {
        label: 'Nhanh nhẹn đưa ra phương án thay thế thực tế ngay tức thì để khách không phải chờ đợi',
        value: 'quick_solver',
        trait: 'Ứng biến tình huống',
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 4, 'Chăm sóc khách hàng': 3 },
      },
      {
        label: 'Phân tích nguyên nhân gốc rễ và đề xuất cách cải tiến quy trình để lỗi không lặp lại',
        value: 'system_optimizer',
        trait: 'Phân tích hệ thống',
        scoreMap: { 'Công nghệ thông tin': 3, 'Hành chính & Nhân sự': 3 },
      },
    ],
  },
  {
    id: 4,
    question: 'Môi trường làm việc lý tưởng trong mắt bạn có đặc điểm như thế nào?',
    scenario: 'Môi trường & Không gian làm việc',
    options: [
      {
        label: 'Môi trường quốc tế trẻ trung, nhiều cơ hội sử dụng ngoại ngữ và tiếp xúc người nước ngoài',
        value: 'international_vibe',
        trait: 'Đa văn hóa & Toàn cầu',
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Biên phiên dịch & Ngôn ngữ': 4, 'Chăm sóc khách hàng': 3 },
      },
      {
        label: 'Không gian sống động, rộn ràng, có âm nhạc và giao lưu trực tiếp với nhiều con người mới',
        value: 'lively_interactive',
        trait: 'Năng động & Hướng ngoại',
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 4, 'Marketing & Truyền thông': 3 },
      },
      {
        label: 'Không gian yên tĩnh, có thể làm việc online tại nhà hoặc quán cà phê với thời gian tự do',
        value: 'quiet_flexible',
        trait: 'Tự chủ & Linh hoạt',
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 4, 'Công nghệ thông tin': 3 },
      },
      {
        label: 'Văn phòng hiện đại, công nghệ cao, trang bị đầy đủ máy móc xịn và quy trình rõ ràng',
        value: 'modern_tech_office',
        trait: 'Chuyên nghiệp & Hiện đại',
        scoreMap: { 'Công nghệ thông tin': 4, 'Marketing & Truyền thông': 3 },
      },
    ],
  },
  {
    id: 5,
    question: 'Khung thời gian làm việc bạn thấy phù hợp nhất với nhịp sinh hoạt hiện tại là gì?',
    scenario: 'Thời gian & Lịch làm việc',
    options: [
      {
        label: 'Buổi tối (18:00 - 22:00) sau giờ học đại học, các ngày trong tuần hoặc cuối tuần',
        value: 'evening_shift',
        trait: 'Ưu tiên ca tối sinh viên',
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Dịch vụ F&B & Bán lẻ': 4, 'Chăm sóc khách hàng': 4 },
      },
      {
        label: 'Ca linh hoạt xoay ca theo tuần (đăng ký theo thời khóa biểu học kỳ)',
        value: 'flexible_shifts',
        trait: 'Linh hoạt theo kỳ học',
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 4, 'Chăm sóc khách hàng': 3 },
      },
      {
        label: 'Làm việc theo deadline sản phẩm (không chấm công theo giờ, miễn xong việc đúng hạn)',
        value: 'deliverable_based',
        trait: 'Quản trị mục tiêu độc lập',
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 4, 'Marketing & Truyền thông': 3 },
      },
      {
        label: 'Giờ hành chính tiêu chuẩn (Thứ 2 đến Thứ 6) để rèn tác phong công sở chuyên nghiệp',
        value: 'office_hours',
        trait: 'Kỷ luật công sở',
        scoreMap: { 'Công nghệ thông tin': 4, 'Hành chính & Nhân sự': 4 },
      },
    ],
  },
  {
    id: 6,
    question: 'Kỹ năng nào bạn cảm thấy mình đang thể hiện tốt nhất hoặc muốn mài giũa nhiều nhất?',
    scenario: 'Kỹ năng cốt lõi',
    options: [
      {
        label: 'Ngoại ngữ (tiếng Hàn/Anh/Nhật), khả năng phát âm, từ vựng và diễn đạt lưu loát',
        value: 'foreign_languages',
        trait: 'Ngoại ngữ chuyên sâu',
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Biên phiên dịch & Ngôn ngữ': 4, 'Chăm sóc khách hàng': 3 },
      },
      {
        label: 'Giao tiếp niềm nở, lắng nghe tinh tế và làm hài lòng người khác',
        value: 'interpersonal_service',
        trait: 'Chăm sóc con người',
        scoreMap: { 'Chăm sóc khách hàng': 4, 'Dịch vụ F&B & Bán lẻ': 4 },
      },
      {
        label: 'Viết lách, kể chuyện, sáng tạo nội dung bắt trend và thẩm mỹ hình ảnh',
        value: 'storytelling_creative',
        trait: 'Nội dung & Sáng tạo',
        scoreMap: { 'Marketing & Truyền thông': 4, 'Biên phiên dịch & Ngôn ngữ': 2 },
      },
      {
        label: 'Tư duy logic, giải thuật, thao tác công cụ số và phân tích dữ liệu',
        value: 'logic_data',
        trait: 'Công nghệ & Phân tích',
        scoreMap: { 'Công nghệ thông tin': 4 },
      },
    ],
  },
  {
    id: 7,
    question: 'Khi bắt đầu một công việc mới toanh mà bạn chưa từng có kinh nghiệm, điều gì giúp bạn tự tin nhất?',
    scenario: 'Khả năng thích ứng & Học hỏi',
    options: [
      {
        label: 'Có người hướng dẫn (mentor/tiền bối) tận tình cầm tay chỉ việc trong những ngày đầu',
        value: 'mentorship',
        trait: 'Học hỏi qua quan sát & chỉ dẫn',
        scoreMap: { 'Giáo dục & Ngôn ngữ': 3, 'Chăm sóc khách hàng': 3, 'Dịch vụ F&B & Bán lẻ': 3 },
      },
      {
        label: 'Tài liệu hướng dẫn mẫu chi tiết để tự đọc hiểu và làm theo từng bước',
        value: 'documentation',
        trait: 'Tự nghiên cứu bài bản',
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 4, 'Công nghệ thông tin': 3 },
      },
      {
        label: 'Được bắt tay vào thực hành ngay, vừa làm vừa rút kinh nghiệm thực chiến',
        value: 'hands_on',
        trait: 'Thực chiến thực tế',
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 4, 'Marketing & Truyền thông': 3 },
      },
      {
        label: 'Môi trường làm việc thoải mái, không sợ sai và được phép thử nghiệm cách làm mới',
        value: 'open_culture',
        trait: 'Tư duy đổi mới',
        scoreMap: { 'Marketing & Truyền thông': 3, 'Công nghệ thông tin': 3 },
      },
    ],
  },
  {
    id: 8,
    question: 'Điều gì mang lại cho bạn cảm giác tự hào và ý nghĩa lớn nhất sau một ngày làm việc?',
    scenario: 'Động lực nội tại',
    options: [
      {
        label: 'Thấy một học viên tiến bộ, phát âm đúng một từ hoặc cảm ơn mình sau buổi học',
        value: 'teaching_impact',
        trait: 'Nuôi dưỡng & Lan tỏa tri thức',
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Chăm sóc khách hàng': 3 },
      },
      {
        label: 'Khách hàng nở nụ cười hài lòng, để lại đánh giá 5 sao hoặc cảm ơn vì đã hỗ trợ họ kịp thời',
        value: 'customer_smile',
        trait: 'Dịch vụ từ tâm',
        scoreMap: { 'Chăm sóc khách hàng': 4, 'Dịch vụ F&B & Bán lẻ': 4 },
      },
      {
        label: 'Hoàn thành bản dịch hoặc sản phẩm bài viết chỉn chu, văn phong mượt mà giàu cảm xúc',
        value: 'polished_creation',
        trait: 'Hoàn thiện tác phẩm',
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 4, 'Marketing & Truyền thông': 3 },
      },
      {
        label: 'Giải quyết được một lỗi hóc búa, tính năng mới vận hành mượt mà trên hệ thống',
        value: 'problem_solved',
        trait: 'Chinh phục bài toán khó',
        scoreMap: { 'Công nghệ thông tin': 4 },
      },
    ],
  },
  {
    id: 9,
    question: 'Bạn muốn mức thu nhập và quyền lợi của công việc đầu tiên được tính toán như thế nào?',
    scenario: 'Kỳ vọng đãi ngộ',
    options: [
      {
        label: 'Lương theo giờ cao xứng đáng với năng lực ngoại ngữ + thưởng chuyên cần và học bổng',
        value: 'language_hourly',
        trait: 'Định giá theo năng lực ngoại ngữ',
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Biên phiên dịch & Ngôn ngữ': 3 },
      },
      {
        label: 'Lương cứng ổn định + hoa hồng thưởng theo hiệu quả công việc và KPI chốt đơn',
        value: 'base_plus_kpi',
        trait: 'Thích cạnh tranh & Nhận thưởng theo năng suất',
        scoreMap: { 'Chăm sóc khách hàng': 4, 'Dịch vụ F&B & Bán lẻ': 3 },
      },
      {
        label: 'Nhuận bút tính theo khối lượng sản phẩm/dự án hoàn thành, làm nhiều hưởng nhiều',
        value: 'per_project',
        trait: 'Thù lao theo sản phẩm',
        scoreMap: { 'Biên phiên dịch & Ngôn ngữ': 4, 'Marketing & Truyền thông': 3 },
      },
      {
        label: 'Mức lương cơ bản tốt + bao cơm ăn, tiền tip ngay trong ngày và giảm giá nội bộ',
        value: 'daily_benefits',
        trait: 'Phúc lợi thực tế liền tay',
        scoreMap: { 'Dịch vụ F&B & Bán lẻ': 4 },
      },
    ],
  },
  {
    id: 10,
    question: 'Mục tiêu quan trọng nhất của bạn trong 1 - 2 năm tới là gì?',
    scenario: 'Định hướng tương lai',
    options: [
      {
        label: 'Nâng cao trình độ ngoại ngữ, tích lũy kinh nghiệm giảng dạy hoặc phiên dịch để đi du học/làm việc tại công ty đa quốc gia',
        value: 'global_career',
        trait: 'Phát triển chuyên môn quốc tế',
        scoreMap: { 'Giáo dục & Ngôn ngữ': 4, 'Biên phiên dịch & Ngôn ngữ': 4 },
      },
      {
        label: 'Rèn luyện sự tự tin, kỹ năng giao tiếp và xử lý tình huống thực tế để có lợi thế cạnh tranh khi ra trường',
        value: 'soft_skills_confidence',
        trait: 'Hoàn thiện kỹ năng mềm',
        scoreMap: { 'Chăm sóc khách hàng': 4, 'Dịch vụ F&B & Bán lẻ': 3 },
      },
      {
        label: 'Xây dựng portfolio cá nhân với nhiều dự án thực tế về sáng tạo nội dung, marketing hoặc dịch thuật',
        value: 'portfolio_building',
        trait: 'Xây dựng thương hiệu cá nhân',
        scoreMap: { 'Marketing & Truyền thông': 4, 'Biên phiên dịch & Ngôn ngữ': 3 },
      },
      {
        label: 'Trở thành một chuyên viên công nghệ hoặc quản lý vận hành có chuyên môn vững vàng',
        value: 'technical_leadership',
        trait: 'Chuyên gia kỹ thuật & Quản trị',
        scoreMap: { 'Công nghệ thông tin': 4, 'Hành chính & Nhân sự': 3 },
      },
    ],
  },
];
