import React from 'react';
import {
  Compass,
  Search,
  FileText,
  BookmarkCheck,
  Send,
  MessageSquare,
  User,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  LogOut,
  MapPin,
  Briefcase
} from 'lucide-react';
import { UserProfile } from '../types/job';

export type NavScreen = 
  | 'home'
  | 'search'
  | 'applications'
  | 'cv'
  | 'saved'
  | 'chat'
  | 'test'
  | 'profile';

interface SidebarProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  user: UserProfile;
  unreadMessagesCount: number;
  unreadNotificationsCount: number;
  activeApplicationsCount: number;
  savedJobsCount: number;
  onOpenAIFinder: () => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  lang?: import('../types/job').Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  collapsed,
  onToggleCollapse,
  user,
  unreadMessagesCount,
  activeApplicationsCount,
  savedJobsCount,
  onOpenAIFinder,
  onOpenAuth,
  onLogout,
  lang = 'vi',
}) => {
  const navLabels = {
    vi: {
      home: 'Trang chủ',
      search: 'Tìm việc làm',
      applications: 'Việc đã ứng tuyển',
      cv: 'CV cá nhân',
      saved: 'Việc đã lưu',
      chat: 'Chat nhà tuyển dụng',
      test: 'Test nghề nghiệp',
      profile: 'Trang cá nhân',
    },
    en: {
      home: 'Home',
      search: 'Search Jobs',
      applications: 'Applications',
      cv: 'ATS Resume / CV',
      saved: 'Saved Jobs',
      chat: 'Recruiter Chat',
      test: 'Career Test',
      profile: 'My Profile',
    },
    ko: {
      home: '홈',
      search: '일자리 검색',
      applications: '지원 현황',
      cv: '이력서 관리',
      saved: '저장한 공고',
      chat: '채용담당자 채팅',
      test: '진로 적성 검사',
      profile: '내 프로필',
    },
  }[lang];

  const navItems = [
    {
      id: 'home' as NavScreen,
      label: navLabels.home,
      icon: Compass,
      badge: null,
    },
    {
      id: 'search' as NavScreen,
      label: navLabels.search,
      icon: Search,
      badge: null,
    },
    {
      id: 'applications' as NavScreen,
      label: navLabels.applications,
      icon: Send,
      badge: activeApplicationsCount > 0 ? activeApplicationsCount : null,
    },
    {
      id: 'cv' as NavScreen,
      label: navLabels.cv,
      icon: FileText,
      badge: 'ATS',
      badgeColor: 'bg-[#385A45] text-white',
    },
    {
      id: 'saved' as NavScreen,
      label: navLabels.saved,
      icon: BookmarkCheck,
      badge: savedJobsCount > 0 ? savedJobsCount : null,
    },
    {
      id: 'chat' as NavScreen,
      label: navLabels.chat,
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'test' as NavScreen,
      label: navLabels.test,
      icon: Award,
      badge: '10 Qs',
      badgeColor: 'bg-[#EDE6D6] text-[#2D4738]',
    },
    {
      id: 'profile' as NavScreen,
      label: navLabels.profile,
      icon: User,
      badge: null,
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#1B2C24] text-[#F5F1E8] transition-all duration-300 z-30 flex flex-col justify-between border-r border-[#2D4738] shadow-xl ${
        collapsed ? 'w-20' : 'w-64 lg:w-72'
      }`}
    >
      {/* Top Brand Zone */}
      <div>
        <div className="flex items-center justify-between px-5 h-20 border-b border-[#2D4738]">
          {!collapsed ? (
            <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 rounded-xl bg-[#385A45] flex items-center justify-center text-white font-bold text-xl shadow-md border border-[#4F755D]/40">
                <Briefcase className="w-5 h-5 text-[#FAF8F2]" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-[#FAF8F2] flex items-center gap-1.5">
                  Job
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#385A45] text-[#EDE6D6]">
                    Tuyển dụng
                  </span>
                </h1>
                <p className="text-xs text-[#9EBFB5] truncate">Nền tảng tuyển dụng & Việc làm</p>
              </div>
            </div>
          ) : (
            <div
              className="w-10 h-10 mx-auto rounded-xl bg-[#385A45] flex items-center justify-center text-white font-bold text-xl cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <Briefcase className="w-5 h-5 text-[#FAF8F2]" />
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            aria-label="Thu gọn hoặc mở rộng thanh menu"
            className="p-1.5 rounded-lg text-[#9EBFB5] hover:text-[#FAF8F2] hover:bg-[#2D4738] transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* AI Quick Callout Button */}
        <div className="px-3 pt-4 pb-2">
          <button
            onClick={onOpenAIFinder}
            className={`w-full group flex items-center gap-3 px-3.5 py-3 rounded-xl bg-gradient-to-r from-[#2D4738] to-[#385A45] hover:from-[#385A45] hover:to-[#4A7D5C] text-[#FAF8F2] border border-[#4F755D]/50 shadow-sm transition-all duration-200 ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Tìm việc bằng AI thông minh"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300 text-emerald-300" />
            </div>
            {!collapsed && (
              <div className="text-left overflow-hidden">
                <span className="text-xs font-semibold block text-[#FAF8F2]">Tìm việc bằng AI</span>
                <span className="text-[11px] text-[#C7D9CC] block truncate">Nhập yêu cầu bằng tiếng Việt</span>
              </div>
            )}
          </button>
        </div>

        {/* Navigation items list */}
        <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-[#385A45] text-white shadow-sm font-semibold'
                    : 'text-[#C7D9CC] hover:bg-[#2D4738]/70 hover:text-white'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform ${
                    isActive ? 'text-white' : 'text-[#9EBFB5] group-hover:text-white'
                  }`}
                />
                {!collapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!collapsed && item.badge !== null && (
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-[#22372C] text-[#C7D9CC]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {collapsed && item.badge !== null && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      <div className="p-3 border-t border-[#2D4738] bg-[#16241D]">
        {!collapsed ? (
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#22372C] transition-colors">
            <div
              className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
              onClick={() => onNavigate('profile')}
            >
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-9 h-9 rounded-full object-cover border border-[#4F755D]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#FAF8F2] truncate">{user.fullName}</p>
                <p className="text-[11px] text-[#9EBFB5] truncate flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {user.district}, {user.city}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout || onOpenAuth}
              title="Đăng xuất"
              className="p-1.5 rounded-lg text-[#9EBFB5] hover:text-white hover:bg-[#2D4738] transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => onNavigate('profile')}
              title={user.fullName}
              className="p-1 rounded-full hover:ring-2 hover:ring-emerald-400 transition-all"
            >
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-8 h-8 rounded-full object-cover border border-[#4F755D]"
              />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
