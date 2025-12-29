// src/pages/BookingHistoryPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookingHistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(user);


        const allBookings = JSON.parse(localStorage.getItem("bookingHistory") || "[]");


        if (user) {
            const myBookings = allBookings.filter(booking => booking.userId === user.id);
            setHistory(myBookings);
        } else {

            setHistory([]);
        }
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "success": return "bg-green-50 text-green-700 border-green-200";
            case "pending": return "bg-orange-50 text-orange-700 border-orange-200";
            default: return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "success": return "Thanh toán thành công";
            case "pending": return "Chờ thanh toán";
            default: return "Đã hủy";
        }
    };

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-[#f2f4f7] flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <img src="https://img.icons8.com/fluency/96/lock.png" alt="lock" className="mx-auto mb-4"/>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Bạn chưa đăng nhập</h2>
                    <p className="text-gray-500 mb-6">Vui lòng đăng nhập để xem lịch sử đặt chỗ của bạn.</p>
                    <Link to="/login" className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition">
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f2f4f7] min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">

                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="bg-primary text-white p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v4.072c0 .621.504 1.125 1.125 1.125in.75-1.125 1.125v9.375c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.875h2.25c.621 0 1.125-.504 1.125-1.125v-9c0-.621-.504-1.125-1.125-1.125h-2.25V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                            </svg>
                        </span>
                        Vé & Đặt chỗ của tôi
                    </h1>
                    <Link to="/" className="text-primary text-sm font-medium hover:underline">
                        Đặt thêm chuyến mới
                    </Link>
                </div>

                {history.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                        <img
                            src="https://img.icons8.com/fluency/240/empty-box.png"
                            alt="empty"
                            className="mx-auto w-40 h-40 mb-6 opacity-80"
                        />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có chuyến đi nào</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Xin chào <b>{currentUser.name}</b>, hãy lên kế hoạch cho chuyến phiêu lưu tiếp theo của bạn ngay hôm nay!
                        </p>
                        <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-orange-600 transition shadow-lg shadow-orange-200 font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            Tìm tour du lịch
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {history.map((item, index) => (
                            <div key={index} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300">

                                {/* Header Card: Mã đơn & Trạng thái */}
                                <div className="px-5 py-3 border-b flex justify-between items-center bg-gray-50/50">
                                    <div className="text-xs text-gray-500 font-medium">
                                        Mã đơn: <span className="text-gray-900 font-bold">#{item.id}</span>
                                        <span className="mx-2">•</span>
                                        <span>{new Date(item.bookingDate).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status)} flex items-center gap-1`}>
                                        {item.status === 'success' && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                                        {getStatusText(item.status)}
                                    </span>
                                </div>

                                <div className="p-5 flex flex-col md:flex-row gap-6">
                                    {/* Hình ảnh Thumbnail */}
                                    <div className="w-full md:w-1/3 h-40 md:h-auto flex-shrink-0 relative rounded-lg overflow-hidden group-hover:opacity-95 transition">
                                        <img
                                            src={item.tour.media?.thumbnail || "https://placehold.co/400"}
                                            alt={item.tour.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                            Tour trọn gói
                                        </div>
                                    </div>

                                    {/* Nội dung chi tiết */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-3 group-hover:text-primary transition">
                                                {item.tour.title}
                                            </h3>

                                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                                                        <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>Khởi hành: <b>{item.bookingInfo.travelDate}</b></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                                                        <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
                                                    </svg>
                                                    <span>
                                                        <b>{item.bookingInfo.adults}</b> người lớn
                                                        {item.bookingInfo.children > 0 && <span>, <b>{item.bookingInfo.children}</b> trẻ em</span>}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 col-span-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-primary">
                                                        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                                                        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                                                    </svg>
                                                    <span className="truncate">{item.bookingInfo.email}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t pt-4 border-dashed">
                                            <div>
                                                <p className="text-xs text-gray-500">Tổng thanh toán</p>
                                                <p className="text-xl font-bold text-primary">{item.totalPrice.toLocaleString('vi-VN')} ₫</p>
                                            </div>
                                            <button className="px-5 py-2 bg-blue-50 text-blue-600 text-sm font-bold rounded-lg hover:bg-blue-100 transition">
                                                Xem vé điện tử
                                            </button>
                                        </div>
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