//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
mostrarLosDatos()
});
let datosUsuarios = {
  
}



function guardarLosDatos() {
datosUsuarios.nombre = document.getElementById("nombreCompleto").value
datosUsuarios.edad = document.getElementById("edad").value
datosUsuarios.email = document.getElementById("email").value
datosUsuarios.telefono = document.getElementById("telefono").value

localStorage.setItem("todosLosDatos",  JSON.stringify(datosUsuarios))

return false
}

function mostrarLosDatos() {
  let infoUsuario =  localStorage.getItem("todosLosDatos")
  infoUsuario = JSON.parse(infoUsuario)

  if (infoUsuario != null) {
    document.getElementById("nombreCompleto").value = infoUsuario.nombre
    document.getElementById("edad").value = infoUsuario.edad
    document.getElementById("email").value = infoUsuario.email
    document.getElementById("telefono").value = infoUsuario.telefono
   
}

 
 
}