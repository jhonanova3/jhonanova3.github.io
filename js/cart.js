//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productos = resultObj.data.articles
            crearCarrito()
            calcularSubtotal()
        }
    });

});
let productos = []
let moneda = "$"

function crearCarrito() {
let contenedorDeCarrito = document.getElementById("contenedorDeArticulos")
    for (let i = 0; i < productos.length; i++) {
        const item = productos[i];
        contenedorDeCarrito.innerHTML += `<div class="row item-carrito">
        <div class="col-sm-1"><img class="img-fluid" src="${item.src}"></div>
        <div class="col-sm-5">${item.name}</div>
        <div class="col-sm-2">${moneda + " " + item.unitCost}</div>
        <div class="col-sm-2"><input type="number" min="1" max="99" class="inputcarrito" onchange="actualizarCarrito(this.value, ${item.unitCost}, '${i}' )" value="${item.count}"> </div>
        <div class="col-sm-2" id="item${i}">${moneda + " " + (item.count * item.unitCost)}</div>
        </div> `
    }

}

function actualizarCarrito(cantidad, costo, id) {
let subTotal = cantidad * costo
let identificador = "item" + id
document.getElementById(identificador).innerHTML= moneda + " " + subTotal
console.log(productos)
productos[id].count = cantidad
calcularSubtotal()
}

function calcularSubtotal() {
    let subTotal = 0
    for (let i = 0; i < productos.length; i++) {
        const item = productos[i];
        subTotal += item.count * item.unitCost
        
    }
   document.getElementById("elSubtotal").innerHTML = moneda + " " + subTotal 
   calcularEnvio()
}
// subtotal,tipo de envío y costo de envío.
function calcularEnvio() {
    let tipoEnvio = document.querySelector('input[name="tipoEnvio"]:checked').value;
    let subTotal = 0
    for (let i = 0; i < productos.length; i++) {
        const item = productos[i];
        subTotal += item.count * item.unitCost
        
    }
    let costoEnvio = 0  
    if (tipoEnvio == "premium") {
        costoEnvio = subTotal*0.15
    }
    if (tipoEnvio == "express") {
        costoEnvio = subTotal*0.07
    }
    if (tipoEnvio == "standard") {
        costoEnvio = subTotal*0.05
    }
    costoEnvio=parseInt(costoEnvio)
    let total = subTotal+costoEnvio

    document.getElementById("costoEnvioText").innerHTML="$ "+ costoEnvio
    document.getElementById("costoTotalText").innerHTML="$ "+ total
}
// validaciones de campos de formulario seleccionado completo, cantidad de productos mayor a 0,todas las validaciones correctas para una compra exitosa.
function validacionFinal(){
let validacionCarrito = false
let validacionPago = false

    let inputcarrito= document.getElementsByClassName("inputcarrito")
    let totalElementos = 0
    for (let i = 0; i < inputcarrito.length; i++) {
        const elemento = inputcarrito[i];
       totalElementos+= parseInt(elemento.value)
    }
    if (totalElementos<=0) {
       alert("Error: verifica cantidad de productos") 
    } else {
        validacionCarrito = true
    }

    let metodoSeleccionado = document.querySelector('input[name="metodo"]:checked').value;
    if (metodoSeleccionado == "tarjeta") {
        let numeroTarjeta = document.getElementById("numeroTarjeta")
        let fechaVencimiento = document.getElementById("fechaVencimiento")
        let codigoSeguridad = document.getElementById("codigoSeguridad")
        if (numeroTarjeta.value == "" || fechaVencimiento.value == "" || codigoSeguridad.value == "") {
            alert("Error: datos de tarjeta incompletos")
        } else {
            validacionPago = true
        }
    }

    if (metodoSeleccionado == "cuentaBancaria") {
       let inputCuenta = document.getElementById("numeroCuentas") 
       if (inputCuenta.value == ""){
           alert("Error: falta número de cuenta")
       } else {
           validacionPago = true
       }
    }
    if (validacionPago && validacionCarrito) {
        alert("Compra realizada exitosamente")
      
        window.location.replace("index.html")
    } 
    return false
}
