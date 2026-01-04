import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MapPin, PlaneTakeoff, DollarSign, Search } from "lucide-react";

export default function SearchHero() {
  const [keyword, setKeyword] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Gửi keyword dưới dạng param 'search'
    if (keyword.trim()) params.append("search", keyword);

    // Chỉ gửi nếu không phải là giá trị mặc định "all"
    if (departureDate && departureDate !== "all")
      params.append("departure", departureDate);
    if (priceRange && priceRange !== "all") params.append("price", priceRange);

    // Reset về trang 1 khi search mới
    navigate(`/filter?${params.toString()}`);
  };

  return (
    <div className="relative z-10 px-4 mt-10 mb-12">
      <form
        onSubmit={handleSearch}
        className="w-full p-4 mx-auto bg-white border border-gray-200 shadow-lg md:p-6 rounded-2xl"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
          {/* Keyword Input */}
          <div className="relative md:col-span-5">
            <MapPin
              className="absolute transform -translate-y-1/2 text-primary left-4 top-1/2"
              size={20}
            />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm tour, điểm đến (vd: Hà Nội, Hạ Long)..."
              className="w-full py-4 pl-12 pr-5 text-sm transition-all duration-300 border border-gray-300 outline-none rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30 font-body"
            />
          </div>

          {/* Departure Select */}
          <div className="relative md:col-span-3">
            <PlaneTakeoff
              className="absolute transform -translate-y-1/2 pointer-events-none text-primary left-4 top-1/2"
              size={20}
            />
            <select
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full py-4 pl-12 pr-5 text-sm text-gray-700 transition-all duration-300 border border-gray-300 outline-none appearance-none rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">Nơi khởi hành</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Nha Trang">Nha Trang</option>
            </select>
          </div>

          {/* Price Select - UPDATE: Value khớp với ID trong FilterPage */}
          <div className="relative md:col-span-3">
            <DollarSign
              className="absolute transform -translate-y-1/2 pointer-events-none text-primary left-4 top-1/2"
              size={20}
            />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full py-4 pl-12 pr-5 text-sm text-gray-700 transition-all duration-300 border border-gray-300 outline-none appearance-none rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30"
            >
              <option value="all">Mức giá</option>
              {/* Lưu ý: Value phải khớp với key trong PRICE_RANGES bên trang Filter */}
              <option value="1">Dưới 5 triệu</option>
              <option value="2">5 – 10 triệu</option>
              <option value="3">10 – 15 triệu</option>
              <option value="4">15 - 20 triệu</option>
              <option value="5">Trên 20 triệu</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-4 font-semibold text-white transition-all duration-300 rounded-xl bg-primary hover:bg-primary-hover hover:shadow-lg active:scale-95 md:col-span-1"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
