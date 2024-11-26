import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getAllPost() {
    const db = conexao.db("imersao_alura");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function createPostDb(post) {
    const db = conexao.db("imersao_alura");
    const colecao = db.collection("posts");
    return colecao.insertOne(post); 
}

export async function updatePostDb(id, updatedPost) {
    const db = conexao.db("imersao_alura");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({ _id: objId }, { $set: updatedPost }); 
}