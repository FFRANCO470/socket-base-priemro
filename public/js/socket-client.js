// para usar el servidor, esta variable estara pendiente
const socket=io();
//relacionar con los componentes en index.html
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')
let array = document.getElementById("array")
let nombre = document.getElementById("nombre")

//capturar respuestas con la palabra on cuando pase un evento "conectarse"
socket.on('connect',()=>{
  console.log('conectado');
  lblOnline.style.display=''
  lblOffline.style.display='none'
})
socket.on('disconnect',()=>{
  console.log('desconectado');
  lblOnline.style.display='none'
  lblOffline.style.display=''  
})
//para que el ciente puede escuchar al server
//socket.on('mensaje-server',(payload)=>{
socket.on('mensaje-server',(registros)=>{
  array.innerHTML += `<p><em>${registros.idCliente} : </em>${registros.mensaje}</p>`;
  console.log(registros);
})
//agregar un evento (click) aca se puede llamar base  de datos async en el colback
btnEnviar.addEventListener('click',()=>{
  const mensaje = txtMensaje.value;
  //se crea un objeto(1)
  const payload={
    mensaje,
    fecha:new Date().getTime()
  }
  txtMensaje.innerHTML = ' '

  //socket.emit('enviar-mensaje',mensaje);
  //envio el objeto creado al servidor y recibo respuesta del servidor(11)
  socket.emit('enviar-mensaje',payload,(id)=>{
    
    //console.log('rta desde el servidor',id);

  });
})
