import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import loginTheme from "../assets/login_theme.avif";
import googleIcon from "../assets/google-icon.png";
import logo from "../assets/logo_icon.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordView = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex font-sans text-dark">
      <div className="hidden lg:flex w-1/2 bg-gray-100 relative items-center justify-center overflow-hidden">
        <img
          src={loginTheme}
          alt="login theme"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 text-white p-10 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Khám phá thế giới cùng chúng tôi
          </h2>
          <p className="text-lg opacity-90">
            Hàng ngàn tour du lịch hấp dẫn đang chờ đón bạn.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img src={logo} alt="logo" className="w-12 md:w-14 mx-auto mb-4" />
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              Đăng Nhập
            </h1>
            <p className="text-gray-500">
              Chào mừng trở lại! Vui lòng đăng nhập.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email hoặc Tên đăng nhập
              </label>
              <input
                type="text"
                placeholder="Ví dụ: user@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
                />

                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-primary"
                  onClick={togglePasswordView}
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <FaRegEye size={20} />
                  )}
                </div>
              </div>

              <div className="mt-2 text-left">
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary-hover font-medium"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-primary/30"
            >
              Đăng Nhập
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">
              Hoặc đăng nhập với
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
            <img src={googleIcon} alt="google-icon" className="w-6 md:w-8" />
            Google
          </button>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-600">Bạn chưa có tài khoản? </span>
            <a href="#" className="font-bold text-primary hover:underline">
              Đăng ký ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
