import React, {useState, useMemo} from 'react';
import {ChevronLeft, ChevronRight, Calendar, Info, AlertCircle, Coins} from 'lucide-react';

const BookingTicket = () => {



    // Hàm tạo danh sách 7 ngày tiếp theo
    const generateNext7Days = () => {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);


            const dayOfWeek = nextDate.getDay();
            let dayName = `Thứ ${dayOfWeek + 1}`;
            if (dayOfWeek === 0) dayName = 'CN';
            if (dayOfWeek === 1) dayName = 'Thứ 2'; // Đảm bảo đúng format tiếng Việt

            const day = String(nextDate.getDate()).padStart(2, '0');
            const month = String(nextDate.getMonth() + 1).padStart(2, '0');
            const dateDisplay = `${day} thg ${month}`;


            const year = nextDate.getFullYear();
            const fullDate = `${year}-${month}-${day}`;

            days.push({
                day: dayName,
                date: dateDisplay,
                fullDate: fullDate
            });
        }
        return days;
    };


    const dates = useMemo(() => generateNext7Days(), []);


    const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);

    // State số lượng vé
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);

    // Helper format tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount).replace('₫', 'VND');
    };

    // Helper format hiển thị ngày đã chọn ở banner xanh
    const getSelectedDateDisplay = () => {
        const selectedObj = dates.find(d => d.fullDate === selectedDate);
        if (!selectedObj) return '';

        const year = selectedDate.split('-')[0];
        return `${selectedObj.day}, ${selectedObj.date} ${year}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-[#232323] pb-10">

            {/* 1. Header Navigation */}
            <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center">
                    <button
                        className="flex items-center gap-2 font-bold text-gray-800 hover:text-[#0194f3] transition-colors">
                        <ChevronLeft size={20}/>
                        Tìm phiếu dịch vụ khác
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-6">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* 2. Left Sidebar (Thông tin Tour tóm tắt) */}
                    <div className="w-full lg:w-[300px] flex-shrink-0">
                        <div
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-20">
                            <div className="h-40 overflow-hidden">
                                <img
                                    src="https://ik.imagekit.io/tvlk/xpe-asset/AyJ40ZAo1DOyPyKLZ9cx3SJY5S6hkiBAlW8OBX5zUIr/20230214/1676344583321-b3b320d31c42f061298516091e9f1a2a.jpeg?_src=imagekit&tr=c-at_max,h-568,q-60,w-720"
                                    alt="Tour Thumbnail"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 text-lg mb-4 leading-tight">
                                    Tour ghép - Khởi hành thành phố Phú Quốc
                                </h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-start gap-2 text-sm">
                                        <div className="text-[#f96d01] mt-0.5"><AlertCircle size={16}/></div>
                                        <span className="text-gray-700 font-medium">
                                            Có thể hoàn tiền cho đến <span className="text-[#f96d01] font-bold">trước 24h</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <div className="mt-0.5"><Calendar size={16}/></div>
                                        <span>Không thể đổi lịch</span>
                                    </div>
                                </div>

                                <hr className="border-dashed border-gray-300 mb-4"/>

                                <button
                                    className="w-full py-2.5 text-[#0194f3] font-bold text-sm bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors">
                                    Xem Thông tin vé
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 3. Main Content (Chọn ngày & Vé) */}
                    <div className="flex-1">

                        {/* Date Selector Bar */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
                            <div className="flex items-center gap-4">
                                {/* Nút Xem lịch */}
                                <button
                                    className="flex flex-col items-center justify-center min-w-[80px] h-[72px] border border-[#0194f3] rounded-lg text-[#0194f3] font-bold text-sm hover:bg-blue-50 transition-colors flex-shrink-0">
                                    <Calendar size={20} className="mb-1"/>
                                    Xem lịch
                                </button>

                                {/* Danh sách ngày (Scroll ngang) */}
                                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 flex-1">
                                    {dates.map((item, index) => {
                                        const isSelected = selectedDate === item.fullDate;
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => setSelectedDate(item.fullDate)}
                                                className={`
                          cursor-pointer min-w-[90px] h-[72px] rounded-lg border flex flex-col items-center justify-center transition-all select-none
                          ${isSelected
                                                    ? 'border-[#0194f3] bg-[#e5f4fe] text-[#0194f3]'
                                                    : 'border-gray-200 hover:border-gray-400 text-gray-600'}
                        `}
                                            >
                                                <span
                                                    className={`text-xs font-medium mb-1 ${isSelected ? 'text-[#0194f3]' : 'text-gray-500'}`}>
                                                    {item.day}
                                                </span>
                                                <span className="font-bold text-sm">{item.date}</span>
                                            </div>
                                        );
                                    })}
                                    {/* Nút Next giả lập */}
                                    <div
                                        className="min-w-[40px] h-[72px] flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-100 cursor-pointer">
                                        <ChevronRight size={20}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Selected Date Banner - Đã cập nhật hiển thị động */}
                        <div className="bg-[#e5f4fe] rounded-lg p-4 text-center mb-6">
                            <span className="text-gray-600 text-sm mr-2">Ngày tham quan đã chọn</span>
                            <span className="font-bold text-gray-900 text-lg">{getSelectedDateDisplay()}</span>
                        </div>

                        {/* Ticket List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">

                            {/* Vé Người lớn */}
                            <div
                                className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-1">Người lớn</h4>

                                    <div className="flex items-center gap-2 mb-1">
                                        <span
                                            className="text-xl font-black text-[#232323]">{formatCurrency(1314286)}</span>
                                        <span
                                            className="text-sm text-gray-400 line-through decoration-gray-400">{formatCurrency(1404000)}</span>
                                    </div>

                                    <div
                                        className="flex items-center gap-1.5 bg-[#fff8e6] text-[#b68a00] text-xs font-bold px-2 py-1 rounded w-fit mb-2">
                                        <Coins size={12} fill="currentColor"/> Earn 5.257 Points
                                    </div>

                                    <p className="text-sm text-gray-500">Trên 140 cm</p>
                                </div>

                                {/* Counter */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setAdultCount(Math.max(0, adultCount - 1))}
                                        disabled={adultCount === 0}
                                        className={`w-8 h-8 flex items-center justify-center rounded border ${adultCount === 0 ? 'border-gray-200 text-gray-300' : 'border-[#0194f3] text-[#0194f3]'} transition-colors`}
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center font-bold text-lg">{adultCount}</span>
                                    <button
                                        onClick={() => setAdultCount(adultCount + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded border border-[#0194f3] text-[#0194f3] hover:bg-blue-50 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Vé Trẻ em */}
                            <div
                                className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-1">Trẻ em</h4>

                                    <div className="flex items-center gap-2 mb-1">
                                        <span
                                            className="text-xl font-black text-[#232323]">{formatCurrency(857143)}</span>
                                        <span
                                            className="text-sm text-gray-400 line-through decoration-gray-400">{formatCurrency(891000)}</span>
                                    </div>

                                    <div
                                        className="flex items-center gap-1.5 bg-[#fff8e6] text-[#b68a00] text-xs font-bold px-2 py-1 rounded w-fit mb-2">
                                        <Coins size={12} fill="currentColor"/> Earn 3.428 Points
                                    </div>

                                    <p className="text-sm text-gray-500">100 – 140 cm</p>
                                </div>

                                {/* Counter */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setChildCount(Math.max(0, childCount - 1))}
                                        disabled={childCount === 0}
                                        className={`w-8 h-8 flex items-center justify-center rounded border ${childCount === 0 ? 'border-gray-200 text-gray-300' : 'border-[#0194f3] text-[#0194f3]'} transition-colors`}
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center font-bold text-lg">{childCount}</span>
                                    <button
                                        onClick={() => setChildCount(childCount + 1)}
                                        className="w-8 h-8 flex items-center justify-center rounded border border-[#0194f3] text-[#0194f3] hover:bg-blue-50 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Footer Total (Chỉ hiện khi có vé được chọn) */}
                        {(adultCount > 0 || childCount > 0) && (
                            <div
                                className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-50 animate-fade-in-up">
                                <div className="max-w-6xl mx-auto flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-500">Tổng cộng
                                            ({adultCount + childCount} vé)</p>
                                        <p className="text-[#ff5e1f] text-xl font-bold">
                                            {formatCurrency((adultCount * 1314286) + (childCount * 857143))}
                                        </p>
                                    </div>
                                    <button
                                        className="bg-[#ff5e1f] hover:bg-[#e04f18] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors">
                                        Đặt Vé
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* CSS Utility class for hiding scrollbar */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default BookingTicket;