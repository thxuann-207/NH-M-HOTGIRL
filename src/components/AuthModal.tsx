import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  Phone,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
  AlertCircle,
  HelpCircle,
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../types/job';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  onAddNotification?: (notif: NotificationItem) => void;
}

type AuthTab = 'login' | 'register' | 'forgot_password';
type SocialProvider = 'google' | 'facebook' | 'apple';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
  onAddNotification,
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [accountType, setAccountType] = useState<'candidate' | 'recruiter'>('candidate');

  // Login form state
  const [loginEmail, setLoginEmail] = useState(currentUser.email || '');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regMajor, setRegMajor] = useState('');

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState(currentUser.email);
  const [forgotSent, setForgotSent] = useState(false);

  // Social login loading/popup simulation state
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);
  const [authErrorMsg, setAuthErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerLoginSuccess = (userObj: UserProfile, providerName: string) => {
    setAuthSuccessMsg(`Đăng nhập thành công qua ${providerName}! Chào mừng ${userObj.fullName}.`);
    onSelectUser(userObj);

    if (onAddNotification) {
      onAddNotification({
        id: `notif-auth-${Date.now()}`,
        title: `Đăng nhập thành công với ${providerName}`,
        message: `Chào mừng ${userObj.fullName} đã quay trở lại Job - Nền tảng tuyển dụng & Việc làm!`,
        type: 'message',
        timestamp: 'Vừa xong',
        read: false,
      });
    }

    setTimeout(() => {
      setAuthSuccessMsg(null);
      onClose();
    }, 1200);
  };

  // 1. Social Login Handlers
  const handleSocialLogin = (provider: SocialProvider) => {
    setSocialLoading(provider);
    setAuthErrorMsg(null);

    setTimeout(() => {
      setSocialLoading(null);

      if (provider === 'google') {
        const googleUser: UserProfile = {
          id: `google-${Date.now()}`,
          fullName: 'Lý Gia Hân',
          email: 'lygiahan220600@gmail.com',
          phone: '0909 112 233',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          address: 'Quận 1, TP. Hồ Chí Minh',
          district: 'Quận 1',
          city: 'TP. Hồ Chí Minh',
          studentStatus: 'Cử nhân Ngôn ngữ & Kinh doanh',
          major: 'Tiếng Hàn & Thương mại Quốc tế',
          university: 'Đại học Quốc gia TP.HCM',
          bio: 'Tài khoản đăng nhập bảo mật qua Google One Tap. Tìm kiếm cơ hội việc làm linh hoạt ca tối hoặc bán thời gian.',
          skills: ['Tiếng Hàn giao tiếp', 'Tiếng Anh B2', 'Chăm sóc khách hàng', 'Dịch thuật', 'Tin học văn phòng'],
          languages: ['Tiếng Việt', 'Tiếng Hàn (TOPIK 3)', 'Tiếng Anh'],
          preferredWorkTypes: ['Bán thời gian (Part-time)', 'Ca tối', 'Linh hoạt'],
          preferredSchedule: 'Buổi tối từ 18:00 các ngày trong tuần',
          preferredSalary: '6 - 10 triệu / tháng',
          preferredLocation: 'Quận 1, Quận 3, Bình Thạnh',
          radiusKm: 5,
        };
        triggerLoginSuccess(googleUser, 'Google');
      } else if (provider === 'facebook') {
        const fbUser: UserProfile = {
          id: `fb-${Date.now()}`,
          fullName: 'Lý Gia Hân',
          email: 'lygiahan220600@gmail.com',
          phone: '0909 112 233',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
          address: '180 Hai Bà Trưng, Quận 1',
          district: 'Quận 1',
          city: 'TP. Hồ Chí Minh',
          studentStatus: 'Sinh viên',
          major: 'Ngôn ngữ & Thương mại',
          university: 'Trường ĐH Khoa học Xã hội & Nhân văn',
          bio: 'Tài khoản kết nối nhanh từ Facebook.',
          skills: ['Tiếng Hàn giao tiếp', 'Phục vụ F&B', 'Giao tiếp khách hàng'],
          languages: ['Tiếng Việt', 'Tiếng Hàn'],
          preferredWorkTypes: ['Bán thời gian (Part-time)', 'Ca tối'],
          preferredSchedule: 'Ca tối 18:00 - 22:00',
          preferredSalary: '5 - 8 triệu / tháng',
          preferredLocation: 'Quận 1, Quận 3',
          radiusKm: 5,
        };
        triggerLoginSuccess(fbUser, 'Facebook');
      } else if (provider === 'apple') {
        const appleUser: UserProfile = {
          id: `apple-${Date.now()}`,
          fullName: 'Lý Gia Hân',
          email: 'lygiahan220600@gmail.com',
          phone: '0983 214 789',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
          address: 'Bình Thạnh, TP. Hồ Chí Minh',
          district: 'Quận Bình Thạnh',
          city: 'TP. Hồ Chí Minh',
          studentStatus: 'Sinh viên năm 2',
          major: 'Ngôn ngữ & Truyền thông',
          university: 'Đại học Quốc gia TP.HCM',
          bio: 'Tài khoản Apple ID bảo mật với Hide My Email. Ưu tiên việc làm ca tối linh hoạt.',
          skills: ['Giao tiếp tiếng Hàn', 'Sáng tạo nội dung', 'Chăm chỉ'],
          languages: ['Tiếng Việt', 'Tiếng Hàn', 'Tiếng Anh'],
          preferredWorkTypes: ['Bán thời gian (Part-time)', 'Ca tối', 'Làm việc từ xa (Remote)'],
          preferredSchedule: '18:00 - 22:00',
          preferredSalary: '6 - 9 triệu / tháng',
          preferredLocation: 'Bình Thạnh, Quận 1',
          radiusKm: 5,
        };
        triggerLoginSuccess(appleUser, 'Apple');
      }
    }, 900);
  };

  // 2. Email Login Submit
  const handleEmailLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthErrorMsg(null);

    if (!loginEmail || !loginPassword) {
      setAuthErrorMsg('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    const updatedUser: UserProfile = {
      ...currentUser,
      email: loginEmail,
    };
    triggerLoginSuccess(updatedUser, 'Email');
  };

  // 3. Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthErrorMsg(null);

    if (!regName.trim()) {
      setAuthErrorMsg('Vui lòng nhập họ và tên của bạn.');
      return;
    }
    if (!regEmail.trim()) {
      setAuthErrorMsg('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (regPassword.length < 6) {
      setAuthErrorMsg('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setAuthErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (!agreeTerms) {
      setAuthErrorMsg('Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật.');
      return;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      fullName: regName,
      email: regEmail,
      phone: regPhone || '0901 234 567',
      avatar: '/src/assets/images/avatar_candidate_1790732866935.jpg',
      address: 'Quận 1, TP. Hồ Chí Minh',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      studentStatus: accountType === 'candidate' ? 'Ứng viên tìm việc' : 'Nhà tuyển dụng',
      major: regMajor || (accountType === 'candidate' ? 'Ngôn ngữ & Kinh doanh' : 'Quản trị nhân sự'),
      university: 'Đại học tại TP.HCM',
      bio: accountType === 'candidate'
        ? `Tài khoản ứng viên mới đăng ký trên nền tảng Job. Đang tìm kiếm việc làm phù hợp với năng lực.`
        : `Tài khoản Nhà tuyển dụng / Doanh nghiệp trên Job. Tìm kiếm nhân sự trẻ năng động.`,
      skills: ['Giao tiếp tốt', 'Nhiệt huyết', 'Chăm chỉ'],
      languages: ['Tiếng Việt', 'Tiếng Anh'],
      preferredWorkTypes: ['Bán thời gian (Part-time)', 'Ca tối', 'Toàn thời gian'],
      preferredSchedule: 'Linh hoạt theo thỏa thuận',
      preferredSalary: 'Thỏa thuận theo năng lực',
      preferredLocation: 'TP. Hồ Chí Minh',
      radiusKm: 5,
    };

    setAuthSuccessMsg('Đăng ký tài khoản thành công! Tự động đăng nhập vào Job...');
    onSelectUser(newUser);

    if (onAddNotification) {
      onAddNotification({
        id: `notif-reg-${Date.now()}`,
        title: 'Chào mừng bạn đến với Job - Nền tảng tuyển dụng & Việc làm',
        message: `Tài khoản ${newUser.fullName} (${newUser.email}) đã được kích hoạt thành công! Hãy tạo CV và khám phá việc làm ngay.`,
        type: 'message',
        timestamp: 'Vừa xong',
        read: false,
      });
    }

    setTimeout(() => {
      setAuthSuccessMsg(null);
      onClose();
    }, 1300);
  };

  // 4. Forgot Password Submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setAuthErrorMsg('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }
    setForgotSent(true);
    setAuthErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F2] w-full max-w-md rounded-2xl shadow-2xl border border-[#DED3BD] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Brand Header */}
        <div className="px-6 py-4 bg-[#1B2C24] text-white flex items-center justify-between border-b border-[#2D4738]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#385A45] flex items-center justify-center text-white border border-[#4F755D]/50 shadow-sm">
              <Briefcase className="w-4 h-4 text-[#FAF8F2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-[#FAF8F2] flex items-center gap-1.5">
                Job
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#385A45] text-[#EDE6D6]">
                  Career
                </span>
              </h3>
              <p className="text-[11px] text-[#9EBFB5]">Nền tảng tuyển dụng & Việc làm</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9EBFB5] hover:text-white hover:bg-[#2D4738] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Đăng nhập vs Đăng ký */}
        {activeTab !== 'forgot_password' && (
          <div className="flex border-b border-[#EDE6D6] bg-white text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setAuthErrorMsg(null);
              }}
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                activeTab === 'login'
                  ? 'border-[#2D4738] text-[#2D4738] bg-[#FBF9F4]'
                  : 'border-transparent text-neutral-500 hover:text-[#1B2C24]'
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setAuthErrorMsg(null);
              }}
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                activeTab === 'register'
                  ? 'border-[#2D4738] text-[#2D4738] bg-[#FBF9F4]'
                  : 'border-transparent text-neutral-500 hover:text-[#1B2C24]'
              }`}
            >
              Đăng ký tài khoản
            </button>
          </div>
        )}

        {/* Modal Body with smooth scrolling */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Success Banner */}
          {authSuccessMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{authSuccessMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {authErrorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{authErrorMsg}</span>
            </div>
          )}

          {/* 1. SOCIAL SIGN IN BUTTONS (Google, Facebook, Apple) */}
          {activeTab !== 'forgot_password' && (
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A7D5C] block">
                {activeTab === 'login' ? 'Đăng nhập nhanh với mạng xã hội:' : 'Đăng ký nhanh chỉ với 1 chạm:'}
              </span>

              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                disabled={socialLoading !== null}
                className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 text-[#1B2C24] font-semibold text-xs border border-[#DED3BD] hover:border-[#9EBFB5] shadow-sm hover:shadow transition-all disabled:opacity-60"
              >
                {socialLoading === 'google' ? (
                  <div className="w-4 h-4 border-2 border-neutral-300 border-t-[#2D4738] rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>Tiếp tục với Google</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {/* Facebook Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={socialLoading !== null}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-xs shadow-sm hover:shadow transition-all disabled:opacity-60"
                >
                  {socialLoading === 'facebook' ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  <span>Facebook</span>
                </button>

                {/* Apple Button */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={socialLoading !== null}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-semibold text-xs shadow-sm hover:shadow transition-all disabled:opacity-60"
                >
                  {socialLoading === 'apple' ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  ) : (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.36-.57.65-1.06 1.72-.93 2.74 1 .08 2.03-.5 2.65-1.25z" />
                    </svg>
                  )}
                  <span>Apple ID</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="border-t border-[#DED3BD] w-full" />
                <span className="bg-[#FAF8F2] px-2 text-[10px] uppercase font-bold text-neutral-400 absolute">
                  Hoặc bằng email
                </span>
              </div>
            </div>
          )}

          {/* 2. FORM: ĐĂNG NHẬP (Login Tab) */}
          {activeTab === 'login' && (
            <form onSubmit={handleEmailLoginSubmit} className="space-y-3.5">
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Email đăng nhập:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-neutral-700">Mật khẩu:</label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('forgot_password');
                      setAuthErrorMsg(null);
                    }}
                    className="text-[11px] text-[#385A45] hover:underline font-medium"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-neutral-400 hover:text-neutral-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#2D4738] focus:ring-[#2D4738]"
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Đăng nhập vào Job</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* 3. FORM: ĐĂNG KÝ TÀI KHOẢN (Register Tab) */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Role Picker: Ứng viên vs Nhà tuyển dụng */}
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Bạn tham gia Job với tư cách:</label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#F5F1E8] rounded-xl">
                  <button
                    type="button"
                    onClick={() => setAccountType('candidate')}
                    className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                      accountType === 'candidate'
                        ? 'bg-white text-[#2D4738] shadow-sm'
                        : 'text-neutral-600 hover:text-[#1B2C24]'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Ứng viên tìm việc</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('recruiter')}
                    className={`py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                      accountType === 'recruiter'
                        ? 'bg-[#2D4738] text-white shadow-sm'
                        : 'text-neutral-600 hover:text-[#1B2C24]'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Nhà tuyển dụng</span>
                  </button>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">Họ và tên của bạn:</label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                    placeholder="Ví dụ: Lý Gia Hân"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Email:</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                      placeholder="uyen@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Số điện thoại:</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                      placeholder="0983 214 789"
                    />
                  </div>
                </div>
              </div>

              {/* Major or Company */}
              <div>
                <label className="font-semibold text-neutral-700 block mb-1">
                  {accountType === 'candidate' ? 'Ngành học / Chuyên môn chính:' : 'Tên Công ty / Đơn vị tuyển dụng:'}
                </label>
                <input
                  type="text"
                  value={regMajor}
                  onChange={(e) => setRegMajor(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                  placeholder={
                    accountType === 'candidate'
                      ? 'Ví dụ: Ngôn ngữ Hàn Quốc, CNTT, Marketing...'
                      : 'Ví dụ: Công ty Cổ phần K-Vina Life'
                  }
                />
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Mật khẩu:</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                      placeholder="Tối thiểu 6 ký tự"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-neutral-400 hover:text-neutral-600 absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-neutral-700 block mb-1">Nhập lại mật khẩu:</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                      placeholder="Xác nhận lại"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="p-1 text-neutral-400 hover:text-neutral-600 absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Agree terms */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-neutral-600 leading-tight">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#2D4738] focus:ring-[#2D4738]"
                  />
                  <span>
                    Tôi đồng ý với{' '}
                    <span className="text-[#385A45] font-semibold underline">Điều khoản sử dụng</span> và{' '}
                    <span className="text-[#385A45] font-semibold underline">Chính sách bảo mật</span> của Job.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                <span>Tạo tài khoản {accountType === 'candidate' ? 'Ứng viên' : 'Nhà tuyển dụng'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* 4. FORM: QUÊN MẬT KHẨU (Forgot Password View) */}
          {activeTab === 'forgot_password' && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setForgotSent(false);
                  setAuthErrorMsg(null);
                }}
                className="flex items-center gap-1 text-xs text-[#385A45] font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Quay lại Đăng nhập</span>
              </button>

              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-[#EDE6D6] text-[#2D4738] flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-5 h-5 text-[#385A45]" />
                </div>
                <h4 className="text-sm font-bold text-[#1B2C24]">Khôi phục mật khẩu tài khoản</h4>
                <p className="text-neutral-500 text-xs leading-relaxed max-w-xs mx-auto">
                  Nhập địa chỉ email đăng ký, chúng tôi sẽ gửi liên kết và mã xác thực 6 số để bạn thiết lập lại mật khẩu.
                </p>
              </div>

              {forgotSent ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                  <p className="font-bold text-xs">Đã gửi mã xác nhận đến {forgotEmail}!</p>
                  <p className="text-[11px] text-neutral-600">
                    Vui lòng kiểm tra hộp thư đến (hoặc hòm thư rác/Spam) và làm theo hướng dẫn để đăng nhập.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('login');
                      setForgotSent(false);
                    }}
                    className="mt-2 px-4 py-1.5 rounded-lg bg-[#2D4738] text-white text-xs font-semibold"
                  >
                    Trở lại màn hình Đăng nhập
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-3">
                  <div>
                    <label className="font-semibold text-neutral-700 block mb-1">Email đăng ký:</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DED3BD] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#385A45]"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#2D4738] hover:bg-[#385A45] text-white font-bold text-xs shadow-md transition-all"
                  >
                    Gửi liên kết đặt lại mật khẩu
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-2.5 bg-[#F5F1E8] border-t border-[#DED3BD] text-center text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Bảo mật chuẩn mã hóa SSL 256-bit của Job</span>
        </div>
      </div>
    </div>
  );
};
