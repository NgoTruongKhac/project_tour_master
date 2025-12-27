import { useParams } from "react-router-dom";
import dataTours from "../data/data_tours.json";
import { useState } from "react";

export default function TourDetail() {
  const { tourId } = useParams();

  const tour = dataTours.find((t) => t.tourId === Number(tourId));
  const [srcImg, setSrcImg] = useState(tour.media.thumbnail);

  if (!tour) {
    return <p className="py-10 text-center text-dark">Tour không tồn tại</p>;
  }

  const departure = tour.departures[0];
  const handleChoseImg = (src) => {
    setSrcImg(src);
  };

  return (
    <div className="px-4 py-6 mx-auto font-sans max-w-[85%]">
      {/* Title */}
      <h1 className="mt-5 mb-5 text-2xl leading-snug font-heading text-dark">
        {tour.title}
      </h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* LEFT */}
        <div className="lg:col-span-8">
          {/* Gallery */}
          <div className="mb-4">
            {/* Ảnh chính */}
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
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4">
          <div className="sticky p-5 bg-white border shadow-sm top-6 rounded-xl">
            {/* Price */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Giá từ</p>
              <p className="text-3xl font-bold text-primary">
                13.990.000 ₫
                <span className="text-base font-normal text-gray-600">
                  {" "}
                  / Khách
                </span>
              </p>
            </div>

            {/* Info */}
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <strong>Mã tour:</strong> {tour.code ?? "NDNHA7861"}
              </li>
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
                <span className="font-semibold">
                  {departure.slotsAvailable}
                </span>
              </li>
            </ul>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button className="flex-1 py-2 font-medium border rounded-lg border-primary text-primary hover:bg-primary/10">
                Ngày khác
              </button>
              <button className="flex-1 py-2 font-medium text-white rounded-lg bg-primary hover:bg-primary-hover">
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
