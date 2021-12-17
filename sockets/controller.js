const socketController =(socket)=>{
    console.log('cliente conectado',socket.id);

    socket.on('disconnect',()=>{
        console.log('Cliente desconectado',socket.id);
    })
    // este enviar mensaje es de el metodo para recibir el msg del cliente
    socket.on('enviar-mensaje',(payload, callback)=>{
        const id = socket.id
        callback(id)
        payload.idCliente = id

        //const registros = [];
        //registros.unshift(payload);

        //console.log(payload);
        //enviar a solo el que hablo
        socket.emit('mensaje-server',payload)
        //socket.emit('mensaje-server',registros)
        //enviar a todos los clientes
        socket.broadcast.emit('mensaje-server',payload)
        //socket.broadcast.emit('mensaje-server',registros)
    })
}

export {socketController}