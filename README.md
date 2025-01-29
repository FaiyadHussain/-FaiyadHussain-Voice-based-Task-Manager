Voice-based Task Manager
A MERN stack application that allows users to add tasks by speaking. This application leverages the Deepgram API for speech-to-text conversion and stores tasks in MongoDB for efficient task management.

Features:

Frontend - 
A button to record audio using the browser's microphone.
Displays a list of tasks fetched from the backend.
Success message on adding a task.
Ability to delete tasks (optional feature).

Backend - 
Accepts audio uploads from the frontend.
Integrates with the Deepgram API for transcribing speech to text.
Stores transcribed tasks in MongoDB with a timestamp.
Fetches all tasks from the database and serves them to the frontend.

Database - 
Tasks are stored in MongoDB with the following fields:
Task text (e.g., "Buy groceries").
Timestamp of task creation.

Setup Instructions
1. Prerequisites
Node.js and npm installed.
MongoDB database setup.
Deepgram API account with an API key.

3. Clone the Repository
[git clone (https://github.com/FaiyadHussain/-FaiyadHussain-Voice-based-Task-Manager)]
cd voice-based-task-manager

5. Set Up the Backend
Navigate to the server folder:
cd server

Install dependencies:
npm install
Create a .env file in the server folder with the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
DEEPGRAM_API_KEY=your_deepgram_api_key

Start the server:
npm start

7. Set Up the Frontend
Navigate to the client folder:
cd ../client
Install dependencies:
npm install

Start the frontend:
npm start
The app will be available at http://localhost:5000.

😊Live Application: https://voice-based-task-manager-z4zl.vercel.app/
GitHub Repository: https://github.com/FaiyadHussain/-FaiyadHussain-Voice-based-Task-Manager
