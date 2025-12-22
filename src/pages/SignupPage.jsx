import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

import signupTheme from "../assets/signup_theme.avif";
import googleIcon from "../assets/google-icon.png";
import logo from "../assets/logo_icon.png";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex font-sans text-dark">
      <div className="hidden lg:flex w-1/2 bg-gray-100 relative items-center justify-center overflow-hidden">
        <img
          src={signupTheme}
          alt="signup theme"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-white p-10 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Bắt đầu hành trình của bạn
          </h2>
          <p className="text-lg opacity-90">
            Tạo tài khoản để khám phá những ưu đãi độc quyền ngay hôm nay.
          </p>
        </div>
      </div>

      {/* --- CỘT PHẢI: FORM ĐĂNG KÝ (SIGNIN/SIGNUP UI) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <img src={logo} alt="logo" className="w-12 md:w-14 mx-auto mb-4" />
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              Tạo Tài Khoản
            </h1>
            <p className="text-gray-500">Điền thông tin bên dưới để đăng ký</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* 1. Họ và tên */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* 2. Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="user@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* 3. Mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <FaRegEye size={20} />
                  )}
                </div>
              </div>
            </div>

            {/* 4. Nhập lại mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhập lại mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-primary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <FaRegEye size={20} />
                  )}
                </div>
              </div>
            </div>

            {/* Nút Đăng Ký (Chỉ là UI) */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-primary/30 mt-2"
            >
              Đăng Ký
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">Hoặc đăng ký với</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
            <img src={googleIcon} alt="google-icon" className="w-6 h-6" />
            <span>Google</span>
          </button>

          {/* Footer Link */}
          <div className="mt-8 text-center text-sm">
            <span className="text-gray-600">Đã có tài khoản? </span>
            <Link
              to="/login"
              className="font-bold text-primary hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
