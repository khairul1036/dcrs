import Swal from "sweetalert2";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router";

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;
        const designation = form.designation.value;
        const division = form.division.value;
        const whatsapp = form.whatsAppNumber.value;

        const formData = { name, email, phoneNumber, designation, division, whatsapp };

        try {
            const result = await register(formData);

            if (result) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Please check your email to get your password.',
                    confirmButtonText: 'Go to Login',
                    confirmButtonColor: '#0d9488',
                }).then((res) => {
                    if (res.isConfirmed) {
                        navigate('/login');
                    }
                });

                form.reset();
            }
        } catch (error) {
            console.error("Registration Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.response?.data?.message || "Something went wrong! Please try again.",
            });
        }
    };


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative"
            style={{
                backgroundImage: "url('/rice2.avif')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Card */}
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join the Disease and Crop Reporting System
                    </p>
                </div>

                {/* Register form */}
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="rounded-md">
                        {/* name  */}
                        <div className="mb-4">
                            <input
                                id="RegisterName"
                                name="name"
                                type="text"
                                placeholder="Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#026666] focus:border-[#026666]"
                            />
                        </div>

                        {/* tel-number  */}
                        <div className="mb-4">
                            <input
                                id="RegisterPhoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="Phone number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#026666] focus:border-[#026666]"
                            />
                        </div>

                        {/* email  */}
                        <div className="mb-4">
                            <input
                                id="RegisterEmailAddress"
                                name="email"
                                type="email"
                                placeholder="Email address"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#026666] focus:border-[#026666]"
                            />
                        </div>

                        {/* designation  */}
                        <div className="mb-4">
                            <input
                                id="RegisterDesignation"
                                name="designation"
                                type="text"
                                placeholder="Designation"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#026666] focus:border-[#026666]"
                            />
                        </div>

                        {/* division  */}
                        <div className="mb-4">
                            <input
                                id="RegisterDivision"
                                name="division"
                                type="text"
                                placeholder="Division"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#026666] focus:border-[#026666]"
                            />
                        </div>

                        {/* whats app number  */}
                        <div className="mb-4">
                            <input
                                id="RegisterWANumber"
                                name="whatsAppNumber"
                                type="text"
                                placeholder="WhatsApp Number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#026666] focus:border-[#026666]"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-sm font-medium text-white rounded-md bg-[#026666] hover:bg-[#024444] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#04cccc]"
                    >
                        Sign up
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-medium text-[#026666] hover:text-[#04cccc]"
                        >
                            Sign in
                        </a>
                    </p>
                </form>

                <div className="text-center text-xs text-gray-500 mt-8">
                    <p>© 2023 Disease and Crop Reporting System</p>
                    <p>Agromet Lab, Bangladesh Rice Research Institute</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
