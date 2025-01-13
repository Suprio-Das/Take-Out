import { GoPersonFill } from "react-icons/go";
const Signup = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="card card-compact bg-white w-full max-w-md px-5 py-3">
                <div className="flex justify-center items-center gap-x-2 text-center mb-5">
                    <GoPersonFill />
                    <h2 className="text-xl font-semibold">Signup</h2>
                </div>
                <form>
                    <div className="my-3">
                        <label className="input input-bordered flex items-center gap-2">
                            Name
                            <input type="text" className="grow" placeholder="Suprio Das" name="username" />
                        </label>
                    </div>
                    <div className="my-3">
                        <label className="input input-bordered flex items-center gap-2">
                            Email
                            <input type="email" className="grow" placeholder="suprio.cse@gmail.com" name="email" />
                        </label>
                    </div>
                    <div className="my-3">
                        <label className="input input-bordered flex items-center gap-2">
                            Password
                            <input type="password" className="grow" placeholder="Create a strong password" name="password" />
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