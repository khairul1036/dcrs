import React from "react";
import { Link } from "react-router";

const surveys = [
    {
        id: 1,
        title: "SAAO Survey Questionnaire",
        questions: 71,
        responses: 36,
    },
    {
        id: 2,
        title: "Farmer Feedback Survey",
        questions: 55,
        responses: 28,
    },
    {
        id: 3,
        title: "Rice Growth Monitoring Survey",
        questions: 42,
        responses: 19,
    },
];

const SurveyResponses = () => {
    return (
        <div className="p-4 flex-1 min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 xl:p-8">
                {/* Header */}
                <div className="bg-linear-to-r from-[#026666] via-[#027777] to-[#035555] rounded-2xl shadow-2xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white rounded-full -translate-y-16 translate-x-16 sm:-translate-y-32 sm:translate-x-32"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-white rounded-full translate-y-12 -translate-x-12 sm:translate-y-24 sm:-translate-x-24"></div>
                    </div>
                    <div className="relative flex items-start gap-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg shrink-0">
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 512 512"
                                className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 leading-tight">
                                Survey Responses
                            </h1>
                            <p className="text-white/90 text-sm sm:text-base">
                                Select a survey to view its responses
                            </p>
                        </div>
                    </div>
                </div>

                {/* Surveys Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {surveys.map((survey) => (
                        <div
                            key={survey.id}
                            className="bg-white rounded-xl shadow-lg border-2 border-gray-100 hover:border-[#026666] hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
                        >
                            <Link to={"/survey-response/1"}>
                                {/* Card Header */}
                                <div className="bg-linear-to-r from-[#026666]/10 to-[#035555]/10 p-4 border-b border-gray-100">
                                    <div className="flex items-start gap-3 mb-2">
                                        <div className="p-3 bg-linear-to-br from-[#026666] to-[#035555] rounded-lg shadow-lg group-hover:scale-110 transition-transform shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 384 512"
                                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-[#026666] transition-colors flex-1 line-clamp-2">
                                            {survey.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4">
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                                            <p className="text-xl sm:text-2xl font-bold text-blue-600">
                                                {survey.questions}
                                            </p>
                                            <p className="text-xs sm:text-sm text-blue-700 font-medium mt-1">
                                                Questions
                                            </p>
                                        </div>
                                        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                                            <p className="text-xl sm:text-2xl font-bold text-green-600">
                                                {survey.responses}
                                            </p>
                                            <p className="text-xs sm:text-sm text-green-700 font-medium mt-1">
                                                Responses
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 rounded-lg p-2 sm:p-3">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 576 512"
                                            className="w-4 h-4 text-[#026666]"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path>
                                        </svg>
                                        <span className="font-medium">Click to view responses</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SurveyResponses;
