import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import categoryData from "../data/category_tours.json";
import { useState } from "react";
// Destination Card Component
const DestinationCard = ({ destination, imgUrl, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/filter?destination=${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden transition-all duration-300 shadow-lg cursor-pointer group rounded-xl hover:shadow-2xl"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={imgUrl}
          alt={destination}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white transition-transform duration-300 transform font-heading group-hover:scale-110">
            {destination}
          </h3>
        </div>
      </div>
    </div>
  );
};

// Category Section with Tabs Component
const CategorySectionWithTabs = ({ title, categories, categoryList }) => {
  const [activeCategory, setActiveCategory] = useState(categoryList[0]);

  const filteredDestinations = categories.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section className="px-4 py-10 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl text-primary font-heading">
            {title}
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categoryList.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-gray-100 text-dark hover:bg-primary-hover hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Destinations Grid with Animation */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredDestinations.map((dest, index) => (
            <div
              key={dest.id}
              className="animate-fadeIn"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: "both",
              }}
            >
              <DestinationCard
                destination={dest.destination}
                imgUrl={dest.img_url}
                slug={dest.destination_slug}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main HomePage Component
export default function HomePage() {
  const domesticCategories = categoryData.filter((item) =>
    ["Miền Bắc", "Miền Trung", "Miền Đông Nam Bộ", "Miền Tây Nam Bộ"].includes(
      item.category
    )
  );

  const internationalCategories = categoryData.filter((item) =>
    ["Châu Á", "Châu Âu", "Châu Mỹ", "Châu Phi"].includes(item.category)
  );

  const domesticCategoryList = [
    "Miền Bắc",
    "Miền Trung",
    "Miền Đông Nam Bộ",
    "Miền Tây Nam Bộ",
  ];
  const internationalCategoryList = [
    "Châu Á",
    "Châu Âu",
    "Châu Mỹ",
    "Châu Phi",
  ];

  return (
    <div className="min-h-screen ">
      <Carousel />

      <CategorySectionWithTabs
        title="Du Lịch Trong Nước"
        categories={domesticCategories}
        categoryList={domesticCategoryList}
      />

      <div className="bg-gradient-to-r from-orange-100 to-blue-100">
        <CategorySectionWithTabs
          title="Du Lịch Ngoài Nước"
          categories={internationalCategories}
          categoryList={internationalCategoryList}
        />
      </div>
    </div>
  );
}
