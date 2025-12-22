import { useState } from "react";
import { Filter, X } from "lucide-react";

const toursFilterd = [
  {
    tourId: 1,
    title:
      "Hà Nội - Yên Tử - Vịnh Hạ Long - Ninh Bình - Chùa Bái Đính - KDL Tràng An",
    basePrice: "8.990.000 ₫ / Khách",
    departurePoint: "TP. Hồ Chí Minh",
    transportation: "Máy Bay",
    media: {
      thumbnail:
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_230810125414_911984_Untitled-2-02.jpg",
      gallery: [
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_240926041946_422247_hn.jpg",
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_240926041957_028346_FANSIPAN.jpg",
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_240926042120_484673_WCyCE.jpg",
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_230810113927_226748_TRANG%20AN%20(2).jpg",
      ],
    },
  },
  {
    tourId: 2,
    title:
      "Hà Nội - Yên Tử - Vịnh Hạ Long - Ninh Bình - Chùa Bái Đính - KDL Tràng An",
    basePrice: "8.990.000 ₫ / Khách",
    departurePoint: "TP. Hồ Chí Minh",
    transportation: "Máy Bay",
    media: {
      thumbnail:
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_230810125414_911984_Untitled-2-02.jpg",
      gallery: [
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_240926041946_422247_hn.jpg",
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_240926041957_028346_FANSIPAN.jpg",
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_240926042120_484673_WCyCE.jpg",
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_230810113927_226748_TRANG%20AN%20(2).jpg",
      ],
    },
  },
  {
    tourId: 3,
    title:
      "Hà Nội - Yên Tử - Vịnh Hạ Long - Ninh Bình - Chùa Bái Đính - KDL Tràng An",
    basePrice: "8.990.000 ₫ / Khách",
    departurePoint: "TP. Hồ Chí Minh",
    transportation: "Máy Bay",
    media: {
      thumbnail:
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_230810125414_911984_Untitled-2-02.jpg",
      gallery: [
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_240926041946_422247_hn.jpg",
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_240926041957_028346_FANSIPAN.jpg",
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_240926042120_484673_WCyCE.jpg",
        "https://s3-cmc.travel.com.vn/vtv-image/Images/Tour/tfd_230810113927_226748_TRANG%20AN%20(2).jpg",
      ],
    },
  },
];

export default function FilterTourPage() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="min-h-screen bg-light">
      {/* Mobile Filter Button */}
      <div className="sticky top-0 z-20 bg-white border-b md:hidden">
        <button
          onClick={() => setOpenFilter(true)}
          className="flex items-center gap-2 px-4 py-3 font-medium text-primary"
        >
          <Filter size={20} />
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
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b md:hidden">
            <h2 className="text-lg font-heading">Bộ lọc tour</h2>
            <button onClick={() => setOpenFilter(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Giá */}
            <div>
              <h3 className="mb-2 font-semibold">Giá</h3>
              <div className="space-y-2 text-sm">
                <label className="flex gap-2">
                  <input type="checkbox" /> Dưới 5 triệu
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" /> 5 – 10 triệu
                </label>
                <label className="flex gap-2">
                  <input type="checkbox" /> Trên 10 triệu
                </label>
              </div>
            </div>

            {/* Điểm đến */}
            <div>
              <h3 className="mb-2 font-semibold">Điểm đến</h3>
              <select className="w-full px-3 py-2 text-sm border rounded">
                <option>Tất cả</option>
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
                <option>Nha Trang</option>
              </select>
            </div>

            {/* Điểm khởi hành */}
            <div>
              <h3 className="mb-2 font-semibold">Điểm khởi hành</h3>
              <select className="w-full px-3 py-2 text-sm border rounded">
                <option>Tất cả</option>
                <option>TP. Hồ Chí Minh</option>
                <option>Hà Nội</option>
              </select>
            </div>

            {/* Thời gian */}
            <div>
              <h3 className="mb-2 font-semibold">Thời gian</h3>
              <select className="w-full px-3 py-2 text-sm border rounded">
                <option>Tất cả</option>
                <option>1 – 3 ngày</option>
                <option>4 – 7 ngày</option>
                <option>Trên 7 ngày</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Overlay Mobile */}
        {openFilter && (
          <div
            className="fixed inset-0 z-20 bg-black/40 md:hidden"
            onClick={() => setOpenFilter(false)}
          />
        )}

        {/* Tour List */}
        <main className="col-span-12 space-y-4 md:col-span-9">
          {toursFilterd.map((tour) => (
            <div
              key={tour.tourId}
              className="flex flex-col gap-4 p-4 transition bg-white rounded-lg shadow-sm hover:shadow md:flex-row"
            >
              {/* Thumbnail */}
              <div className="w-full overflow-hidden rounded-lg md:w-56 md:h-36">
                <img
                  src={tour.media.thumbnail}
                  alt={tour.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="mb-2 text-lg font-heading line-clamp-2">
                    {tour.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-600">
                    <span>📍 {tour.departurePoint}</span>
                    <span>✈️ {tour.transportation}</span>
                  </div>
                </div>

                <div className="font-semibold text-primary">
                  {tour.basePrice}
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center gap-2 pt-6">
            <button className="px-3 py-1 border rounded">‹</button>
            <button className="px-3 py-1 text-white border rounded bg-primary">
              1
            </button>
            <button className="px-3 py-1 border rounded">2</button>
            <button className="px-3 py-1 border rounded">3</button>
            <button className="px-3 py-1 border rounded">›</button>
          </div>
        </main>
      </div>
    </div>
  );
}
