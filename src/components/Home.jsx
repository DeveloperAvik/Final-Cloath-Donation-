import { useEffect } from "react";
import Banner from "../components/Banner";
import About from "./About";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

function Home() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Duration of animation
            once: true, // Whether the animation should happen only once
        });
    }, []);

    return (
        <div>
            <Banner data-aos="fade-up"></Banner> 
            <div className="mt-10">
                <About data-aos="fade-left"></About> 
            </div>
        </div>
    );
}

export default Home;
