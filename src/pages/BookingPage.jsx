// src/pages/BookingPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toursData from "../data/data_tours.json";

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);

    // State cho form đặt chỗ
    const [bookingInfo, setBookingInfo] = useState({
        fullName: "",
        email: "",
        phone: "",
        adults: 1,
        children: 0,
        travelDate: "",
    });

    useEffect(() => {
        const foundTour = toursData.find((t) => t.tourId === parseInt(id));
        if (foundTour) {
            setTour(foundTour);
        }
    }, [id]);

    const parsePrice = (priceString) => {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/\D/g, ""));
    };

    const basePrice = tour ? parsePrice(tour.basePrice) : 0;
    const totalPrice = basePrice * bookingInfo.adults + (basePrice * 0.75 * bookingInfo.children);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingInfo({ ...bookingInfo, [name]: value });
    };

    const handleQuantityChange = (type, operation) => {
        setBookingInfo((prev) => {
            const newValue = operation === "inc" ? prev[type] + 1 : prev[type] - 1;
            return { ...prev, [type]: Math.max(type === 'adults' ? 1 : 0, newValue) };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/payment", { state: { tour, bookingInfo, totalPrice } });
    };

    if (!tour) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="bg-[#f2f4f7] min-h-screen pb-12">
            {/* 1. Header Steps - Đồng bộ với trang Payment */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-gray-800">Đặt chỗ</h1>
                        </div>
                        {/* Progress Steps */}
                        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2 text-primary">
                                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">1</span>
                                <span>Đặt chỗ</span>
                            </div>
                            <div className="w-8 h-[1px] bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">2</span>
                                <span>Thanh toán</span>
                            </div>
                            <div className="w-8 h-[1px] bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">3</span>
                                <span>Vé điện tử</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* CỘT TRÁI: FORM NHẬP LIỆU */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Card 1: Thông tin liên lạc */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <img src="https://img.icons8.com/fluency/48/contact-card.png" className="w-6 h-6" alt="contact"/>
                                Thông tin liên hệ
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ và tên *</label>
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        value={bookingInfo.fullName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="VD: Nguyen Van A"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại *</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={bookingInfo.phone}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="VD: 0901234567"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email nhận vé *</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={bookingInfo.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="VD: email@example.com"
                                    />
                                    <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Vé điện tử sẽ được gửi qua email này.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Chi tiết chuyến đi */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <img src="https://img.icons8.com/fluency/48/airplane-take-off.png" className="w-6 h-6" alt="trip"/>
                                Chi tiết chuyến đi
                            </h2>

                            <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Chọn ngày khởi hành</label>
                                <input
                                    required
                                    type="date"
                                    name="travelDate"
                                    value={bookingInfo.travelDate}
                                    onChange={handleInputChange}
                                    className="w-full md:w-1/2 border border-gray-300 rounded-lg p-2.5 outline-none focus:border-primary cursor-pointer"
                                />
                            </div>

                            <div className="space-y-4">
                                {/* Người lớn */}
                                <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
                                    <div>
                                        <p className="font-semibold text-gray-800">Người lớn</p>
                                        <p className="text-sm text-gray-500">Từ 12 tuổi trở lên</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange("adults", "dec")}
                                            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
                                            disabled={bookingInfo.adults <= 1}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                            </svg>
                                        </button>
                                        <span className="w-8 text-center font-semibold text-lg">{bookingInfo.adults}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange("adults", "inc")}
                                            className="w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-orange-50 transition"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 my-2"></div>

                                {/* Trẻ em */}
                                <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
                                    <div>
                                        <p className="font-semibold text-gray-800">Trẻ em</p>
                                        <p className="text-sm text-gray-500">Từ 2 - 11 tuổi (75% giá vé)</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange("children", "dec")}
                                            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50"
                                            disabled={bookingInfo.children <= 0}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                            </svg>
                                        </button>
                                        <span className="w-8 text-center font-semibold text-lg">{bookingInfo.children}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange("children", "inc")}
                                            className="w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-orange-50 transition"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-0 sticky top-24 overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b">
                                <h2 className="text-lg font-bold text-gray-800">Tóm tắt chuyến đi</h2>
                            </div>

                            <div className="p-4">
                                <div className="flex gap-3 mb-4">
                                    <img
                                        src={tour.media?.thumbnail || "https://placehold.co/100"}
                                        alt={tour.title}
                                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                                    />
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-1">{tour.title}</h3>
                                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Tour trọn gói</span>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm border-t border-dashed pt-4 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Người lớn (x{bookingInfo.adults})</span>
                                        <span className="font-medium">{(basePrice * bookingInfo.adults).toLocaleString('vi-VN')} ₫</span>
                                    </div>
                                    {bookingInfo.children > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Trẻ em (x{bookingInfo.children})</span>
                                            <span className="font-medium">{(basePrice * 0.75 * bookingInfo.children).toLocaleString('vi-VN')} ₫</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center border-t pt-4 mb-6">
                                    <span className="font-bold text-gray-800">Tổng cộng</span>
                                    <span className="font-bold text-xl text-primary">{totalPrice.toLocaleString('vi-VN')} ₫</span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
                                >
                                    Tiếp tục thanh toán
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;