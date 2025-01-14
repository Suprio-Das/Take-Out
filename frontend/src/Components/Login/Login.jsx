import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPersonFill } from "react-icons/go";
import { loginuser } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validate = (data) => {
        const newError = {};
        const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailExpression.test(data.email)) {
            newError.email = "Enter a valid email address";
        }
        if (data.password.trim().length < 5) {
            newError.password = "Password should be at least 5 characters long.";
        }
        return newError;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = {
            email: form.email.value,
            password: form.password.value,
        };

        // Validate input fields
        const validationResult = validate(data);
        if (Object.keys(validationResult).length > 0) {
            setErrors(validationResult);
            return;
        } else {
            setErrors({});
        }

        setIsLoading(true);
        try {
            const response = await loginuser(data);
            console.log(response)
            toast.success(response.data.message);

            setTimeout(() => {
                localStorage.setItem("authToken", response.data.authToken)
                console.log(localStorage.getItem("authToken"))
                navigate("/");
            }, 1000);
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card card-compact bg-white w-full max-w-md px-5 py-3 shadow-md">
                <div className="flex justify-center items-center gap-x-2 text-center mb-5">
                    <GoPersonFill />
                    <h2 className="text-xl font-semibold">Login</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label
                            htmlFor="email"
                            className={`input input-bordered flex items-center gap-2 ${errors.email ? "border-red-500" : ""
                                }`}
                        >
                            Email
                            <input
                                type="email"
                                className="grow"
                                placeholder="suprio.cse@gmail.com"
                                name="email"
                                required
                            />
                        </label>
                        <code className="text-center text-sm block text-red-500">
                            {errors.email ? errors.email : ""}
                        </code>
                    </div>
                    <div className="my-3">
                        <label
                            htmlFor="password"
                            className={`input input-bordered flex items-center gap-2 ${errors.password ? "border-red-500" : ""
                                }`}
                        >
                            Password
                            <input
                                type="password"
                                className="grow"
                                placeholder="Enter your password"
                                name="password"
                                required
                            />
                        </label>
                        <code className="text-center text-sm block text-red-500">
                            {errors.password ? errors.password : ""}
                        </code>
                    </div>
                    <div className="my-3">
                        <button
                            type="submit"
                            className="btn w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
