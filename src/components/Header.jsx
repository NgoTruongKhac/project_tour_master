import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avt from "../assets/profile_avt.png";
import logoFull from "../assets/logo_full.png";
import {
  ChevronDown,
  HelpCircle,
  Mail,
  Phone,
  LogOut,
  User,
  Ticket,
  CreditCard,
  Heart,
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsUserMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm font-nunito relative">
      <div className="container mx-auto px-4 md:px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img
              src={logoFull}
              alt="TravelNest Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 font-semibold text-gray-600">
            <Link
              to="/promotion"
              className="hover:text-primary transition-colors"
            >
              Khuyến mãi
            </Link>
            <Link
              to="/partnership"
              className="hover:text-primary transition-colors"
            >
              Hợp tác
            </Link>
            <Link
              to="/my-booking"
              className="hover:text-primary transition-colors"
            >
              Đặt chỗ
            </Link>

            <div
              className="relative group cursor-pointer h-20 flex items-center"
              onMouseEnter={() => setIsSupportMenuOpen(true)}
              onMouseLeave={() => setIsSupportMenuOpen(false)}
            >
              <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
                <span>Hỗ trợ</span>
                <ChevronDown size={16} />
              </div>

              {isSupportMenuOpen && (
                <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-b-lg border-t-2 border-primary overflow-hidden animate-fade-in z-50">
                  <Link
                    to="/help"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-primary"
                  >
                    <HelpCircle size={18} /> Trợ giúp
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-primary"
                  >
                    <Phone size={18} /> Liên hệ chúng tôi
                  </Link>
                  <Link
                    to="/inbox"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-primary"
                  >
                    <Mail size={18} /> Hộp thư
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/love"
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Tour yêu thích"
              >
                <Heart size={24} />
              </Link>

              <div
                className="relative h-20 flex items-center"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <button className="flex items-center gap-2 focus:outline-none hover:bg-gray-50 p-2 rounded-lg transition-all">
                  <img
                    src={user.avatar || avt}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover border border-gray-300"
                  />
                  <span className="hidden md:block font-bold text-gray-700 max-w-[150px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 w-72 bg-white shadow-2xl rounded-b-lg border-t-2 border-primary overflow-hidden z-50">
                    <div className="bg-primary p-4 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={user.avatar || DEFAULT_AVATAR}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover border-2 border-white"
                        />
                        <div>
                          <p className="font-bold text-lg leading-tight">
                            {user.name}
                          </p>
                          <p className="text-xs opacity-90 font-light">
                            Thành viên
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-primary"
                      >
                        <User size={18} /> Hồ sơ của tôi
                      </Link>
                      <Link
                        to="/my-booking"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-primary"
                      >
                        <Ticket size={18} /> Đặt chỗ của tôi
                      </Link>
                      <Link
                        to="/cards"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-primary"
                      >
                        <CreditCard size={18} /> Thẻ/Ngân hàng
                      </Link>

                      <div className="border-t border-gray-100 my-1"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors text-left font-medium"
                      >
                        <LogOut size={18} /> Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 border border-primary text-primary px-5 py-2 rounded-md font-bold hover:bg-primary hover:text-white transition-all"
              >
                <User size={18} /> Đăng nhập
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-white px-5 py-2 rounded-md font-bold hover:bg-opacity-90 shadow-md transition-all whitespace-nowrap"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
