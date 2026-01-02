import {useNavigate, useParams} from "react-router-dom";
import dataTours from "../data/data_tours.json";
import {useState, useRef, useEffect} from "react";
import CommentAndReview from "../components/CommentAndReview.jsx";
import {
    ChevronLeft,
    ChevronRight,
    Calendar,
    Plane,
    Users,
    DollarSign,
    ChevronDown,
    MapPin,
    CalendarCheck,
    Heart,
} from "lucide-react";

export default function TourDetail() {
    const {tourId} = useParams();
    const scrollContainerRefs = useRef({});
    const navigate = useNavigate();


    const tour = dataTours.find((t) => t.tourId === Number(tourId));


    const [srcImg, setSrcImg] = useState(tour ? tour.media.thumbnail : "");


    const [departure, setDeparture] = useState(
        tour ? {
            date: tour.departures[0].date,
            slotsAvailable: tour.departures[0].slotsAvailable,
            priceAdult: tour.departures[0].priceAdult,
            priceChild: tour.departures[0].priceChild,
            priceInfant: tour.departures[0].priceInfant,
            transportation: tour.transportation,
        } : null
    );


    const [isLoved, setIsLoved] = useState(false);

    useEffect(() => {
        if (!tour) return;
        const loveTours = JSON.parse(localStorage.getItem('loveTour') || '[]');

        const isExist = loveTours.some((item) => item.tourId === tour.tourId);
        setIsLoved(isExist);
    }, [tour]);

    const handleLoveTour = () => {
        if (!tour) return;
        const loveTours = JSON.parse(localStorage.getItem('loveTour') || '[]');
        let newLoveTours;

        if (isLoved) {

            newLoveTours = loveTours.filter((item) => item.tourId !== tour.tourId);
            setIsLoved(false);
        } else {

            newLoveTours = [...loveTours, tour];
            setIsLoved(true);
        }
        localStorage.setItem('loveTour', JSON.stringify(newLoveTours));
    };
    const handleBooking = () => {

        navigate(`/booking/${tourId}`);
    };

    const [expandedDay, setExpandedDay] = useState(0);

    if (!tour) {
        return <p className="py-10 text-center text-dark">Tour không tồn tại</p>;
    }

    const handleChoseImg = (src) => {
        setSrcImg(src);
    };

    const handleScroll = (id, direction) => {
        const container = scrollContainerRefs.current[id];
        if (container) {
            const scrollAmount = 200;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const handleChoseDeparture = (dep) => {
        setDeparture({
            date: dep.date,
            slotsAvailable: dep.slotsAvailable,
            priceAdult: dep.priceAdult,
            priceChild: dep.priceChild,
            priceInfant: dep.priceInfant,
            transportation: tour.transportation,
        });
    };

    const getTransportIcon = (transport) => {
        const lower = transport?.toLowerCase() || "";
        if (lower.includes("máy bay")) return <Plane size={20}/>;
        return <Car size={20}/>;
    };

    const toggleDay = (index) => {
        setExpandedDay(expandedDay === index ? -1 : index);
    };

    return (
        <div className="px-4 py-6 mx-auto font-sans max-w-[90%]">
            {/* Title */}
            <h1 className="mt-5 mb-5 text-2xl leading-snug font-heading text-dark">
                {tour.title}
            </h1>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* LEFT */}
                <div className="lg:col-span-9">
                    {/* Gallery */}
                    <div className="mb-4">
                        <div className="mb-3">
                            <img
                                src={srcImg}
                                alt={tour.title}
                                className="w-full h-[400px] object-cover rounded-xl"
                            />
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            <img
                                onClick={() => handleChoseImg(tour.media.thumbnail)}
                                src={tour.media.thumbnail}
                                alt=""
                                className={`object-cover w-full h-24 border rounded-lg cursor-pointer transition-all ${
                                    srcImg === tour.media.thumbnail
                                        ? "border-primary brightness-100"
                                        : "brightness-50 hover:brightness-75"
                                }`}
                            />
                            {tour.media.gallery.slice(0, 4).map((img, idx) => (
                                <img
                                    onClick={() => handleChoseImg(img)}
                                    key={idx}
                                    src={img}
                                    alt=""
                                    className={`object-cover w-full h-24 border rounded-lg cursor-pointer transition-all ${
                                        srcImg === img
                                            ? "border-primary brightness-100"
                                            : "brightness-50 hover:brightness-75"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ... (Phần chọn ngày khởi hành giữ nguyên) ... */}
                    <div className="mt-20">
                        <div className="flex items-center gap-2 mb-7">
                            <div
                                className="flex items-center justify-center w-8 h-8 text-white rounded-full shadow-lg bg-primary shadow-primary/30">
                                <CalendarCheck size={20}/>
                            </div>
                            <h2 className="text-2xl font-heading text-dark">
                                Chọn Ngày Khởi Hành
                            </h2>
                        </div>

                        <div className="relative mb-7 group">
                            <button
                                onClick={() => handleScroll(tour.tourId, "left")}
                                className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 transition-all transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-lg opacity-0 top-1/2 hover:bg-gray-50 hover:scale-110 group-hover:opacity-100"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft size={20} className="text-gray-700"/>
                            </button>

                            <div
                                ref={(el) => (scrollContainerRefs.current[tour.tourId] = el)}
                                className="flex gap-3 overflow-x-auto px-14 scrollbar-hide scroll-smooth"
                                style={{
                                    scrollbarWidth: "none",
                                    msOverflowStyle: "none",
                                }}
                            >
                                {tour.departures.map((dep, index) => (
                                    <button
                                        onClick={() => handleChoseDeparture(dep)}
                                        key={index}
                                        className={`flex-shrink-0 px-5 py-3 text-sm font-medium transition-all border-2 rounded-xl ${
                                            departure.date === dep.date
                                                ? "bg-primary text-white border-primary shadow-md scale-105"
                                                : "bg-white text-primary border-primary hover:border-primary hover:shadow-md"
                                        }`}
                                    >
                                        <div className="text-center whitespace-nowrap">
                                            {dep.date}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handleScroll(tour.tourId, "right")}
                                className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 transition-all transform -translate-y-1/2 bg-white border border-gray-300 rounded-full shadow-lg opacity-0 top-1/2 hover:bg-gray-50 hover:scale-110 group-hover:opacity-100"
                                aria-label="Scroll right"
                            >
                                <ChevronRight size={20} className="text-gray-700"/>
                            </button>
                        </div>

                        {departure && (
                            <div className="p-6 border shadow-sm bg-gray-50 border-primary rounded-2xl">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                    Thông Tin Chuyến Đi
                                </h3>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div
                                        className="flex items-center gap-3 p-3 bg-white border rounded-lg border-primary">
                                        <div
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                                            {getTransportIcon(departure.transportation)}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Phương tiện</p>
                                            <p className="font-medium text-gray-800">
                                                {departure.transportation}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div
                                        className="flex items-center gap-3 p-3 bg-white border rounded-lg border-primary">
                                        <div
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                                            <Calendar size={20}/>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Ngày khởi hành</p>
                                            <p className="font-medium text-gray-800">
                                                {departure.date}
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center gap-3 p-3 bg-white border rounded-lg border-primary">
                                        <div
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                                            <Users size={20}/>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Số chỗ còn nhận</p>
                                            <p className="font-medium text-gray-800">
                                                {departure.slotsAvailable} chỗ
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center gap-3 p-3 bg-white border rounded-lg border-primary">
                                        <div
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                                            <DollarSign size={20}/>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500">Giá vé</p>
                                            <div className="space-y-1 text-sm text-gray-700">
                                                <div className="flex">
                                                    <div className="w-30">
                                                        <span className="font-medium">Người lớn:</span>
                                                        <p className="text-xs text-gray-400">
                                                            (từ 12 tuổi trở lên)
                                                        </p>
                                                    </div>
                                                    <span className="font-semibold text-primary">
                            {departure.priceAdult}
                          </span>
                                                </div>

                                                <div className="flex">
                                                    <div className="w-30">
                                                        <span className="font-medium">Trẻ em:</span>
                                                        <p className="text-xs text-gray-400">
                                                            (từ 5 đến 11 tuổi)
                                                        </p>
                                                    </div>
                                                    <span className="font-semibold text-primary">
                            {departure.priceChild}
                          </span>
                                                </div>

                                                <div className="flex">
                                                    <div className="w-30">
                                                        <span className="font-medium">Em bé:</span>
                                                        <p className="text-xs text-gray-400">
                                                            (nhỏ hơn 4 tuổi)
                                                        </p>
                                                    </div>
                                                    <span className="font-semibold text-primary">
                            {departure.priceInfant}
                          </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-16">
                        {/* ... (Phần Lịch trình chi tiết giữ nguyên) ... */}
                        <div className="flex items-center gap-3 mb-7">
                            <div
                                className="flex items-center justify-center w-8 h-8 text-white rounded-full shadow-lg bg-primary shadow-primary/30">
                                <MapPin size={20}/>
                            </div>
                            <h2 className="text-2xl font-heading text-dark">
                                Lịch trình chi tiết
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {tour.itineraries.map((item, index) => {
                                const isOpen = expandedDay === index;
                                return (
                                    <div
                                        key={index}
                                        className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                                            isOpen
                                                ? "border-primary shadow-md bg-white"
                                                : "border-gray-200 bg-white hover:border-primary/50"
                                        }`}
                                    >
                                        <button
                                            onClick={() => toggleDay(index)}
                                            className="flex items-center justify-between w-full p-4 text-left md:p-5 group"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Day Badge */}
                                                <span
                                                    className={`flex-shrink-0 px-3 py-1 text-sm font-bold rounded-lg transition-colors ${
                                                        isOpen
                                                            ? "bg-primary text-white"
                                                            : "bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary"
                                                    }`}
                                                >
                          {item.day}
                        </span>

                                                {/* Title */}
                                                <h3
                                                    className={`font-heading text-base leading-tight transition-colors ${
                                                        isOpen
                                                            ? "text-primary"
                                                            : "text-gray-800 group-hover:text-primary"
                                                    }`}
                                                >
                                                    {item.title}
                                                </h3>
                                            </div>

                                            {/* Icon */}
                                            <div
                                                className={`ml-3 transition-transform duration-300 ${
                                                    isOpen ? "rotate-180 text-primary" : "text-gray-400"
                                                }`}
                                            >
                                                <ChevronDown size={20}/>
                                            </div>
                                        </button>

                                        <div
                                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                isOpen
                                                    ? "max-h-[2000px] opacity-100"
                                                    : "max-h-0 opacity-0"
                                            }`}
                                        >
                                            <div
                                                className="p-5 pt-0 text-justify text-gray-900 border-t border-gray-100 border-dashed bg-gray-50/50">
                                                <p className="mt-4 leading-relaxed whitespace-pre-line">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-16 mb-10">
                        <CommentAndReview currentTourId={tourId}/>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-3">
                    <div className="sticky p-5 bg-white border shadow-sm top-6 rounded-xl border-primary">
                        <div className="mb-4">
                            <p className="text-sm text-gray-700">Giá từ</p>
                            <p className="text-3xl font-bold text-primary">
                                {tour.basePrice.replace(" / Khách", "")}
                            </p>
                        </div>

                        <ul className="space-y-3 text-sm text-gray-700">
                            <li>
                                <strong>Khởi hành:</strong>{" "}
                                <span className="text-primary">{tour.departurePoint}</span>
                            </li>
                            <li>
                                <strong>Ngày khởi hành:</strong>{" "}
                                <span className="text-primary">{departure.date}</span>
                            </li>
                            <li>
                                <strong>Thời gian:</strong> {tour.duration}
                            </li>
                            <li>
                                <strong>Số chỗ còn:</strong>{" "}
                                <span className="font-semibold">{departure.slotsAvailable}</span>
                            </li>
                        </ul>

                        <div className="flex gap-3 mt-6">

                            <button
                                onClick={handleLoveTour}
                                className={`flex flex-row items-center px-2 py-2 border-2 rounded-lg transition-colors duration-200
                                    ${isLoved
                                    ? 'bg-primary border-primary text-white'
                                    : 'bg-white border-primary text-primary'
                                }`}>
                                <Heart
                                    className={isLoved ? "fill-current" : ""}
                                    size={20}
                                />
                            </button>
                            <button
                                onClick={handleBooking}

                                className="flex-1 py-2 font-medium text-white rounded-lg bg-primary hover:bg-primary-hover">
                                Đặt ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
