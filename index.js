require('dotenv').config();
var express = require('express');
var socket = require('socket.io');
var { initializeApp } = require('firebase/app');
var { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } = require('firebase/firestore');

// Firebase setup
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// app setup
var app = express();
var server = app.listen(3000, function(){
    console.log('listening to requests on port 3000');
});

// static files
app.use(express.static('public'));

// socket setup
var io = socket(server);

io.on('connection', async function(socket){
    console.log('made socket connection :D', socket.id);

    // load 10 most recent messages on connect
    try {
        const q = query(
            collection(db, 'messages'),
            orderBy('timestamp', 'desc'),
            limit(10)
        );
        const snapshot = await getDocs(q);
        const messages = [];
        snapshot.forEach(doc => messages.push(doc.data()));
        messages.reverse().forEach(msg => socket.emit('chat', msg));
    } catch(err) {
        console.log('Error loading messages:', err);
    }

    socket.on('chat', async function(data){
        // save to Firestore
        try {
            const docRef = await addDoc(collection(db, 'messages'), {
                handle: data.handle,
                message: data.message,
                timestamp: Date.now()
            });
            console.log('Message saved with ID:', docRef.id);
        } catch(err) {
            console.log('Error saving message:', err);
        }
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    socket.on('stoptyping', function(){
        socket.broadcast.emit('stoptyping');
    });
});
