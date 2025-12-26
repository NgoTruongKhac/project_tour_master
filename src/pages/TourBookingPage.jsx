// src/pages/TourBookingPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toursData from "../data/data_tours.json";

const TourBookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState(null);


    const countries = [
        "Vietnam", "United States", "United Kingdom", "Japan", "South Korea",
        "China", "Taiwan", "Thailand", "Singapore", "Malaysia", "Indonesia",
        "Australia", "Canada", "France", "Germany", "Russia", "Other"
    ];


    const phoneCodes = [
        { code: "+84", label: "VN (+84)" },
        { code: "+1", label: "US (+1)" },
        { code: "+44", label: "UK (+44)" },
        { code: "+81", label: "JP (+81)" },
        { code: "+82", label: "KR (+82)" },
        { code: "+86", label: "CN (+86)" },
        { code: "+66", label: "TH (+66)" },
        { code: "+65", label: "SG (+65)" },
        { code: "+61", label: "AU (+61)" },
        { code: "+33", label: "FR (+33)" },
        { code: "+49", label: "DE (+49)" },
    ];


    const getNext7Days = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i + 1);

            const formattedDate = new Intl.DateTimeFormat('vi-VN', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(nextDate);

            const capitalizedDate = formattedDate.replace(/^t/, 'T');
            dates.push(capitalizedDate);
        }
        return dates;
    };

    const availableDates = getNext7Days();


    const tourPackages = [
        { id: "std", name: "Tiêu chuẩn (Khách sạn 3*)", priceMod: 0 },
        { id: "prm", name: "Cao cấp (Du thuyền 5* + KS 4*)", priceMod: 1500000 }
    ];


    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);


    const [bookingInfo, setBookingInfo] = useState({
        contactSurname: "",
        contactGivenName: "",
        email: "",
        phone: "",
        phoneCode: "+84",


        adults: 1,
        children: 0,
        travelDate: availableDates[0],
        selectedPackage: tourPackages[0].id,


        passengerTitle: "MR",
        passengerSurname: "",
        passengerGivenName: "",
        passengerDobDay: "",
        passengerDobMonth: "",
        passengerDobYear: "",
        passengerNationality: "Vietnam",
    });

    useEffect(() => {
        const foundTour = toursData.find((t) => t.tourId === parseInt(id));
        if (foundTour) {
            setTour({
                ...foundTour,

            });
        } else {
            setTour({
                title: "Ngủ đêm trên Du thuyền Hạ Long cao cấp - Chùa Bái Đính - KDL Tràng An - Tuyệt Tịnh Cốc",
                duration: "4N3Đ",
                basePrice: "3500000",
                media: { thumbnail: "https://placehold.co/400x300?text=Ha+Long+Bay" }
            });
        }
    }, [id]);

    const parsePrice = (priceString) => {
        if (!priceString) return 0;
        return parseInt(priceString.toString().replace(/\D/g, ""));
    };

    const getPackagePrice = () => {
        const pkg = tourPackages.find(p => p.id === bookingInfo.selectedPackage);
        return pkg ? pkg.priceMod : 0;
    }

    const basePrice = tour ? parsePrice(tour.basePrice) + getPackagePrice() : 0;
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
        const fullBookingInfo = {
            ...bookingInfo,
            fullName: ` ${bookingInfo.contactGivenName} ${bookingInfo.contactSurname}`.trim(),
            fullPhone: `${bookingInfo.phoneCode} ${bookingInfo.phone}`,
            packageName: tourPackages.find(p => p.id === bookingInfo.selectedPackage)?.name
        };
        navigate("/payment", { state: { tour, bookingInfo: fullBookingInfo, totalPrice } });
    };

    if (!tour) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="bg-[#f2f4f7] min-h-screen pb-12 font-sans text-[#03121a]">
            {/* Header Steps */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-gray-800">Đặt Tour Du Lịch</h1>
                        </div>
                        {/* Progress Steps */}
                        <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2 text-blue-600">
                                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
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
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* --- CỘT TRÁI --- */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Card Login */}
                        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm flex items-start gap-4">
                            <img src="https://img.icons8.com/color/48/user-male-circle--v1.png" className="w-10 h-10" alt="user"/>
                            <div>
                                <p className="text-sm font-bold text-gray-800">Đăng nhập với tên {bookingInfo.contactGivenName || "Khách hàng"}</p>
                                <p className="text-xs text-gray-500 mt-1">Thông tin liên hệ của bạn sẽ được lưu tự động cho lần đặt sau.</p>
                            </div>
                        </div>

                        {/* 2. Card Thông tin liên hệ */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Thông tin liên hệ (nhận vé/phiếu thanh toán)</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Họ (như trên CMND/CCCD) *</label>
                                    <input required type="text" name="contactSurname" value={bookingInfo.contactSurname} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 outline-none transition" />
                                    <p className="text-xs text-gray-400 mt-1">VD: Nguyen (không dấu)</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Tên đệm và tên *</label>
                                    <input required type="text" name="contactGivenName" value={bookingInfo.contactGivenName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 outline-none transition" />
                                    <p className="text-xs text-gray-400 mt-1">VD: Van A (không dấu)</p>
                                </div>

                                {/* CẬP NHẬT: Chọn mã vùng điện thoại */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Điện thoại di động *</label>
                                    <div className="flex">
                                        <select
                                            name="phoneCode"
                                            value={bookingInfo.phoneCode}
                                            onChange={handleInputChange}
                                            className="inline-flex items-center px-2 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-sm font-medium outline-none focus:border-blue-500 cursor-pointer min-w-[100px]"
                                        >
                                            {phoneCodes.map(item => (
                                                <option key={item.code} value={item.code}>{item.label}</option>
                                            ))}
                                        </select>
                                        <input
                                            required
                                            type="tel"
                                            name="phone"
                                            value={bookingInfo.phone}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-r-lg p-2.5 focus:border-blue-500 outline-none transition"
                                            placeholder="Số điện thoại"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Email *</label>
                                    <input required type="email" name="email" value={bookingInfo.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 outline-none transition" />
                                    <p className="text-xs text-gray-500 mt-1">Vé điện tử sẽ được gửi qua email này</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Card Chi tiết đặt chỗ (Tour) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <img src="https://img.icons8.com/fluency/48/map-pin.png" className="w-6 h-6" alt="tour"/>
                                Tùy chọn Tour & Ngày khởi hành
                            </h2>

                            <div className="space-y-4 mb-6">
                                {/* Chọn Ngày Khởi Hành */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Ngày khởi hành</label>
                                    <div className="relative">
                                        <select
                                            name="travelDate"
                                            value={bookingInfo.travelDate}
                                            onChange={handleInputChange}
                                            className="appearance-none w-full border border-gray-300 rounded-lg p-3 pr-10 outline-none focus:border-blue-500 bg-white cursor-pointer font-medium text-gray-700"
                                        >
                                            {availableDates.map((date, index) => (
                                                <option key={index} value={date}>{date}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Chọn Gói Tour */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Hạng dịch vụ</label>
                                    <div className="relative">
                                        <select
                                            name="selectedPackage"
                                            value={bookingInfo.selectedPackage}
                                            onChange={handleInputChange}
                                            className="appearance-none w-full border border-gray-300 rounded-lg p-3 pr-10 outline-none focus:border-blue-500 bg-white cursor-pointer font-medium text-gray-700"
                                        >
                                            {tourPackages.map(pkg => (
                                                <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                    <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Gói cao cấp bao gồm nâng hạng phòng và bữa tối VIP.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t pt-4 space-y-4">
                                {/* Người lớn */}
                                <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition border border-transparent hover:border-gray-200">
                                    <div>
                                        <p className="font-semibold text-gray-800">Người lớn</p>
                                        <p className="text-sm text-gray-500">Từ 12 tuổi trở lên</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => handleQuantityChange("adults", "dec")} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50" disabled={bookingInfo.adults <= 1}>-</button>
                                        <span className="w-8 text-center font-semibold text-lg">{bookingInfo.adults}</span>
                                        <button type="button" onClick={() => handleQuantityChange("adults", "inc")} className="w-9 h-9 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition">+</button>
                                    </div>
                                </div>

                                {/* Trẻ em */}
                                <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition border border-transparent hover:border-gray-200">
                                    <div>
                                        <p className="font-semibold text-gray-800">Trẻ em</p>
                                        <p className="text-sm text-gray-500">Từ 2 - 11 tuổi</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => handleQuantityChange("children", "dec")} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition disabled:opacity-50" disabled={bookingInfo.children <= 0}>-</button>
                                        <span className="w-8 text-center font-semibold text-lg">{bookingInfo.children}</span>
                                        <button type="button" onClick={() => handleQuantityChange("children", "inc")} className="w-9 h-9 rounded-full border border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Card Thông tin hành khách */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Thông tin hành khách</h2>
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <p className="text-xs text-gray-700 leading-5">
                                    Vui lòng chú ý: Nhập tên đúng như trên CMND/CCCD/Hộ chiếu.
                                </p>
                            </div>

                            <div className="mb-2">
                                <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded">1</span>
                                    Người lớn
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Danh xưng</label>
                                        <select name="passengerTitle" value={bookingInfo.passengerTitle} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 outline-none bg-white">
                                            <option value="MR">Ông</option>
                                            <option value="MS">Bà</option>
                                            <option value="MISS">Cô</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Họ</label>
                                        <input type="text" name="passengerSurname" className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 outline-none" placeholder="như trên CMND" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Tên đệm và tên</label>
                                        <input type="text" name="passengerGivenName" className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 outline-none" placeholder="như trên CMND" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Ngày sinh</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <select name="passengerDobDay" value={bookingInfo.passengerDobDay} onChange={handleInputChange} className="appearance-none w-full border border-gray-300 rounded-lg p-2.5 text-center focus:border-blue-500 outline-none bg-white" style={{ backgroundImage: 'none' }}>
                                                <option value="" disabled>Ngày</option>
                                                {days.map((d) => <option key={d} value={d}>{d}</option>)}
                                            </select>
                                            <select name="passengerDobMonth" value={bookingInfo.passengerDobMonth} onChange={handleInputChange} className="appearance-none w-full border border-gray-300 rounded-lg p-2.5 text-center focus:border-blue-500 outline-none bg-white" style={{ backgroundImage: 'none' }}>
                                                <option value="" disabled>Tháng</option>
                                                {months.map((m) => <option key={m} value={m}>Tháng {m}</option>)}
                                            </select>
                                            <select name="passengerDobYear" value={bookingInfo.passengerDobYear} onChange={handleInputChange} className="appearance-none w-full border border-gray-300 rounded-lg p-2.5 text-center focus:border-blue-500 outline-none bg-white" style={{ backgroundImage: 'none' }}>
                                                <option value="" disabled>Năm</option>
                                                {years.map((y) => <option key={y} value={y}>{y}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1.5">Quốc tịch</label>
                                        <select name="passengerNationality" value={bookingInfo.passengerNationality} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-blue-500 outline-none bg-white">
                                            {countries.map((country) => <option key={country} value={country}>{country}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Card Tiện ích */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Dịch vụ & Tiện ích Tour</h2>
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                                    <img src="https://img.icons8.com/color/48/guarantee.png" className="w-6 h-6" alt="service"/>
                                    Dịch vụ bao gồm
                                </h3>
                                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                                    <p className="text-green-800 font-medium text-sm mb-2">Trọn gói dịch vụ:</p>
                                    <div className="flex flex-col gap-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span>Xe đưa đón 2 chiều & HDV suốt tuyến</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span>Vé tham quan tất cả các điểm trong lịch trình</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: TÓM TẮT --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-0 sticky top-24 overflow-hidden border border-gray-100">
                            <div className="p-4 border-b">
                                <h2 className="text-lg font-bold text-gray-800">Tóm tắt chuyến đi</h2>
                            </div>

                            <div className="p-4">
                                <div className="flex gap-3 mb-4">
                                    <img
                                        src={tour.media?.thumbnail || "https://placehold.co/100"}
                                        alt={tour.title}
                                        className="w-16 h-16 object-cover rounded-md shadow-sm"
                                    />
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-800 line-clamp-3 mb-1">{tour.title}</h3>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Tour trọn gói</span>
                                            <span>•</span>
                                            <span className="font-bold">{tour.duration}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Ngày đi:</span>
                                        <span className="font-medium text-gray-800">{bookingInfo.travelDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Gói:</span>
                                        <span className="font-medium text-gray-800 truncate max-w-[150px] text-right">
                                            {tourPackages.find(p => p.id === bookingInfo.selectedPackage)?.name.split('(')[0]}
                                        </span>
                                    </div>
                                </div>

                                <hr className="border-dashed border-gray-200 my-4"/>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Người lớn (x{bookingInfo.adults})</span>
                                        <span className="font-medium text-gray-900">{(basePrice * bookingInfo.adults).toLocaleString('vi-VN')} ₫</span>
                                    </div>
                                    {bookingInfo.children > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Trẻ em (x{bookingInfo.children})</span>
                                            <span className="font-medium text-gray-900">{(basePrice * 0.75 * bookingInfo.children).toLocaleString('vi-VN')} ₫</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-gray-800 text-lg">Tổng cộng</span>
                                        <span className="font-bold text-xl text-orange-600">{totalPrice.toLocaleString('vi-VN')} ₫</span>
                                    </div>
                                    <div className="flex justify-end items-center gap-1 text-xs text-gray-500">
                                        <span>Tích lũy</span>
                                        <span className="font-bold text-gray-700">{(totalPrice / 1000).toFixed(0)} Points</span>
                                        <img src="https://img.icons8.com/fluency/48/star.png" className="w-3.5 h-3.5" alt="points"/>
                                    </div>
                                </div>

                                <button type="submit" className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-lg transition duration-300 shadow-lg shadow-orange-100 flex items-center justify-center gap-2">
                                    Tiếp tục thanh toán
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TourBookingPage;