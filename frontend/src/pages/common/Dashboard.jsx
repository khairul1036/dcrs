const Dashboard = () => {
    return (
        <div className="p-4 flex-1 bg-gray-50 min-h-screen">
            {/*  HEADER  */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    Repository Statistics
                </h1>
                <p className="text-gray-600">
                    Overview of your data collection and resource management
                </p>
            </div>

            {/*  STAT CARDS  */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { title: "Total Data", value: "1,540", color: "from-[#026666] to-[#024444]" },
                    { title: "Experimental", value: "320", color: "from-[#338485] to-[#026666]" },
                    { title: "Survey", value: "215", color: "from-[#04cccc] to-[#338485]" },
                    { title: "Secondary", value: "128", color: "from-[#035555] to-[#024444]" },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
                    >
                        <div
                            className={`w-10 h-10 rounded-lg bg-linear-to-r ${item.color} mb-3`}
                        />
                        <p className="text-sm text-gray-500">{item.title}</p>
                        <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* LEFT CONTENT */}
                <div className="lg:col-span-9 space-y-6">
                    {/* Chart Placeholder */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Data Collection Trends
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Monthly data submission analysis
                        </p>

                        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-xl">
                            Chart Component (Recharts)
                        </div>

                        <div className="grid grid-cols-3 mt-6 border-t pt-4">
                            <div className="text-center">
                                <p className="text-xl font-bold text-[#026666]">387</p>
                                <p className="text-sm text-gray-600">This Month</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-[#338485]">15%</p>
                                <p className="text-sm text-gray-600">Growth</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-[#035555]">2.3K</p>
                                <p className="text-sm text-gray-600">Total</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow p-4 h-full">
                        <div className="mb-4">
                            <h2 className="text-lg font-bold text-gray-800">
                                Recent Activity
                            </h2>
                            <p className="text-sm text-gray-600">Latest system updates</p>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {[
                                "Dr. Rahman uploaded experimental data",
                                "Admin approved survey submission",
                                "Prof. Karim shared dataset",
                                "System flagged data inconsistency",
                                "Dr. Islam downloaded report",
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <p className="text-sm text-gray-800">{activity}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {index + 1} hour ago
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
