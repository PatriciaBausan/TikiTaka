# TikiBocado - E-commerce Restaurante

TikiBocado está desarrollada como una tienda e-commerce de restaurante.  
Permite visualizar productos de comida, añadirlos a un carrito de compra y realizar pedidos simulados.  

Además, cuenta con un panel de administración donde se pueden gestionar productos, visualizar pedidos y consultar estadísticas de ventas.

---

# Tecnologías Utilizadas

## Frontend

- HTML5
- CSS3
- JavaScript Vanilla

## Backend

- Node.js
- Express.js

## Base de Datos

- MySQL

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
|   |-admin.html
|   |-index.html
|   |-db.js
|   |-package-lock.json
|   |-package.json
|
|-frontend
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

# Crear Base de Datos

La base de datos ha sido desarrollada utilizando MySQL Workbench.

Ejecutar el archivo:

```bash
BBDD_TikiBocados.sql
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

# Seguridad y Validaciones

* Verificación de stock
* Control de errores en pedidos
* Consultas seguras a MySQL

---

# Autor

* Patricia Bausan Gómez
