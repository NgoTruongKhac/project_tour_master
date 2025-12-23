// src/pages/BookingHistoryPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookingHistoryPage = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu từ localStorage khi trang được tải
        const storedHistory = JSON.parse(localStorage.getItem("bookingHistory") || "[]");
        setHistory(storedHistory);
    }, []);

    // Hàm helper để hiển thị trạng thái (Giả lập)
    const getStatusColor = (status) => {
        switch (status) {
            case "success": return "bg-green-100 text-green-700 border-green-200";
            case "pending": return "bg-orange-100 text-orange-700 border-orange-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "success": return "Đã thanh toán";
            case "pending": return "Chờ thanh toán";
            default: return "Đã hủy";
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Lịch sử đặt chỗ của tôi</h1>

                {history.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <img
                            src="https://img.icons8.com/clouds/100/suitcase.png"
                            alt="empty"
                            className="mx-auto mb-4 opacity-70"
                        />
                        <p className="text-gray-500 mb-4">Bạn chưa có chuyến đi nào.</p>
                        <Link to="/" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
                            Khám phá tour ngay
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 border border-gray-100 hover:shadow-md transition">
                                {/* Hình ảnh Tour */}
                                <div className="w-full md:w-48 h-32 flex-shrink-0">
                                    <img
                                        src={item.tour.media?.thumbnail}
                                        alt={item.tour.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>

                                {/* Thông tin chính */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{item.tour.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Mã đơn: #{item.id}</p>
                                        <p className="text-sm text-gray-600 mt-2">
                                            📅 Ngày khởi hành: <span className="font-medium">{item.bookingInfo.travelDate}</span>
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            👥 Khách: {item.bookingInfo.adults} người lớn, {item.bookingInfo.children} trẻ em
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end mt-4 pt-3 border-t border-dashed">
                                        <p className="text-xs text-gray-400">Ngày đặt: {new Date(item.bookingDate).toLocaleDateString('vi-VN')}</p>
                                        <p className="text-lg font-bold text-primary">{item.totalPrice.toLocaleString('vi-VN')} ₫</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingHistoryPage;