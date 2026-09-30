import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  CheckCircle,
  Briefcase,
  Clock,
  ArrowRight,
  BellRing,
  Lightbulb
} from 'lucide-react';
import { Job, NotificationItem } from '../types/job';

interface AIFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onAddNotification: (notification: NotificationItem) => void;
}

interface SuggestedRole {
  role: string;
  fitScore: number;
  scheduleMatch: string;
  reason: string;
  recommendedIndustries?: string[];
}

interface AIResult {
  summary: string;
  suggestedRoles: SuggestedRole[];
  advice: string;
  searchKeywords: string[];
}

export const AIFinderModal: React.FC<AIFinderModalProps> = ({
  isOpen,
  onClose,
  jobs,
  onSelectJob,
  onAddNotification,
}) => {
  const [prompt, setPrompt] = useState(
    'Tôi là sinh viên năm 2 ngành tiếng Hàn, chưa có kinh nghiệm, muốn tìm việc part-time vào buổi tối.'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [notificationSent, setNotificationSent] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Tôi là sinh viên năm 2 ngành tiếng Hàn, chưa có kinh nghiệm, muốn tìm việc part-time vào buổi tối.',
    'Tôi học chuyên ngành Marketing, có thể quay dựng TikTok cơ bản, muốn tìm việc linh hoạt.',
    'Tôi là sinh viên CNTT năm cuối, nắm vững React và TypeScript, tìm việc Junior/Intern gần Quận 1 hoặc Thủ Đức.',
    'Tôi thích giao tiếp, thích pha chế cà phê, muốn tìm việc Barista/phục vụ ca gãy tại Quận 3.',
  ];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const input = textToAnalyze || prompt;
    if (!input.trim()) return;

    setLoading(true);
    setNotificationSent(false);

    try {
      const response = await fetch('/api/ai/match-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setResult(json.data);

        // Send instant detailed in-app notification as requested
        const rolesList = json.data.suggestedRoles
          ?.map((r: SuggestedRole) => r.role)
          .slice(0, 3)
          .join(', ');

        const newNotification: NotificationItem = {
          id: `notif-ai-${Date.now()}`,
          title: 'AI đã đề xuất 5 công việc phù hợp nhất với bạn',
          message: `Dựa trên yêu cầu của bạn, AI đề xuất các vai trò: ${rolesList}... Cùng mẹo ứng tuyển và việc làm sẵn có gần bạn!`,
          type: 'ai_match',
          timestamp: 'Vừa xong',
          read: false,
        };

        onAddNotification(newNotification);
        setNotificationSent(true);
      }
    } catch (err) {
      console.error('Error analyzing prompt:', err);
    } finally {
      setLoading(false);
    }
  };

  // Find matching real jobs from our job list based on keywords or roles
  const findMatchingJobForRole = (roleName: string) => {
    const rLower = roleName.toLowerCase();
    return jobs.find((j) => {
      const tLower = j.title.toLowerCase();
      if (rLower.includes('trợ giảng') && tLower.includes('trợ giảng')) return true;
      if (rLower.includes('cskh') && (tLower.includes('cskh') || tLower.includes('chăm sóc'))) return true;
      if (rLower.includes('dịch thuật') && tLower.includes('dịch thuật')) return true;
      if (rLower.includes('phục vụ') && tLower.includes('phục vụ')) return true;
      if (rLower.includes('bán hàng') && tLower.includes('bán hàng')) return true;
      if (rLower.includes('marketing') && tLower.includes('content')) return true;
      if (rLower.includes('react') && tLower.includes('react')) return true;
      return false;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F2] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#DED3BD] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1B2C24] text-white flex items-center justify-between border-b border-[#2D4738]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#FAF8F2]">Tìm việc thông minh bằng AI</h3>
              <p className="text-xs text-[#9EBFB5]">Nhập tình trạng học vấn, mong muốn ca làm, AI sẽ phân tích ngay</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#9EBFB5] hover:text-white hover:bg-[#2D4738] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Prompt input card */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-[#1B2C24] flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-700" />
              Mô tả ngắn về bạn và công việc mong muốn:
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ví dụ: Tôi là sinh viên năm 2 ngành tiếng Hàn, chưa có kinh nghiệm, muốn tìm việc part-time vào buổi tối..."
                className="w-full p-3.5 text-xs bg-white text-[#1B2C24] rounded-xl border border-[#DED3BD] focus:outline-none focus:ring-2 focus:ring-[#385A45] focus:border-transparent placeholder-[#9EBFB5] shadow-inner leading-relaxed"
              />
            </div>

            {/* Quick prompt suggestions */}
            <div>
              <span className="text-[11px] font-medium text-[#4A7D5C] block mb-1.5">
                Câu gợi ý mẫu phổ biến:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPrompt(qp);
                      handleAnalyze(qp);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#EDE6D6] hover:bg-[#DED3BD] text-[#2D4738] transition-colors text-left truncate max-w-full"
                  >
                    "{qp.slice(0, 48)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[#6F9C7F]">
                Hỗ trợ phân tích chuyên sâu bởi Gemini AI
              </span>
              <button
                onClick={() => handleAnalyze()}
                disabled={loading || !prompt.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                    <span>Đang phân tích dữ liệu...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Phân tích & Tìm việc ngay</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Notification Alert Banner when analyzed */}
          {notificationSent && (
            <div className="p-3.5 rounded-xl bg-[#E3ECE6] border border-[#9EBFB5] flex items-center justify-between animate-in fade-in duration-300">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1B2C24]">
                    Đã gửi thông báo chi tiết đến điện thoại/hộp thư của bạn!
                  </p>
                  <p className="text-[11px] text-[#2D4738]">
                    Hệ thống đã lưu 5 vị trí phù hợp vào danh mục theo dõi và thông báo việc mới.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-600 text-white">
                Vừa kích hoạt
              </span>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="space-y-4 pt-2 border-t border-[#DED3BD]">
              {/* Summary */}
              <div className="p-4 rounded-xl bg-white border border-[#EDE6D6] shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#385A45] mb-1">
                  Đánh giá tổng quan từ AI:
                </h4>
                <p className="text-xs text-[#1B2C24] leading-relaxed">{result.summary}</p>
                <div className="mt-2.5 pt-2.5 border-t border-[#F5F1E8] flex items-center gap-1.5 text-xs text-[#2D4738] bg-[#F5F1E8] p-2 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-[11px]">
                    <strong>Lời khuyên:</strong> {result.advice}
                  </span>
                </div>
              </div>

              {/* 5 Suggested Roles list */}
              <div>
                <h4 className="text-xs font-bold text-[#1B2C24] mb-2 flex items-center justify-between">
                  <span>Các công việc được đề xuất ({result.suggestedRoles.length} vị trí):</span>
                  <span className="text-[11px] font-normal text-[#4A7D5C]">Xếp theo độ phù hợp</span>
                </h4>

                <div className="space-y-2.5">
                  {result.suggestedRoles.map((item, idx) => {
                    const matchedJob = findMatchingJobForRole(item.role);
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-white border border-[#EDE6D6] hover:border-[#6F9C7F] transition-all shadow-sm group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#EDE6D6] text-[#2D4738] font-bold text-[10px] flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <h5 className="text-xs font-bold text-[#1B2C24] truncate group-hover:text-[#385A45] transition-colors">
                                {item.role}
                              </h5>
                              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                                Phù hợp {item.fitScore}%
                              </span>
                            </div>

                            <p className="text-[11px] text-[#4A7D5C] mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#6F9C7F] shrink-0" />
                              <span>{item.scheduleMatch}</span>
                            </p>

                            <p className="text-[11px] text-neutral-600 mt-1.5 leading-relaxed bg-[#FBF9F4] p-2 rounded-lg">
                              {item.reason}
                            </p>
                          </div>

                          {matchedJob && (
                            <button
                              onClick={() => {
                                onSelectJob(matchedJob);
                                onClose();
                              }}
                              className="shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg bg-[#2D4738] hover:bg-[#385A45] text-white text-xs font-semibold shadow-sm transition-all"
                            >
                              <span>Xem việc</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F5F1E8] border-t border-[#DED3BD] flex items-center justify-between text-xs text-[#4A7D5C]">
          <span>Gợi ý dựa trên cơ sở dữ liệu việc làm thực tế tại TP.HCM & Hà Nội</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white border border-[#DED3BD] text-[#1B2C24] hover:bg-[#EDE6D6] font-medium transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
