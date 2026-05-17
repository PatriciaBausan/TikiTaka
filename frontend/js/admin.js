function cargarProducto() {
    const tbody = document.getElementById("producto-tbody");

    if (tbody) {
        tbody.innerHTML = "";
    }

    fetch("http://localhost:3000/productos")
        .then((res) => {
            if (!res.ok) {
                throw new Error("Producto no encontrado");
            }
            return res.json();
        })

        .then((data) => {
            const productos = data.products;
            productos.forEach((producto) => {
                const row = document.createElement("tr");
                row.innerHTML = `
          <td>${producto.nombre.toUpperCase()}</td>
          <td>${producto.precio} €</td>
          <td><img src="${producto.imagen}" width="200" onerror="this.src='https://via.placeholder.com/200'"></td>
          <td>${producto.categoria_id}</td>
          <td>${producto.stock}</td>
        <td class="acciones">

     <button class="btn-editar"
     onclick="editarProducto(${producto.id})">
        Editar
     </button>

    <button class="btn-eliminar"
     onclick="eliminarProducto(${producto.id})">
        Eliminar
     </button>

    </td>
        `;
                tbody.appendChild(row);
            });
        })
        .catch((error) => console.error(error));
}
document
    .getElementById("guardar-btn")
    .addEventListener("click", guardarProducto);

function guardarProducto() {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const imagen = document.getElementById("imagen").value;
    const categoria_id = parseInt(document.getElementById("categoria_id").value);
    const stock = parseInt(document.getElementById("stock").value) || 0;

    fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre,
            precio,
            imagen,
            categoria_id,
            stock,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al guardar el producto");
            }
            return response.json();
        })

        .then(() => {
            alert("Producto guardado con éxito");
            cargarProducto();
            limpiarFormulario();
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error: " + error.message);
        });
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("imagen").value = "";
    document.getElementById("categoria_id").value = "";
    document.getElementById("stock").value = "";
}

function eliminarProducto(id) {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
        fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) throw new Error("Error al eliminar");
                return response.json();
            })
            .then(() => {
                alert("Producto eliminado con éxito");
                cargarProducto();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error al eliminar el producto");
            });
    }
}


function editarProducto(id) {

    fetch(`http://localhost:3000/productos/${id}`)
        .then((response) => response.json())
        .then((data) => {
            const producto = data.product;

            document.getElementById("nombre").value = producto.nombre;
            document.getElementById("precio").value = producto.precio;
            document.getElementById("imagen").value = producto.imagen;
            document.getElementById("categoria_id").value = producto.categoria_id;
            document.getElementById("stock").value = producto.stock;


            const guardarBtn = document.getElementById("guardar-btn");
            guardarBtn.textContent = "Actualizar Producto";

            // Esto Guarda el ID del producto del cual estamos editando
            window.productoEditandoId = id;

            // ESTO Sirve para poder cambiar temporalmente la función del botón
            guardarBtn.onclick = () => {
                const nombre = document.getElementById("nombre").value;
                const precio = parseFloat(document.getElementById("precio").value);
                const imagen = document.getElementById("imagen").value;
                const categoria_id = document.getElementById("categoria_id").value;
                const stock = parseInt(document.getElementById("stock").value) || 0;

                fetch(`http://localhost:3000/productos/${window.productoEditandoId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre,
                        precio,
                        imagen,
                        categoria_id,
                        stock,
                    }),
                })
                    .then((response) => {
                        if (!response.ok) throw new Error("Error al actualizar");
                        return response.json();
                    })
                    .then(() => {
                        alert("Producto actualizado con éxito");
                        cargarProducto();
                        limpiarFormulario();
                        // Sirve para restaurar el botón original
                        guardarBtn.textContent = "Guardar Producto";
                        guardarBtn.onclick = guardarProducto;
                        window.productoEditandoId = null;
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        alert("Error al actualizar el producto");
                    });
            };
        })
        .catch((error) => {
            console.error("Error al cargar producto:", error);
            alert("Error al cargar el producto para editar");
        });
}
function cargarPedidos() {

    fetch("http://localhost:3000/pedidos")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("pedidos-tbody");
            tbody.innerHTML = "";
            data.pedidos.forEach((pedido) => {
                const row = document.createElement("tr");

                row.innerHTML = `
          <td>${pedido.id}</td>
          <td>${pedido.email_cliente}</td>
          <td>${pedido.total} €</td>
          <td>${pedido.fecha_creacion}</td>
        `;
                tbody.appendChild(row);
            });
        })
        .catch((error) => console.error(error));
}
function cargarTopProductos() {

    fetch("http://localhost:3000/top-productos")
        .then((response) => response.json())
        .then((data) => {
            const lista = document.getElementById("top-productos");
            lista.innerHTML = "";
            data.topProductos.forEach((producto) => {
                lista.innerHTML += `
          <li>
            ${producto.nombre} - ${producto.total} €
          </li>
        `;
            });
        })
        .catch((error) => console.error(error));
}
cargarProducto();
cargarPedidos();
cargarTopProductos();