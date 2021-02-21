const colors = require('colors');

const {io} =require('../server');

io.on('connect', socketClient => { // "connection" event / Server connection!
    // ---------------------------------------------- <> Listening Events on Server > Server
    console.log('Connected client'.gray, socketClient.id);

    // socketClient.emit('send-msg', { // Test direct send - Send from server
    //     user: 'Admin',
    //     msg: 'From the svr... ...'
    // });

    socketClient.on('disconnect', () => { // "disconnect" event
        console.log('Diconnected client'.brightWhite, socketClient.id);
    });

    socketClient.on('send-msg', (payload, callback) => { // "send-msg" event

        // ---- With a DB!
        // async... save in DB... here!

        // ---- view in server
        console.log(payload);

        // ---- view in all clients
        // io.emit('send-msg', payload); // pass event to client

        // ---- view in others clients
        // socketClient.broadcast.emit('send-msg', payload);

        // ---- res to requesting client
        // const id = 123456;
        // callback({id: id, mss: "DB response"});

        //---- view in others clients, res to requesting client
        const id = 123456;
        socketClient.broadcast.emit('send-msg', payload);
        callback({id: id, mss: "DB response"});
        // if (payload.msg) {
        //     callback({
        //         res: 'well'
        //     })
        // } else {
        //     callback({
        //         res: 'wrong'
        //     })
        // }
    });
});
