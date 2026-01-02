import React, { useState, useEffect, useMemo } from 'react';
import jsonData from "../data/comment_review.json";
import {
    Star, ChevronDown, ChevronUp, User, PenTool, Send, X, MessageSquare, HelpCircle
} from 'lucide-react';
import CommentContent from "./CommentContent.jsx";
const CommentAndReview = ({ currentTourId = 1 }) => {

    const [reviews, setReviews] = useState([]);

    const [isWritingReview, setIsWritingReview] = useState(false);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState("");
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    // State phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 1. Load dữ liệu khi currentTourId thay đổi
    useEffect(() => {
        const allReviewsList = jsonData || [];

        const tourReviews = allReviewsList.filter(item => item.tourId == currentTourId);


        setCurrentPage(1);

        if (tourReviews.length > 0) {

            setReviews(tourReviews.reverse());
        } else {

            setReviews([]);
        }
    }, [currentTourId]);


    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    // Cắt danh sách để lấy ra các item cho trang hiện tại
    const currentReviews = reviews.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Hàm chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    // Tính toán summary (Điểm trung bình)
    const summaryData = useMemo(() => {
        if (reviews.length === 0) return { average_score: 0, total_reviews: 0 };

        const total = reviews.length;
        const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);

        const average = (sum / total * 2).toFixed(1);

        return { average_score: average, total_reviews: total };
    }, [reviews]);

    // --- FAQ Data ---
    const faqs = [
        {
            question: "Tôi có cần in vé ra giấy không?",
            answer: "Không cần. Bạn chỉ cần xuất trình mã QR trên vé điện tử từ điện thoại tại cổng soát vé."
        },
        {
            question: "Tour có bao gồm ăn trưa không?",
            answer: "Tùy thuộc vào gói vé bạn chọn. Vui lòng kiểm tra kỹ thông tin trong phần 'Bao gồm' phía trên."
        },
        {
            question: "Chính sách hoàn hủy như thế nào?",
            answer: "Bạn được hoàn tiền 100% nếu hủy trước 24h so với giờ khởi hành."
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const renderStars = (count) => {
        return [...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
        ));
    };

    const renderInteractiveStars = () => {
        return [...Array(5)].map((_, i) => (
            <button key={i} onClick={() => setNewRating(i + 1)} className="focus:outline-none transform hover:scale-110 transition-transform">
                <Star
                    size={28}
                    className={`${i < newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} transition-colors`}
                />
            </button>
        ));
    };

    const handleSubmitReview = () => {
        if (newComment.trim() === "") {
            alert("Vui lòng nhập nội dung đánh giá!");
            return;
        }

        const newReviewObj = {
            id: Date.now(),
            tourId: currentTourId,
            username: "Bạn (Mới)",
            date: "Vừa xong",
            rating: newRating,
            content: newComment,
            avatar: null
        };


        setReviews([newReviewObj, ...reviews]);


        setIsWritingReview(false);
        setNewComment("");
        setNewRating(5);

        setCurrentPage(1);
    };

    return (
        <div className="w-full font-sans">
            {/* 1. PHẦN ĐÁNH GIÁ & REVIEW */}


            <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 text-white rounded-full shadow-lg bg-blue-600 shadow-blue-600/30">
                        <MessageSquare size={18} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Đánh giá từ khách hàng</h2>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm mb-6">
                    {/* 1. Summary Header: Điểm trung bình & Nút viết đánh giá */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="flex items-center bg-gray-50 px-6 py-3 rounded-lg border border-gray-100 w-full md:w-auto">
                            <div className="text-center pr-6 border-r border-gray-300">
                                <div className="text-3xl font-bold text-gray-800 leading-none">
                                    {summaryData.average_score}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">/ 10 điểm</div>
                            </div>
                            <div className="pl-6">
                                <div className="flex mb-1">
                                    {renderStars(Math.round(summaryData.average_score / 2))}
                                </div>
                                <p className="text-sm text-gray-500">
                                    Dựa trên <strong>{summaryData.total_reviews}</strong> đánh giá
                                </p>
                            </div>
                        </div>

                        {!isWritingReview && (
                            <button
                                onClick={() => setIsWritingReview(true)}
                                className="w-full md:w-auto px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                            >
                                <PenTool size={16} /> Viết đánh giá
                            </button>
                        )}
                    </div>

                    {/* 2. Form viết đánh giá (Hiện khi bấm nút) */}
                    {isWritingReview && (
                        <div className="mb-8 p-5 border border-blue-100 bg-blue-50/50 rounded-xl animate-fade-in">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-gray-800">Chia sẻ trải nghiệm của bạn</h4>
                                <button onClick={() => setIsWritingReview(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm font-medium text-gray-700">Đánh giá:</span>
                                <div className="flex space-x-1 cursor-pointer">
                                    {renderInteractiveStars()}
                                </div>
                            </div>

                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Dịch vụ thế nào? Hướng dẫn viên có nhiệt tình không?..."
                                className="w-full p-4 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[120px] bg-white shadow-inner text-gray-800"
                            ></textarea>

                            <div className="flex justify-end mt-4 gap-3">
                                <button
                                    onClick={() => setIsWritingReview(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleSubmitReview}
                                    className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-md"
                                >
                                    <Send size={16} /> Gửi đánh giá
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {currentReviews.length > 0 ? (
                    currentReviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        {review.avatar ? (
                                            <img src={review.avatar} alt={review.username} className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-500">
                                                <User size={20} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-gray-800">{review.username}</p>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">{renderStars(review.rating)}</div>
                                            <span className="text-xs text-gray-400">• {review.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="pl-13 mt-2">
                                <CommentContent content={review.content} limit={200} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">Chưa có đánh giá nào cho Tour này.</p>
                )}
            </div>


            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-center gap-2 mt-4 rounded-xl shadow-sm bg-white">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 bg-white"}`}
                    >
                        Trước
                    </button>

                    <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1;
                            // Chỉ hiển thị các trang xung quanh trang hiện tại nếu quá nhiều trang (Optional optimization)
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-md text-sm transition-all
                    ${currentPage === pageNum
                                        ? "bg-blue-600 text-white shadow-md font-bold"
                                        : "bg-white text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600"}`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 bg-white"}`}
                    >
                        Sau
                    </button>
                </div>
            )}
            {/* 2. PHẦN FAQ */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 text-white rounded-full shadow-lg bg-orange-500 shadow-orange-500/30">
                        <HelpCircle size={18} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Câu hỏi thường gặp</h2>
                </div>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openFaqIndex === index;
                        return (
                            <div key={index} className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-orange-500 shadow-sm bg-white' : 'border-gray-200 bg-white hover:border-orange-300'}`}>
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex justify-between items-center p-4 text-left group"
                                >
                                    <span className={`font-medium text-base transition-colors ${isOpen ? 'text-orange-600' : 'text-gray-800'}`}>
                                        {faq.question}
                                    </span>
                                    {isOpen ?
                                        <ChevronUp size={18} className="text-orange-500" /> :
                                        <ChevronDown size={18} className="text-gray-400 group-hover:text-orange-400" />
                                    }
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <div className="p-4 pt-0 text-base text-gray-800 leading-relaxed border-t border-gray-100 border-dashed bg-orange-50/10">
                                        <p className="mt-2">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
};

export default CommentAndReview;