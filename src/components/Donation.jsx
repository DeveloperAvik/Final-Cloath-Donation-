import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify'; // Import the toast function
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const Donation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { campaign } = location.state || {};  
    
    // Handle form state for donation form
    const [donationDetails, setDonationDetails] = useState({
        quantity: '',
        itemType: '',
        pickupLocation: '',
        additionalNotes: ''
    });

    // Handle input changes for donation form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonationDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle donation form submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent the default form submission

        // Display a toast notification
        toast.success("Thank you! We will reach your destination soon.");

        // Clear the form
        setDonationDetails({
            quantity: '',
            itemType: '',
            pickupLocation: '',
            additionalNotes: ''
        });
    };

    // Check if the user is authenticated (dummy check, implement your logic)
    const isAuthenticated = true; // Replace this with actual auth logic

    // Redirect to login page if not authenticated
    if (!isAuthenticated) {
        navigate("/login"); // Redirect to login page if user is not authenticated
        return null; // Prevent rendering of donation form and campaign details
    }

    return (
        <div className="max-w-screen-xl mx-auto p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Campaign Details Section */}
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

                {/* Donation Form Section */}
                <div className="card bg-base-100 shadow-xl p-6">
                    <h3 className="text-2xl font-semibold mb-4">Donation Form</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label htmlFor="quantity" className="label">Quantity of Items</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={donationDetails.quantity}
                                onChange={handleChange}
                                placeholder="Enter the quantity"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="itemType" className="label">Item Type</label>
                            <input
                                type="text"
                                id="itemType"
                                name="itemType"
                                value={donationDetails.itemType}
                                onChange={handleChange}
                                placeholder="Enter item type (e.g., jacket, blanket)"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="pickupLocation" className="label">Pickup Location</label>
                            <input
                                type="text"
                                id="pickupLocation"
                                name="pickupLocation"
                                value={donationDetails.pickupLocation}
                                onChange={handleChange}
                                placeholder="Enter pickup location"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label htmlFor="additionalNotes" className="label">Additional Notes (optional)</label>
                            <textarea
                                id="additionalNotes"
                                name="additionalNotes"
                                value={donationDetails.additionalNotes}
                                onChange={handleChange}
                                placeholder="Enter any additional notes"
                                className="textarea textarea-bordered w-full"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full">Submit Donation</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Donation;
