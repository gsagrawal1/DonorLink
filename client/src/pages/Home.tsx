import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


export default function Home()  {
  const { user } = useUser();
  const navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };


  const getRoleMessage = () => {
    switch (user?.role) {
      case "USER":
        return "You can request blood donations.";
      case "DONOR":
        return "You can donate blood and help save lives.";
      case "BLOODBANK":
        return "You can manage blood inventory and requests.";
      case "ADMIN":
        return "You can manage users and monitor activities.";
      default:
        return "Welcome to DonorLink!";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="bg-red-600 text-white px-6 py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div
            className="text-2xl font-bold cursor-pointer hover:text-gray-200 transition-colors"
            onClick={() => navigate("/")}
          >
            DonorLink
          </div>

          {/* Navigation Items */}
          <div className="space-x-6 hidden md:flex">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-gray-200 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-gray-200 transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-white text-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-red-800 px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/")}
                  className="hover:text-gray-200 transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/find-donors")}
                  className="hover:text-gray-200 transition-colors"
                >
                  Find Donors
                </button>
                <button
                  onClick={() => navigate("/blood-banks")}
                  className="hover:text-gray-200 transition-colors"
                >
                  Blood Banks
                </button>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-gray-200 transition-colors"
                >
                  About
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-white text-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-50">
        {user ? (
          <div className="bg-white border border-red-200 p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
            <h1 className="text-4xl font-bold text-red-600">
              Welcome, {user._id || "User"}!
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              You are logged in as:{" "}
              <span className="font-semibold text-red-600">{user.role}</span>
            </p>
            <p className="mt-2 text-gray-600">{getRoleMessage()}</p>
          </div>
        ) : (
          <div className="text-center max-w-md p-6">
            <h1 className="text-4xl font-bold text-red-600">
              Welcome to DonorLink!
            </h1>
            <p className="mt-4 text-gray-700">
              Sign up or log in to start requesting or donating blood and help
              save lives.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-white border border-red-600 text-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors"
              >
                Signup
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-red-600 text-white text-center py-4">
        © {new Date().getFullYear()} DonorLink. All rights reserved.
      </footer>
    </div>
  );
}
