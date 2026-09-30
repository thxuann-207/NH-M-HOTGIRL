import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Printer,
  Download,
  Plus,
  Trash2,
  CheckCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Globe
} from 'lucide-react';
import { CVData, UserProfile } from '../../types/job';

interface CVBuilderViewProps {
  cvData: CVData;
  onUpdateCV: (newCV: CVData) => void;
  user: UserProfile;
}

export const CVBuilderView: React.FC<CVBuilderViewProps> = ({
  cvData,
  onUpdateCV,
  user,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'education' | 'experience' | 'skills'>('info');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiTips, setAiTips] = useState<string | null>(null);

  // Form field handlers
  const handleBasicChange = (field: keyof CVData, val: any) => {
    onUpdateCV({
      ...cvData,
      [field]: val,
    });
  };

  // Education handlers
  const handleAddEducation = () => {
    onUpdateCV({
      ...cvData,
      education: [
        ...cvData.education,
        {
          school: '',
          major: '',
          period: '2024 - 2028',
          gpa: 'GPA: 3.2 / 4.0',
        },
      ],
    });
  };

  const handleUpdateEducation = (index: number, field: string, val: string) => {
    const updated = [...cvData.education];
    updated[index] = { ...updated[index], [field]: val };
    onUpdateCV({ ...cvData, education: updated });
  };

  const handleRemoveEducation = (index: number) => {
    const updated = cvData.education.filter((_, i) => i !== index);
    onUpdateCV({ ...cvData, education: updated });
  };

  // Experience handlers
  const handleAddExperience = () => {
    onUpdateCV({
      ...cvData,
      experience: [
        ...cvData.experience,
        {
          role: 'Cộng tác viên / Trợ lý',
          company: 'Đơn vị / Dự án mới',
          period: '2025 - Hiện tại',
          description: 'Mô tả ngắn gọn công việc và kết quả đạt được.',
        },
      ],
    });
  };

  const handleUpdateExperience = (index: number, field: string, val: string) => {
    const updated = [...cvData.experience];
    updated[index] = { ...updated[index], [field]: val };
    onUpdateCV({ ...cvData, experience: updated });
  };

  const handleRemoveExperience = (index: number) => {
    const updated = cvData.experience.filter((_, i) => i !== index);
    onUpdateCV({ ...cvData, experience: updated });
  };

  // Skills input handler (comma separated)
  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const list = e.target.value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    onUpdateCV({ ...cvData, skills: list });
  };

  // AI CV Enhancer call
  const handleAIEnhance = async () => {
    setIsEnhancing(true);
    setAiTips(null);
    try {
      const res = await fetch('/api/ai/enhance-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvData }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        onUpdateCV({
          ...cvData,
          objective: data.data.professionalSummary || cvData.objective,
          skills: data.data.highlightSkills?.length ? data.data.highlightSkills : cvData.skills,
        });
        setAiTips(data.data.improvementTips || 'CV đã được chuẩn hóa câu chữ thành công!');
      }
    } catch (err) {
      console.error('Enhance error:', err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Action Header */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm">
        <div>
          <h2 className="text-base font-bold text-[#1B2C24] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#385A45]" />
            <span>Trình tạo & Quản lý CV Cá nhân</span>
          </h2>
          <p className="text-xs text-[#4A7D5C] mt-0.5">
            Nhập thông tin bên trái — Bản xem trước CV chuẩn ATS tông màu rêu & kem tự động cập nhật ngay bên phải
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAIEnhance}
            disabled={isEnhancing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-700 to-[#2D4738] hover:from-emerald-600 hover:to-[#385A45] text-white text-xs font-bold shadow-sm transition-all disabled:opacity-50"
            title="Sử dụng AI tối ưu hóa văn phong và kỹ năng chuẩn ATS"
          >
            {isEnhancing ? (
              <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
            ) : (
              <Sparkles className="w-4 h-4 text-emerald-300" />
            )}
            <span>AI Tối ưu hóa CV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>In / Xuất PDF</span>
          </button>
        </div>
      </div>

      {aiTips && (
        <div className="no-print p-3.5 rounded-xl bg-[#E3ECE6] border border-[#9EBFB5] flex items-center justify-between text-xs text-[#1B2C24]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{aiTips}</span>
          </div>
          <button onClick={() => setAiTips(null)} className="text-[#385A45] font-semibold hover:underline">
            Đóng
          </button>
        </div>
      )}

      {/* Main Split: Form on Left, CV Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor (5 cols) */}
        <div className="no-print lg:col-span-5 bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-4">
          {/* Editor Tabs */}
          <div className="flex items-center gap-1 p-1 bg-[#F5F1E8] rounded-xl text-xs font-medium">
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                activeTab === 'info' ? 'bg-white text-[#1B2C24] font-bold shadow-sm' : 'text-neutral-600'
              }`}
            >
              Cơ bản
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                activeTab === 'education' ? 'bg-white text-[#1B2C24] font-bold shadow-sm' : 'text-neutral-600'
              }`}
            >
              Học vấn
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                activeTab === 'experience' ? 'bg-white text-[#1B2C24] font-bold shadow-sm' : 'text-neutral-600'
              }`}
            >
              Kinh nghiệm
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex-1 py-1.5 rounded-lg transition-colors ${
                activeTab === 'skills' ? 'bg-white text-[#1B2C24] font-bold shadow-sm' : 'text-neutral-600'
              }`}
            >
              Kỹ năng
            </button>
          </div>

          {/* Tab 1: Basic Info */}
          {activeTab === 'info' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-neutral-600 block mb-1">Họ và tên:</label>
                <input
                  type="text"
                  value={cvData.fullName}
                  onChange={(e) => handleBasicChange('fullName', e.target.value)}
                  className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-600 block mb-1">Vị trí / Mục tiêu ứng tuyển:</label>
                <input
                  type="text"
                  value={cvData.jobTitle}
                  onChange={(e) => handleBasicChange('jobTitle', e.target.value)}
                  className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-neutral-600 block mb-1">Email:</label>
                  <input
                    type="email"
                    value={cvData.email}
                    onChange={(e) => handleBasicChange('email', e.target.value)}
                    className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-neutral-600 block mb-1">Số điện thoại:</label>
                  <input
                    type="text"
                    value={cvData.phone}
                    onChange={(e) => handleBasicChange('phone', e.target.value)}
                    className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-neutral-600 block mb-1">Địa chỉ / Khu vực:</label>
                <input
                  type="text"
                  value={cvData.address}
                  onChange={(e) => handleBasicChange('address', e.target.value)}
                  className="w-full p-2 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-600 block mb-1">Mục tiêu nghề nghiệp & Tóm tắt:</label>
                <textarea
                  rows={4}
                  value={cvData.objective}
                  onChange={(e) => handleBasicChange('objective', e.target.value)}
                  className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385A45] leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Education */}
          {activeTab === 'education' && (
            <div className="space-y-4 text-xs">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#2D4738]">Trường học #{idx + 1}</span>
                    {cvData.education.length > 1 && (
                      <button
                        onClick={() => handleRemoveEducation(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Tên trường (Đại học / Cao đẳng)"
                    value={edu.school}
                    onChange={(e) => handleUpdateEducation(idx, 'school', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Ngành học / Chuyên ngành"
                    value={edu.major}
                    onChange={(e) => handleUpdateEducation(idx, 'major', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Thời gian (ví dụ: 2024 - 2028)"
                      value={edu.period}
                      onChange={(e) => handleUpdateEducation(idx, 'period', e.target.value)}
                      className="p-2 bg-white border border-[#DED3BD] rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Điểm GPA hoặc xếp loại"
                      value={edu.gpa || ''}
                      onChange={(e) => handleUpdateEducation(idx, 'gpa', e.target.value)}
                      className="p-2 bg-white border border-[#DED3BD] rounded-lg"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEducation}
                className="w-full py-2 rounded-lg border border-dashed border-[#385A45] text-[#2D4738] font-semibold hover:bg-[#F5F1E8] flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm học vấn</span>
              </button>
            </div>
          )}

          {/* Tab 3: Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-4 text-xs">
              {cvData.experience.map((exp, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#2D4738]">Hoạt động / Việc làm #{idx + 1}</span>
                    {cvData.experience.length > 1 && (
                      <button
                        onClick={() => handleRemoveExperience(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Vị trí công việc"
                    value={exp.role}
                    onChange={(e) => handleUpdateExperience(idx, 'role', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Tên công ty hoặc CLB"
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Thời gian (ví dụ: 09/2024 - Hiện tại)"
                    value={exp.period}
                    onChange={(e) => handleUpdateExperience(idx, 'period', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                  <textarea
                    rows={3}
                    placeholder="Mô tả công việc và đóng góp cụ thể..."
                    value={exp.description}
                    onChange={(e) => handleUpdateExperience(idx, 'description', e.target.value)}
                    className="w-full p-2 bg-white border border-[#DED3BD] rounded-lg"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddExperience}
                className="w-full py-2 rounded-lg border border-dashed border-[#385A45] text-[#2D4738] font-semibold hover:bg-[#F5F1E8] flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm kinh nghiệm / Hoạt động</span>
              </button>
            </div>
          )}

          {/* Tab 4: Skills & Certificates */}
          {activeTab === 'skills' && (
            <div className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-neutral-600 block mb-1">
                  Danh sách kỹ năng (mỗi kỹ năng một dòng):
                </label>
                <textarea
                  rows={5}
                  value={cvData.skills.join('\n')}
                  onChange={handleSkillsChange}
                  className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg leading-relaxed"
                />
              </div>

              <div>
                <label className="font-semibold text-neutral-600 block mb-1">
                  Chứng chỉ & Giải thưởng (mỗi dòng một chứng chỉ):
                </label>
                <textarea
                  rows={3}
                  value={cvData.certificates.join('\n')}
                  onChange={(e) =>
                    onUpdateCV({
                      ...cvData,
                      certificates: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full p-2.5 bg-[#FBF9F4] border border-[#DED3BD] rounded-lg leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: ATS Live CV Document Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EDE6D6] shadow-xl p-8 sm:p-10 font-sans text-neutral-800 cv-document">
          {/* CV Header: Moss Green Accent Band */}
          <div className="border-b-2 border-[#2D4738] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#1B2C24] tracking-tight uppercase">
                {cvData.fullName}
              </h1>
              <p className="text-xs font-bold text-[#385A45] tracking-wide uppercase mt-1">
                {cvData.jobTitle}
              </p>
              {/* Contact metadata */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-600">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#385A45]" />
                  {cvData.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#385A45]" />
                  {cvData.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#385A45]" />
                  {cvData.address}
                </span>
              </div>
            </div>

            {/* Avatar thumbnail */}
            {cvData.avatarUrl && (
              <img
                src={cvData.avatarUrl}
                alt={cvData.fullName}
                className="w-20 h-20 rounded-xl object-cover border-2 border-[#2D4738] shadow-sm shrink-0"
              />
            )}
          </div>

          {/* Section: Mục tiêu nghề nghiệp */}
          <div className="mt-5 space-y-1.5">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
              Mục tiêu nghề nghiệp
            </h2>
            <p className="text-xs text-neutral-700 leading-relaxed pt-1">
              {cvData.objective}
            </p>
          </div>

          {/* Section: Học vấn */}
          <div className="mt-5 space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
              Học vấn
            </h2>
            <div className="space-y-2.5 pt-1">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div>
                    <h3 className="font-bold text-[#1B2C24]">{edu.school}</h3>
                    <p className="text-neutral-700 font-medium">{edu.major}</p>
                    {edu.gpa && <p className="text-neutral-500 text-[11px]">{edu.gpa}</p>}
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-neutral-500 shrink-0">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Kinh nghiệm & Hoạt động */}
          <div className="mt-5 space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
              Kinh nghiệm làm việc & Hoạt động
            </h2>
            <div className="space-y-3 pt-1">
              {cvData.experience.map((exp, idx) => (
                <div key={idx} className="text-xs space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-[#1B2C24]">{exp.role}</h3>
                    <span className="text-[11px] font-mono tabular-nums text-neutral-500">
                      {exp.period}
                    </span>
                  </div>
                  <p className="font-semibold text-[#385A45] text-[11px]">{exp.company}</p>
                  <p className="text-neutral-700 leading-relaxed text-[11px] whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Kỹ năng & Ngôn ngữ */}
          <div className="mt-5 space-y-2">
            <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
              Kỹ năng & Ngôn ngữ
            </h2>
            <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <h4 className="font-bold text-neutral-800 text-[11px] mb-1">Kỹ năng chuyên môn:</h4>
                <ul className="space-y-1 text-neutral-700 text-[11px]">
                  {cvData.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#385A45] mt-1.5 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-neutral-800 text-[11px] mb-1">Ngoại ngữ:</h4>
                <div className="space-y-1 text-neutral-700 text-[11px]">
                  {cvData.languages.map((lang, lIdx) => (
                    <div key={lIdx} className="flex justify-between">
                      <span className="font-medium">{lang.language}:</span>
                      <span className="text-neutral-500">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Chứng chỉ & Thành tích */}
          {cvData.certificates.length > 0 && (
            <div className="mt-5 space-y-2">
              <h2 className="text-xs font-bold tracking-wider uppercase text-[#2D4738] border-b border-[#EDE6D6] pb-1">
                Chứng chỉ & Thành tích nổi bật
              </h2>
              <ul className="pt-1 space-y-1 text-neutral-700 text-xs">
                {cvData.certificates.map((cert, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
