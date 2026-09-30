import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Search,
  ArrowRight,
  Sliders,
  TrendingUp,
  Clock,
  Compass,
  Briefcase,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Job, UserProfile, WorkType } from '../../types/job';
import { JobCard } from '../JobCard';
import { NavScreen } from '../Sidebar';

interface HomeViewProps {
  jobs: Job[];
  user: UserProfile;
  savedJobIds: Set<string>;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onStartChat: (job: Job) => void;
  onNavigate: (screen: NavScreen) => void;
  onOpenAIFinder: () => void;
  onUpdateRadius: (radius: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  jobs,
  user,
  savedJobIds,
  onToggleSave,
  onSelectJob,
  onStartChat,
  onNavigate,
  onOpenAIFinder,
  onUpdateRadius,
}) => {
  const [selectedRadius, setSelectedRadius] = useState<number>(user.radiusKm || 5);
  const [quickInput, setQuickInput] = useState('');

  // Jobs nearby within radius
  const nearbyJobs = jobs
    .filter((j) => j.distanceKm <= selectedRadius)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  // AI Recommended jobs (sorted by matchScore)
  const aiRecommendedJobs = [...jobs].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 4);

  const handleRadiusChange = (radius: number) => {
    setSelectedRadius(radius);
    onUpdateRadius(radius);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Banner in Moss Green & Cream */}
      <section className="relative overflow-hidden rounded-2xl bg-[#1B2C24] text-white shadow-xl border border-[#2D4738]">
        {/* Background photo overlay with measured contrast */}
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="/src/assets/images/hero_job_workspace_1790732853663.jpg"
            alt="Workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B2C24] via-[#1B2C24]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-6 md:p-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#385A45]/70 border border-[#4F755D] text-xs font-semibold text-[#EDE6D6] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Nền tảng Tuyển dụng & Hướng nghiệp thế hệ mới</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FAF8F2] tracking-tight leading-tight">
            Tìm việc làm phù hợp nhất <br className="hidden sm:inline" />
            với năng lực & lịch trình của bạn.
          </h1>

          <p className="mt-3 text-sm text-[#C7D9CC] leading-relaxed max-w-xl">
            Được trang bị AI thông minh giúp gợi ý công việc dựa trên ngành học, ca làm tối, part-time và khoảng cách gần bạn nhất tại {user.city}.
          </p>

          {/* Quick AI Prompt Box inside Hero */}
          <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
            <label className="block text-xs font-semibold text-[#EDE6D6] mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                Mô tả nhu cầu bằng tiếng Việt tự nhiên:
              </span>
              <span className="text-[11px] text-[#9EBFB5] hidden sm:inline">Ví dụ mẫu chuẩn:</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Ví dụ: Tôi là sinh viên năm 2 ngành tiếng Hàn, chưa có kinh nghiệm, muốn tìm việc part-time vào buổi tối..."
                className="flex-1 px-3.5 py-2.5 text-xs bg-white text-[#1B2C24] placeholder-neutral-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                onClick={onOpenAIFinder}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Phân tích</span>
              </button>
            </div>

            {/* Quick Sample Prompts */}
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={onOpenAIFinder}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#EDE6D6] text-left transition-colors truncate max-w-xs"
              >
                👉 "Tôi là SV năm 2 ngành tiếng Hàn, tìm việc part-time tối..."
              </button>
              <button
                type="button"
                onClick={() => onNavigate('test')}
                className="px-2 py-0.5 rounded bg-emerald-800/40 hover:bg-emerald-800/60 text-emerald-200 transition-colors flex items-center gap-1"
              >
                <Award className="w-3 h-3" />
                <span>Làm bài Test nghề nghiệp (10 câu)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section: Việc làm gần bạn (Radius Radar) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#EDE6D6]">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EDE6D6] text-[#2D4738] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#385A45]" />
              </div>
              <h2 className="text-sm font-bold text-[#1B2C24]">Việc làm gần bạn</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {nearbyJobs.length} việc làm
              </span>
            </div>
            <p className="text-xs text-[#4A7D5C] mt-1">
              Hiển thị các cơ hội việc làm xung quanh khu vực <strong>{user.district}, {user.city}</strong>
            </p>
          </div>

          {/* Radius selector buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-neutral-500 mr-1 hidden md:inline">Bán kính:</span>
            {[1, 3, 5, 10].map((km) => (
              <button
                key={km}
                type="button"
                onClick={() => handleRadiusChange(km)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedRadius === km
                    ? 'bg-[#2D4738] text-white shadow-sm'
                    : 'bg-[#F5F1E8] text-[#2D4738] hover:bg-[#EDE6D6]'
                }`}
              >
                ≤ {km} km
              </button>
            ))}
          </div>
        </div>

        {/* Nearby Jobs Grid */}
        {nearbyJobs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-[#EDE6D6] space-y-2">
            <MapPin className="w-8 h-8 mx-auto text-neutral-400" />
            <p className="text-xs font-bold text-[#1B2C24]">Không có việc làm trong bán kính {selectedRadius} km</p>
            <p className="text-xs text-neutral-500">Hãy thử mở rộng bán kính lên 5 km hoặc 10 km để xem nhiều vị trí hơn.</p>
            <button
              onClick={() => handleRadiusChange(10)}
              className="mt-2 px-4 py-2 rounded-lg bg-[#2D4738] text-white text-xs font-bold"
            >
              Mở rộng bán kính lên 10 km
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyJobs.slice(0, 6).map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.has(job.id)}
                onToggleSave={onToggleSave}
                onSelectJob={onSelectJob}
                onStartChat={onStartChat}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3. Section: AI Gợi ý việc làm theo ngành học & kinh nghiệm */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1B2C24] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI Đề xuất phù hợp với hồ sơ ({user.major})</span>
            </h2>
            <p className="text-xs text-[#4A7D5C] mt-0.5">
              Phân tích theo kỹ năng ngôn ngữ, kinh nghiệm và ca làm mong muốn của {user.fullName}
            </p>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-semibold text-[#2D4738] hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả việc làm</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiRecommendedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.has(job.id)}
              onToggleSave={onToggleSave}
              onSelectJob={onSelectJob}
              onStartChat={onStartChat}
            />
          ))}
        </div>
      </section>

      {/* 4. Career Tools Ribbon (CV Builder & Assessment Test) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => onNavigate('cv')}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#2D4738] to-[#1B2C24] text-white shadow-md cursor-pointer hover:shadow-lg transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
            <Briefcase className="w-5 h-5 text-emerald-300" />
          </div>
          <h3 className="text-base font-bold text-[#FAF8F2]">Tạo CV chuyên nghiệp chuẩn ATS</h3>
          <p className="text-xs text-[#C7D9CC] mt-1.5 leading-relaxed">
            Nhập thông tin cá nhân, bằng cấp, kỹ năng — Hệ thống tự động tạo CV đẹp mắt tông rêu/kem, hỗ trợ AI tối ưu hóa câu chữ và tải PDF ngay.
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
            <span>Bắt đầu tạo CV ngay</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          onClick={() => onNavigate('test')}
          className="p-6 rounded-2xl bg-[#EDE6D6] text-[#1B2C24] border border-[#DED3BD] shadow-sm cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2D4738] flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5 text-emerald-300" />
          </div>
          <h3 className="text-base font-bold text-[#1B2C24]">Làm bài Test nghề nghiệp (10 câu)</h3>
          <p className="text-xs text-[#4A7D5C] mt-1.5 leading-relaxed">
            Khám phá thế mạnh tiềm ẩn, sở thích và nhận bảng xếp hạng Top công việc tương thích 90%+ kèm gợi ý lộ trình phát triển.
          </p>
          <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#2D4738] group-hover:translate-x-1 transition-transform">
            <span>Bắt đầu trắc nghiệm</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>
    </div>
  );
};
