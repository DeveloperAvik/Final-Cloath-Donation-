import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const { createUser, setUser } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState("");
    const [authError, setAuthError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const validatePassword = (password) => {
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;
        const minLengthRegex = /.{6,}/;

        if (!upperCaseRegex.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!lowerCaseRegex.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!minLengthRegex.test(password)) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const form = new FormData(e.target);
        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");
    
        const passwordError = validatePassword(password);
        if (passwordError) {
            setPasswordError(passwordError);
            toast.error(passwordError);
            return;
        }
    
        setPasswordError(""); 
    
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            if (result && result.user) {
                const user = result.user;
                setUser(user);
                toast.success("Account created successfully!");
                
                // Redirect to Home page after successful registration
                navigate("/");  // Redirect to the Home page
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setAuthError("This email is already registered.");
                toast.error("This email is already registered.");
            } else if (error.code === 'auth/weak-password') {
                setAuthError("Password is too weak.");
                toast.error("Password is too weak.");
            } else {
                setAuthError("An error occurred during registration.");
                toast.error("An error occurred during registration.");
            }
        }
    };
    
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            toast.success("Successfully logged in with Google!");
            navigate("/home");  // Redirect to the Home page after Google login
        } catch (error) {
            toast.error("Google login failed: " + error.message);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen flex justify-center items-center">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-10">
                    <h2 className="text-2xl font-semibold text-center">Register Your Account</h2>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="Enter your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Enter photo url</span>
                            </label>
                            <input name="photo" type="text" placeholder="photo-url" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered" required />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPassword(!showPassword);
                                }}
                                className="btn btn-xs absolute right-4 top-12"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {passwordError && (
                            <p className="text-red-500 text-xs mt-2">{passwordError}</p>
                        )}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <div className="flex justify-center">
                        <button onClick={handleGoogleLogin} className="btn btn-outline btn-secondary">
                            Login with Google
                        </button>
                    </div>
                    <p className="text-center text-sm font-semi-bold text-base-400 mt-2">Already have an account? <Link className="text-green-600" to="/auth/login">Login</Link></p>

                    {authError && (
                        <p className="text-red-500 text-xs text-center mt-2">{authError}</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Register;
