# Real-Time Chat Application

A real-time chat application built with Node.js, Socket.io, and Firebase Firestore.
Features live messaging between users, a TensorFlow.js toxicity filter, and message
persistence — the 10 most recent messages load automatically on page refresh.

---

## Features

- Real-time messaging via WebSockets (Socket.io)
- "Is typing..." live indicator
- Toxicity detection using TensorFlow.js — explicit content is replaced with "*****"
- Message persistence with Firebase Firestore (loads 10 most recent messages on connect)
- Publicly shareable via ngrok

---

## Tech Stack

- **Backend:** Node.js, Express, Socket.io
- **Frontend:** HTML, CSS/Bootstrap, Vanilla JavaScript
- **Database:** Firebase Firestore
- **Safety:** TensorFlow.js Toxicity Model
- **Tunneling:** ngrok

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- npm (comes with Node)
- [ngrok](https://ngrok.com/)
- A Firebase account with a Firestore database set up

---

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the root directory and add your Firebase config keys:
```
API_KEY=your_api_key
AUTH_DOMAIN=your_auth_domain
PROJECT_ID=your_project_id
STORAGE_BUCKET=your_storage_bucket
MESSAGING_SENDER_ID=your_messaging_sender_id
APP_ID=your_app_id
```
---

## Running the App

1. Start the server:
```bash
   node index.js
```

2. In a separate terminal, start ngrok on your port (default is 3000):
```bash
   ngrok http 3000
```

3. Open `localhost:3000` in your browser to test locally, or share the **HTTPS**
   ngrok URL with someone on a different network.

---

## Usage

- Enter your name/handle in the name field
- Type a message and hit **Send Message**
- Messages containing explicit content are automatically censored
- Refreshing the page loads the 10 most recent messages from Firestore

---

## Project Structure

```
chat-app/
├── node_modules/
├── index.js
├── chat.js
├── index.html
├── styles.css
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
---

## Notes

- Never commit your `.env` file — it's excluded via `.gitignore`
- Use the **HTTPS** ngrok link in your `connect()` call, not HTTP
- Test everything on localhost before sharing the ngrok link
