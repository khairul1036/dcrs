import { useNavigate } from "react-router";
import { useAuth } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const phoneNumber = form.phoneNumber.value;
        const password = form.password.value;

        try {
            const result = await login({ phoneNumber, password });

            if (result) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    timer: 1500,
                    showConfirmButton: false
                });

                navigate("/");
            }
        } catch (error) {
            console.error("Login Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response?.data?.message || "Invalid phone number or password!",
            });
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 relative"
            style={{
                backgroundImage: "url('/rice.avif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Card */}
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg relative z-10 overflow-hidden">
                <div className="text-center mb-6">
                    <img src="/logo.png" alt="BRRI Logo" className="w-14 h-14 mx-auto mb-3" />
                    <h1 className="text-2xl font-bold text-[#026666] mb-1">
                        BRRI DCRS
                    </h1>
                    <p className="text-sm text-[#338485]">
                        Data Collection & Resource System
                    </p>
                </div>

                {/* Login form  */}
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
                                id="LoginPhoneNumber"
                                name="phoneNumber"
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
                                id="LoginPassword"
                                name="password"
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

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="font-medium text-[#026666] hover:text-[#04cccc]">
                            Sign up
                        </a>
                    </p>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-xs text-[#026666]">Agromet Lab</p>
                    <p className="text-sm text-[#338485] font-medium mt-1">
                        Bangladesh Rice Research Institute
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
