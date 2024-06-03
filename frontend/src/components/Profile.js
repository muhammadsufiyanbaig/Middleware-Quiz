import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/profile/${userId}`);
        if (response.status === 200) {
          setLoggedInUser(response.data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div>
      {loggedInUser && (
        <div className="bg-white flex flex-col items-center justify-center h-screen">
          <div className="p-10 bg-gray-100 shadow-lg">
            <h1 className="font-bold text-4xl text-gray-900 mb-4">Welcome!</h1>
            <div>
              <p className="font-bold text-lg text-green-500 mt-4">Your Name:</p>
              <div className="p-2 bg-gray-200">
                <p className="text-md text-gray-900">{loggedInUser.details.name}</p>
              </div>
            </div>
            <div>
              <p className="font-bold text-lg text-green-500 mt-4">Your Email:</p>
              <div className="p-2 bg-gray-200">
                <p className="text-md text-gray-900">{loggedInUser.details.email}</p>
              </div>
            </div>
            <div>
              <div>
                <button
                  onClick={handleLogout}
                  className="mt-4 w-full text-center border-2 border-green-500 font-semibold leading-6 text-green-500 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
