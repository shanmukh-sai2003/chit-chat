
function initializeIO(io) {
    return io.on('connection', (socket) => {
        console.log('connection established');
        console.log('socket id: ', socket.id);
    });
}

export { initializeIO };