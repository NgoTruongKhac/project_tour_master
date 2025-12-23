// src/pages/PaymentPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const PaymentPage = () => {
    // ... (các phần code cũ giữ nguyên)
    const { tour, bookingInfo, totalPrice } = state || {}; // Thêm fallback || {} để tránh lỗi nếu state null

    const handlePayment = () => {
        // 1. Tạo đối tượng đơn hàng mới
        const newBooking = {
            id: Date.now(), // Tạo mã đơn hàng ngẫu nhiên dựa trên thời gian
            tour: tour,
            bookingInfo: bookingInfo,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            status: 'success', // Giả lập thanh toán thành công
            bookingDate: new Date().toISOString()
        };

        // 2. Lấy lịch sử cũ từ localStorage
        const currentHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');

        // 3. Thêm đơn hàng mới vào đầu danh sách
        const updatedHistory = [newBooking, ...currentHistory];

        // 4. Lưu lại vào localStorage
        localStorage.setItem('bookingHistory', JSON.stringify(updatedHistory));

        // 5. Thông báo và chuyển hướng
        alert("Thanh toán thành công! Bạn có thể xem lại vé trong phần Lịch sử.");
        navigate("/history"); // Chuyển hướng đến trang lịch sử thay vì trang chủ
    };
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Thanh toán</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cột trái: Phương thức thanh toán */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h2>

                            <div className="space-y-3">
                                {/* Option 1: Chuyển khoản */}
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'bank_transfer' ? 'border-primary bg-orange-50' : 'border-gray-200'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="bank_transfer"
                                        checked={paymentMethod === 'bank_transfer'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-5 h-5 text-primary focus:ring-primary"
                                    />
                                    <div className="ml-4 flex-1">
                                        <span className="block font-medium">Chuyển khoản ngân hàng (QR Code)</span>
                                        <span className="text-xs text-gray-500">Xác nhận tự động trong 5 phút</span>
                                    </div>
                                    <img src="https://img.icons8.com/color/48/bank-transfer.png" alt="bank" className="w-8 h-8"/>
                                </label>

                                {/* Option 2: Thẻ quốc tế */}
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'credit_card' ? 'border-primary bg-orange-50' : 'border-gray-200'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="credit_card"
                                        checked={paymentMethod === 'credit_card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-5 h-5 text-primary focus:ring-primary"
                                    />
                                    <div className="ml-4 flex-1">
                                        <span className="block font-medium">Thẻ tín dụng / Ghi nợ quốc tế</span>
                                        <span className="text-xs text-gray-500">Visa, MasterCard, JCB</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <img src="https://img.icons8.com/color/48/visa.png" alt="visa" className="w-8 h-8"/>
                                        <img src="https://img.icons8.com/color/48/mastercard.png" alt="mastercard" className="w-8 h-8"/>
                                    </div>
                                </label>

                                {/* Option 3: Ví điện tử */}
                                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'ewallet' ? 'border-primary bg-orange-50' : 'border-gray-200'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="ewallet"
                                        checked={paymentMethod === 'ewallet'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-5 h-5 text-primary focus:ring-primary"
                                    />
                                    <div className="ml-4 flex-1">
                                        <span className="block font-medium">Ví điện tử MoMo / ZaloPay</span>
                                    </div>
                                    <img src="https://img.icons8.com/color/48/momo.png" alt="momo" className="w-8 h-8"/>
                                </label>
                            </div>

                            {/* Khu vực hiển thị chi tiết thanh toán dựa trên lựa chọn */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                {paymentMethod === 'bank_transfer' && (
                                    <div className="text-sm text-gray-600">
                                        <p>Vui lòng chuyển khoản đến số tài khoản:</p>
                                        <p className="font-bold text-gray-800 mt-1">1903 1234 5678 99</p>
                                        <p>Ngân hàng: Techcombank</p>
                                        <p>Chủ tài khoản: DU LỊCH VIỆT NAM</p>
                                        <p className="mt-2">Nội dung: <strong>Thanh toan tour {tour.tourId}</strong></p>
                                    </div>
                                )}
                                {paymentMethod === 'credit_card' && (
                                    <div className="space-y-3">
                                        <input type="text" placeholder="Số thẻ" className="w-full p-2 border rounded" />
                                        <div className="flex gap-3">
                                            <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded" />
                                            <input type="text" placeholder="CVV" className="w-1/2 p-2 border rounded" />
                                        </div>
                                        <input type="text" placeholder="Tên chủ thẻ" className="w-full p-2 border rounded" />
                                    </div>
                                )}
                                {paymentMethod === 'ewallet' && (
                                    <div className="text-center">
                                        <p className="text-sm mb-2">Quét mã QR để thanh toán</p>
                                        <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center text-gray-400">
                                            [QR CODE]
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Cột phải: Thông tin đơn hàng */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                            <h2 className="text-lg font-bold mb-4">Chi tiết đơn hàng</h2>

                            <div className="mb-4 pb-4 border-b">
                                <h3 className="font-semibold text-gray-800">{tour.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">Ngày đi: {bookingInfo.travelDate}</p>
                                <p className="text-sm text-gray-500">Khách: {bookingInfo.adults} người lớn, {bookingInfo.children} trẻ em</p>
                            </div>

                            <div className="mb-4 pb-4 border-b">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Thông tin khách hàng</h4>
                                <p className="text-sm text-gray-600">{bookingInfo.fullName}</p>
                                <p className="text-sm text-gray-600">{bookingInfo.phone}</p>
                                <p className="text-sm text-gray-600">{bookingInfo.email}</p>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-gray-800">Tổng thanh toán</span>
                                <span className="font-bold text-2xl text-primary">{totalPrice.toLocaleString('vi-VN')} ₫</span>
                            </div>

                            <button
                                onClick={handlePayment}
                                className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg shadow-orange-200"
                            >
                                Thanh toán ngay
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                Bằng việc chọn thanh toán, bạn đồng ý với Điều khoản & Điều kiện của chúng tôi.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;