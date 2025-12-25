// src/pages/LoveTour.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const MOCK_FAVORITES = [
    {
        id: "t1",
        title: "Tour Vịnh Hạ Long 2N1Đ - Du thuyền 5 Sao Sealife Legend",
        location: "Hạ Long, Quảng Ninh",
        image: "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd__1_7767_cauthehuc.webp",
        rating: 9.4,
        reviewCount: 324,
        price: 2500000,
        originalPrice: 3200000,
        tags: ["Bán chạy", "Ưu đãi hè"]
    },
    {
        id: "t2",
        title: "Vé VinWonders Nam Hội An - Trải nghiệm văn hóa & giải trí",
        location: "Thăng Bình, Quảng Nam",
        image: "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd__1_5462_0e0a9779.webp",
        rating: 8.8,
        reviewCount: 1205,
        price: 880000,
        originalPrice: 1050000,
        tags: ["Vé vui chơi"]
    },
    {
        id: "t3",
        title: "Tour Săn Mây Đà Lạt & Đón Bình Minh Trên Đồi Chè Cầu Đất",
        location: "Đà Lạt, Lâm Đồng",
        image: "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd__1_7767_cauthehuc.webp",
        rating: 9.6,
        reviewCount: 85,
        price: 350000,
        originalPrice: 500000,
        tags: ["Tour trong ngày"]
    }
];

const LoveTour = () => {

    // Thực tế bạn sẽ lấy từ localStorage: JSON.parse(localStorage.getItem('lovedTours') || '[]')
    const [favorites, setFavorites] = useState(MOCK_FAVORITES);

    const handleRemove = (id) => {
        if (window.confirm("Bạn muốn bỏ tour này khỏi danh sách yêu thích?")) {
            const newList = favorites.filter(item => item.id !== id);
            setFavorites(newList);
            // localStorage.setItem('lovedTours', JSON.stringify(newList)); // Cập nhật localStorage nếu dùng
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12 font-sans">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <span className="text-red-500 text-3xl">❤</span>
                        Danh sách Yêu thích
                        <span className="text-sm font-normal text-gray-500 ml-2 bg-gray-100 px-2 py-0.5 rounded-full">
                            {favorites.length}
                        </span>
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8">
                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favorites.map((tour) => (
                            <div
                                key={tour.id}
                                className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 relative flex flex-col"
                            >
                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

                                    {/* Tags */}
                                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                        {tour.tags?.map((tag, idx) => (
                                            <span key={idx} className="bg-blue-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm uppercase tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => handleRemove(tour.id)}
                                        className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-red-500 hover:bg-white hover:scale-110 transition shadow-sm z-20"
                                        title="Bỏ yêu thích"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Content Section */}
                                <div className="p-4 flex-1 flex flex-col">
                                    {/* Location */}
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
                                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                        {tour.location}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 min-h-[48px] hover:text-blue-600 transition cursor-pointer">
                                        {tour.title}
                                    </h3>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded text-blue-600 font-bold text-xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                            </svg>
                                            {tour.rating}
                                        </div>
                                        <span className="text-xs text-gray-400">({tour.reviewCount} đánh giá)</span>
                                    </div>

                                    <div className="mt-auto border-t border-dashed pt-3">
                                        <div className="flex flex-col items-end">
                                            {/* Original Price */}
                                            {tour.originalPrice && (
                                                <span className="text-xs text-gray-400 line-through mb-0.5">
                                                    {formatPrice(tour.originalPrice)}
                                                </span>
                                            )}
                                            {/* Final Price */}
                                            <div className="text-lg font-bold text-orange-600">
                                                {formatPrice(tour.price)}
                                            </div>
                                        </div>

                                        <Link
                                            to={`/book/${tour.id}`}
                                            className="block mt-3 w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition shadow-blue-100 shadow-lg"
                                        >
                                            Đặt ngay
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                        <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6 relative">
                            <img
                                src="https://img.icons8.com/fluency/96/wish-list.png"
                                alt="Empty"
                                className="w-24 h-24 opacity-80"
                            />
                            <div className="absolute top-2 right-4 text-3xl animate-bounce">✨</div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Danh sách trống trơn à!</h3>
                        <p className="text-gray-500 max-w-xs text-center mb-8">
                            Có vẻ bạn chưa lưu tour nào. Hãy khám phá thêm những địa điểm thú vị nhé!
                        </p>
                        <Link
                            to="/"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-200 transition transform hover:-translate-y-1"
                        >
                            Khám phá ngay
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoveTour;