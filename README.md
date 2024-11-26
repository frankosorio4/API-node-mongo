# Alura_back_mongo

Alura_back_mongo is a simple backend API that allows saving specific information provided for the front end in a Mongo database.


## Technologies

- _Back-end:_ **Node.js** (https://nodejs.org/en)
- _Data base:_ **MongoDB** (https://www.mongodb.com/)
- _Server_: **Google cloud**.

## Libraries

- [Express](https://expressjs.com/)
- [Mongo db](https://www.mongodb.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [Gemini-@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
  
## Database element example

  ```bash
    {
      "_id": "Alfa numeric",
      "description": "Image description",
      "imgUrl": "Image URL",
      "alt": "Alternative description of the image."
    }
  ```

## Project Structure

```
alura-back
├── src
│  ├── config
│  │  └── dbConfig.js
│  ├── controllers
│  │  └── postsController.js
│  ├── models
│  │  └── postsModel.js
│  ├── routes
│  │  └── postsRoutes.js
│  └── services
│     └── geminiService.js
├── uploads
├── .env
├── .env_example
├── .gitignore
├── data.txt
├── package-lock.json
├── package.json
├── server.js
└── services.sh
└── README.md

```

## How to execute

## Pré-requisite

- **Node.JS**
- **VSCODE**

## Steps to execute

1. Open the VSCODE.
2. Clone the repository.
3. Adjust the configuration to your environment variables ```.env```.
4. Install the dependencies using
   ```bash
   npm install
   ```
6. To run the server, execute the command
   ```bash
   npm run dev
   ```
8. Access to http://localhost:3000/post to get the data in the database.

## Steps to save and run the API in Google Cloud

1. Sign in to your Google Cloud account (You must have an account at https://cloud.google.com/).
2. Access the terminal and Clone the repository.
3. Access the repository with the Google Cloud editor.
4. Remove the file ```.gitignore```.
5. Adjust the configuration to your environment variables ```.env```.
6. Install the dependencies using
   ```bash
   npm install
   ```
8. Run the commands in the file ```services.sh``` or run in the repository folder the command
   ```bash
   gcloud run deploy --source . --port=PORT
   ```
   where PORT is the number we establish to run the API.

## Melhorias Futuras

- _Integration with the Front-end_ 
