let producto = [];

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           producto = resultObj.data;

            let productoNameHTML  = document.getElementById("productName");
            let productoDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let productCostoHTML = document.getElementById("productCosto");
        
            productoNameHTML.innerHTML = producto.name;
            productoDescriptionHTML.innerHTML = producto.description;
            productCountHTML.innerHTML = producto.soldCount;
            productCriteriaHTML.innerHTML = producto.category;
            productCostoHTML.innerHTML =producto.currency + producto.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(producto.images);
            mostrarRelacionados();
            mostrarComentarios();
        }
    });
});
    
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function mostrarRelacionados(){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           let productosTodos = resultObj.data;
            let indice = producto.relatedProducts;
          
            let contenedor = document.getElementById("productosRelacionados")
            
            for (let i = 0; i < indice.length; i++) {
            let productoRelacionados = productosTodos[indice[i]]
            let nombre = productoRelacionados.name
            let precio = productoRelacionados.currency + " " + productoRelacionados.cost
            let foto = productoRelacionados.imgSrc

            contenedor.innerHTML += `
            <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
            <h5>${nombre}</h5>
            <h6>${precio}</h6>
                <img class="img-fluid img-thumbnail" src="${foto}" alt="">
            </div>
        </div>
                `
                
            }

        
        }
    });
}

function mostrarComentarios(){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           let opiniones = resultObj.data;
            
            let contenedor = document.getElementById("comentarios")
            
            for (let i = 0; i < opiniones.length; i++) {
           
                let comentario = opiniones[i] 
            let puntaje = mostrarEstrella(comentario.score)
            let descripcion = comentario.description;
            let usuario = comentario.user;
            let fecha = comentario.dateTime;

            contenedor.innerHTML += `
            <div>
            <h6>${usuario}</h6>
            <p>${descripcion}</p>
            <p>${puntaje}</p>
            <p>${fecha}</p>
            </div>
            `
                
            }

        
        }
    });
}

  function mostrarEstrella(puntaje) {
  let estrellaLlena =  '<span class="fa fa-star checked"></span>'
  let estrellaVacia = '<span class="fa fa-star"></span>'

  let puntajeEstrella = ""

  for (let i= 0; i < puntaje; i++) {
     puntajeEstrella += estrellaLlena;
      
  }
  for (let i= 0; i < 5 - puntaje; i++) {
    puntajeEstrella += estrellaVacia;
     
 }
  return puntajeEstrella
  }  


    //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});