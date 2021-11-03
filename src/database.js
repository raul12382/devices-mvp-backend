import MongoClient from 'mongodb'
import dotenv from 'dotenv'

dotenv.config({path:'variables.env'})

export async function connect() {
    try {
        const client = await MongoClient.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('mvp');
        return db;
    } catch(e) {
        console.log(e);
    }
};