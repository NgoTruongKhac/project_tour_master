const glob = import.meta.glob("../assets/promotions/*.jpg", {
  eager: true,
});

const getImagesByKeyword = (keyword) => {
  return Object.entries(glob)
    .filter(([path]) => path.toLowerCase().includes(keyword.toLowerCase()))
    .map(([_, module]) => module.default);
};

const images = {
  flight: getImagesByKeyword("flight"),
  hotel: getImagesByKeyword("hotel"),
  tour: getImagesByKeyword("tour"),
  car: getImagesByKeyword("car"),
  combo: getImagesByKeyword("combo"),
};

const getRandomItem = (arr) => {
  if (!arr || arr.length === 0) return images.tour[0];
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generatePromotions = () => {
  const categories = [
    {
      id: "flight",
      name: "Vé máy bay",
      baseTitle: [
        "Bay đi Thái Lan",
        "Vé khứ hồi Nhật Bản",
        "Bay Hàn Quốc giá sốc",
        "Nội địa Vietnam Airlines",
        "Bamboo Airways Sale",
      ],
    },
    {
      id: "hotel",
      name: "Khách sạn",
      baseTitle: [
        "Resort 5 sao Phú Quốc",
        "Khách sạn view biển Đà Nẵng",
        "Homestay Đà Lạt",
        "Staycation Sài Gòn",
        "Luxury Hotel Hà Nội",
      ],
    },
    {
      id: "tour",
      name: "Vui chơi & Tour",
      baseTitle: [
        "Tour Xuyên Việt",
        "Khám phá hang Sơn Đoòng",
        "Vé SunWorld",
        "VinWonders Nha Trang",
        "Tour đảo Nam Du",
      ],
    },
    {
      id: "car",
      name: "Di chuyển",
      baseTitle: [
        "Xe đưa đón sân bay",
        "Thuê xe tự lái",
        "Vé xe khách đi tỉnh",
        "Limousine Vũng Tàu",
        "Thuê xe máy Đà Lạt",
      ],
    },
    {
      id: "combo",
      name: "Combo tiết kiệm",
      baseTitle: [
        "Combo bay + phòng Nha Trang",
        "Combo Sapa 3N2Đ",
        "Voucher nghỉ dưỡng FLC",
        "Combo Phú Quốc giá rẻ",
      ],
    },
  ];

  const promotions = [];

  for (let i = 1; i <= 100; i++) {
    const cat = getRandomItem(categories);

    let catImage;

    if (images[cat.id] && images[cat.id].length > 0) {
      catImage = getRandomItem(images[cat.id]);
    } else if (images.tour && images.tour.length > 0) {
      catImage = getRandomItem(images.tour);
    } else {
      return;
    }

    promotions.push({
      id: i,
      category: cat.id,
      categoryName: cat.name,
      title: getRandomItem(cat.baseTitle),
      discount: `Giảm ${getRandomInt(10, 50)}%`,
      description: `Áp dụng cho đơn hàng từ ${getRandomInt(
        2,
        5
      )} triệu. Hạn sử dụng đến cuối tháng.`,
      date: `${getRandomInt(1, 30)}/05/2026`,
      image: catImage,
    });
  }

  return promotions;
};

const allPromotions = generatePromotions();

export default allPromotions;
