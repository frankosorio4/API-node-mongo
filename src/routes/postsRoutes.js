import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImage } from "../controllers/postsController.js";

//windows configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({dest: "./uploads", storage});

const routes = (app) => {
    app.use(express.json());

    app.get("/posts", listarPosts);

    app.post("/posts", postarNovoPost)

    app.post("/upload", upload.single("image"), uploadImage)
}

export default routes;

// function getPostById(id) {
//     return posts.findIndex((post) => {
//         return post.id === Number(id);
//     });
// }

// app.get("/posts/:id", (request, response) => {
//     const id = request.params.id;
//     const postId = getPostById(id);
//     response.status(200).json(posts[postId]);}
// )