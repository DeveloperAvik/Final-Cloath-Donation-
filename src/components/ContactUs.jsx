import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        toast.success('Your message has been sent successfully!', {
            position: 'top-right',
            autoClose: 3000,
        });

        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <section className="py-16 bg-gray-100">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Contact Us</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-medium text-gray-800 mb-4">Get in Touch</h3>
                        <p className="text-lg text-gray-600 mb-4">
                            If you have any questions or would like to learn more about how to donate clothes, feel free to reach out to us. We would love to hear from you!
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <i className="fas fa-map-marker-alt text-gray-600 mr-3"></i>
                                <span className="text-lg text-gray-600">123 Donation St, City, Country</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-phone-alt text-gray-600 mr-3"></i>
                                <span className="text-lg text-gray-600">+123 456 789</span>
                            </div>
                            <div className="flex items-center">
                                <i className="fas fa-envelope text-gray-600 mr-3"></i>
                                <span className="text-lg text-gray-600">contact@donateclothes.com</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-xl font-medium text-gray-800 mb-4">Send Us a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input input-bordered w-full mt-2"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input input-bordered w-full mt-2"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered w-full mt-2"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary text-white w-full">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </section>
    );
}

export default ContactUs;
