import mongoose from 'mongoose';

type ConnnectionObject = {
    isConnected? : number
}

const connection : ConnnectionObject = {}

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("allready connected to database");
        return
    }
    try {
       const db = await mongoose.connect(process.env.MONGODB_URI || '' , {})

       connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log("database connection failed", error);
        process.exit(1)
    }
}

export default dbConnect;