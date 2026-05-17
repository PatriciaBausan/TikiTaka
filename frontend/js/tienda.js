
let carrito = [];

function agregarAlCarrito(id, nombre, precio, stock) {
  const productoExistente = carrito.find((item) => item.id === id);

  if (productoExistente) {
    if (productoExistente.cantidad < stock) {
      productoExistente.cantidad++;
    } else {
      alert(`No puedes agregar más unidades. El stock máximo es de ${stock}.`);
      return;
    }
  } else {
    carrito.push({
      producto_id: id,
      nombre: nombre,
      precio: parseFloat(precio),
      cantidad: 1
    });
  }

  mostrarCarrito();
}
function mostrarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.innerHTML = "";

  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
    carritoDiv.innerHTML += `
      <p>
        ${producto.nombre} -
        ${producto.cantidad} x ${producto.precio}€
      </p>
    `;
  });
  carritoDiv.innerHTML += `<h3>Total: ${total} €</h3>`;
}

function cargarProducto() {
  const tbody = document.getElementById("producto-tbody");
  tbody.innerHTML = "";
  
  fetch("http://localhost:3000/productos")
    .then((res) => res.json())
    .then((data) => {
      data.products.forEach((producto) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${producto.nombre}</td>
          <td>Precio: ${producto.precio} €</td>
          <td><img src="${producto.imagen}" width="200" onerror="this.src='https://via.placeholder.com/400x250'"></td>
          <td>Categoria: ${producto.categoria_id}</td>
          <td>En stock: ${producto.stock}</td>
          <td>
            <button onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${producto.precio}, ${producto.stock})">
              Añadir al carrito
            </button>
          </td>
        `;
        tbody.appendChild(row);
      });
    });
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
    return;
}
  const email = prompt("Introduce tu email");
  if (!email) {
    alert("El Email es obligatorio");
    return;
  }

  fetch("http://localhost:3000/verificarproducto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_cliente: email,
      carrito: carrito
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al realizar pedido");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      carrito = [];
      mostrarCarrito();
      cargarProducto();
    })
    .catch((error) => {
      console.error(error);
      alert("Error al finalizar la compra");
    });
}

cargarProducto();
