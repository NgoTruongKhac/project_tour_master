import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronRight,
  Info,
  User,
  Plane,
  Hotel,
  Map,
  CreditCard,
  Car,
  Coins,
  Bus,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

const HelpPage = () => {
  const popularTopics = [
    "Cách đặt tour du lịch an toàn và nhanh chóng",
    "Chính sách hoàn tiền và hủy vé của Tour Master",
    "Hướng dẫn đổi lịch trình tour đã đặt",
    "Quy định về hành lý và giấy tờ tùy thân",
    "Làm sao để kiểm tra trạng thái đơn hàng?",
  ];

  const categories = [
    { icon: <Info size={24} />, label: "Thông tin chung" },
    { icon: <User size={24} />, label: "Tài khoản & Bảo mật" },
    { icon: <Map size={24} />, label: "Tour Du lịch" },
    { icon: <Hotel size={24} />, label: "Khách sạn" },
    { icon: <Briefcase size={24} />, label: "Hoạt động & Vui chơi" },
    { icon: <CreditCard size={24} />, label: "Thanh toán" },
    { icon: <Car size={24} />, label: "Đưa đón sân bay" },
    { icon: <Coins size={24} />, label: "Điểm thưởng" },
    { icon: <Bus size={24} />, label: "Vé xe khách" },
    { icon: <Plane size={24} />, label: "Vé máy bay" },
    { icon: <ShieldCheck size={24} />, label: "Bảo hiểm du lịch" },
  ];

  return (
    <div className="min-h-screen bg-white font-nunito pb-20">
      <div className="bg-primary py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Trung tâm Hỗ trợ Tour Master
        </h1>
        <p className="text-blue-50 text-lg mb-8">
          Mọi câu trả lời dành cho bạn
        </p>

        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Nhập chủ đề cần tìm (ví dụ: hoàn tiền, đổi vé...)"
            className="w-full pl-12 pr-4 py-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={24}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Chủ đề phổ biến
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {popularTopics.map((topic, index) => (
                <Link
                  key={index}
                  to="#"
                  className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">
                    {topic}
                  </span>
                  <ChevronRight
                    size={18}
                    className="text-gray-400 group-hover:text-primary"
                  />
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Liên hệ chúng tôi
              </h3>
              <p className="text-gray-500 mb-4 text-sm">
                Kết nối với đội ngũ Hỗ trợ Khách hàng của chúng tôi nếu bạn
                không tìm thấy câu trả lời.
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-2.5 bg-blue-50 text-primary font-bold rounded-lg hover:bg-blue-100 transition-colors"
              >
                Liên hệ chúng tôi
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Phân loại theo sản phẩm
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat, index) => (
                <Link
                  key={index}
                  to="#"
                  className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md hover:border-primary/30 transition-all text-center group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-primary">
                    {cat.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
