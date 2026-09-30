import React, { useState } from 'react';
import { Sidebar, NavScreen } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeView } from './components/views/HomeView';
import { JobSearchView } from './components/views/JobSearchView';
import { ApplicationsView } from './components/views/ApplicationsView';
import { CVBuilderView } from './components/views/CVBuilderView';
import { SavedJobsView } from './components/views/SavedJobsView';
import { ChatView } from './components/views/ChatView';
import { CareerTestView } from './components/views/CareerTestView';
import { ProfileView } from './components/views/ProfileView';
import { AIFinderModal } from './components/AIFinderModal';
import { JobDetailModal } from './components/JobDetailModal';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';

import { Job, UserProfile, CVData, Application, Conversation, NotificationItem, Language, Currency } from './types/job';
import { INITIAL_JOBS } from './data/mockJobs';
import {
  INITIAL_USER_PROFILE,
  INITIAL_CV_DATA,
  INITIAL_APPLICATIONS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS
} from './data/mockUserData';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lang, setLang] = useState<Language>('vi');
  const [currency, setCurrency] = useState<Currency>('VND');

  // App Data State
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('job_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fullName === 'Nguyễn Thu Uyên' || parsed.email?.includes('thuuyen')) {
          localStorage.setItem('job_user_profile', JSON.stringify(INITIAL_USER_PROFILE));
          return INITIAL_USER_PROFILE;
        }
        return {
          ...INITIAL_USER_PROFILE,
          ...parsed,
          skills: (parsed.skills && parsed.skills.length > 0) ? parsed.skills : INITIAL_USER_PROFILE.skills,
          languages: (parsed.languages && parsed.languages.length > 0) ? parsed.languages : INITIAL_USER_PROFILE.languages,
        };
      }
    } catch (e) {
      console.error('Error loading saved user profile:', e);
    }
    return INITIAL_USER_PROFILE;
  });
  const [cvData, setCvData] = useState<CVData>(INITIAL_CV_DATA);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set(['job-1', 'job-3']));

  // Search query in Header
  const [globalSearch, setGlobalSearch] = useState('');

  // Modals State
  const [isAIFinderOpen, setIsAIFinderOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);

  // Floating Toast State
  const [activeToast, setActiveToast] = useState<NotificationItem | null>(null);

  // Screen titles localized
  const screenTitlesMap: Record<Language, Record<NavScreen, string>> = {
    vi: {
      home: 'Trang chủ',
      search: 'Tìm kiếm việc làm',
      applications: 'Theo dõi hồ sơ ứng tuyển',
      cv: 'CV cá nhân & Chuẩn ATS',
      saved: 'Việc làm đã lưu',
      chat: 'Trao đổi với nhà tuyển dụng',
      test: 'Trắc nghiệm định hướng nghề nghiệp',
      profile: 'Trang cá nhân',
    },
    en: {
      home: 'Home',
      search: 'Search Jobs & Openings',
      applications: 'Application Tracker',
      cv: 'ATS Resume Builder',
      saved: 'Saved Jobs',
      chat: 'Recruiter Chat',
      test: 'Career Orientation Quiz',
      profile: 'Candidate Profile',
    },
    ko: {
      home: '홈',
      search: '일자리 검색 및 필터',
      applications: '지원 현황 관리',
      cv: 'ATS 이력서 관리',
      saved: '스크랩한 공고',
      chat: '채용담당자 대화',
      test: '진로 적성 검사',
      profile: '내 프로필 설정',
    },
  };

  const currentScreenTitle = screenTitlesMap[lang][currentScreen] || screenTitlesMap.vi[currentScreen];

  // 1. Toggle Bookmark / Save Job
  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  };

  // 2. Add In-App Notification & Trigger Toast
  const handleAddNotification = (notif: NotificationItem) => {
    setNotifications((prev) => [notif, ...prev]);
    setActiveToast(notif);
  };

  // 3. Apply to Job Handler
  const handleApplyJob = (job: Job, cvName: string, coverNote: string) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.company,
      companyLogo: job.companyLogo,
      appliedDate: new Date().toLocaleDateString('vi-VN'),
      status: 'submitted',
      statusText: 'Đã ứng tuyển',
      hrNotes: `Ứng viên đã nộp CV "${cvName}". Lời nhắn: "${coverNote}"`,
      cvAttachedName: cvName,
      updatedAt: 'Vừa xong',
    };

    setApplications((prev) => [newApp, ...prev]);

    // Send confirmation notification
    const confNotif: NotificationItem = {
      id: `notif-app-${Date.now()}`,
      title: `Ứng tuyển thành công: ${job.title}`,
      message: `Hồ sơ của bạn đã được chuyển đến bộ phận nhân sự của ${job.company}. Bạn có thể theo dõi tiến độ trong mục Theo dõi hồ sơ.`,
      type: 'application_update',
      timestamp: 'Vừa xong',
      read: false,
      jobId: job.id,
    };
    handleAddNotification(confNotif);
  };

  // 4. Send Chat Message to Recruiter Handler
  const handleSendMessage = (
    convId: string,
    text: string,
    attachment?: { name: string; size: string }
  ) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderType: 'user' as const,
      senderName: user.fullName,
      text,
      timestamp: 'Vừa xong',
      cvAttachment: attachment,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: 'Vừa xong',
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );

    // Simulated Smart Employer Auto-Reply after 2 seconds
    setTimeout(() => {
      const activeConv = conversations.find((c) => c.id === convId);
      if (!activeConv) return;

      const replyText =
        attachment
          ? `Cảm ơn ${user.fullName} đã gửi CV! Phòng Nhân sự ${activeConv.companyName} đã tiếp nhận và sẽ xem xét phản hồi bạn sớm nhất nhé.`
          : `Chào ${user.fullName}, bên mình đã nhận được tin nhắn của bạn. Bộ phận tuyển dụng sẽ xếp lịch trao đổi thêm với bạn nhé!`;

      const recruiterReply = {
        id: `msg-rep-${Date.now()}`,
        senderId: activeConv.recruiter.id,
        senderType: 'recruiter' as const,
        senderName: activeConv.recruiter.name,
        text: replyText,
        timestamp: 'Vừa xong',
      };

      setConversations((latest) =>
        latest.map((c) => {
          if (c.id === convId) {
            return {
              ...c,
              lastMessage: replyText,
              lastMessageTime: 'Vừa xong',
              messages: [...c.messages, recruiterReply],
            };
          }
          return c;
        })
      );

      // Notification toast
      handleAddNotification({
        id: `notif-chat-${Date.now()}`,
        title: `Tin nhắn mới từ ${activeConv.recruiter.name}`,
        message: replyText,
        type: 'message',
        timestamp: 'Vừa xong',
        read: false,
      });
    }, 1800);
  };

  // 5. Start Chat with Job's Recruiter
  const handleStartChatWithJob = (job: Job) => {
    // Find existing conversation with this job/recruiter or create one
    let conv = conversations.find((c) => c.jobId === job.id || c.recruiter.id === job.recruiter.id);
    if (!conv) {
      conv = {
        id: `conv-${Date.now()}`,
        recruiter: job.recruiter,
        companyName: job.company,
        jobId: job.id,
        jobTitle: job.title,
        lastMessage: `Xin chào! Tôi quan tâm đến vị trí ${job.title}`,
        lastMessageTime: 'Vừa xong',
        unreadCount: 0,
        messages: [
          {
            id: `msg-init-${Date.now()}`,
            senderId: user.id,
            senderType: 'user',
            senderName: user.fullName,
            text: `Chào anh/chị tuyển dụng tại ${job.company}, em là ${user.fullName}. Em rất quan tâm đến công việc "${job.title}" và muốn trao đổi thêm về lịch làm việc ạ.`,
            timestamp: 'Vừa xong',
          },
        ],
      };
      setConversations((prev) => [conv!, ...prev]);
    }
    setCurrentScreen('chat');
  };

  // Check if current user has already applied to a job
  const hasUserApplied = (jobId: string) => {
    return applications.some((app) => app.jobId === jobId);
  };

  // 6. Handle User Profile Updates & Persistence
  const handleUpdateUserProfile = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    try {
      localStorage.setItem('job_user_profile', JSON.stringify(updatedUser));
    } catch (e) {
      console.error('Failed to save user profile to localStorage:', e);
    }
    // Also sync basic CV fields
    setCvData((prev) => ({
      ...prev,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: `${updatedUser.district}, ${updatedUser.city}`,
      avatarUrl: updatedUser.avatar,
    }));
  };

  // 7. Handle User Logout & Restore Original Profile
  const handleLogout = () => {
    setUser(INITIAL_USER_PROFILE);
    try {
      localStorage.removeItem('job_user_profile');
    } catch (e) {
      console.error(e);
    }
    setCvData((prev) => ({
      ...prev,
      fullName: INITIAL_USER_PROFILE.fullName,
      email: INITIAL_USER_PROFILE.email,
      phone: INITIAL_USER_PROFILE.phone,
      address: `${INITIAL_USER_PROFILE.district}, ${INITIAL_USER_PROFILE.city}`,
      avatarUrl: INITIAL_USER_PROFILE.avatar,
    }));
    handleAddNotification({
      id: `notif-logout-${Date.now()}`,
      title: 'Đã đăng xuất',
      message: 'Tài khoản đã đăng xuất. Thông tin hồ sơ được giữ nguyên bản ban đầu.',
      type: 'message',
      timestamp: 'Vừa xong',
      read: false,
    });
  };

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#1B2C24] flex">
      {/* 1. Left Vertical Slidebar Navigation */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        user={user}
        unreadMessagesCount={unreadMessagesCount}
        unreadNotificationsCount={unreadNotificationsCount}
        activeApplicationsCount={applications.length}
        savedJobsCount={savedJobIds.size}
        onOpenAIFinder={() => setIsAIFinderOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        lang={lang}
      />

      {/* 2. Right Workspace Content Area */}
      <div
        className={`flex-1 transition-all duration-300 min-w-0 flex flex-col min-h-screen ${
          sidebarCollapsed ? 'ml-20' : 'ml-64 lg:ml-72'
        }`}
      >
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          screenTitle={currentScreenTitle}
          user={user}
          notifications={notifications}
          onOpenAIFinder={() => setIsAIFinderOpen(true)}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onSelectJobId={(id) => {
            const j = jobs.find((item) => item.id === id);
            if (j) setSelectedJobForDetail(j);
          }}
          onMarkNotificationsRead={() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          }}
          onOpenAuth={() => setIsAuthOpen(true)}
          searchQuery={globalSearch}
          onSearchChange={(q) => {
            setGlobalSearch(q);
            if (currentScreen !== 'search' && q.trim().length > 0) {
              setCurrentScreen('search');
            }
          }}
          lang={lang}
          onLanguageChange={setLang}
          currency={currency}
          onCurrencyChange={setCurrency}
        />

        {/* Main Work Area View Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentScreen === 'home' && (
            <HomeView
              jobs={jobs}
              user={user}
              savedJobIds={savedJobIds}
              onToggleSave={handleToggleSave}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenAIFinder={() => setIsAIFinderOpen(true)}
              onUpdateRadius={(rad) => handleUpdateUserProfile({ ...user, radiusKm: rad })}
            />
          )}

          {currentScreen === 'search' && (
            <JobSearchView
              jobs={jobs}
              savedJobIds={savedJobIds}
              onToggleSave={handleToggleSave}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
              searchQuery={globalSearch}
              onSearchChange={setGlobalSearch}
              user={user}
              onUpdateUser={handleUpdateUserProfile}
              lang={lang}
              currency={currency}
              onCurrencyChange={setCurrency}
            />
          )}

          {currentScreen === 'applications' && (
            <ApplicationsView
              applications={applications}
              jobs={jobs}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
            />
          )}

          {currentScreen === 'cv' && (
            <CVBuilderView
              cvData={cvData}
              onUpdateCV={setCvData}
              user={user}
            />
          )}

          {currentScreen === 'saved' && (
            <SavedJobsView
              jobs={jobs}
              savedJobIds={savedJobIds}
              onToggleSave={handleToggleSave}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
              onNavigate={(screen) => setCurrentScreen(screen)}
            />
          )}

          {currentScreen === 'chat' && (
            <ChatView
              conversations={conversations}
              onSendMessage={handleSendMessage}
              jobs={jobs}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              user={user}
            />
          )}

          {currentScreen === 'test' && (
            <CareerTestView
              jobs={jobs}
              onSelectJob={(job) => setSelectedJobForDetail(job)}
              onStartChat={handleStartChatWithJob}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileView
              user={user}
              onUpdateUser={handleUpdateUserProfile}
              onOpenAuth={() => setIsAuthOpen(true)}
              onLogout={handleLogout}
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* 3. Global AI Natural Language Job Matcher Modal */}
      <AIFinderModal
        isOpen={isAIFinderOpen}
        onClose={() => setIsAIFinderOpen(false)}
        jobs={jobs}
        onSelectJob={(job) => setSelectedJobForDetail(job)}
        onAddNotification={handleAddNotification}
      />

      {/* 4. Global Job Details & Application Modal */}
      <JobDetailModal
        job={selectedJobForDetail}
        isOpen={selectedJobForDetail !== null}
        onClose={() => setSelectedJobForDetail(null)}
        isSaved={selectedJobForDetail ? savedJobIds.has(selectedJobForDetail.id) : false}
        onToggleSave={handleToggleSave}
        hasApplied={selectedJobForDetail ? hasUserApplied(selectedJobForDetail.id) : false}
        onApplyJob={handleApplyJob}
        onStartChat={handleStartChatWithJob}
        user={user}
        lang={lang}
        defaultCurrency={currency}
      />

      {/* 5. Fast Authentication & Profile Switcher Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        onAddNotification={handleAddNotification}
        onSelectUser={(u) => handleUpdateUserProfile(u)}
      />

      {/* 6. Floating Instant Notification Toast */}
      <NotificationToast
        notification={activeToast}
        onClose={() => setActiveToast(null)}
        onClick={() => {
          if (activeToast?.type === 'application_update') {
            setCurrentScreen('applications');
          } else if (activeToast?.type === 'message') {
            setCurrentScreen('chat');
          } else if (activeToast?.jobId) {
            const j = jobs.find((item) => item.id === activeToast.jobId);
            if (j) setSelectedJobForDetail(j);
          }
        }}
      />
    </div>
  );
}
