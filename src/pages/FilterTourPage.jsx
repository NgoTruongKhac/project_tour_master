import {useState, useRef, useMemo} from "react";
import {
    Filter,
    Plane,
    X,
    ChevronLeft,
    ChevronRight,
    Car,
    Bus,
} from "lucide-react";
import {MapPin, Clock3, CalendarCheck} from "lucide-react";
import DataTours from "../data/data_tours.json";
import CategoryData from "../data/category_tours.json";
import {useSearchParams} from "react-router-dom";

const PRICE_RANGES = {
    1: {min: 0, max: 5000000, label: "Dưới 5 triệu"},
    2: {min: 5000000, max: 10000000, label: "5 – 10 triệu"},
    3: {min: 10000000, max: 15000000, label: "10 - 15 triệu"},
    4: {min: 15000000, max: 20000000, label: "15 - 20 triệu"},
    5: {min: 20000000, max: Infinity, label: "Trên 20 triệu"},
};

const DURATION_RANGES = {
    1: {min: 1, max: 3, label: "1 – 3 ngày"},
    2: {min: 4, max: 7, label: "4 – 7 ngày"},
    3: {min: 8, max: 999, label: "Trên 7 ngày"},
};

export default function FilterTourPage() {
    const [openFilter, setOpenFilter] = useState(false);
    const scrollContainerRefs = useRef({});
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get("page")) || 1;
    const toursPerPage = 4;

    const parsePrice = (priceString) => {
        if (!priceString) return 0;
        const cleanString = priceString
            .toString()
            .replace(/\./g, "")
            .replace(/\D/g, "");
        return parseInt(cleanString) || 0;
    };

    const parseDuration = (durationString) => {
        if (!durationString) return 0;
        const days = durationString.split("N")[0];
        return parseInt(days) || 0;
    };

    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);

        newParams.delete("page");

        if (value === "" || value === "all" || value === false) {
            newParams.delete(key);
        } else {
            if (key === "price" && newParams.get("price") === value.toString()) {
                newParams.delete(key);
            } else {
                newParams.set(key, value);
            }
        }
        setSearchParams(newParams);
    };

    // 4. LOGIC FILTER CHÍNH
    const filteredTours = useMemo(() => {
        const currentDest = searchParams.get("destination");
        const currentPrice = searchParams.get("price");
        const currentDeparture = searchParams.get("departure");
        const currentDuration = searchParams.get("duration");
        const currentTransport = searchParams.get("transport");

        return DataTours.filter((tour) => {
            // Filter 1: Điểm đến
            if (
                currentDest &&
                currentDest !== "all" &&
                tour.destination !== currentDest
            ) {
                return false;
            }

            // Filter 2: Giá
            if (currentPrice) {
                const price = parsePrice(tour.basePrice);
                const range = PRICE_RANGES[currentPrice];
                if (range && (price < range.min || price > range.max)) {
                    return false;
                }
            }

            // Filter 3: Điểm khởi hành
            if (
                currentDeparture &&
                currentDeparture !== "all" &&
                tour.departurePoint !== currentDeparture
            ) {
                return false;
            }

            // Filter 4: Thời gian
            if (currentDuration && currentDuration !== "all") {
                const days = parseDuration(tour.duration);
                const range = DURATION_RANGES[currentDuration];
                if (range && (days < range.min || days > range.max)) {
                    return false;
                }
            }

            // Filter 5: Phương tiện
            if (currentTransport) {
                const transportLower = tour.transportation.toLowerCase();
                if (
                    currentTransport === "maybay" &&
                    !transportLower.includes("máy bay")
                )
                    return false;
                if (currentTransport === "xe" && !transportLower.includes("xe"))
                    return false;
            }

            return true;
        });
    }, [searchParams]);

    const indexOfLastTour = currentPage * toursPerPage;
    const indexOfFirstTour = indexOfLastTour - toursPerPage;
    const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

    const totalPages = Math.ceil(filteredTours.length / toursPerPage);

    const paginate = (pageNumber) => {
        const newParams = new URLSearchParams(searchParams);
        if (pageNumber === 1) {
            newParams.delete("page");
        } else {
            newParams.set("page", pageNumber);
        }
        setSearchParams(newParams);

        window.scrollTo({top: 0, behavior: "smooth"});
    };

    const handleScroll = (tourId, direction) => {
        const container = scrollContainerRefs.current[tourId];
        if (container) {
            const scrollAmount = 200;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Filter Button */}
            <div className="sticky top-0 z-20 bg-white border-b md:hidden">
                <button
                    onClick={() => setOpenFilter(true)}
                    className="flex items-center gap-2 px-4 py-3 font-medium text-primary"
                >
                    <Filter size={20}/>
                    Bộ lọc
                </button>
            </div>

            <div className="grid grid-cols-12 gap-6 px-4 py-6 mx-auto max-w-7xl">
                {/* Filter Sidebar */}
                <aside
                    className={`
            fixed md:static top-0 left-0 h-full w-72 md:w-auto
            bg-white z-30 md:z-auto
            col-span-12 md:col-span-3
            transform md:transform-none
            transition-transform duration-300
            ${
                        openFilter
                            ? "translate-x-0"
                            : "-translate-x-full md:translate-x-0"
                    }
          `}
                >
                    <div className="flex items-center justify-between p-4 border-b md:hidden">
                        <h2 className="text-lg font-semibold">Bộ lọc tour</h2>
                        <button onClick={() => setOpenFilter(false)}>
                            <X size={22}/>
                        </button>
                    </div>

                    <div className="p-4 space-y-6">
                        {/* --- Filter: GIÁ --- */}
                        <div>
                            <h3 className="mb-3 font-semibold text-gray-900">Khoảng Giá</h3>
                            <div className="space-y-2 text-sm">
                                {Object.entries(PRICE_RANGES).map(([key, range]) => (
                                    <label
                                        key={key}
                                        className="flex items-center gap-2 cursor-pointer hover:text-primary"
                                    >
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                                            checked={searchParams.get("price") === key}
                                            onChange={() => handleFilterChange("price", key)}
                                        />
                                        <span
                                            className={`${
                                                searchParams.get("price") === key
                                                    ? "text-primary font-medium"
                                                    : "text-gray-700"
                                            }`}
                                        >
                      {range.label}
                    </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* --- Filter: ĐIỂM ĐẾN --- */}
                        <div>
                            <h3 className="mb-3 font-semibold text-gray-900">Điểm đến</h3>
                            <select
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                value={searchParams.get("destination") || "all"}
                                onChange={(e) =>
                                    handleFilterChange("destination", e.target.value)
                                }
                            >
                                <option value="all">Tất cả điểm đến</option>
                                {CategoryData.map((category) => (
                                    <option key={category.id} value={category.destination_slug}>
                                        {category.destination}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* --- Filter: KHỞI HÀNH --- */}
                        <div>
                            <h3 className="mb-3 font-semibold text-gray-900">
                                Điểm khởi hành
                            </h3>
                            <select
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                value={searchParams.get("departure") || "all"}
                                onChange={(e) =>
                                    handleFilterChange("departure", e.target.value)
                                }
                            >
                                <option value="all">Tất cả</option>
                                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Đà Nẵng">Đà Nẵng</option>
                                <option value="Nha Trang">Nha Trang</option>
                            </select>
                        </div>

                        {/* --- Filter: THỜI GIAN --- */}
                        <div>
                            <h3 className="mb-3 font-semibold text-gray-900">Thời gian</h3>
                            <select
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                value={searchParams.get("duration") || "all"}
                                onChange={(e) => handleFilterChange("duration", e.target.value)}
                            >
                                <option value="all">Tất cả</option>
                                {Object.entries(DURATION_RANGES).map(([key, range]) => (
                                    <option key={key} value={key}>
                                        {range.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* --- Filter: PHƯƠNG TIỆN --- */}
                        <div>
                            <h3 className="mb-3 font-semibold text-gray-900">Phương tiện</h3>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="transport"
                                        className="w-4 h-4 text-primary focus:ring-primary"
                                        checked={searchParams.get("transport") === "maybay"}
                                        onChange={() => handleFilterChange("transport", "maybay")}
                                    />
                                    <span className="text-gray-700">Máy Bay</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="transport"
                                        className="w-4 h-4 text-primary focus:ring-primary"
                                        checked={searchParams.get("transport") === "xe"}
                                        onChange={() => handleFilterChange("transport", "xe")}
                                    />
                                    <span className="text-gray-700">Xe du lịch</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </aside>

                {openFilter && (
                    <div
                        className="fixed inset-0 z-20 bg-black/40 md:hidden"
                        onClick={() => setOpenFilter(false)}
                    />
                )}

                <main className="col-span-12 space-y-4 md:col-span-9">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold text-gray-800">
                            Kết quả tìm kiếm ({filteredTours.length} tour)
                        </h1>
                        <div className="hidden gap-2 md:flex">
                            {searchParams.get("destination") && (
                                <span className="px-3 py-1 text-xs text-white rounded-lg bg-primary">
                  Điểm đến:{" "}
                                    {CategoryData.find(
                                        (c) =>
                                            c.destination_slug === searchParams.get("destination")
                                    )?.destination || searchParams.get("destination")}
                </span>
                            )}
                        </div>
                    </div>
                    {filteredTours.length === 0 ? (
                        <div
                            className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl">
                            <div className="p-4 mb-4 bg-gray-100 rounded-full">
                                <Filter size={40} className="text-gray-400"/>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">
                                Không tìm thấy tour phù hợp
                            </h3>
                            <p className="text-gray-500">Vui lòng tìm kiếm tour khác.</p>
                        </div>
                    ) : (
                        currentTours.map((tour) => (
                            <div
                                key={tour.tourId}
                                className="flex flex-col gap-4 p-4 transition bg-white border border-gray-200 rounded-xl hover:shadow-lg md:flex-row"
                            >
                                {/* Thumbnail */}
                                <div className="flex-shrink-0 w-full overflow-hidden rounded-lg md:w-64 md:h-44">
                                    <img
                                        src={tour.media.thumbnail}
                                        alt={tour.title}
                                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-between flex-1 min-w-0">
                                    <div>
                                        <h2 className="mb-3 text-lg font-semibold text-gray-900 line-clamp-2 md:text-xl">
                                            {tour.title}
                                        </h2>

                                        <div className="grid grid-cols-1 gap-2.5 mb-4 sm:grid-cols-2 lg:grid-cols-3">
                                            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                                                <MapPin
                                                    size={16}
                                                    className="flex-shrink-0 text-primary"
                                                />
                                                <div className="flex flex-col min-w-0">
                          <span className="text-xs text-gray-500">
                            Khởi hành
                          </span>
                                                    <span className="text-sm font-medium text-gray-900 truncate">
                            {tour.departurePoint}
                          </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                                                {tour.transportation.includes("Máy Bay") ? (
                                                    <Plane size={16} className="text-primary"/>
                                                ) : (
                                                    <Car size={16} className="text-primary"/>
                                                )}
                                                <div className="flex flex-col min-w-0">
                          <span className="text-xs text-gray-500">
                            Phương tiện
                          </span>
                                                    <span className="text-sm font-medium text-gray-900 truncate">
                            {tour.transportation}
                          </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                                                <Clock3
                                                    size={16}
                                                    className="flex-shrink-0 text-primary"
                                                />
                                                <div className="flex flex-col min-w-0">
                          <span className="text-xs text-gray-500">
                            Thời gian
                          </span>
                                                    <span className="text-sm font-medium text-gray-900 truncate">
                            {tour.duration}
                          </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CalendarCheck size={16} className="text-primary"/>
                                                <span className="text-sm font-medium text-gray-700">
                          Ngày khởi hành
                        </span>
                                            </div>

                                            <div className="relative group">
                                                <button
                                                    onClick={() => handleScroll(tour.tourId, "left")}
                                                    className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 transition-all transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md opacity-0 top-1/2 hover:bg-gray-50 hover:scale-110 group-hover:opacity-100"
                                                    aria-label="Scroll left"
                                                >
                                                    <ChevronLeft size={18} className="text-gray-700"/>
                                                </button>

                                                <div
                                                    ref={(el) =>
                                                        (scrollContainerRefs.current[tour.tourId] = el)
                                                    }
                                                    className="flex gap-2 px-10 overflow-x-auto scrollbar-hide scroll-smooth"
                                                    style={{
                                                        scrollbarWidth: "none",
                                                        msOverflowStyle: "none",
                                                    }}
                                                >
                                                    {tour.departures.map((date, index) => (
                                                        <button
                                                            key={index}
                                                            className="flex-shrink-0 px-3 py-2 text-sm font-medium transition-all border rounded-lg border-primary text-primary"
                                                        >
                                                            {date.date}
                                                        </button>
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={() => handleScroll(tour.tourId, "right")}
                                                    className="absolute right-0 z-10 flex items-center justify-center w-8 h-8 transition-all transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-md opacity-0 top-1/2 hover:bg-gray-50 hover:scale-110 group-hover:opacity-100"
                                                    aria-label="Scroll right"
                                                >
                                                    <ChevronRight size={18} className="text-gray-700"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200">
                                        <div>
                                            <span className="text-sm text-gray-600">Giá từ</span>
                                            <span className="ml-4 text-xl font-bold text-primary">
                        {tour.basePrice.replace(" / Khách", "")}
                      </span>
                                        </div>
                                        <div>
                                            <button
                                                className="px-4 py-2 text-sm font-medium border rounded-lg border-primary text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {filteredTours.length > 0 && (
                        <div className="flex justify-center gap-2 pt-6">
                            {/* Nút Previous */}
                            <button
                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-1 transition border border-gray-300 rounded-lg ${
                                    currentPage === 1
                                        ? "opacity-50 cursor-not-allowed bg-gray-100"
                                        : "hover:bg-gray-50"
                                }`}
                            >
                                ‹
                            </button>

                            {/* Các nút số trang */}
                            {Array.from({length: totalPages}, (_, i) => i + 1).map(
                                (number) => (
                                    <button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        className={`px-4 py-1 transition border rounded-lg ${
                                            currentPage === number
                                                ? "text-white bg-primary border-primary hover:bg-primary/90"
                                                : "border-gray-300 hover:bg-gray-50"
                                        }`}
                                    >
                                        {number}
                                    </button>
                                )
                            )}

                            {/* Nút Next */}
                            <button
                                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-1 transition border border-gray-300 rounded-lg ${
                                    currentPage === totalPages
                                        ? "opacity-50 cursor-not-allowed bg-gray-100"
                                        : "hover:bg-gray-50"
                                }`}
                            >
                                ›
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
