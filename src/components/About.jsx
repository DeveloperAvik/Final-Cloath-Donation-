
import aboutImg from "../assets/about.jpg"
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();

    const handleDonateClick = () => {
        navigate('/auth/login');
    };

    return (
        <section className="py-12 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">About Us</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-medium text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-lg text-gray-600 mb-4">
                            At <span className="font-bold">ClothingKind</span>, we are dedicated to providing a way for people to give back to their communities by donating gently used clothes to those in need. Our mission is to create a world where everyone has access to the clothes they need to thrive.
                        </p>
                        <p className="text-lg text-gray-600">
                            We partner with local organizations, shelters, and charities to ensure that your donations reach those who need them the most. Whether you are cleaning out your closet or just looking for a way to help, your donations make a lasting impact.
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <img
                            src={aboutImg}
                            alt="Donation Image"
                            className="rounded-lg shadow-lg w-full md:w-80 h-auto"
                        />
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <button
                        className="btn btn-primary text-white"
                        onClick={handleDonateClick} 
                    >
                        Donate Now
                    </button>
                </div>
            </div>
        </section>
    );
}

export default About;
