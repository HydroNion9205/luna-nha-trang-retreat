import { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function LoginModal({ isOpen, onClose }) {
  const [authMode, setAuthMode] = useState('login')
  
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (authMode === 'login') {
      alert(`Chào mừng thành viên quay trở lại, ${email}!`)
      onClose()
    } else {
      if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không trùng khớp. Vui lòng kiểm tra lại!')
        return
      }
      alert(`Đăng ký tài khoản thành viên thành công!\nChào mừng bạn đến với Luna Club, ${fullName}.`)
      setAuthMode('login')
      setPassword('')
      setConfirmPassword('')
    }
  }

  const switchMode = (mode) => {
    setAuthMode(mode)
    setPassword('')
    setConfirmPassword('')
    setShowPassword(false)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-sand-100 relative overflow-hidden transition-all duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
          aria-label="Đóng cửa sổ"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h3 className="font-serif text-2xl tracking-[0.2em] uppercase font-light text-gray-900 mb-2">
            Luna Club
          </h3>
          <p className="text-gray-500 text-xs font-light tracking-wide px-4">
            {authMode === 'login' 
              ? 'Đăng nhập để quản lý kỳ nghỉ và nhận đặc quyền thành viên.' 
              : 'Trở thành thành viên của Luna để nhận ngay ưu đãi đặt phòng 10%.'}
          </p>
        </div>

        <div className="flex border-b border-sand-100 mb-6">
          <button
            type="button"
            className={`flex-1 pb-3 text-xs tracking-widest uppercase font-medium transition-all ${
              authMode === 'login' 
                ? 'text-gray-900 border-b-2 border-gray-900 font-semibold' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => switchMode('login')}
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            className={`flex-1 pb-3 text-xs tracking-widest uppercase font-medium transition-all ${
              authMode === 'register' 
                ? 'text-gray-900 border-b-2 border-gray-900 font-semibold' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => switchMode('register')}
          >
            Đăng Ký
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div className="space-y-1.5 animate-fade-in">
              <label htmlFor="reg-name" className="block text-[11px] tracking-widest uppercase font-medium text-gray-500">
                Họ và tên
              </label>
              <div className="relative flex items-center">
                <User size={16} className="absolute left-4 text-gray-400" />
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Thạch Tô La"
                  className="w-full bg-sand-50/50 border border-sand-200/80 rounded-xl pl-11 pr-4 py-2.5 text-sm font-light text-gray-900 focus:outline-none focus:border-ocean-600 focus:bg-white transition-all placeholder:text-gray-300"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="auth-email" className="block text-[11px] tracking-widest uppercase font-medium text-gray-500">
              Địa chỉ Email
            </label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-4 text-gray-400" />
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@luna.com"
                className="w-full bg-sand-50/50 border border-sand-200/80 rounded-xl pl-11 pr-4 py-2.5 text-sm font-light text-gray-900 focus:outline-none focus:border-ocean-600 focus:bg-white transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="auth-password" className="block text-[11px] tracking-widest uppercase font-medium text-gray-500">
                Mật khẩu
              </label>
              {authMode === 'login' && (
                <button 
                  type="button"
                  className="text-[11px] text-ocean-700 hover:underline font-light cursor-pointer"
                  onClick={() => alert('Hệ thống khôi phục mật khẩu đã được gửi về email của bạn.')}
                >
                  Quên mật khẩu?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-4 text-gray-400" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w
