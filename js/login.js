
function checkValue() {
    let campoUsuario = document.getElementById("nombreUsuario").value;
    let campoContrasena = document.getElementById("clave").value;

    if (campoUsuario == "" || campoContrasena == "") {
        alert("No puedes ingresar!");
    } else {
        localStorage.setItem("usuarioSesion", campoUsuario);
        window.location.href = "home.html"
    }
}












//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function (e) {

});




