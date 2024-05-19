import React, { useState } from "react";

function Dashboard() {
  // State to hold the messages posted by admin
  const [adminMessages, setAdminMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); // State to hold the new message to be posted

  // Function to handle posting a new message by admin
  const postMessage = () => {
    if (newMessage.trim() !== "") {
      // Add the new message to the adminMessages array
      setAdminMessages(prevMessages => [
        ...prevMessages,
        { id: prevMessages.length + 1, content: newMessage }
      ]);
      // Clear the input field after posting the message
      setNewMessage("");
    }
  };

  return (
    <section>
      {/* Section for admin to post messages */}
      <section className="mb-4">
        <h2 className="text-xl font-bold mb-2">Post Message</h2>
        <textarea
          className="w-full border rounded p-2"
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded"
          onClick={postMessage}
        >
          Post
        </button>
      </section>

      {/* Section to display admin messages */}
      <section>
        <h2 className="text-xl font-bold mb-2">Admin Messages</h2>
        {/* Display admin messages */}
        {adminMessages.map((message) => (
          <div key={message.id} className="bg-gray-100 rounded-lg p-4 mb-2">
            <p>{message.content}</p>
          </div>
        ))}
      </section>
    </section>
  );
}

export default Dashboard;
