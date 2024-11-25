import { useLocation } from "react-router-dom";
import { useState } from "react";

const Donation = () => {
    const location = useLocation();
    const { campaign } = location.state || {};  

    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zip: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission and show success modal
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Address submitted:", address);
        setIsModalOpen(true);
    };

    // Handle modal close
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-screen-xl mx-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card bg-base-100 shadow-xl p-6">
                    {campaign ? (
                        <>
                            <h3 className="text-2xl font-semibold">{campaign.title}</h3>
                            <img
                                src={campaign.image}
                                alt={campaign.title}
                                className="w-full h-56 object-cover mt-4 rounded-md"
                            />
                            <p className="mt-4">{campaign.description}</p>
                            <p className="mt-2"><strong>Division:</strong> {campaign.division}</p>
                            <p className="mt-2"><strong>Status:</strong> {campaign.status}</p>
                        </>
                    ) : (
                        <p>Campaign not found</p>
                    )}
                </div>

                <div className="card bg-base-100 shadow-xl p-6">
                    <h3 className="text-2xl font-semibold mb-4">Shipping Address</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label htmlFor="street" className="label">Street</label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={address.street}
                                onChange={handleChange}
                                placeholder="Enter your street address"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="city" className="label">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={address.city}
                                onChange={handleChange}
                                placeholder="Enter your city"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="state" className="label">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={address.state}
                                onChange={handleChange}
                                placeholder="Enter your state"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="zip" className="label">Zip Code</label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={address.zip}
                                onChange={handleChange}
                                placeholder="Enter your zip code"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full">Submit Address</button>
                    </form>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Donation Successful!</h3>
                        <p className="py-4">Your donation address has been successfully submitted.</p>
                        <div className="modal-action">
                            <button onClick={closeModal} className="btn">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Donation;
