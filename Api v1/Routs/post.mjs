import express from 'express';
import { nanoid } from 'nanoid';
let router = express.Router()



let posts = [{
    id: nanoid(),
    title: "Anas khan",
    text: "khannnnnn"

}]


router.post("/post", (req, res, next) => {
    res.send('Post creat');

    if ( !req.body.title || !req.body.text) {
        res.status(403).send("Required parameter missing")
        return
    }

    posts.unshift({
        id: nanoid(),
        title: req.body.title,
        text: req.body.text
    })


    console.log('This Pinecone Post ', new Date);
    // console.log(posts)
})

router.get("/posts", (req, res, next) => {
    // res.send('This Pinecone Posts ' + new Date);
    res.send(posts);
    console.log('This Pinecone Posts ', new Date);
})



router.get('/post/:postId', (req, res, next) => {
    console.log('This Pinecone Post with ID', new Date);

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

router.put("/post/:userId:postId", (req, res, next) => {
    res.send('This Pinecone Post Update ' + new Date);
    console.log('This Pinecone Post Update ', new Date);
})

router.delete("/post/:postId", (req, res, next) => {
    // res.send('This Pinecone Post Delete ' + new Date);
    
    if (!req.params.postId) {
        res.status(403).send('post ID must be valid ')
    }
    
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === req.params.postId) {
            res.send("Post deleted from => " + req.params.postId);
            posts.splice(i,1)
            return;
        }
    }
    console.log('This Pinecone Post Delete ', new Date);
})

export default router