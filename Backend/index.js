import app from "./app.js"
import "./database.js"

async function main() {
    const port = 4000; 
    app.listen(port);
    console.log("the server is running")
}

main();