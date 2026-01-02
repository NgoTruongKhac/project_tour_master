import React, { useState } from "react";
import { Send, CheckSquare } from "lucide-react";
import recaptcha from "../assets/recaptcha.png";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    type: "Du lịch",
    name: "",
    email: "",
    phone: "",
    company: "",
    guests: "",
    address: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-nunito py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 uppercase">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Để có thể đáp ứng được các yêu cầu và đóng góp ý kiến của quý khách,
            xin vui lòng gửi thông tin cho chúng tôi thông qua biểu mẫu bên
            dưới.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-l-4 border-primary pl-3">
            THÔNG TIN LIÊN LẠC
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loại thông tin <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option>Du lịch</option>
                  <option>Chăm sóc khách hàng</option>
                  <option>Hợp tác</option>
                  <option>Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nhập họ và tên"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên công ty
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Nhập tên công ty (nếu có)"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số khách
                </label>
                <input
                  type="number"
                  name="guests"
                  placeholder="0"
                  min="1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                placeholder="Nhập địa chỉ liên hệ"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Nhập tiêu đề liên hệ"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Nhập nội dung yêu cầu..."
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 px-4 py-3 rounded w-full md:w-auto min-w-[250px]">
                <input
                  type="checkbox"
                  id="captcha"
                  className="w-6 h-6 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="captcha"
                  className="text-sm text-gray-600 select-none cursor-pointer"
                >
                  Tôi không phải là người máy
                </label>
                <div className="ml-auto">
                  <img
                    src={recaptcha}
                    alt="captcha"
                    className="w-8 h-8 opacity-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-10 py-3 bg-primary hover:bg-opacity-90 text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Gửi ngay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
