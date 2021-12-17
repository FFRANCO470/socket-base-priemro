// framework de node para estructurar servidor
import express from 'express';

// validar peticones segun la geografia
import cors from 'cors';

// implementar sockets
import * as io from 'socket.io';

// permite hacer comunicacion con socket
import http from 'http';

//importar controller de socket
import {socketController} from '../sockets/controllers.js';
//import {createServer} from 'http' (1)

class Server{
    constructor(){
        // servidor de express
        this.app = express();

        // variables de entorno
        this.port = process.env.PORT;  


        // linea para unir el servidor que crea express con el server de sockets que se esta creando
        // crear servidor socket
        this.server = http.createServer(this.app)

        //this.server = createServer(this.app)  (1)
        
        // implementar  funciones de socket
        this.io=new io.Server(this.server) 

        // funcion que valida rutas
        this.middlewares();

        //llamar controlador socket
        this.sockets();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.static('public'))
    }
    //el que va a estar escuchando
    sockets(){
        this.io.on('connection',socketController)
    }
    listen(){
        //this.app.listen(this.port , ()=>{
            //thi.server hereda de la propiedad de servidor del this.app
        this.server.listen(this.port , ()=>{
            console.log(`Servidor corriendo en el puesto ${this.port}`);
        });
    }
}
export default Server