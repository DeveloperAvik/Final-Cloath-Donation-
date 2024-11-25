import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, GoogleAuthProvider, signInWithPopup } from "../firebase/firebase.config"; 

function Login() {
    const { userLogin, setUser, loading, error } = useContext(AuthContext);
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setFormError("");
        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                toast.success("Successfully logged in!");
                navigate("/");
            })
            .catch((err) => {
                setFormError(err.message);
                toast.error("Login failed: " + err.message);
            });
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            toast.success("Successfully logged in with Google!");
            navigate("/");
        } catch (error) {
            toast.error("Google login failed: " + error.message);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen flex justify-center items-center bg-base-200">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-10">
                    <h2 className="text-2xl font-semibold text-center mb-6">Login Your Account</h2>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control mb-4 relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="input input-bordered"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn btn-xs absolute right-4 top-12"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            <label className="label">
                                <Link to="/auth/forgot-password" className="label-text-alt link link-hover">
                                    Forgot password?
                                </Link>
                            </label>
                        </div>

                        {formError && <p className="text-red-500 text-sm">{formError}</p>}

                        <div className="form-control mt-1">
                            <button
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </div>
                    </form>
                    {/* Google login button */}
                    <div className="form-control text-center">
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-outline btn-primary w-full"
                        >
                            <FaGoogle className="mr-2" /> Login with Google
                        </button>
                    </div>

                    <p className="text-center text-sm font-semi-bold text-base-400 mt-4">
                        Don't have an account?{" "}
                        <Link className="text-red-600" to="/auth/register">
                            Register
                        </Link>
                    </p>


                </div>
            </div>
        </>
    );
}

export default Login;
