let cart = [];


document.addEventListener("DOMContentLoaded", function() {
  const loadCart = () => {
    const cartSaved = localStorage.getItem("carrito");
    if (cartSaved) {
      cart = JSON.parse(cartSaved);
      refreshCounterCart();
    }
  };



  const refreshCounterCart = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    const totalItems = cart.reduce((total, product) => total + product.cantidad, 0);
    contadorCarrito.textContent = totalItems.toString();
  };

  loadCart();




  const addToCart = (id, nombre, precio, cantidad = 1) => {
    const existingProductIndex = cart.findIndex((product) => product.id === id);
    const stock = parseInt(document.getElementById(id).querySelector(".stock").textContent);
    if (existingProductIndex !== -1) {
      if (cart[existingProductIndex].cantidad + cantidad <= stock) {
        cart[existingProductIndex].cantidad += cantidad;

        location.reload()
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No puedes añadir más porque no hay suficiente stock",
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          location.reload();
        })

      }
    } else {
      const product = { id, nombre, precio, cantidad, stock };
      cart.push(product);

      location.reload()
    }



    refreshCart();
    saveCart();

  };



  const refreshCart = () => {
    const cartList = document.getElementById("contador-carrito");
    cartList.textContent = cart.length.toString();
  };

  function saveCart() {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }

  const botonesAgregar = document.querySelectorAll(".CartBtn");
  botonesAgregar.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const productId = card.id;
      const nombre = card.querySelector(".heading").textContent;
      const precio = parseFloat(
        card.querySelector(".price").textContent.slice(2)
      );
      addToCart(productId, nombre, precio);
      refreshCart();
    });
  });


});

