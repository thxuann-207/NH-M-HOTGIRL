import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Paperclip,
  CheckCheck,
  Building,
  UserCheck,
  Phone,
  Mail,
  FileText,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { Conversation, ChatMessage, Job, UserProfile } from '../../types/job';

interface ChatViewProps {
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string, attachment?: { name: string; size: string }) => void;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  user: UserProfile;
}

export const ChatView: React.FC<ChatViewProps> = ({
  conversations,
  onSendMessage,
  jobs,
  onSelectJob,
  user,
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');

  const currentConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];
  const relatedJob = currentConv ? jobs.find((j) => j.id === currentConv.jobId) : null;

  const quickTemplates = [
    'Dạ em chào anh/chị, em rất quan tâm đến vị trí này và sẵn sàng nhận việc ạ!',
    'Dạ em có thể tham gia phỏng vấn trực tiếp vào chiều Thứ Năm lúc 14:30 ạ.',
    'Em xin gửi đính kèm bản CV chi tiết để anh/chị xem xét thêm ạ.',
    'Em có thể linh hoạt sắp xếp ca tối 18:00 - 22:00 theo yêu cầu của công ty.',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !currentConv) return;
    onSendMessage(currentConv.id, text);
    setInputText('');
  };

  const handleSendCV = () => {
    if (!currentConv) return;
    onSendMessage(
      currentConv.id,
      'Dạ em gửi đính kèm bản CV cá nhân cập nhật mới nhất của em ạ.',
      {
        name: `CV_${user.fullName.replace(/\s+/g, '')}_2026.pdf`,
        size: '1.4 MB',
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDE6D6] shadow-sm overflow-hidden flex flex-col md:flex-row h-[calc(100vh-140px)] min-h-[500px]">
      {/* Left Pane: Conversations List (1/3 width) */}
      <div className="w-full md:w-80 lg:w-96 border-r border-[#EDE6D6] flex flex-col shrink-0 bg-[#FBF9F4]">
        {/* Top Header */}
        <div className="p-4 border-b border-[#EDE6D6] bg-white">
          <h2 className="text-sm font-bold text-[#1B2C24] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#385A45]" />
            <span>Tin nhắn ({conversations.length})</span>
          </h2>
          <p className="text-[11px] text-[#4A7D5C] mt-0.5">Trao đổi trực tiếp với nhà tuyển dụng</p>
        </div>

        {/* List of chat threads */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#EDE6D6]">
          {conversations.map((conv) => {
            const isSelected = conv.id === selectedConvId;
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                  isSelected ? 'bg-[#E3ECE6]' : 'hover:bg-white'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.recruiter.avatar}
                    alt={conv.recruiter.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#4F755D]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {conv.recruiter.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-[#1B2C24] truncate">
                      {conv.recruiter.name}
                    </h3>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4A7D5C] truncate font-medium">
                    {conv.companyName}
                  </p>
                  <p className="text-[11px] text-neutral-600 truncate mt-1">
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Chat Conversation */}
      {currentConv ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Active Conversation Top Bar */}
          <div className="px-6 py-3.5 border-b border-[#EDE6D6] flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={currentConv.recruiter.avatar}
                  alt={currentConv.recruiter.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#4F755D]"
                />
                {currentConv.recruiter.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#1B2C24] flex items-center gap-1.5">
                  <span>{currentConv.recruiter.name}</span>
                  <span className="text-[10px] font-normal text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Đang online
                  </span>
                </h3>
                <p className="text-[11px] text-[#4A7D5C]">
                  {currentConv.recruiter.position} · {currentConv.companyName}
                </p>
              </div>
            </div>

            {relatedJob && (
              <button
                onClick={() => onSelectJob(relatedJob)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F1E8] hover:bg-[#EDE6D6] text-[#2D4738] text-xs font-semibold transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Xem việc: {relatedJob.title.slice(0, 24)}...</span>
              </button>
            )}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FBF9F4]">
            {currentConv.messages.map((msg) => {
              const isUser = msg.senderType === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-neutral-400 mb-1 px-1">
                    {msg.senderName} · {msg.timestamp}
                  </span>

                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-[#2D4738] text-white rounded-br-none'
                        : 'bg-white text-neutral-800 border border-[#EDE6D6] rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* CV Attachment Box if present */}
                    {msg.cvAttachment && (
                      <div
                        className={`mt-2.5 p-2.5 rounded-xl flex items-center justify-between gap-3 text-xs ${
                          isUser
                            ? 'bg-white/15 text-white border border-white/20'
                            : 'bg-[#F5F1E8] text-[#1B2C24] border border-[#DED3BD]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 shrink-0 text-emerald-400" />
                          <span className="font-semibold truncate text-[11px]">
                            {msg.cvAttachment.name}
                          </span>
                        </div>
                        <span className="text-[10px] opacity-75 shrink-0">
                          {msg.cvAttachment.size}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Pre-filled Template Reply Chips */}
          <div className="px-4 py-2 bg-white border-t border-[#F5F1E8] flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-neutral-400 shrink-0 font-medium">Mẫu nhanh:</span>
            {quickTemplates.map((tpl, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(tpl)}
                className="px-2.5 py-1 rounded-lg bg-[#F5F1E8] hover:bg-[#EDE6D6] text-[#2D4738] whitespace-nowrap transition-colors shrink-0"
              >
                {tpl.slice(0, 36)}...
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-[#EDE6D6] bg-white flex items-center gap-2">
            <button
              onClick={handleSendCV}
              className="p-2 rounded-xl text-[#385A45] hover:bg-[#F5F1E8] transition-colors shrink-0"
              title="Đính kèm CV của bạn"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder="Nhập tin nhắn trao đổi với nhà tuyển dụng..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              className="flex-1 px-4 py-2.5 text-xs bg-[#FBF9F4] text-[#1B2C24] border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
            />

            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-neutral-400 text-xs">
          Chọn một cuộc trò chuyện để bắt đầu
        </div>
      )}
    </div>
  );
};
