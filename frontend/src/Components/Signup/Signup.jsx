import { useState } from "react";
import { GoPersonFill } from "react-icons/go";
import { createUser } from "../../api";
const Signup = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})

    const validate = (data) => {
        const newError = {}
        if (data.username.trim().length < 5) {
            newError.username = 'Username should be at least 5 words longer.'
        }
        const emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailExpression.test(data.email)) {
            newError.email = 'Enter a valid email address'
        }
        if (data.password.trim().length < 5) {
            newError.password = 'Password should be at least 5 words longer.'
        }

        return newError
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const data = {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value
        }

        const validationResult = validate(data)

        if (Object.keys(validationResult).length > 0) {
            setErrors(validationResult)
            console.log(errors)
        }
        else {
            setErrors({})
            setFormData(data)
            let response = await createUser(formData);
        }
    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card card-compact bg-white w-full max-w-md px-5 py-3 shadow-md">
                <div className="flex justify-center items-center gap-x-2 text-center mb-5">
                    <GoPersonFill />
                    <h2 className="text-xl font-semibold">Signup</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="username" className={`input input-bordered flex items-center gap-2 ${errors.username ? 'border-red-500' : ''}`}>
                            Name
                            <input type="text" className="grow" placeholder="Suprio Das" name="username" required />
                        </label>
                        <code className="text-center text-sm block text-red-500">{errors.username ? errors.username : ''}</code>
                    </div>
                    <div className="my-3">
                        <label htmlFor="email" className={`input input-bordered flex items-center gap-2 ${errors.email ? 'border-red-500' : ''}`}>
                            Email
                            <input type="email" className="grow" placeholder="suprio.cse@gmail.com" name="email" required />
                        </label>
                        <code className="text-center text-sm block text-red-500" id="email">{errors.email ? errors.email : ''}</code>
                    </div>
                    <div className="my-3">
                        <label htmlFor="password" className={`input input-bordered flex items-center gap-2 ${errors.password ? 'border-red-500' : ''}`}>
                            Password
                            <input type="password" className="grow" placeholder="Create a strong password" name="password" required />
                        </label>
                        <code className="text-center text-sm block text-red-500" id="email">{errors.password ? errors.password : ''}</code>
                    </div>
                    <div className="my-3">
                        <button type="submit" className="btn w-full">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;