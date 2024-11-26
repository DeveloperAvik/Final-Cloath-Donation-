import { useState } from "react";
import { sendPasswordResetEmail } from "../firebase/firebase.config"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
        setEmail(""); 
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error: " + error.message);
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex justify-center items-center bg-base-200">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-10">
          <h2 className="text-2xl font-semibold text-center mb-6">Reset Your Password</h2>
          <form onSubmit={handleResetPassword} className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Enter your email</span>
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="form-control mt-1">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Email"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
