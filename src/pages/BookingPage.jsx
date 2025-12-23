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
        // Tìm tour theo ID (lưu ý tourId trong json là số)
        const foundTour = toursData.find((t) => t.tourId === parseInt(id));
        if (foundTour) {
            setTour(foundTour);
        }
    }, [id]);

    // Hàm chuyển đổi giá từ chuỗi sang số
    const parsePrice = (priceString) => {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/\D/g, ""));
    };

    const basePrice = tour ? parsePrice(tour.basePrice) : 0;
    const totalPrice = basePrice * bookingInfo.adults + (basePrice * 0.75 * bookingInfo.children); // Giả sử vé trẻ em 75%

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
        // Chuyển sang trang thanh toán và mang theo dữ liệu
        navigate("/payment", { state: { tour, bookingInfo, totalPrice } });
    };

    if (!tour) return <div className="text-center py-20">Đang tải thông tin tour...</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Đặt chỗ của bạn</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cột trái: Form thông tin */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Card 1: Thông tin liên lạc */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Thông tin liên hệ</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        value={bookingInfo.fullName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary outline-none"
                                        placeholder="VD: Nguyen Van A"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={bookingInfo.phone}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary outline-none"
                                        placeholder="VD: 0901234567"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={bookingInfo.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary outline-none"
                                        placeholder="VD: email@example.com"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Vé điện tử sẽ được gửi qua email này.</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Chọn số lượng & Ngày */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Chi tiết chuyến đi</h2>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày khởi hành</label>
                                <input
                                    required
                                    type="date"
                                    name="travelDate"
                                    value={bookingInfo.travelDate}
                                    onChange={handleInputChange}
                                    className="w-full md:w-1/2 border border-gray-300 rounded-lg p-2 outline-none"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">Người lớn</p>
                                        <p className="text-sm text-gray-500">Từ 12 tuổi trở lên</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => handleQuantityChange("adults", "dec")} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100">-</button>
                                        <span className="w-8 text-center">{bookingInfo.adults}</span>
                                        <button type="button" onClick={() => handleQuantityChange("adults", "inc")} className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-orange-50">+</button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t">
                                    <div>
                                        <p className="font-medium">Trẻ em</p>
                                        <p className="text-sm text-gray-500">Từ 2 - 11 tuổi (75% giá vé)</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => handleQuantityChange("children", "dec")} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100">-</button>
                                        <span className="w-8 text-center">{bookingInfo.children}</span>
                                        <button type="button" onClick={() => handleQuantityChange("children", "inc")} className="w-8 h-8 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-orange-50">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cột phải: Tóm tắt đơn hàng */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                            <h2 className="text-lg font-bold mb-4">Tóm tắt chuyến đi</h2>

                            <div className="flex gap-3 mb-4">
                                <img src={tour.media?.thumbnail} alt={tour.title} className="w-20 h-20 object-cover rounded-lg" />
                                <div>
                                    <h3 className="text-sm font-semibold line-clamp-2">{tour.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">Mã tour: {tour.tourId}</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm border-t pt-3 mb-4">
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

                            <div className="flex justify-between items-center border-t pt-3 mb-6">
                                <span className="font-bold text-gray-800">Tổng cộng</span>
                                <span className="font-bold text-xl text-primary">{totalPrice.toLocaleString('vi-VN')} ₫</span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition duration-300"
                            >
                                Tiếp tục thanh toán
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;