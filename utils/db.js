const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const connection= {};

const dbConnect = async() =>{
    if(connection.isConnected){
        return;
    }

    const db = await mongoose.connect("mongodb://127.0.0.1:27017/userDB",{
        useNewUrlParser: true,
        useUnifiedTopology: true, 
    });

    connection.isConnected = db.connection.readyState; 
    console.log("connection.isConnected");
}

export default dbConnect