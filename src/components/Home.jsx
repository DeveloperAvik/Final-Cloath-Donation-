import Banner from "../components/Banner"
import About from "./About"

function Home() {
    return (
        <div>
            <Banner></Banner>
            <div className="mt-10">
                <About></About>
            </div>
        </div>
    )
}

export default Home
