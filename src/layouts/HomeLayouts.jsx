import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"


function HomeLayouts() {
    return (
        <div className="font-poppins">

            <nav className="w-11/12 mx-auto py-3">
                <Navbar></Navbar>
            </nav>

            <main className="w-11/12 mx-auto pt-5 gap-3">
   
                <section className="col-span-6 mt-10">
                    <Outlet></Outlet>
                </section>
            </main>

            <footer className="mt-10">
                <Footer></Footer>
            </footer>

        </div>
    )
}

export default HomeLayouts
