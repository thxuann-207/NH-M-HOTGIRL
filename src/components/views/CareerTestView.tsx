import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Briefcase,
  TrendingUp,
  Compass,
  Lightbulb,
  Loader2,
  DollarSign
} from 'lucide-react';
import { ASSESSMENT_QUESTIONS } from '../../data/assessmentQuestions';
import { AssessmentResult, Job } from '../../types/job';

interface CareerTestViewProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onStartChat: (job: Job) => void;
}

export const CareerTestView: React.FC<CareerTestViewProps> = ({
  jobs,
  onSelectJob,
  onStartChat,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const currentQ = ASSESSMENT_QUESTIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100);

  const handleSelectOption = (value: string) => {
    setAnswers({
      ...answers,
      [currentQ.id]: value,
    });
  };

  const handleNext = () => {
    if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleCompleteTest();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCompleteTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/career-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const json = await response.json();
      if (json.success && json.data) {
        setResult(json.data);
      }
    } catch (err) {
      console.error('Error analyzing test:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  };

  // Find job in catalog that matches top job titles
  const findJobInCatalog = (title: string) => {
    const tLower = title.toLowerCase();
    return jobs.find((j) => {
      const jTitle = j.title.toLowerCase();
      if (tLower.includes('trợ giảng') && jTitle.includes('trợ giảng')) return true;
      if (tLower.includes('cskh') && (jTitle.includes('cskh') || jTitle.includes('chăm sóc'))) return true;
      if (tLower.includes('dịch thuật') && jTitle.includes('dịch thuật')) return true;
      if (tLower.includes('nội dung') && (jTitle.includes('content') || jTitle.includes('nội dung'))) return true;
      if (tLower.includes('phục vụ') && jTitle.includes('phục vụ')) return true;
      return false;
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#EDE6D6] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#1B2C24] flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-700" />
            <span>Trắc Nghiệm Định Hướng Nghề Nghiệp (10 Câu Hỏi)</span>
          </h2>
          <p className="text-xs text-[#4A7D5C] mt-0.5">
            Dựa trên mô hình tâm lý hướng nghiệp kết hợp AI phân tích kỹ năng, sở thích và đề xuất Top việc làm phù hợp nhất
          </p>
        </div>

        {result && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#DED3BD] hover:bg-[#F5F1E8] text-[#1B2C24] text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại bài Test</span>
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-white p-12 rounded-2xl border border-[#EDE6D6] text-center space-y-3">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-700 mx-auto" />
          <h3 className="text-sm font-bold text-[#1B2C24]">Hệ thống AI đang phân tích hồ sơ tính cách của bạn...</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Tổng hợp dữ liệu từ 10 câu trả lời, đối chiếu năng lực và đo lường tỷ lệ tương thích với thị trường tuyển dụng.
          </p>
        </div>
      )}

      {/* In-Progress Test Questionnaire */}
      {!loading && !result && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#2D4738]">
                Câu hỏi {currentIndex + 1} / {ASSESSMENT_QUESTIONS.length}
              </span>
              <span className="font-semibold text-emerald-700 font-mono tabular-nums">
                {progressPercent}% Hoàn thành
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#EDE6D6] overflow-hidden">
              <div
                className="h-full bg-[#2D4738] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Scenario & Question */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A7D5C]">
              {currentQ.scenario}
            </span>
            <h3 className="text-base font-bold text-[#1B2C24] leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = answers[currentQ.id] === opt.value;
              return (
                <div
                  key={oIdx}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all duration-150 flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[#E3ECE6] border-[#385A45] shadow-sm'
                      : 'bg-[#FBF9F4] border-[#EDE6D6] hover:bg-white hover:border-[#9EBFB5]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-[#2D4738] bg-[#2D4738] text-white'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold text-[#1B2C24] leading-relaxed block">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-[#4A7D5C] mt-1 block">
                      Thiên hướng: {opt.trait}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper Navigation */}
          <div className="pt-4 border-t border-[#F5F1E8] flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#DED3BD] hover:bg-[#F5F1E8] text-[#1B2C24] text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold shadow-md transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              <span>{currentIndex === ASSESSMENT_QUESTIONS.length - 1 ? 'Xem Kết Quả' : 'Câu tiếp theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Completed Test Results Dashboard */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Section 1: Summary Matrix (Kỹ năng, Sở thích, Ngành phù hợp) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Kỹ năng nổi trội */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE6D6] shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-[#2D4738] font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kỹ năng nổi trội</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {result.skills.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#385A45] mt-1.5 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Sở thích cốt lõi */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE6D6] shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-[#2D4738] font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Sở thích cốt lõi</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {result.interests.map((interest, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#385A45] mt-1.5 shrink-0" />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Ngành nghề phù hợp */}
            <div className="p-5 rounded-2xl bg-white border border-[#EDE6D6] shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-[#2D4738] font-bold text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <span>Ngành nghề phù hợp</span>
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-700">
                {result.matchedIndustries.map((ind, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#385A45] mt-1.5 shrink-0" />
                    <span className="font-semibold text-[#1B2C24]">{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Top Công việc phù hợp nhất */}
          <div className="bg-white p-6 rounded-2xl border border-[#EDE6D6] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1B2C24] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Top Công việc phù hợp với bạn</span>
                </h3>
                <p className="text-xs text-[#4A7D5C] mt-0.5">
                  Xếp hạng theo độ phù hợp từ cao xuống thấp và liên kết trực tiếp với cơ hội việc làm thực tế
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {result.topJobs.map((item, idx) => {
                const matchedJob = findJobInCatalog(item.title);
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#FBF9F4] border border-[#EDE6D6] hover:border-[#6F9C7F] transition-all space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-[#2D4738] text-white font-bold text-xs flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-[#1B2C24]">{item.title}</h4>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          Phù hợp {item.matchPercentage}%
                        </span>
                        <span className="text-xs font-semibold text-[#2D4738] bg-[#EDE6D6] px-2.5 py-0.5 rounded-full">
                          {item.startingSalary}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-700 leading-relaxed bg-white p-3 rounded-lg border border-[#F5F1E8]">
                      <span className="font-semibold text-[#1B2C24]">Vì sao phù hợp:</span> {item.whyFit}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-1.5 flex-wrap text-xs">
                        <span className="text-[11px] text-neutral-500 font-semibold">Điểm mạnh:</span>
                        {item.keyStrengths?.map((st, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] px-2 py-0.5 rounded bg-white text-[#2D4738] border border-[#EDE6D6]"
                          >
                            {st}
                          </span>
                        ))}
                      </div>

                      {matchedJob ? (
                        <button
                          onClick={() => onSelectJob(matchedJob)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold transition-all shadow-sm shrink-0"
                        >
                          <span>Xem việc & Ứng tuyển</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-neutral-400">Đang cập nhật việc mới</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Roadmap Action Tip */}
          <div className="p-4 rounded-xl bg-[#E3ECE6] border border-[#9EBFB5] flex items-start gap-3 text-xs">
            <Lightbulb className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1B2C24] block mb-0.5">Lời khuyên phát triển từ chuyên gia:</span>
              <p className="text-neutral-700 leading-relaxed">{result.roadmapTip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
