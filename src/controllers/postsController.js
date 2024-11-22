import { criarPost, getTodosPost } from "../models/postsModel.js";
import fs from "fs";

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
  const novoPost ={
    descricao:"",
    imgUrl: request.file.originalname,
    alt: ""
  }
  
  try {
    const postCriado = await criarPost(novoPost);
    const imageAtualizada =  `uploads/${postCriado.insertedId}.jpg`;
    fs.renameSync(request.file.path, imageAtualizada);
    response.status(201).json(postCriado);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ 'message': 'Error in the request.' });
  }
}