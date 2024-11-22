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