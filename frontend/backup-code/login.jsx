<div className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/rice3.avif')" }}
            ></div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-linear-to-br from-[#026666]/15 via-transparent to-[#024444]/15"></div>

            {/* Floating dots */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-4 h-4 bg-[#04cccc] opacity-30 rounded-full animate-float"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-[#026666] opacity-30 rounded-full animate-float-delayed"></div>
                <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-[#338485] opacity-25 rounded-full animate-float"></div>
                <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-[#024444] opacity-30 rounded-full animate-float-delayed"></div>
            </div>

            {/* Login Card */}
            <div className="bg-white/98 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 relative border border-[#04cccc]/20">

                {/* Header */}
                <div className="text-center mb-6">
                    <img src="/logo.png" alt="BRRI Logo" className="w-14 h-14 mx-auto mb-3" />
                    <h1 className="text-2xl font-bold text-[#026666] mb-1">
                        BRRI DCRS
                    </h1>
                    <p className="text-sm text-[#338485]">
                        Data Collection & Resource System
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Phone number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#026666] focus:border-[#04cccc] transition bg-gray-50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#026666] focus:border-[#04cccc] transition bg-gray-50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-linear-to-r from-[#026666] to-[#024444] text-white py-2.5 px-4 rounded-xl font-semibold text-lg shadow-lg hover:from-[#035555] hover:to-[#026666] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#04cccc] transition transform hover:scale-[1.02] border border-[#04cccc]/20"
                    >
                        Sign In
                    </button>
                </form>

                {/* Links */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="font-medium text-[#026666] hover:text-[#04cccc]">
                            Sign up
                        </a>
                    </p>
                </div>

                {/* Footer */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-[#026666]">Agromet Lab</p>
                    <p className="text-sm text-[#338485] font-medium mt-1">
                        Bangladesh Rice Research Institute
                    </p>
                </div>
            </div>
        </div>