import React, { useState } from 'react';
// Import dữ liệu từ file JSON (Đảm bảo file nằm đúng đường dẫn ./data/comment_review.json)
import jsonData from "../data/comment_review.json";
import {
    Star, CheckCircle, AlertCircle, ChevronDown, ChevronUp, User, PenTool, Send, X
} from 'lucide-react';

const MPlusMuseumPage = () => {


    const initialReviews = jsonData.reviews || [];
    const summaryData = jsonData.summary || { average_score: 0, total_reviews: 0 };



    const [reviews, setReviews] = useState(initialReviews);


    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [isWritingReview, setIsWritingReview] = useState(false);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState("");

    const faqs = [
        {
            question: "Tôi có cần in vé ra giấy không?",
            answer: "Không cần. Bạn chỉ cần xuất trình mã QR trên vé điện tử từ điện thoại tại cổng soát vé."
        },
        {
            question: "Bảo tàng có hỗ trợ xe lăn không?",
            answer: "Có. M+ Museum cam kết hỗ trợ người khuyết tật. Xe lăn có sẵn để mượn tại quầy thông tin (số lượng có hạn)."
        },
        {
            question: "Thời gian mở cửa của bảo tàng là khi nào?",
            answer: "Thứ Ba - Thứ Năm: 10:00 - 18:00. Thứ Sáu: 10:00 - 22:00. Cuối tuần: 10:00 - 18:00. Đóng cửa vào thứ Hai."
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
            <button key={i} onClick={() => setNewRating(i + 1)} className="focus:outline-none">
                <Star
                    size={24}
                    className={`${i < newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} transition-colors`}
                />
            </button>
        ));
    };

    // Xử lý gửi đánh giá mới
    const handleSubmitReview = () => {
        if (newComment.trim() === "") {
            alert("Vui lòng nhập nội dung đánh giá!");
            return;
        }

        const newReviewObj = {
            id: Date.now(),
            user: "Tôi (Mới)",
            date: "Vừa xong", 
            rating: newRating,
            content: newComment
        };


        setReviews([newReviewObj, ...reviews]);

        // Reset form
        setIsWritingReview(false);
        setNewComment("");
        setNewRating(5);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-24">
            <div className="max-w-7xl mx-auto p-4">

                {/* GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* --- CỘT TRÁI --- */}
                    <div className="md:col-span-2">

                        {/* KHU VỰC ĐÁNH GIÁ */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">Đánh giá từ khách hàng</h3>

                                {/* Nút viết đánh giá */}
                                {!isWritingReview && (
                                    <button
                                        onClick={() => setIsWritingReview(true)}
                                        className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center"
                                    >
                                        <PenTool size={14} className="mr-2"/> Viết đánh giá
                                    </button>
                                )}
                            </div>

                            {/* Summary Box (Dữ liệu động từ JSON) */}
                            <div className="flex items-center bg-gray-50 p-4 rounded-lg mb-6">
                                <div className="text-center pr-6 border-r border-gray-200">
                                    {/* Hiển thị điểm trung bình từ file JSON */}
                                    <div className="text-3xl font-bold text-gray-800">
                                        {summaryData.average_score || 0}
                                        <span className="text-lg text-gray-500">/10</span>
                                    </div>
                                    <div className="flex mt-1 justify-center">{renderStars(Math.round(summaryData.average_score / 2) || 5)}</div>
                                </div>
                                <div className="pl-6">
                                    <p className="text-sm text-gray-600 font-medium">Khách hàng hài lòng về trải nghiệm này</p>
                                    {/* Hiển thị tổng số review từ file JSON */}
                                    <p className="text-xs text-gray-500 mt-1">
                                        Dựa trên {summaryData.total_reviews || reviews.length} lượt đánh giá
                                    </p>
                                </div>
                            </div>

                            {/* Form viết đánh giá */}
                            {isWritingReview && (
                                <div className="mb-8 p-4 border border-blue-100 bg-blue-50/30 rounded-xl animate-fade-in">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-800 text-sm">Trải nghiệm của bạn thế nào?</h4>
                                        <button onClick={() => setIsWritingReview(false)}><X size={18} className="text-gray-400 hover:text-red-500"/></button>
                                    </div>

                                    <div className="flex space-x-1 mb-3">
                                        {renderInteractiveStars()}
                                    </div>

                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Hãy chia sẻ cảm nhận chân thực của bạn về dịch vụ..."
                                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[100px] bg-white"
                                    ></textarea>

                                    <div className="flex justify-end mt-3">
                                        <button
                                            onClick={() => setIsWritingReview(false)}
                                            className="text-gray-500 text-sm font-medium px-4 py-2 mr-2 hover:bg-gray-100 rounded-lg"
                                        >
                                            Hủy
                                        </button>
                                        <button
                                            onClick={handleSubmitReview}
                                            className="bg-blue-600 text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-sm"
                                        >
                                            <Send size={14} className="mr-2"/> Gửi đánh giá
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Danh sách Reviews (Map từ dữ liệu JSON) */}
                            <div className="space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <div className="bg-gray-200 p-2 rounded-full mr-3">
                                                    <User size={16} className="text-gray-500" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{review.username}</p>
                                                    <div className="flex">{renderStars(review.rating)}</div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">{review.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">{review.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ SECTION */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mt-6">
                            <h3 className="font-bold text-lg mb-4">Câu hỏi thường gặp</h3>
                            <div className="space-y-3">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                                        >
                                            <span className="font-medium text-gray-800 text-sm">{faq.question}</span>
                                            {openFaqIndex === index ? <ChevronUp size={16} className="text-gray-500" /> :
                                                <ChevronDown size={16} className="text-gray-500" />}
                                        </button>
                                        {openFaqIndex === index && (
                                            <div className="p-4 bg-white border-t border-gray-200 text-sm text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- CỘT PHẢI (SIDEBAR) --- */}
                    <div className="hidden md:block col-span-1">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-800 mb-4">Tại sao nên đặt với Traveloka?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <CheckCircle className="text-blue-500 mr-2 shrink-0" size={18} />
                                    <span className="text-sm text-gray-600">Giá tốt nhất, không phí ẩn</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-blue-500 mr-2 shrink-0" size={18} />
                                    <span className="text-sm text-gray-600">Xác nhận vé tức thì qua email</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-blue-500 mr-2 shrink-0" size={18} />
                                    <span className="text-sm text-gray-600">Hỗ trợ khách hàng 24/7</span>
                                </li>
                            </ul>

                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <div className="flex items-start bg-blue-50 p-3 rounded-lg">
                                    <AlertCircle size={18} className="text-blue-600 mr-2 shrink-0 mt-0.5" />
                                    <p className="text-xs text-blue-800">
                                        Vui lòng đến đúng giờ đã chọn. Vé đã mua không thể hoàn/hủy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Footer */}
            <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
                <div>
                    <p className="text-xs text-gray-500">Giá bắt đầu từ</p>
                    <p className="text-lg font-bold text-orange-600">315.000 VND</p>
                </div>
                <button className="bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg">Xem lựa chọn</button>
            </div>
        </div>
    );
};

export default MPlusMuseumPage;