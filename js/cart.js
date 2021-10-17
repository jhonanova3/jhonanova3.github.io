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
        <div class="col-sm-2"><input type="number" min="1" max="99" onchange="actualizarCarrito(this.value, ${item.unitCost}, '${i}' )" value="${item.count}"> </div>
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
}
