import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import { ToastContainer } from "react-toastify";

function HomeLayouts() {
    return (
        <div className="font-poppins bg-gray-100">

            {/* Navbar */}
            <nav className="w-full mx-auto py-3">
                <Navbar />
            </nav>

            {/* Main Content */}
            <main className="w-full mx-auto pt-5 px-4">
                <ToastContainer></ToastContainer>
                <section className="mt-10">
                    {/* Dynamic Content Rendered Here */}
                    <Outlet />
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-10 bg-gray-800 text-white py-6">
                <Footer />
            </footer>

        </div>
    )
}

export default HomeLayouts;
