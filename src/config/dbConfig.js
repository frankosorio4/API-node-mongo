import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Conecting to MongoDB...');
        await mongoClient.connect();
        console.log('Conected to MongoDB!');

        return mongoClient;
    } catch (erro) {
        console.error('Error connecting to MongoDB!', erro);
        process.exit();
    }
}