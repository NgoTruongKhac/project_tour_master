import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, HelpCircle, MessagesSquare } from "lucide-react";
import support from "../assets/support.png";

const InboxPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-nunito pb-20">
      <div className="bg-primary py-12 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">Hộp thư của tôi</h1>
        <p className="text-blue-50 opacity-90 text-lg">
          Theo dõi lịch sử trò chuyện với bộ phận Hỗ trợ Khách hàng Tour Master
        </p>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="bg-white rounded-xl shadow-lg min-h-[500px] flex flex-col items-center justify-center p-8 md:p-12 max-w-4xl mx-auto relative z-10">
          <div className="mb-8">
            <img
              src={support}
              alt="Support Center"
              className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-80"
            />
          </div>

          <div className="w-full max-w-2xl border-t border-gray-100 pt-10 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Bạn cần trợ giúp về đặt chỗ?
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link
                to="/help"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-primary text-primary font-bold hover:bg-teal-50 transition-all w-full md:w-auto min-w-[250px]"
              >
                <HelpCircle size={20} />
                Xem câu hỏi thường gặp
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-opacity-90 shadow-md transition-all w-full md:w-auto min-w-[250px]"
              >
                <MessagesSquare size={20} />
                Hỏi chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
