import fetch from "node-fetch";
import readline from "readline-sync";

//const API_URL = "https://6830c7ef6205ab0d6c3a6347.mockapi.io/api/v1/Todos"; // Reemplaza con tu URL de MockAPI
const API_URL = "https://683101fc6205ab0d6c3afd3a.mockapi.io/api/v1/todos"; // Reemplaza con tu URL de MockAPI

async function main() {
    console.log("\n💬 Sistema interactivo con MockAPI");

    while (true) {
        console.log("\nEscribe GET, POST, PUT, DELETE o SALIR para terminar:");
        let action = readline.question("👉 Ingrese accion: ").toUpperCase().trim();

        switch (action) {
            case "GET":
                try {
                    let response = await fetch(API_URL);
                    let data = await response.json();
                    console.log("\n🔹 Datos obtenidos:", data);
                } catch (error) {
                    console.error("\n❌ Error al obtener datos:", error.message);
                }
                break;

            case "POST":
                try {
                    let title = readline.question("📝 Título del todo: ");
                    let status = readline.question("✅ ¿Estado? (Pendiente/En Progreso/Completado): ").trim().toLowerCase();
                    
                    let newTodo = { title, status };
                    
                    let postResponse = await fetch(API_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newTodo)
                    });
                    
                    let postData = await postResponse.json();
                    console.log("\n✅ Todo creado:", postData);
                } catch (error) {
                    console.error("\n❌ Error al crear el todo:", error.message);
                }
                break;

            case "PUT":
                try {
                    let idPut = readline.questionInt("🔄 ID a actualizar: ");
                    let newTitle = readline.question("📝 Nuevo título: ");
                    let newStatus = readline.question("✅  ¿Estado? (Pendiente/En Progreso/Completado): ").trim().toLowerCase();
                    
                    let updatedTodo = { title: newTitle, status: newStatus };
                    
                    let putResponse = await fetch(`${API_URL}/${idPut}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedTodo)
                    });
                    
                    let putData = await putResponse.json();
                    console.log("\n✅ Todo actualizado:", putData);
                } catch (error) {
                    console.error("\n❌ Error al actualizar el todo:", error.message);
                }
                break;

            case "DELETE":
                try {
                    let idDelete = readline.questionInt("🗑 ID a eliminar: ");
                    
                    await fetch(`${API_URL}/${idDelete}`, { method: "DELETE" });
                    
                    console.log("\n✅ Todo eliminado con ID:", idDelete);
                } catch (error) {
                    console.error("\n❌ Error al eliminar el todo:", error.message);
                }
                break;

            case "SALIR":
                console.log("\n👋 Saliendo del programa...");
                return; 

            default:
                console.log("❌ Acción no válida, intenta nuevamente.");
        }
    }
}

main();