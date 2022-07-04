const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')

let carrito = []

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



function agregarAlCarrito(e){
  const button = e.target
  const producto = button.closest('.card')
  const productoNombre = producto.querySelector('.card-title').textContent;
  const productoPrecio = producto.querySelector('.precio').textContent;
  const productoImg = producto.querySelector('.card-img-top').src;
  
  const nuevoProducto = {
    nombre: productoNombre,
    precio: productoPrecio,
    img: productoImg,
    cantidad: 1
  }

  productoAlCarrito(nuevoProducto)
}


function productoAlCarrito(nuevoProducto){

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].nombre.trim() === nuevoProducto.nombre.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(nuevoProducto)
  
  pushCarrito()
} 


function pushCarrito(){
  tbody.innerHTML = ''
  carrito.map(producto => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${producto.img}  alt="">
              <h6 class="title">${producto.nombre}</h6>
            </td>
            <td class="table__price"><p>${producto.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${producto.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', quitarProductoCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((producto) => {
    const precio = Number(producto.precio.replace("$", ''))
    Total = Total + precio*producto.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function quitarProductoCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].nombre.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(producto => {
    if(producto.nombre.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      producto.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    pushCarrito()
  }
}