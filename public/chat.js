// make connection
var socket = io('http://localhost:3000');

// query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

var typingTimer; // type stopper function

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function(){
        socket.emit('stoptyping');
    }, 1000);
});

// toxicity - emit events
const threshold = 0.9;

toxicity.load(threshold).then(function(model) {
    btn.addEventListener('click', function() {
        model.classify([message.value]).then(function(predictions) {
            var isToxic = predictions.some(function(prediction) {
                return prediction.results[0].match === true;
            });
            if (isToxic) {
              socket.emit('chat', {
                message: '*****',
                handle: handle.value,
              })
                message.value = '';
                feedback.innerHTML = '';
            } else {
              socket.emit('chat', {
                message: message.value,
                handle: handle.value,
              })
                message.value = '';
                feedback.innerHTML = '';
            }
        });
    });
});

// listen for events - outside toxicity block
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('stoptyping', function(){
    feedback.innerHTML = '';
});
