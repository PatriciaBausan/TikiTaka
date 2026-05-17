const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;
const path = require('path');

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/imagenes', express.static(path.join(__dirname, '../imagenes')));
// app.use('/imagenes', express.static('C:/xampp/htdocs/TikiTaka/imagenes'));
// app.use(express.static('C:/xampp/htdocs/TikiTaka'));


// Obtiene los productos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            res.status(500).json({ error: 'Error al obtener productos' });
        } else {
            res.json({ products: results });
        }
    });
});
// Obtiene los productos por el ID
app.get('/productos/:id', (req, res) => {
    const productoId = req.params.id;
    db.query('SELECT * FROM productos WHERE id = ?', [productoId], (err, results) => {
        if (err) {
            console.error('Error al obtener el producto:', err);
            res.status(500).json({ error: 'Error al obtener el producto   ' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Producto no encontrado' });
            } else {
                res.json({ product: results[0] });
            }
        }
    });
});
// Crea nuevos productos
app.post('/productos', (req, res) => {
    const newProducto = req.body;
    db.query('INSERT INTO productos (nombre, precio, imagen, stock,categoria_id) VALUES (?, ?, ?, ?, ?)', [newProducto.nombre, newProducto.precio, newProducto.imagen, newProducto.stock, newProducto.categoria_id], (err, results) => {
        if (err) {
            console.error('Error al crear el producto:', err);
            res.status(500).json({ error: 'Error al crear el producto' });
        } else {
            res.json({ message: 'Producto creado con Éxito', product: newProducto });
        }
    });
});
// Crea nuevos usuarios
app.post('/usuarios', (req, res) => {
    const newUsuario = req.body;
    db.query('INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)', [newUsuario.nombre, newUsuario.email, newUsuario.contraseña, newUsuario.rol], (err, results) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).json({ error: 'Error al crear el usuario' });
        } else {
            res.json({ message: 'El Usuario ha sido creado con Éxito', usuarios: newUsuario });
        }
    });
});

// Modifica el producto por el id
app.put('/productos/:id', (req, res) => {
    const productoId = req.params.id;
    const updatedProducto = req.body;
    db.query('UPDATE productos SET nombre = ?, precio = ?, imagen = ?, stock = ?, categoria_id = ? WHERE id = ?', [updatedProducto.nombre, updatedProducto.precio, updatedProducto.imagen, updatedProducto.stock, updatedProducto.categoria_id, productoId], (err, results) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        } else {
            res.json({ message: 'Producto actualizado con Éxito', product: updatedProducto });
        }
    });
});

// Elimina el producto por el ID
app.delete('/productos/:id', (req, res) => {
    const productoId = req.params.id;
    db.query('DELETE FROM productos WHERE id = ?', [productoId], (err, results) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        } else {
            res.json({ message: 'Producto eliminado con Éxito' });
        }
    });
});

// Crea los productos
app.post('/verificarproducto',  async (req, res) => {
    const { email_cliente, carrito } = req.body;
    if (!email_cliente || !carrito || carrito.length === 0) {
        return res.status(400).json({
            error: 'Datos inválidos'
        });
    }
    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });

    db.query('INSERT INTO pedidos (email_cliente, total) VALUES (?, ?)', [email_cliente, total], (err, result) => {
        if (err) {
            console.error('Error al crear el pedido:', err);
            return res.status(500).json({
                error: 'Error al crear el pedido'
            });
        }

        const pedidoId = result.insertId;
        carrito.forEach(item => {
            if (item.cantidad <= 0) {
                return res.status(400).json({
                    error: 'Cantidad inválida'
                });
            }
            db.query('SELECT stock FROM productos WHERE id = ?', [item.producto_id], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        error: 'Error al comprobar stock'
                    });
                }
                if (results.length === 0) {
                    return res.status(404).json({
                        error: 'Producto no encontrado'
                    });
                }

                const stockActual = results[0].stock;
                if (item.cantidad > stockActual) {
                    return res.status(400).json({
                        error: `Stock insuficiente para el producto ${item.producto_id}`
                    });
                }
                db.query(`INSERT INTO detalles_pedido(pedido_id, producto_id, cantidad, precio)VALUES (?, ?, ?, ?)`, [pedidoId, item.producto_id, item.cantidad, item.precio]);
                db.query(`UPDATE productos SET stock = stock - ? WHERE id = ?`, [item.cantidad, item.producto_id]);
            }
            );
        });
        res.json({
            message: 'Pedido realizado con éxito'
        });
    }
    );
});

// Obtiene pedidos

app.get('/pedidos', (req, res) => {
    db.query('SELECT * FROM pedidos ORDER BY fecha_creacion DESC', (err, results) => {
        if (err) {
            console.error('Error al obtener pedidos:', err);
            res.status(500).json({
                error: 'Error al obtener pedidos'
            });
        } else {
            res.json({
                pedidos: results
            });
        }
    }
    );
});
// Obtiene los 3 productos más rentables

app.get('/top-productos', (req, res) => {
    const sql = `

        SELECT 
            productos.id,
            productos.nombre,
            SUM(detalles_pedido.cantidad * detalles_pedido.precio) AS total

        FROM detalles_pedido

        JOIN productos 
        ON productos.id = detalles_pedido.producto_id

        GROUP BY productos.id, productos.nombre

        ORDER BY total DESC

        LIMIT 3

    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al obtener top productos:', err);
            res.status(500).json({
                error: 'Error al obtener top productos'
            });
        } else {
            res.json({
                topProductos: results
            });
        }
    });
});

// Inicia el servidor del puerto creado 3000.
app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port} `);
});