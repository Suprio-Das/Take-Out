import { useState } from "react";
import { GoPersonFill } from "react-icons/go";
const Signup = () => {
    const [formData, setFormData] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const data = {
            name: form.username.value,
            email: form.email.value,
            password: form.password.value
        }
        console.log(data)
    }
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card card-compact bg-white w-full max-w-md px-5 py-3">
                <div className="flex justify-center items-center gap-x-2 text-center mb-5">
                    <GoPersonFill />
                    <h2 className="text-xl font-semibold">Signup</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="my-3">
                        <label htmlFor="username" className="input input-bordered flex items-center gap-2">
                            Name
                            <input type="text" className="grow" placeholder="Suprio Das" name="username" required />
                        </label>
                    </div>
                    <div className="my-3">
                        <label htmlFor="email" className="input input-bordered flex items-center gap-2">
                            Email
                            <input type="email" className="grow" placeholder="suprio.cse@gmail.com" name="email" required />
                        </label>
                    </div>
                    <div className="my-3">
                        <label htmlFor="password" className="input input-bordered flex items-center gap-2">
                            Password
                            <input type="password" className="grow" placeholder="Create a strong password" name="password" required />
                        </label>
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