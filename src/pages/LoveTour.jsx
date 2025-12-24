import React, {useState} from 'react';


const MOCK_DATA = [
    {
        id: 1,
        name: "Tour Vịnh Hạ Long - Tuyến 2 (Hang Sửng Sốt - Đảo Ti Tốp) 5 Sao",
        location: "Hạ Long, Quảng Ninh",
        image: "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd__1_7767_cauthehuc.webp",
        rating: 9.2,
        reviews: 231,
        oldPrice: 950000,
        newPrice: 750000,
    },
    {
        id: 2,
        name: "Vé VinWonders Phú Quốc - Công viên chủ đề lớn nhất Việt Nam",
        location: "Phú Quốc, Kiên Giang",
        image: "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd__1_5462_0e0a9779.webp",
        rating: 8.8,
        reviews: 1205,
        oldPrice: 1050000,
        newPrice: 850000,
    },
    {
        id: 3,
        name: "Tour Săn Mây Cầu Gỗ Đà Lạt - Đón bình minh cực chill",
        location: "Đà Lạt, Lâm Đồng",
        image: "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd__1_7767_cauthehuc.webp",
        rating: 9.5,
        reviews: 85,
        oldPrice: 500000,
        newPrice: 350000,
    }
];


const TourCard = ({data, onRemove}) => {

    const [imgSrc, setImgSrc] = useState(data.image);


    const formatCurrency = (amount) =>
        new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(amount);


    const handleImageError = () => {

        setImgSrc("https://placehold.co/400x400/e2e8f0/1e293b?text=No+Image");
    };

    return (
        <div
            className="flex bg-white rounded-lg shadow-sm border border-gray-100 mb-4 overflow-hidden relative hover:shadow-md transition-shadow duration-200">
            {/* Cột Trái: Hình ảnh */}
            <div className="w-32 h-32 flex-shrink-0 relative bg-gray-200">
                <img
                    src={imgSrc}
                    alt={data.name}
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />


                <button
                    onClick={() => onRemove(data.id)}
                    className="absolute top-2 left-2 bg-white/90 rounded-full p-1.5 shadow-sm hover:bg-white transition-colors group"
                    title="Bỏ yêu thích"
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="h-5 w-5 text-orange-500 fill-current group-hover:scale-110 transition-transform"
                         viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>

            {/* Cột Phải: Thông tin */}
            <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2 mb-1">
                        {data.name}
                    </h3>

                    <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                        <span>📍</span> {data.location}
                    </div>

                    <div className="flex items-center text-xs">
                        <span className="text-blue-500 font-bold bg-blue-50 px-1.5 py-0.5 rounded mr-2">
                            {data.rating}
                        </span>
                        <span className="text-gray-400">({data.reviews})</span>
                    </div>
                </div>

                <div className="text-right mt-2">
                    <div className="text-xs text-gray-400 line-through decoration-gray-400">
                        {formatCurrency(data.oldPrice)}
                    </div>
                    <div className="text-base font-bold text-orange-500">
                        {formatCurrency(data.newPrice)}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function App() {
    const [favorites, setFavorites] = useState(MOCK_DATA);

    const handleRemoveFavorite = (id) => {
        if (window.confirm("Bỏ lưu tour này nhé?")) {
            setFavorites(favorites.filter(item => item.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg pb-10">

                {/* Header */}
                <header
                    className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800">Đã lưu (Saved)</h2>
                    <button className="text-sm text-blue-500 font-semibold hover:text-blue-600">Sửa</button>
                </header>

                {/* List Content */}
                <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        Xperience ({favorites.length})
                    </h3>

                    {favorites.length > 0 ? (
                        favorites.map(item => (
                            <TourCard
                                key={item.id}
                                data={item}
                                onRemove={handleRemoveFavorite}
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center mt-20 text-center animate-fade-in">
                            <div
                                className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl">
                                📂
                            </div>
                            <p className="text-gray-500 text-sm mb-1">Danh sách trống trơn à!</p>
                            <p className="text-xs text-gray-400 mb-6">Hãy lưu lại những nơi bạn muốn đến nhé</p>
                            <button
                                className="px-6 py-2.5 bg-blue-500 text-white text-sm font-bold rounded-full hover:bg-blue-600 transition shadow-lg shadow-blue-200">
                                Khám phá ngay
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}