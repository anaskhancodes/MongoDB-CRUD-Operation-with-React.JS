import express from 'express';
import { nanoid } from 'nanoid';
import { client } from '../../mongoDb.mjs';
import { ObjectId } from 'mongodb';

const db = client.db("crudDb");
const col = db.collection("posts");

let router = express.Router();


//-----------------------------------------------------------------------------------------------------
//---------------------------------- POST CREAT -------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


router.post("/post", async (req, res, next) => {
    res.send('');

    if (!req.body.title || !req.body.text) {
        res.status(403).send("Required parameter missing")
        return
    }

    try {
        const insertResponse = await col.insertOne({
            title: req.body.title,
            text: req.body.text,
            from: req.body.decoded.email,
            createdOn: new Date()
        })

        console.log("insertResponse", insertResponse)

    } catch (e) {
        console.log(e);
        res.status(500).send("Server error, please try leter")
    }


})


//-----------------------------------------------------------------------------------------------------
//---------------------------------- GET ALL POST -----------------------------------------------------
//-----------------------------------------------------------------------------------------------------


router.get("/posts", async (req, res, next) => {

    const cursor = col.find({}).sort({_id: -1}).limit(100);

    try {
        let result = await cursor.toArray();
        res.send(result);
        console.log("result", result)
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error, please try leter")
    }
})


//-----------------------------------------------------------------------------------------------------
//------------------------------- FIND ----------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

router.get('/post/:postId', async (req, res, next) => {
    console.log('This MongoDb Post with ID', new Date);

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send('post ID must be valid ')
        return;
    }

    try {
        let result = await col.findOne({ _id: new ObjectId(req.params.postId) });
        res.send(result);
        console.log("result", result)
    } catch (e) {
        console.log(e);
        res.status(500).send("Server error, please try leter")
    }
})

//-----------------------------------------------------------------------------------------------------
//------------------------------ EDIT -----------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

router.put("/post/:postId", async (req, res, next) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send('post ID must be valid ')
        return;
    }
    //-------------//
    if (!req.body.title && !req.body.text) {
        res.status(403).send('Post ID, title, and text must be provided.');
        return;
    }

    let dataUpdated = {};
    if (req.body.title) { dataUpdated.title = req.body.title };
    if (req.body.text) { dataUpdated.text = req.body.text };

    try {
        const UpdateResponse = await col.updateOne(
            {_id: new ObjectId(req.params .postId)},
            { $set: dataUpdated }
        );
        

        console.log("UpdateResponse", UpdateResponse);
        res.send("post Updated");

    } catch (e) {
        console.log("error updating mongodb",e);
        res.status(500).send("Server error, please try leter")
    }


    console.log('This MongoDb Post Update ', new Date);
});

//-----------------------------------------------------------------------------------------------------
//--------------------------- DELETE ------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


router.delete("/post/:postId", async (req, res, next) => {
    if (!ObjectId.isValid(req.params.postId)) {
        res.status(403).send('post ID must be valid ')
        return;
    }

    try {
        const deleteResponse = await col.deleteOne({ _id: new ObjectId(req.params.postId)});

        console.log("deleteResponse", deleteResponse);
        res.send("post Delete");

    } catch (e) {
        console.log("error deleting mongodb",e);
        res.status(500).send("Server error, please try leter")
    }



    console.log('This MongoDb Post Delete ', new Date);
})

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


export default router;