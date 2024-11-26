import { createPostDb, getAllPost, updatePostDb } from "../models/postsModel.js";
import fs from "fs";
import generateDecriptionGemini from "../services/geminiService.js";

export async function listPosts(request, response) {
  const posts = await getAllPost();
  response.status(200).json(posts);
}

export async function createPost(request, response) {
  const novoPost = request.body;
  try {
    const postCriado = await createPostDb(novoPost);
    response.status(201).json(postCriado);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ 'message': 'Error in the request.' });
  }
}

export async function uploadImage(request, response) {
  const novoPost = {
    description: "",
    imgUrl: request.file.originalname,
    alt: ""
  }

  try {
    const postCriado = await createPost(novoPost);
    const imageAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(request.file.path, imageAtualizada);
    response.status(201).json(postCriado);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ 'message': 'Error in the request.' });
  }
}

export async function updatePost(request, response) {
  const id = request.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  
  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
    const description = await generateDecriptionGemini(imageBuffer);

    const post = {
      imgUrl: urlImagem,
      description: description,
      alt: request.body.alt
    };

    const postAtualizado = await updatePostDb(id, post);
    response.status(200).json(postAtualizado);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ 'message': 'Error in the request.' });
  }
};