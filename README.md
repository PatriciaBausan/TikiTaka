# TikiBocado - E-commerce Restaurante

TikiBocado está desarrollada como una tienda e-commerce de restaurante. Permite visualizar productos de comida, añadirlos a un carrito de compra y realizar pedidos simulados.  

Además, cuenta con un panel de administración donde se pueden gestionar productos, visualizar pedidos y consultar estadísticas de ventas.

---

# Tecnologías Utilizadas

## Frontend

- HTML
- CSS
- JavaScript

  ### ¿Por qué estas tecnologías?
- He elegido estas tecnologías porque son las que conozco actualmente. Estoy dispuesta a aprender otras de cara al futuro.

## Backend

- Node.js
- Express.js

## Base de Datos

- MySQL
--
## Estructura de la base de datos 
El archivo `sql/BBDD_TikiBocados.sql` crea las siguientes tablas:

```sql
-- Tabla de categorias (Se organizan por tipo (Entrantes,Platos Principales,Postres,Bebidas))
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla de productos (Se guardan los productos por categorias)
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen VARCHAR(500),
    stock INT NOT NULL,
    categoria_id INT, 
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Tabla de pedidos (Se muestra quien ha hecho el pedido y además guarda automáticamente cuándo se hizo el pedido)
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email_cliente VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de detalles de pedido (Registra cada producto individual dentro de un pedido. Además se pone un precio fijo, es decir que si un cliente compra un producto por un precio se queda con esa cantidad, no afecta por si el precio del producto sube)
CREATE TABLE detalles_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);
````
---

# Funcionalidades

## Tienda

- Visualización de productos
- Carrito de compra
- Finalización de pedido
- Actualización automática del stock

## Panel de Administración

- Crear productos
- Editar productos
- Eliminar productos
- Visualización de pedidos
- Top 3 productos más rentables

---

# Estructura del Proyecto

```bash
TIKITAKA
|
|-backend
|   |-db.js
|   |-script.js
|   |-package-lock.json
|   |-package.json
|
|-frontend
|   |-admin.html
|   |-index.html
|   |-css
|   |   |-admin.css
|   |   |-style.css
|   |
|   |-js
|       |-admin.js
|       |-script.js
|
|-imagenes
|
|-sql
|   |-BBDD_TikiBocados.sql
````

---

# Instalación paso a paso local
## 1. Descargar el repositorio
```bash
git clone https://github.com/tu-usuario/tikibocado.git
```
## 2. Configurar la base de datos
Abre MySQL Workbench.

Ejecuta el archivo sql/BBDD_TikiBocados.sql para crear la base de datos y las tablas.

---
# Instalación del Proyecto

## 1. Inicializar proyecto Node.js

```bash
npm init -y
```

---

## 2. Instalar dependencias

### Instalar Express

```bash
npm install express
```

### Instalar MySQL

```bash
npm install mysql2
```

---

# Ejecutar Servidor

```bash
node script.js
```

---

# Servidor Disponible

```bash
http://localhost:3000
```

---

# Probar el proyecto
## Tienda 
* Ver productos desde index.html
* Añadir productos al carrito
* Finalizar pedido 

## Interfaz de Administración
* Accede a admin.html
* Crear producto --> Escribe el nombre, precio, stock, la URL de la imagen, categoria (1. Entrante
                                                                                       2. Plato principal
                                                                                       3. Postre
                                                                                       4. Bebida)
* Editar producto --> Vas a la tabla en la parte de acciones y haces clic en el boton editar
* Eliminar producto --> Vas a la tabla en la parte de acciones y haces clic en el boton eliminar
* Apartado de pedidos: tabla ID, email, total del precio que se han gastado y la fecha
* Top 3 productos más rentables --> Se muestra de manera automática cuando los clientes van haciendo pedidos

# Seguridad y Validaciones

* Verificación de stock
* Control de errores en pedidos
* Consultas seguras a MySQL

---

# Autor

* Patricia Bausan Gómez
