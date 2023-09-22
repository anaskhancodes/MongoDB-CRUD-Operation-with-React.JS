import express from 'express';
let router = express.Router()


router.get("/feed/userId", (req, res, next) => {
    res.send('Pinecone Feed ' + new Date)
    console.log('Pinecone Feed ', new Date)
})

export default router