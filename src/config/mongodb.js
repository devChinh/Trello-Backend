import { MongoClient } from "mongodb";
import {env} from './environtment.js'

let dbInstance = null ;

export const connectDB = async () => {
  // TẠo 1 mongodb server
  const client = new MongoClient(env.MONGODB_URI
    , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // connect the client to the server
    await client.connect();
    
    dbInstance = client.db(env.DATABASE_NAME)

};

// get database instance

export const getDB = () => {
    if(!dbInstance) throw new Error('Must connect to Database first')
    return dbInstance;
}

// const listDatabases = async (client) => {
//   const databasesList = await client.db().admin().listDatabases();
//   console.log(databasesList);
//   console.log("Your databases :");
//   databasesList.databases.forEach((db) => {
//     console.log(`--${db.name}`);
//   });
// };
