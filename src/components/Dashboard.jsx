import { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Dashboard = () => {
    const { user, updateUser } = useContext(AuthContext);  
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user ? user.displayName : '',
        email: user ? user.email : '',
        photoURL: user ? user.photoURL : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        setIsEditing(false);  
    };

    return (
        <div className="max-w-screen-xl mx-auto p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Dashboard</h2>

            <div className="flex flex-col items-center bg-base-100 p-6 rounded-lg shadow-xl">
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={formData.photoURL || 'default-avatar.jpg'}  
                        alt="User"
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <div className="text-xl font-semibold">{formData.name || 'No Name'}</div>
                    <div className="text-gray-600">{formData.email || 'No Email'}</div>
                </div>

                {/* Edit button */}
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="btn btn-outline btn-info mb-6"
                    >
                        Edit Information
                    </button>
                ) : (
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-4">
                            <label className="label" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="label" htmlFor="photoURL">Profile Image URL</label>
                            <input
                                type="url"
                                id="photoURL"
                                name="photoURL"
                                value={formData.photoURL}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                placeholder="Enter image URL"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full">Save Changes</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
