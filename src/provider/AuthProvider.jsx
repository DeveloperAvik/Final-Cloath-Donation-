import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";

// Create the AuthContext
export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Current user
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Create a new user
    const createUser = async (email, password, name) => {
        try {
            setLoading(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const currentUser = userCredential.user;

            // Now, update the user's profile with the name
            await updateProfile(currentUser, { displayName: name });
            
            // After updating the profile, set the updated user state
            setUser({ ...currentUser, displayName: name }); // Update user state with displayName

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // User login
    const userLogin = async (email, password) => {
        try {
            setLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user); // Set user state after successful login
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Log out user
    const logOut = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            setUser(null); // Reset user state after logout
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set the user state when authenticated
            } else {
                setUser(null); // Reset user state when not authenticated
            }
            setLoading(false); // Stop loading after checking auth state
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    // Provide all the necessary context values to the children components
    const authInfo = {
        user,
        setUser,
        createUser,
        userLogin,
        logOut,
        loading,
        error,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children} {/* Render children components */}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
