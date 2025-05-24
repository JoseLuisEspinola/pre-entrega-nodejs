🛒 Gestor de Productos - FakeStore API

DESCRIPCION
Este proyecto es un gestor de productos interactivo desarrollado en Node.js, que permite realizar operaciones GET, POST y DELETE sobre la API de FakeStore. Se ha trabajado con process.argv para capturar los argumentos directamente desde la terminal, sin necesidad de interfaces gráficas. Además, se ha implementado destructuring de arrays para procesar los datos de forma eficiente.

Características
✅ Consulta de productos (GET) → Obtiene uno o varios productos desde la API.
✅ Creación de productos (POST) → Agrega nuevos productos capturando title, price y category.
✅ Eliminación de productos (DELETE) → Borra un producto según su ID.
✅ Captura de datos con process.argv → Permite ingresar los parámetros desde la terminal.
✅ Uso de destructuring y arrays → Para manejar eficientemente los argumentos ingresados.
✅ Mensajes con colores ANSI → Mejora la legibilidad en la terminal.
✅ Formato de salida optimizado → Muestra solo los datos clave, incluyendo la imagen del producto.


DESCARGAR DE GITHUB
Para ejecutar este proyecto, sigue estos pasos:
git clone https://github.com/JoseLuisEspinola/pre-entrega-nodejs.git


USO
Ejecuta el programa desde la terminal, pasando los argumentos correspondientes:
npm run start GET products         # Obtener todos los productos  
npm run start GET products/5       # Obtener un producto específico  
npm run start POST products "Camiseta Rex" 300 "remeras"   # Crear producto (con comillas o sin comillas)  
npm run start DELETE products/7    # Eliminar producto por ID  


* Los datos ingresan desde la terminal utilizando process.argv, y se procesan con destructuring de arrays.

Mejoras futuras.
* Implementación de interacción en tiempo real con readline.
* Optimización de la presentación de datos en la terminal.
* Añadir actualización (PUT) para modificar productos existentes.


