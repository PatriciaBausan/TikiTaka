CREATE DATABASE ecommerceTikiTaka;
USE ecommerceTikiTaka;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(500),
    stock INT NOT NULL,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email_cliente VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE detalles_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

INSERT INTO categorias (nombre) VALUES
('Entrantes'),
('Platos Principales'),
('Postres'),
('Bebidas');

INSERT INTO productos (nombre, precio, imagen, stock, categoria_id) VALUES
('Ensalada', 7.50, 'ensalada.png', 15, 1),
('Patatas Fritas', 4.50, 'patatasFritas.png', 30, 1),
('Canelones', 11.00, 'canelones.png', 12, 2),
('Jamón Serrano', 13.50, 'jamonSerrano.png', 10, 1),
('Tortilla de Patatas', 8.00, 'tortillaPatatas.png', 14, 2),
('Torreznos', 5.50, 'Torreznos.png', 20, 1),
('Hamburguesa', 10.00, 'hamburguesa.png', 18, 2),
('Agua', 1.50, 'botellaagua.png', 50, 4),
('Coca Cola', 2.00, 'Cocacola.png', 50, 4),
('Fanta de Naranja', 2.00, 'Fanta.png', 45, 4),
('Tiramisú', 5.00, 'tiramisú.png', 10, 3),
('Brownie', 4.00, 'brownie.png', 12, 3),
('Helado', 3.50, 'Helado.png', 15, 3);

UPDATE productos SET imagen = '/imagenes/ensalada.png' WHERE id = 1;
UPDATE productos SET imagen = '/imagenes/patatasFritas.png' WHERE id = 2;
UPDATE productos SET imagen = '/imagenes/canelones.png' WHERE id = 3;
UPDATE productos SET imagen = '/imagenes/jamonSerrano.png' WHERE id = 4;
UPDATE productos SET imagen = '/imagenes/tortillaPatatas.png' WHERE id = 5;
UPDATE productos SET imagen = '/imagenes/Torreznos.png' WHERE id = 6;
UPDATE productos SET imagen = '/imagenes/hamburguesa.png' WHERE id = 7;
UPDATE productos SET imagen = '/imagenes/botellaagua.png' WHERE id = 8;
UPDATE productos SET imagen = '/imagenes/Cocacola.png' WHERE id = 9;
UPDATE productos SET imagen = '/imagenes/Fanta.png' WHERE id = 10;
UPDATE productos SET imagen = '/imagenes/tiramisú.png' WHERE id = 11;
UPDATE productos SET imagen = '/imagenes/brownie.png' WHERE id = 12;
UPDATE productos SET imagen = '/imagenes/Helado.png' WHERE id = 13;

SELECT 
    productos.id,
    productos.nombre,
    SUM(detalles_pedido.cantidad * detalles_pedido.precio) AS total
FROM detalles_pedido
JOIN productos ON productos.id = detalles_pedido.producto_id
GROUP BY productos.id, productos.nombre
ORDER BY total DESC
LIMIT 3;
