import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import signupTheme from "../assets/signup_theme.avif";
import googleIcon from "../assets/google-icon.png";
import logo from "../assets/logo_icon.png";
import { Link, useNavigate } from "react-router-dom";
import usersData from "../data/users.json";

const SignupPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const togglePasswordView = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordView = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    const existingUser = usersData.find(
      (u) => u.email === formData.email || u.username === formData.username
    );

    if (existingUser) {
      alert("Đăng ký thành công!");
      navigate("/login");
    } else {
      setError("Đăng ký không thành công. Tên tài khoản hoặc email đã tồn tại");
    }
  };

  return (
    <div className="min-h-screen flex font-sans text-dark">
      <div className="hidden lg:flex w-1/2 bg-gray-100 relative items-center justify-center overflow-hidden">
        <img
          src={signupTheme}
          alt="login theme"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 text-white p-10 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Bắt đầu hành trình của bạn
          </h2>
          <p className="text-lg opacity-90">
            Tạo tài khoản để khám phá những ưu đãi tốt nhất
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img src={logo} alt="logo" className="w-12 md:w-14 mx-auto mb-4" />
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              Đăng Ký
            </h1>
            <p className="text-gray-500">
              Tạo tài khoản mới để trải nghiệm đầy đủ tính năng
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên đăng nhập
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={!showPassword ? "password" : "text"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
                  required
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nhập lại mật khẩu
              </label>
              <div className="relative">
                <input
                  type={!showConfirmPassword ? "password" : "text"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition duration-200"
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-primary"
                  onClick={toggleConfirmPasswordView}
                >
                  {showConfirmPassword ? (
                    <FaRegEyeSlash size={20} />
                  ) : (
                    <FaRegEye size={20} />
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-primary/30"
            >
              Đăng Ký
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">Hoặc đăng ký với</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700">
            <img src={googleIcon} alt="google-icon" className="w-6 md:w-8" />
            Google
          </button>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-600">Bạn đã có tài khoản? </span>
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
