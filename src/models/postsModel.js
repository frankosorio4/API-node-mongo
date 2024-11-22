import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPost() {
    const db = conexao.db("imersao_alura");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao_alura");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost); 
}

export async function atualizarPost(id, updatedPost) {
    const db = conexao.db("imersao_alura");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({ _id: objId }, { $set: updatedPost }); 
}