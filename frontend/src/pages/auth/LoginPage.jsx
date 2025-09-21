import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../lib/authContext';
import api from '../../lib/axios';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Login request data:", { email, password }); // Debugging log

        try {
            const { data } = await api.post("/auth/login", { email, password });
            login(data.token); // Update the auth state with the token
            toast.success("Logged in successfully");
            navigate("/"); // Redirect to the homepage
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message); // Log the actual error
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card w-full max-w-md bg-base-100 shadow-md">
                <div className="card-body">
                    <h2 className="card-title text-center">Welcome Back</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Your Password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Logging in..." : "Log In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;