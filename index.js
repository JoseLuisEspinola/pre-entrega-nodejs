import fetch from "node-fetch";

const API_URL = "https://fakestoreapi.com/products";

// 📌 **Mostrar mensaje de bienvenida**
console.log("\n\x1b[36m========================================");
console.log(" 🛒 GESTOR DE PRODUCTOS - FakeStore API");
console.log("========================================\x1b[0m\n");


// Capturar argumentos desde la terminal
const [, , methodRaw, resourceRaw, ...params] = process.argv;
const [resource, param] = resourceRaw?.split("/") || [];
const method = methodRaw?.toUpperCase();

async function main() {
    try {
        switch (method) {
            case "GET":
                let url = API_URL;

                if (param) {
                    if (isNaN(param) || parseInt(param) < 1) {
                        console.log("\x1b[31m❌ ID inválido. \x1b[33mDebes ingresar un número POSITIVO, o dejarlo VACIO para obtener TODOS los productos.\x1b[0m\n");
                        process.exit(1);
                    }
                    url += `/${param}`;
                }

                const response = await fetch(url);
                const dataGet = await response.json();
                //console.log("\n🔹 Datos obtenidos:\n", dataGet);
                
                //Si es una lista, mostrar cada producto formateado
                if (Array.isArray(dataGet)) {
                    console.log("\x1b[36m🔹 Lista de productos:\x1b[0m");
                    dataGet.forEach(product => {
                        console.log(`\x1b[92m✅ ID:\x1b[0m ${product.id}`);
                        console.log(`\x1b[34m📌 Título:\x1b[0m ${product.title}`);
                        console.log(`\x1b[33m💰 Precio:\x1b[0m $${product.price}`);
                        console.log(`\x1b[35m🏷️  Categoría:\x1b[0m ${product.category}`);
                        console.log("\x1b[36m--------------------------------\x1b[0m\n");
                    });
                } else {
                    //Si es un solo producto, mostrarlo formateado
                    console.log("\x1b[36m🔹 Producto encontrado:\x1b[0m");
                    console.log(`\x1b[92m✅ ID:\x1b[0m ${dataGet.id}`);
                    console.log(`\x1b[34m📌 Título:\x1b[0m ${dataGet.title}`);
                    console.log(`\x1b[33m💰 Precio:\x1b[0m $${dataGet.price}`);
                    console.log(`\x1b[34m💥 Descrpcion:\x1b[0m $${dataGet.description}`);
                    console.log(`\x1b[35m🏷️  Categoría:\x1b[0m ${dataGet.category}`);
                    console.log(`\x1b[97m🖼️  Imagen:\x1b[0m $${dataGet.image}\n`);
                }
                break;

            case "POST":
                const processedParams = params.map(p => p.trim());

                if (processedParams.length < 3 || isNaN(processedParams.at(-2))) {
                    console.log("\x1b[31mError: Debes ingresar título, precio (número) y categoría.\x1b[0m");
                    console.log('\x1b[33mEjemplo CON comillas: npm run start POST products "Camiseta Rex" 300 "remeras"\x1b[0m');
                    console.log('\x1b[32mEjemplo SIN comillas: npm run start POST products Camiseta Rex 300 remeras\x1b[0m\n');
                    process.exit(1);
                }

                let title = processedParams.slice(0, -2).join(" ");
                let price = parseFloat(processedParams.at(-2));
                let category = processedParams.at(-1);

                if (title.startsWith('"') && title.endsWith('"')) {
                    title = title.slice(1, -1);
                }
                if (category.startsWith('"') && category.endsWith('"')) {
                    category = category.slice(1, -1);
                }

                const newProduct = { title, price, category };

                const postResponse = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newProduct)
                });

                const postData = await postResponse.json();
                console.log("\n✅ Producto creado:\n", postData);
                break;

            case "DELETE":
                if (!param || isNaN(param) || parseInt(param) < 1) {
                    console.log("\n\x1b[31m❌ Debes ingresar un ID válido para eliminar un producto.\x1b[0m");  
                    console.log('\x1b[32mEjemplo: npm run start DELETE products/7\x1b[0m\n');
                    process.exit(1);
                }

                const deleteResponse = await fetch(`${API_URL}/${param}`, { method: "DELETE" });
                const dataDelete = await deleteResponse.json();

                // console.log("\n✅ Producto eliminado con ID:", param);
                // console.log("\n🔹 Respuesta de la API:\n", dataDelete);
                console.log("\x1b[32m✅ Producto eliminado con ID:", param, "\x1b[0m");
                console.log("\x1b[34m🔹 Respuesta de la API:\x1b[0m\n", dataDelete);
                break;

            default:
                console.log("\x1b[31m❌ Comando NO VÁLIDO!!!. \x1b[94mIntenta con:\x1b[0m");
                console.log("\x1b[32m npm run start GET products\x1b[0m");
                console.log("\x1b[32m npm run start GET products/5\x1b[0m");
                console.log("\x1b[32m npm run start POST products \"Camiseta Rex\" 300 \"remeras\" \x1b[33m-> Ejemplo CON comillas\x1b[0m");
                console.log("\x1b[32m npm run start POST products Camiseta Rex 300 remeras \x1b[33m-> Ejemplo SIN comillas\x1b[0m");
                console.log("\x1b[32m npm run start DELETE products/7\n\x1b[0m");
                process.exit(1);
        }
    } catch (error) {
        console.error("\x1b[31m❌Error:\x1b[0m", error.message, "\n");
    }
}

// Ejecutar el programa solo una vez
main();