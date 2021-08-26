//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded",async function (e) {
//1- Traer la lista de productos   
let promesa = await getJSONData(PRODUCTS_URL);
let productos = promesa.data



//2- Mostrar el listado en HTML
let lista = document.getElementsByClassName("lista-de-productos")[0] 

for (let i = 0; i < productos.length; i++) {
  let  nombre = productos[i].name
let descripcion = productos[i].description
let costo = productos[i].currency + productos[i].cost
let imagen = productos[i].imgSrc
let ventas = productos[i].soldCount



lista.innerHTML +=`
<a href="category-info.html" class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
            <img src="` + imagen + `" alt="` + nombre + `" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ nombre+`</h4>
                <small class="text-muted">` + costo + `</small>
                </div>
                <p> ` + descripcion + `</p>
                <p class="mb-1">` + ventas + ` Vendidos </p>
          
        </div>
    </div>
</a>
`
}


});
