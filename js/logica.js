const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')

let carrito = []
const URL = `js/articulos.json`
const contenidoDOM = document.querySelector("#contenido")

Clickbutton.forEach(btn => {
  btn.addEventListener('click', agregarAlCarrito)
})

const btn_comprar = document.querySelector('.btn_comprar')
btn_comprar.addEventListener('click', () => {
  Swal.fire({
    title: 'Haz realizado tu pedido! te mandaremos los detalles al mail registrado',
    icon: 'success',
    confirmButtonText: 'Compra Exitosa'
})
})

const obtenerContenido = async (URL)=> {
  let cardsAmostrar = ""
      try {
        const response = await fetch(URL)
        const data = await response.json()
              data.forEach(contenido => {
                 cardsAmostrar += retornoCardContenido(contenido)
              })
              contenidoDOM.innerHTML = cardsAmostrar
              eventoAgregarAlCarrito(data)
      } catch (error) {
              contenidoDOM.innerHTML = retornoCardError()
      } finally {

      }
}

const retornoCardContenido = (contenido)=> {
  const {imagen, nombre, precio, id} = contenido

  return `<div class="col d-flex justify-content-center mb-4">
                    <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
                        <h5 class="card-title pt-2 text-center text-primary">${nombre}</h5>
                        <img src="${imagen}" class="card-img-top img_main" alt="...">
                        <div class="card-body">
                            <p class="card-text text-white-50 description">Some quick example text to build on the
                                card title and make up the bulk of the card's content.</p>
                            <h5 class="text-primary">Precio: <span class="precio">${precio}</span></h5>
                            <div class="d-grid gap-2">
                                <button id="boton-articulo-${id}" class="btn btn-primary button">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>`
}
const retornoCardError = ()=> {
  return `<div class="center white-text"> 
              <br><br><br><br> 
              <h4>El contenido parece no estar disponible. Intente nuevamente en unos minutos.</h4> 
          </div>`
}

document.addEventListener("DOMContentLoaded", ()=> {
  setTimeout(() => {
     obtenerContenido(URL)      
  }, 2000);
})

const eventoAgregarAlCarrito = (data) => {
  data.forEach(contenido => {
    
    let idBOTON = `boton-articulo-${contenido.id}`;
    let botonAgregar = document.getElementById(idBOTON);
    botonAgregar.addEventListener('click', () => {
    })
  })
}