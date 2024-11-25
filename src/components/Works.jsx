import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";  

function Works() {
    const [campaigns, setCampaigns] = useState([]);
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();

    useEffect(() => {
        fetch("apis.json")
            .then(res => res.json())
            .then(data => setCampaigns(data))
            .catch(error => {
                console.log(error.message);
            });
    }, []);

    const handleDonateClick = (campaign) => {
        if (!user) {  
            navigate('/auth/login');  
        } else {
            navigate('/donation', { state: { campaign } });  
        }
    };

    return (
        <div className="works-section max-w-screen-xl mx-auto px-4 py-8">
            <h2 className="text-center text-4xl font-bold mb-8">Our Winter Donation Campaigns</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="card bg-base-100 shadow-xl overflow-hidden">
                        <figure className="h-56">
                            <img
                                src={campaign.image}
                                alt={campaign.title}
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="card-body p-4">
                            <h3 className="card-title text-xl font-semibold">{campaign.title}</h3>
                            <p className="text-sm mt-2">{campaign.description}</p>
                            <p className="font-bold text-lg mt-2">Division: {campaign.division}</p>
                            <p className="text-gray-700 mt-2">Status: {campaign.status}</p>
                            <button
                                onClick={() => handleDonateClick(campaign)}
                                className="btn btn-outline btn-success mt-4 w-full"
                            >
                                Donate Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Works;
