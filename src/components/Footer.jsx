import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Send,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import logoFull from "../assets/logo_full.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-6">
              <img
                src={logoFull}
                alt="Tour Master Logo"
                className="h-12 object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed text-justify">
              Tự hào là đơn vị lữ hành hàng đầu, mang đến những hành trình khám
              phá độc đáo và trải nghiệm văn hóa sâu sắc tại Việt Nam và Quốc
              tế.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">
                  123 Đường Nguyễn A, Quận 13, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">1900 123 456 (Hotline 24/7)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">support@tourmaster.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-heading">
              Về Tour Master
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary transition-colors"
                >
                  Câu chuyện thương hiệu
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-primary transition-colors"
                >
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary transition-colors"
                >
                  Tin tức & Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="hover:text-primary transition-colors"
                >
                  Đối tác liên kết
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-heading">
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-primary transition-colors"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  to="/policy"
                  className="hover:text-primary transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to="/payment-guide"
                  className="hover:text-primary transition-colors"
                >
                  Hướng dẫn thanh toán
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-heading">
              Đăng ký nhận tin
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Nhận ngay mã giảm giá 10% và các ưu đãi du lịch mới nhất qua
              email.
            </p>

            <form className="mb-8" onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn..."
                  className="w-full px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary text-sm text-white"
                />
                <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-r-lg transition-colors">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>

            <h4 className="text-white font-bold text-sm mb-4 font-heading">
              Chấp nhận thanh toán
            </h4>
            <div className="flex gap-2 text-gray-400">
              <div className="bg-white p-1 rounded w-10 h-6 flex items-center justify-center">
                <span className="text-[10px] font-bold text-blue-800">
                  VISA
                </span>
              </div>
              <div className="bg-white p-1 rounded w-10 h-6 flex items-center justify-center">
                <span className="text-[10px] font-bold text-red-600">
                  Master
                </span>
              </div>
              <div className="bg-white p-1 rounded w-10 h-6 flex items-center justify-center">
                <span className="text-[10px] font-bold text-blue-500">JCB</span>
              </div>
              <div className="bg-white p-1 rounded w-10 h-6 flex items-center justify-center">
                <span className="text-[10px] font-bold text-purple-600">
                  MoMo
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            Copyright © 2025 Tour Master. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="bg-gray-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-center md:justify-start gap-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-2 border border-gray-600 px-3 py-1 rounded">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <span className="text-xs font-medium">
              Đã đăng ký Bộ Công Thương
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
