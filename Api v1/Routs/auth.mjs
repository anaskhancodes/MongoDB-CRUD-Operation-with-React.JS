import express from 'express';
let router = express.Router()


router.post('/login', (req, res, next) => {
    res.send('MongoDb Login ' + new Date);
    console.log('MongoDb Login', new Date);
})

router.post('/signup', (req, res, next) => {
    res.send('MongoDb SignUp ' + new Date);
    console.log('MongoDb SignUp ', new Date);
})

export default router