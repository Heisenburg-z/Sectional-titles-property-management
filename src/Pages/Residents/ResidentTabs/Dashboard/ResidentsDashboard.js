import React, { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import axios from 'axios'; // Import axios for API calls

function ResidentsDashboard() {
  // State to hold the messages data
  const [messages, setMessages] = useState([]);
  const [weather, setWeather] = useState(null); // State to hold the weather data

  useEffect(() => {
    // setLoading(true); 
    fetch(`/api/property/resident/dashboard`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        // setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
        // toast.error('Error fetching messages');
        // setLoading(false); 
      });
  });

  useEffect(() => {
    // Function to fetch weather data
    const fetchWeather = async () => {
      try {
        const apiKey = 'bc4b2779792a33dc7defab0e8cae5ce8'; 
        const location = 'Johannesburg';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        console.log(response.data); // Log weather data for debugging
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []); // Empty dependency array means this effect runs once after the initial render
//new Date(message.date.seconds * 1000).toLocaleString()
  return (
    <section className="max-w-3xl mx-auto p-4">
      {/*<h1 className="text-3xl font-bold mb-8">Hi, Thapelo Ndlovu</h1>*/}
      {/* Message Section */}
      <section className="bg-gray-100 rounded-lg p-4 mb-4 hover:bg-blue-50 transition duration-300">
        <h2 className="text-xl font-bold mb-2 text-slate-600">Messages</h2>
        {/* Display messages. */}
        {messages.length > 0 ? messages.map((message, index) => (
          <div key={index} className={`p-2 mb-2 ${message.sender === 'admin' ? 'bg-blue-100' : 'bg-green-100'}`}>
            <p className="font-bold text-slate-600">{message.sender}</p>
            <p class="text-slate-600">{message.message}</p>
            <p className="text-sm text-gray-500 text-slate-600">{message.date}</p>
          </div>
        )) : <p class="text-slate-600" >No messages found.</p>}
      </section>
      {/* Weather Section */}
      <section className="bg-blue-100 rounded-lg p-4 mb-4 hover:bg-blue-50 transition duration-300">
        <h2 className="text-xl font-bold mb-2 text-slate-600">Weather</h2>
        {weather ? (
          <div>
            <p class="text-slate-600">Location: {weather.name}</p>
            <p class="text-slate-600">Temperature: {weather.main.temp}°C</p>
            <p class="text-slate-600">Weather: {weather.weather[0].description}</p>
            <img 
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
              alt={weather.weather[0].description} 
              className="weather-icon"
              onError={(e) => console.error("Error loading weather icon", e)} // Log error if image fails to load
            />
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

export default ResidentsDashboard;
