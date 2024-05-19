import React, { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import { useAuth } from '../../../../utils/auth'; // Import useAuth hook

function ResidentsDashboard() {
  // State to hold the messages data
  const [messages, setMessages] = useState([]);
  const id = useAuth().profileId; // Get the profileId using useAuth hook

  useEffect(() => {
    // Function to fetch messages from the server
    const fetchMessages = async () => {
      try {
        console.log("Profile ID:", id); // Log the profile ID for debugging
        // Fetch messages using the provided API endpoint
        const response = await fetch(`/api/property/resident/dashboard/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data); // Assuming the response contains messages data
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [id]); // Trigger the effect when id changes

  return (
    <section className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Hi, Thapelo Ndlovu</h1> 
      {/* Message Section */}
      <section className="bg-gray-100 rounded-lg p-4 mb-4 hover:bg-blue-50 transition duration-300">
        <h2 className="text-xl font-bold mb-2">Messages</h2>
        {/* Display messages */}
        {messages.map(message => (
          <div key={message.id} className={`p-2 mb-2 ${message.sender === 'Admin' ? 'bg-blue-100' : 'bg-green-100'}`}>
            <p className="font-bold">{message.sender}:</p>
            <p>{message.content}</p>
          </div>
        ))}
      </section>
      {/* Weather Section */}
      <section className="bg-blue-100 rounded-lg p-4 mb-4 hover:bg-blue-50 transition duration-300">
        <h2 className="text-xl font-bold mb-2">Weather</h2>
        <p>Weather Loading...</p>
      </section>

      {/* Statements Section */}
      <section className="bg-gray-100 rounded-lg p-4 mb-4 hover:bg-blue-50 transition duration-300">
        <h2 className="text-xl font-bold mb-2">Statements</h2>
        <p>Statements loading...</p>
      </section>

      {/* Visitors Section */}
      <section className="bg-gray-200 rounded-lg p-4 mb-4 hover:bg-blue-50 transition duration-300">
        <h2 className="text-xl font-bold mb-2">Visitors</h2>
        <p>Visitors Loading...</p>
      </section>

      {/* Add any additional sections here */}
    </section>
  );
}

export default ResidentsDashboard;
