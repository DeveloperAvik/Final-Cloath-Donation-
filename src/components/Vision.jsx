import visionImg from "../assets/vision.jpg"

function Vision() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
                    Our Vision
                </h2>

                <div className="md:flex md:items-center md:justify-between bg-white p-8 rounded-lg shadow-xl">
                    <div className="md:w-1/2">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                            Empowering Lives Through Clothing
                        </h3>
                        <p className="text-lg text-gray-600">
                            At <span className="font-bold">ClothingKind</span>, our vision is to create a world where everyone has access to
                            the basic necessity of clothing. We believe in the power of giving and aim to inspire
                            individuals and communities to donate clothes that no longer serve them to those in need.
                        </p>
                        <p className="text-lg text-gray-600 mt-4">
                            We are committed to providing a sustainable solution to those who are facing financial
                            hardships, offering them the dignity and warmth they deserve. Our goal is to create a
                            global network of givers and receivers, fostering kindness, compassion, and social
                            responsibility.
                        </p>
                    </div>

                    {/* Vision Image */}
                    <div className="mt-8 md:mt-0 md:w-1/2">
                        <img
                            src={visionImg}
                            alt="Vision"
                            className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Vision;
