import { FaBookAtlas } from "react-icons/fa6";

const AddData = () => {
    return (
        <div className="flex-1">
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100 p-4 sm:p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 px-2">
                            Upload Data to DCRS
                        </h1>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                            Select a data type and upload your CSV or XLSX file to add data to the system
                        </p>
                    </div>

                    {/* Select Data Type */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.375 19.5h17.25M3.375 19.5a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5V5.625m17.25 13.875a1.125 1.125 0 0 0 1.125-1.125V5.625M3.375 5.625h17.25a1.125 1.125 0 0 1 1.125 1.125"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                    Select Data Type
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Choose the type of data you want to upload
                                </p>
                            </div>
                        </div>

                        <select className="w-full px-4 py-4 text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                            <option value="">-- Select a data type --</option>
                            <option value="seasonal-rice-area">Seasonal Rice Area Data</option>
                            <option value="seasonal-total-production">Seasonal Total Production</option>
                            <option value="seasonal-yield">Seasonal Yield</option>
                            <option value="all-season-data">All Season Data</option>
                            <option value="district-wise-data">District Wise Data</option>
                            <option value="export-import-rice">Export and Import Rice Data</option>
                            <option value="cropping-intensity">Cropping Intensity Data</option>
                            <option value="rice-adoption-rate">Rice Adoption Rate Data</option>
                            <option value="faostat-data">FAOStat Data</option>
                        </select>

                        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <span className="font-bold">Selected:</span> FAOStat Data
                            </p>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="relative border-2 sm:border-4 border-dashed rounded-2xl p-6 sm:p-10 md:p-12 m-4 cursor-pointer border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300">
                            <input
                                type="file"
                                accept=".csv,.xlsx,.xls"
                                className="hidden"
                            />

                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <div className="p-5 rounded-full bg-gray-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-14 h-14 text-gray-400"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M12 3v13.5m0 0 4.5-4.5M12 16.5 7.5 12"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">
                                    Drag and drop your CSV file
                                </h3>

                                <p className="text-gray-600 mb-6">or</p>

                                <button
                                    type="button"
                                    className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
                                >
                                    <FaBookAtlas className="w-4 h-4" />
                                    Browse Files
                                </button>

                                <p className="text-xs sm:text-sm text-gray-500 mt-6">
                                    Supported formats: CSV, XLSX • Maximum file size: 10MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddData;
