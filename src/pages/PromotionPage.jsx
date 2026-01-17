import React, { useState } from "react";
import {
  Search,
  LayoutGrid,
  Plane,
  Hotel,
  Map,
  Car,
  Gift,
  Calendar,
  ChevronRight,
} from "lucide-react";
import allPromotions from "../data/Promotions";

const iconMap = {
  all: LayoutGrid,
  flight: Plane,
  hotel: Hotel,
  tour: Map,
  car: Car,
  combo: Gift,
};

const categoriesList = [
  {
    id: "all",
    name: "Tất cả",
    icon: "all",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "flight",
    name: "Vé máy bay",
    icon: "flight",
    color: "bg-sky-100 text-sky-600",
  },
  {
    id: "hotel",
    name: "Khách sạn",
    icon: "hotel",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "tour",
    name: "Vui chơi & Tour",
    icon: "tour",
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "car",
    name: "Di chuyển",
    icon: "car",
    color: "bg-green-100 text-green-600",
  },
  {
    id: "combo",
    name: "Combo tiết kiệm",
    icon: "combo",
    color: "bg-purple-100 text-purple-600",
  },
];

const PromotionPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const renderCard = (item) => (
    <div
      key={item.id}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-primary text-xs font-bold px-2 py-1 rounded shadow-sm">
          {item.categoryName}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
          {item.title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-extrabold border border-red-100">
            {item.discount}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {item.description}
        </p>

        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar size={14} />
            <span>HSD: {item.date}</span>
          </div>
          <button className="bg-primary hover:bg-opacity-90 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-md shadow-primary/20 transition-all">
            Lấy mã
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-nunito pb-20">
      <div className="relative bg-primary h-[320px] rounded-b-[40px] shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 pt-10 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Kho Ưu Đãi Khổng Lồ ({allPromotions.length}+ Deal)
          </h1>
          <p className="text-blue-50 text-lg mb-8">
            Tìm kiếm hàng trăm mã giảm giá du lịch ngay tại đây
          </p>

          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Tìm kiếm ưu đãi"
              className="w-full pl-6 pr-14 py-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center justify-between md:justify-center gap-4 md:gap-8 overflow-x-auto scrollbar-hide">
          {categoriesList.map((cat) => {
            const IconComponent = iconMap[cat.icon];
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center gap-2 min-w-[80px] p-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-50 ring-2 ring-primary"
                    : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    cat.color
                  } ${isActive ? "bg-primary text-white" : ""}`}
                >
                  <IconComponent size={24} />
                </div>
                <span
                  className={`text-xs md:text-sm font-bold text-center ${
                    isActive ? "text-primary" : "text-gray-600"
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 space-y-12">
        {activeCategory === "all" ? (
          <>
            {categoriesList
              .filter((cat) => cat.id !== "all")
              .map((cat) => {
                const categoryItems = allPromotions
                  .filter((item) => item.category === cat.id)
                  .slice(0, 3);
                const IconComponent = iconMap[cat.icon];

                if (categoryItems.length === 0) return null;

                return (
                  <div key={cat.id} className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${cat.color}`}
                        >
                          <IconComponent size={16} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {cat.name}
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveCategory(cat.id)}
                        className="text-primary font-bold text-sm flex items-center gap-1 hover:underline"
                      >
                        Xem thêm <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryItems.map((item) => renderCard(item))}
                    </div>
                  </div>
                );
              })}
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Ưu đãi:{" "}
                {categoriesList.find((c) => c.id === activeCategory)?.name}
              </h2>
              <span className="text-gray-500 text-sm font-semibold bg-gray-200 px-3 py-1 rounded-full">
                Tìm thấy{" "}
                {
                  allPromotions.filter(
                    (item) => item.category === activeCategory
                  ).length
                }{" "}
                kết quả
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPromotions
                .filter((item) => item.category === activeCategory)
                .map((item) => renderCard(item))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromotionPage;
