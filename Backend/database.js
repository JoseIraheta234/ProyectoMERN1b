import mongoose from "mongoose";

const URI = "mongodb://localhost:27017/cocacolaDB"

mongoose.connect(URI)


const connection = mongoose.connection;

connection.once("open", () =>{
    console.log("DB is conected");
});

connection.on("disconected", () => {
    console.log("DB is disconected");
});

connection.on("error", (error) => {
    console.log("error found" + error);
});