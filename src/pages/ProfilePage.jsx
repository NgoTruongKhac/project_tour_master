import React, { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-nunito">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">
          Hồ sơ của tôi
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={
                    user.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-100 shadow-sm"
                />
                <div
                  className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"
                  title="Online"
                ></div>
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-800">
                {user.name}
              </h2>
              <p className="text-gray-500 text-sm">Thành viên TravelNest</p>

              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                  <span className="text-sm font-medium text-teal-700">
                    Hạng thành viên
                  </span>
                  <span className="text-xs font-bold bg-teal-200 text-teal-800 px-2 py-1 rounded">
                    Bạc
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-orange-700">
                    Điểm tích lũy
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    0 điểm
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                Thông tin cá nhân
              </h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                      <User size={16} /> Tên đăng nhập
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none cursor-not-allowed font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                      <Shield size={16} /> User ID
                    </label>
                    <input
                      type="text"
                      value={`#${user.id}`}
                      readOnly
                      className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none cursor-not-allowed font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                    <Mail size={16} /> Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none cursor-not-allowed font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                    <Phone size={16} /> Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={user.phone || "Chưa cập nhật"}
                    readOnly
                    className="w-full bg-gray-100 text-gray-500 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none cursor-not-allowed font-medium"
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                    <div className="min-w-[20px] text-blue-500 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" x2="12" y1="8" y2="12" />
                        <line x1="12" x2="12.01" y1="16" y2="16" />
                      </svg>
                    </div>
                    <p className="text-sm text-blue-700 leading-relaxed">
                      Để đảm bảo an toàn, bạn không thể trực tiếp chỉnh sửa
                      thông tin tại đây. Nếu cần thay đổi email hoặc số điện
                      thoại, vui lòng liên hệ bộ phận CSKH.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
