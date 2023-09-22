import express from 'express';
let router = express.Router()


router.get("/comment/:postId/:commentId", (req, res, next) => {
    res.send('Pinecone poat comment ' + new Date)
    console.log('Pinecone poat comment ', new Date)
})

router.get("/comments/:postId", (req, res, next) => {
    res.send('Pinecone poat comments ' + new Date)
    console.log('Pinecone poat comments ', new Date)
})

router.put("/comment/:postId/:commentId", (req, res, next) => {
    res.send('Pinecone poat comment Update ' + new Date)
    console.log('Pinecone poat comment Update ', new Date)
})

router.delete("/comment/:postId/:commentId", (req, res, next) => {
    res.send('Pinecone poat comment Delete ' + new Date)
    console.log('Pinecone poat comment Delete ', new Date)
})

export default router