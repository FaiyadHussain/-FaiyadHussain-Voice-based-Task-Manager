import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [tasks, setTasks] = useState([]);
  const [recognition, setRecognition] = useState(null);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const sendAudioToBackend = async (text) => {
    try {
      const response = await fetch(
        "https://voice-based-task-manager.onrender.com/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        fetchTasks(); // Refresh task list
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(
        "Your browser does not support the Web Speech API. Please use a supported browser like Chrome."
      );
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onresult = (event) => {
      const transcriptResult = event.results[0][0].transcript;
      setTranscript(transcriptResult);
      sendAudioToBackend(transcriptResult); // Send text to DB
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "https://voice-based-task-manager.onrender.com/tasks"
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(
        `https://voice-based-task-manager.onrender.com/tasks/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchTasks(); // Refresh task list
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Voice-based Task Manager
      </h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-6">
        <form>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Your transcribed text will appear here..."
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`px-4 py-2 rounded-lg font-medium text-white transition duration-300 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isListening ? "Stop Recording" : "Record"}
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tasks</h2>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center p-4 border rounded-lg bg-gray-50"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">{task.text}</p>
                <p className="text-sm text-gray-500">
                  {new Date(task.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteTask(task._id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default App;
