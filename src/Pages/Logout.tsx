
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const cancelLogout = () => {
        navigate(-1); 
    };

    return (
        <div className="flex flex-col items-center justify-center h-lvh bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-xl font-semibold mb-4">Are you sure you want to log out?</h2>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Yes
                    </button>
                    <button
                        onClick={cancelLogout}
                        className="px-6 py-2 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 transition duration-300"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;
