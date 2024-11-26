import express from "express";
import multer from "multer";
import { createPost, listPosts, updatePost, uploadImage } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
};

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
    
    //configuring cors
    app.use(cors(corsOptions));

    app.get("/posts", listPosts);

    app.post("/posts", createPost)

    app.post("/upload", upload.single("image"), uploadImage)

    app.put("/upload/:id", updatePost)
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