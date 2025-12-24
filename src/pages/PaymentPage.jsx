// src/pages/PaymentPage.jsx
import React, {useState, useEffect} from "react";
import {useLocation, useNavigate, Link} from "react-router-dom";


const BANK_INFO = {
    bankId: "MB",
    accountNo: "0352169819",
    accountName: "NGUYEN VAN THANH",
    template: "compact2"
};

const PaymentPage = () => {
    const {state} = useLocation();
    const navigate = useNavigate();


    const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
    const [timeLeft, setTimeLeft] = useState(900);
    const [isProcessing, setIsProcessing] = useState(false);


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    // Kiểm tra dữ liệu
    if (!state) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
                    <img src="https://img.icons8.com/fluency/96/error.png" alt="error" className="mx-auto mb-4"/>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy đơn hàng!</h2>
                    <Link to="/"
                          className="inline-block bg-primary text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition font-medium">
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    const {tour, bookingInfo, totalPrice} = state;


    const qrCodeUrl = `https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNo}-${BANK_INFO.template}.png?amount=${totalPrice}&addInfo=TOUR ${tour?.id} ${bookingInfo?.phone}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

    const handlePayment = () => {
        setIsProcessing(true);


        setTimeout(() => {
            const newBooking = {
                id: Date.now(),
                tour: tour,
                bookingInfo: bookingInfo,
                totalPrice: totalPrice,
                paymentMethod: paymentMethod,
                status: 'success',
                bookingDate: new Date().toISOString()
            };

            const currentHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
            const updatedHistory = [newBooking, ...currentHistory];
            localStorage.setItem('bookingHistory', JSON.stringify(updatedHistory));

            setIsProcessing(false);
            alert("Thanh toán thành công! Vé điện tử đã được gửi.");
            navigate("/history");
        }, 1500);
    };

    return (
        <div className="bg-[#f2f4f7] min-h-screen pb-12">
            {/* Header Steps */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-gray-800">Thanh toán</h1>
                        </div>
                        {/* Progress Steps */}
                        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">1</span>
                                <span>Đặt chỗ</span>
                            </div>
                            <div className="w-8 h-[1px] bg-gray-300"></div>
                            <div className="flex items-center gap-2 text-primary">
                                <span
                                    className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span>
                                <span>Thanh toán</span>
                            </div>
                            <div className="w-8 h-[1px] bg-gray-300"></div>
                            <div className="flex items-center gap-2">
                                <span
                                    className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">3</span>
                                <span>Vé điện tử</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Warning Banner */}
            <div className="bg-blue-50 border-b border-blue-100 text-center py-2 text-sm text-blue-800 font-medium">
                Vui lòng hoàn tất thanh toán trong <span
                className="font-bold text-red-500">{formatTime(timeLeft)}</span> để giữ giá tốt nhất.
            </div>

            <div className="max-w-5xl mx-auto px-4 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* CỘT TRÁI: PHƯƠNG THỨC THANH TOÁN */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Section Header */}
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <img src="https://img.icons8.com/color/48/bank-cards.png" className="w-6 h-6"
                                 alt="payment"/>
                            Phương thức thanh toán
                        </h2>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                            {/* Option 1: Chuyển khoản */}
                            <label
                                className={`relative flex items-start p-5 cursor-pointer border-b transition hover:bg-gray-50 ${paymentMethod === 'bank_transfer' ? 'bg-orange-50/50' : ''}`}>
                                <div className="flex items-center h-5">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="bank_transfer"
                                        checked={paymentMethod === 'bank_transfer'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span
                                            className="font-semibold text-gray-800">Chuyển khoản Ngân hàng (QR Code)</span>
                                        {/* ĐÃ SỬA: Thay icon lỗi bằng SVG */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-8 h-8">
                                            <path fill="#4caf50"
                                                  d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30 30-13.432 30-30S48.568 2 32 2zm0 57C17.112 59 5 46.888 5 32S17.112 5 32 5s27 12.112 27 27-12.112 27-27 27z"/>
                                            <path fill="#4caf50" d="M44 32h-8v-8h-4v8H20v4h12v8h4v-8h8z"/>
                                            <path fill="#2e7d32" d="M16 22h32v4H16zM16 38h8v4h-8zM40 38h8v4h-8z"/>
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-500">Hỗ trợ tất cả các ngân hàng tại Việt Nam. Xác
                                        nhận tức thì.</p>

                                    {/* Chi tiết hiển thị khi chọn */}
                                    {paymentMethod === 'bank_transfer' && (
                                        <div
                                            className="mt-4 p-4 bg-white rounded-lg border border-gray-200 animate-fadeIn">
                                            <div className="flex flex-col md:flex-row gap-6 items-center">
                                                <div className="bg-white p-2 border rounded-lg shadow-sm">
                                                    {/* ĐÃ SỬA: Thay placeholder bằng ảnh QR thật */}
                                                    <img
                                                        src={qrCodeUrl}
                                                        alt="VietQR"
                                                        className="w-32 h-32 md:w-40 md:h-40 object-contain"
                                                    />
                                                </div>
                                                <div className="text-sm space-y-2 w-full">
                                                    <div
                                                        className="bg-yellow-50 text-yellow-800 px-2 py-1 rounded text-xs inline-block mb-1">
                                                        ⚡ Quét mã để thanh toán tự động
                                                    </div>
                                                    <p className="text-gray-500">Ngân hàng: <b
                                                        className="text-gray-800">{BANK_INFO.bankId}</b></p>
                                                    <p className="text-gray-500">Chủ TK: <b
                                                        className="text-gray-800">{BANK_INFO.accountName}</b></p>
                                                    <p className="text-gray-500">Số tiền: <b
                                                        className="text-primary text-lg">{totalPrice.toLocaleString()} ₫</b>
                                                    </p>
                                                    <p className="text-gray-500">Nội dung: <b
                                                        className="text-gray-800">TOUR {tour?.id} {bookingInfo?.phone}</b>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </label>

                            {/* Option 2: Thẻ Quốc tế */}
                            <label
                                className={`relative flex items-start p-5 cursor-pointer border-b transition hover:bg-gray-50 ${paymentMethod === 'credit_card' ? 'bg-orange-50/50' : ''}`}>
                                <div className="flex items-center h-5">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="credit_card"
                                        checked={paymentMethod === 'credit_card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-800">Thẻ Tín dụng / Ghi nợ</span>
                                        <div className="flex gap-1">
                                            <img src="https://img.icons8.com/color/48/visa.png" alt="visa"
                                                 className="w-8 h-8 object-contain"/>
                                            <img src="https://img.icons8.com/color/48/mastercard.png" alt="mastercard"
                                                 className="w-8 h-8 object-contain"/>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">Miễn phí phí giao dịch cho thẻ
                                        Visa/Mastercard.</p>

                                    {paymentMethod === 'credit_card' && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                                            <div className="space-y-3">
                                                <input type="text" placeholder="Số thẻ (Card Number)"
                                                       className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-primary outline-none bg-white"/>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <input type="text" placeholder="MM/YY"
                                                           className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-primary outline-none bg-white"/>
                                                    <input type="text" placeholder="CVV"
                                                           className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-primary outline-none bg-white"/>
                                                </div>
                                                <input type="text" placeholder="Tên chủ thẻ (như trên thẻ)"
                                                       className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-primary outline-none bg-white"/>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </label>

                            {/* Option 3: Ví điện tử */}
                            <label
                                className={`relative flex items-start p-5 cursor-pointer transition hover:bg-gray-50 ${paymentMethod === 'ewallet' ? 'bg-orange-50/50' : ''}`}>
                                <div className="flex items-center h-5">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="ewallet"
                                        checked={paymentMethod === 'ewallet'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-800">Ví điện tử</span>
                                        <div className="flex gap-1">
                                            <img
                                                src="https://th.bing.com/th?q=V%c3%ad+Momo+Logo.png&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-WW&cc=VN&setlang=en&adlt=moderate&t=1&mw=247"
                                                alt="momo"
                                                className="w-8 h-8 object-contain border border-gray-200 rounded-lg p-0.5"
                                            />
                                            <img
                                                src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                                                alt="zalopay"
                                                className="w-8 h-8 object-contain border border-gray-200 rounded-lg"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500">Thanh toán nhanh chóng qua MoMo hoặc
                                        ZaloPay.</p>
                                </div>
                            </label>
                        </div>

                        {/* Thông tin an toàn */}
                        <div className="flex items-center gap-2 justify-center text-gray-400 text-xs mt-4">
                            <img src="https://img.icons8.com/fluency/48/security-checked.png" className="w-4 h-4"
                                 alt="secure"/>
                            <span>Thanh toán an toàn & được mã hóa 100%</span>
                        </div>
                    </div>

                    {/* CỘT PHẢI: CHI TIẾT ĐƠN HÀNG */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">

                            {/* Mã giảm giá */}
                            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <img src="https://img.icons8.com/fluency/48/discount.png" className="w-5 h-5"
                                         alt="coupon"/>
                                    Mã ưu đãi
                                </h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Nhập mã giảm giá"
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-primary outline-none"
                                    />
                                    <button
                                        className="text-primary font-semibold text-sm px-2 hover:bg-orange-50 rounded-lg transition">
                                        Áp dụng
                                    </button>
                                </div>
                            </div>

                            {/* Tóm tắt đơn hàng */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b bg-gray-50">
                                    <h2 className="font-bold text-gray-800">Chi tiết đặt chỗ</h2>
                                    <p className="text-xs text-gray-500 mt-1">Mã
                                        đơn: {Date.now().toString().slice(-6)}</p>
                                </div>

                                <div className="p-4 space-y-4">
                                    {/* Tour Info */}
                                    <div className="flex gap-3">
                                        <img
                                            src={tour?.media?.thumbnail || "https://placehold.co/100"}
                                            alt={tour?.title}
                                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                        />
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{tour?.title}</h3>
                                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                                <span>📅 {bookingInfo?.travelDate}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Khách hàng */}
                                    <div className="pt-3 border-t border-dashed">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-600">Khách hàng</span>
                                            <span className="font-medium text-gray-800">{bookingInfo?.fullName}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Email</span>
                                            <span
                                                className="font-medium text-gray-800 truncate max-w-[150px]">{bookingInfo?.email}</span>
                                        </div>
                                    </div>

                                    {/* Giá chi tiết */}
                                    <div className="pt-3 border-t border-dashed space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Người lớn (x{bookingInfo?.adults})</span>
                                            <span className="font-medium text-gray-800">
                                                {(tour?.basePrice ? parseInt(tour.basePrice.replace(/\D/g, "")) * bookingInfo.adults : 0).toLocaleString()} ₫
                                            </span>
                                        </div>
                                        {bookingInfo?.children > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Trẻ em (x{bookingInfo?.children})</span>
                                                <span className="font-medium text-gray-800">
                                                    {(tour?.basePrice ? parseInt(tour.basePrice.replace(/\D/g, "")) * 0.75 * bookingInfo.children : 0).toLocaleString()} ₫
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-sm text-green-600">
                                            <span>Thuế & Phí dịch vụ</span>
                                            <span>Đã bao gồm</span>
                                        </div>
                                    </div>

                                    {/* Tổng cộng */}
                                    <div className="pt-4 border-t flex justify-between items-center">
                                        <span className="font-bold text-gray-800">Tổng thanh toán</span>
                                        <span className="text-xl font-bold text-primary">
                                            {totalPrice?.toLocaleString('vi-VN')} ₫
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 border-t">
                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing} // Disable khi đang xử lý
                                        className={`w-full bg-primary text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-lg shadow-orange-200 flex items-center justify-center gap-2
                                            ${isProcessing ? 'bg-orange-300 cursor-not-allowed' : 'hover:bg-orange-600'}
                                        `}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div
                                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            <>
                                                Thanh toán ngay
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;