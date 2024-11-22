import { atualizarPost, criarPost, getTodosPost } from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(request, response) {
  const posts = await getTodosPost();
  response.status(200).json(posts);
}

export async function postarNovoPost(request, response) {
  const novoPost = request.body;
  try {
    const postCriado = await criarPost(novoPost);
    response.status(201).json(postCriado);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ 'message': 'Error in the request.' });
  }
}

export async function uploadImage(request, response) {
  const novoPost = {
    descricao: "",
    imgUrl: request.file.originalname,
    alt: ""
  }

  try {
    const postCriado = await criarPost(novoPost);
    const imageAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(request.file.path, imageAtualizada);
    response.status(201).json(postCriado);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ 'message': 'Error in the request.' });
  }
}

export async function atualizarNovoPost(request, response) {
  const id = request.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  
  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imageBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: request.body.alt
    };

    const postAtualizado = await atualizarPost(id, post);
    response.status(200).json(postAtualizado);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ 'message': 'Error in the request.' });
  }
};