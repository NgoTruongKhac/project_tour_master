// src/pages/LoveTour.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LoveTour = () => {
    const [favorites, setFavorites] = useState([]);
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [uniqueLocations, setUniqueLocations] = useState([]);


    const dummyData = [
        {
            tourId: 991,
            title: "Vé Thảo Cầm Viên tại Thành phố Hồ Chí Minh",
            location: "Bến Nghé",
            address: "District 1, Ho Chi Minh City",
            rating: 8.3,
            reviews: 18,
            price: 67012,
            category: "Hoạt động & Vui chơi",
            media: { thumbnail: "https://vcdn1-dulich.vnecdn.net/2022/09/16/thao-cam-vien-1-1663322797.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=s8wKq7kCgCgCgCgCgCgCg" }
        },
        {
            tourId: 992,
            title: "Vé Khu du lịch Văn hóa Suối Tiên",
            location: "Tân Phú",
            address: "District 9, Thu Duc City",
            rating: 8.8,
            reviews: 150,
            price: 139175,
            category: "Hoạt động & Vui chơi",
            media: { thumbnail: "https://cdn3.ivivu.com/2023/10/du-lich-suoi-tien-ivivu-1.jpg" }
        },
        {
            tourId: 993,
            title: "Tour Xe Buýt 2 Tầng Tham Quan TP.HCM",
            location: "Ho Chi Minh City",
            address: "Vietnam",
            rating: 9.0,
            reviews: 540,
            price: 150000,
            category: "Tour tham quan",
            media: { thumbnail: "https://vcdn1-dulich.vnecdn.net/2022/06/02/bus-2-tang-1-1654158428.jpg" }
        }
    ];

    useEffect(() => {

        let storedFavorites = JSON.parse(localStorage.getItem("orderTour") || "[]");


        if (storedFavorites.length === 0) {
            storedFavorites = dummyData;
        }

        setFavorites(storedFavorites);
        setFilteredFavorites(storedFavorites);

        // 2. Tạo danh sách địa điểm duy nhất cho bộ lọc checkbox
        const locationsMap = new Map();
        storedFavorites.forEach(item => {
            if (!locationsMap.has(item.tour.category)) {
                locationsMap.set(item.tour.category, item.address || "Vietnam");
            }
        });
        const locationsArray = Array.from(locationsMap, ([name, address]) => ({ name, address }));
        setUniqueLocations(locationsArray);

    }, []);

    const handleCheckboxChange = (locationName) => {
        const updatedSelected = selectedLocations.includes(locationName)
            ? selectedLocations.filter(loc => loc !== locationName)
            : [...selectedLocations, locationName];

        setSelectedLocations(updatedSelected);

        if (updatedSelected.length === 0) {
            setFilteredFavorites(favorites);
        } else {
            const filtered = favorites.filter(item => updatedSelected.includes(item.location));
            setFilteredFavorites(filtered);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Header Collections */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#fff0eb] rounded-full">
                            <img src="https://img.icons8.com/ios-filled/50/ff5e1f/bookmark-ribbon.png" alt="collection" className="w-8 h-8"/>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
                            <p className="text-gray-500 mt-1 text-sm">Cách dễ dàng để sắp xếp các mục bạn yêu thích</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">


                    <div className="hidden lg:block lg:col-span-1 space-y-6">
                        {/* Box Tìm kiếm */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3 text-sm">Các địa điểm bạn đã lưu</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Nhập một thành phố hoặc điểm đến"
                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none placeholder-gray-400"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Box Checkbox */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3 text-sm">Dựa trên các mục bạn đã lưu gần đây</h3>
                            <div className="space-y-3">
                                {uniqueLocations.map((loc, index) => (
                                    <label key={index} className="flex items-start gap-3 cursor-pointer group hover:bg-gray-50 p-1 rounded transition">
                                        <div className="flex items-center h-5 mt-0.5">
                                            <input
                                                type="checkbox"
                                                checked={selectedLocations.includes(loc.name)}
                                                onChange={() => handleCheckboxChange(loc.name)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                            />
                                        </div>
                                        <div className="text-sm">
                                            <p className={`font-medium ${selectedLocations.includes(loc.name) ? 'text-blue-600' : 'text-gray-800'}`}>
                                                {loc.name}
                                            </p>
                                            <p className="text-xs text-gray-500 line-clamp-1">{loc.address}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: DANH SÁCH TOUR (NẰM NGANG) --- */}
                    <div className="lg:col-span-3">

                        {/* Header List */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Danh sách đã lưu ({filteredFavorites.length})</h2>
                            <button className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:bg-blue-50 px-4 py-2 rounded-lg transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Sắp xếp các mục bạn đã lưu!
                            </button>
                        </div>

                        {/* Banner Gợi ý */}
                        <div className="bg-[#f2f4f7] border border-gray-200 rounded-xl p-4 mb-8 flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <img src="https://img.icons8.com/fluency/48/light-on.png" className="w-6 h-6" alt="idea"/>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">Tạo bộ sưu tập mới?</h3>
                                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                                    Lên kế hoạch cho kỳ nghỉ hoặc đề xuất những điểm bạn yêu thích với Bộ Sưu Tập.
                                    <span className="text-blue-600 font-medium cursor-pointer ml-1">Một số ý tưởng để truyền cảm hứng cho bạn.</span>
                                </p>
                            </div>
                        </div>

                        {/* Danh sách Tour NẰM NGANG */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b pb-2 mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Các mục bạn đã lưu</h3>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Hoạt động & Vui chơi</span>
                            </div>

                            <div className="flex flex-col gap-4">
                                {filteredFavorites.map((item, index) => (
                                    // CARD NẰM NGANG (flex-row)
                                    <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300 group cursor-pointer flex flex-col md:flex-row h-auto">

                                        {/* Hình ảnh (Bên trái) */}
                                        <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                                            <img
                                                src={item.media?.thumbnail || "https://placehold.co/400x300"}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                                            />
                                            {/* Heart Icon */}
                                            <div className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm text-red-500 cursor-pointer hover:bg-red-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Nội dung (Bên phải) */}
                                        <div className="p-4 flex flex-col flex-1 justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-bold text-gray-500 uppercase mb-1 block">
                                                        {item.category || "Hoạt động & Vui chơi"}
                                                    </span>
                                                </div>

                                                <h4 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-[#ff5e1f] transition">
                                                    {item.title}
                                                </h4>

                                                {/* Rating & Location */}
                                                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                                                    {item.rating && (
                                                        <div className="flex items-center gap-1">
                                                            <img src="https://img.icons8.com/fluency/48/star.png" className="w-3.5 h-3.5" alt="star"/>
                                                            <span className="font-bold text-gray-800 text-sm">{item.rating}/10</span>
                                                            <span className="text-gray-400">({item.reviews || 99})</span>
                                                        </div>
                                                    )}
                                                    {item.location && (
                                                        <>
                                                            <span className="text-gray-300 text-lg leading-none">•</span>
                                                            <span className="font-medium text-gray-700">{item.location}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Giá & Nút (Bottom) */}
                                            <div className="mt-3 flex items-end justify-between border-t border-dashed border-gray-100 pt-3">
                                                <div className="flex flex-col">
                                                    <span className="bg-[#e5f8ed] text-[#00a552] text-[10px] font-bold px-2 py-1 rounded w-fit mb-1">
                                                        ĐÃ THĂM QUAN
                                                    </span>
                                                </div>
                                                <div className="text-right">

                                                    <p className="text-xl font-bold text-[#ff5e1f]">
                                                        {item.totalPrice ? parseInt(item.totalPrice.toString().replace(/\D/g, "")).toLocaleString('vi-VN') : "Liên hệ"}
                                                        <span className="text-xs font-normal text-gray-500 ml-1">VND/pax</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoveTour;