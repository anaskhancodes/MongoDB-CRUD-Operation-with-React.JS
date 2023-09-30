import express from 'express';
import { nanoid } from 'nanoid';
import { client } from '../../mongoDb.mjs';

const db = client.db("crudDb");
const col = db.collection("posts");

let router = express.Router();



let posts = [{
    id: nanoid(),
    title: "Anas",
    text: "khan"
}]


router.post("/post", async (req, res, next) => {
    res.send('Post creat');

    if (!req.body.title || !req.body.text) {
        res.status(403).send("Required parameter missing")
        return
    }
    const insertResponse = await col.insertOne({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text
    })


console.log("insertResponse", insertResponse )
    // console.log('This MongoDb Post ', new Date);
    // console.log(posts)
})

router.get("/posts", async(req, res, next) => {
    
    const cursor = col.find({});
    let result = await cursor.toArray();
    
    res.send(result);
    console.log("result" , result)
})



router.get('/post/:postId', (req, res, next) => {
    console.log('This MongoDb Post with ID', new Date);

    if (req.params.postId) {
        res.status(403).send('post ID must be valid ')
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.send(posts[i]);
            return;
        }
    }

    res.send("Post not found => " + req.params.postId);
})


router.put("/post/:postId", (req, res, next) => {
    // res.send('This MongoDb Post Update ' + new Date);

    const postId = req.params.postId; // Get the postId from the URL parameters
    const updatedTitle = req.body.title; // Get the updated title from the request body
    const updatedText = req.body.text;   // Get the updated text from the request body

    if (!postId || !updatedTitle || !updatedText) {
        res.status(403).send('Post ID, title, and text must be provided.');
        return;
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === postId) {
            posts[i].text = updatedText;
            posts[i].title = updatedTitle;
            res.send('Post is Updated ' + postId);
            return;
        }
    }

    console.log('This MongoDb Post Update ', new Date);
});


router.delete("/post/:postId", (req, res, next) => {
    // res.send('This MongoDb Post Delete ' + new Date);

    if (!req.params.postId) {
        res.status(403).send('post ID must be valid ')
    }

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.send("Post deleted from => " + req.params.postId);
            posts.splice(i, 1)
            return;
        }
    }
    console.log('This MongoDb Post Delete ', new Date);
})

export default router