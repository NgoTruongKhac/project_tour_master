// Component con để xử lý văn bản dài

import React from "react";

const CommentContent = ({ content, limit = 150 }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);


    if (content.length <= limit) {
        return (
            <p className="text-gray-800 text-base leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block w-full">
                {content}
            </p>
        );
    }

    return (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block w-full">
            <p className="text-gray-800 text-base leading-relaxed inline">
                {isExpanded ? content : `${content.slice(0, limit)}... `}
            </p>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm ml-1 hover:underline focus:outline-none"
            >
                {isExpanded ? "Thu gọn" : "Đọc thêm"}
            </button>
        </div>
    );
};
export default CommentContent;