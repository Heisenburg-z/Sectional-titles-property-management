import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore, setDoc, doc, serverTimestamp } from "firebase/firestore"; // Updated import


const db = getFirestore();

function Dashboard() {
  const [newMessage, setNewMessage] = useState(""); // State to hold the new message to be posted
  const [adminMessages, setAdminMessages] = useState([]);
  const [weather, setWeather] = useState(null); // State to hold weather data


  // Function to handle submitting the announcement to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      if (newMessage.trim() !== "") {
        // Add the new message to the adminMessages array
        setAdminMessages(prevMessages => [
          ...prevMessages,
          { id: prevMessages.length + 1, content: newMessage }
        ]);
        // Clear the input field after posting the message
        setNewMessage("");
      }
      // Add the new message to Firestore
      await setDoc(doc(db, "notifications", `${Date.now()}`), {
        Date: serverTimestamp(),
        sender: "admin",
        message: newMessage,
      });

      toast.success("Announcement posted!");
      // Optionally clear the message input field
      setNewMessage("");
    } catch (error) {
      // Handle any errors that may occur during the announcement posting
      console.error("Error posting announcement:", error);
      toast.error("An error occurred while posting the announcement");
    }
  };

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = 'bc4b2779792a33dc7defab0e8cae5ce8'; 
        const location = 'Johannesburg';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        console.log('Weather data:', response.data); // Log weather data for debugging
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <section className="max-w-3xl mx-auto p-4">
      <ToastContainer />

      {/* Section for admin to post messages */}
      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-slate-600">Post Announcement</h2>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded"
          onClick={handleSubmit}
        >
          Post Announcement
        </button>

      </section>

      {/* Section to display admin messages */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-slate-600">Staff Announcements</h2>
        {adminMessages.map((message) => (
          <div key={message.id} className="bg-gray-100 rounded-lg p-4 mb-2">
            <p class="text-slate-600">{message.content}</p>
          </div>
        ))}
      </section>

      {/* Weather Section */}
      <section className="bg-blue-100 rounded-lg p-4 mb-4 hover:bg-blue-50 transition duration-300">
        <h2 className="text-xl font-bold mb-2 text-slate-600">Weather</h2>
        {weather ? (
          <div>
            <p class="text-slate-600">Location: {weather.name}</p>
            <p class="text-slate-600">Temperature: {weather.main?.temp}°C</p>
            <p class="text-slate-600">Weather: {weather.weather?.[0]?.description}</p>
            {weather.weather?.[0]?.icon && (
              <img 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description} 
                className="weather-icon"
                onError={(e) => console.error("Error loading weather icon", e)} // Log error if image fails to load
              />
            )}
          </div>
        ) : (
          <p class="text-slate-600">Weather info Loading...</p>
        )}
      </section>

      {/* Statements Section */}
      <section className="bg-gray-100 rounded-lg p-4 mb-4 hover:bg-blue-50 transition duration-300">
        <h2 className="text-xl font-bold mb-2 text-slate-600">Statements</h2>
        <p class="text-slate-600">Visit reports tab to see all your Statements.</p>
      </section>

      {/* Visitors Section */}
      <section className="bg-gray-200 rounded-lg p-4 mb-4 hover:bg-blue-50 transition duration-300">
        <h2 className="text-xl font-bold mb-2 text-slate-600">Visitors</h2>
        <p class="text-slate-600">View your visitation history on the visitation tab</p>
      </section>

      {/* Add any additional sections here */}
    </section>
  );
}

export default Dashboard;
