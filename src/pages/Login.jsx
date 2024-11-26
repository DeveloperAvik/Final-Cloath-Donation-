import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, sendPasswordResetEmail, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "../firebase/firebase.config"; 

function Login() {
    const [formError, setFormError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Handle regular login
    const handleLogin = (e) => {
        e.preventDefault();

        setFormError("");  // Clear any previous error

        // Logic for user login with email and password
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                toast.success("Successfully logged in!");
                navigate("/");
            })
            .catch((err) => {
                setFormError(err.message);
                toast.error("Login failed: " + err.message);
            });
    };

    // Handle login via Google
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success("Successfully logged in with Google!");
            navigate("/");
        } catch (error) {
            toast.error("Google login failed: " + error.message);
        }
    };

    // Handle password reset
    const handleResetPassword = () => {
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("Password reset email sent!");
            })
            .catch((error) => {
                toast.error("Error sending password reset email: " + error.message);
            });
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
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control mb-4 relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn btn-xs absolute right-4 top-12"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {formError && <p className="text-red-500 text-sm">{formError}</p>}

                        <div className="form-control mt-1">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Login
                            </button>
                        </div>
                        <div className="">
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            className="btn btn-link"
                        >
                            Forgot password?
                        </button>
                    </div>
                    </form>

                    <div className="form-control text-center mt-1">
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
