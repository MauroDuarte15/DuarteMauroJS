function carga() {
    const usuarioRegistrado = localStorage.getItem("Usuario") || null;
    if (usuarioRegistrado != null) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })
  
        swalWithBootstrapButtons.fire({
            title: 'Como desea ingresar?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Nuevo usuario',
            cancelButtonText: 'Ingresar como ' + usuarioRegistrado,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {} else if (result.dismiss === Swal.DismissReason.cancel) {
                location.href = "./carrito.html" 
            }
        })
    }
  
  }
  let botonLogin = document.querySelector(".botonLogin")
  botonLogin.classList.add("disabled")
  let usuarioRegistrado = document.getElementById("usuarioLogin");
  let mailUsuario = document.getElementById("emailLogin");
  
  mailUsuario.addEventListener('change', habilitarBoton);
  usuarioRegistrado.addEventListener('change', habilitarBoton)
  
  function habilitarBoton() {
    if ((mailUsuario.value.includes(".com") && usuarioRegistrado.value != "")) {
        botonLogin.classList.remove("disabled")
        botonLogin.addEventListener('click', () => {
  
            localStorage.setItem("Usuario", usuarioRegistrado.value)
            localStorage.setItem("email", mailUsuario.value)
            if (localStorage.getItem("Articulos") != null) {
                localStorage.removeItem("Articulos")
            }
  
            location.href = './carrito.html'
        })
    } else {
        botonLogin.classList.add("disabled")
    }
  }
  
  carga()