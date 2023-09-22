import express from 'express';
let router = express.Router()


router.post('/login', (req, res, next) => {
    res.send('Pinecone Login ' + new Date);
    console.log('Pinecone Login', new Date);
})

router.post('/signup', (req, res, next) => {
    res.send('Pinecone SignUp ' + new Date);
    console.log('Pinecone SignUp ', new Date);
})

export default router