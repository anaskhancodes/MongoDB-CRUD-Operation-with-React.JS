// console.log("MongoDb express server>>>>>>>> ")

import express from 'express';
import cors from 'cors';
import path from 'path';
import apiv1Routs from './Api v1/main.mjs'
import mongodb from 'mongodb'

const __dirname = path.resolve();



 

const app = express();
app.use(express.json());
// app.use(cors())

app.use('/api/v1', apiv1Routs)

app.use((req, res, next) => {
  let token = "valid"
  if (token === "valid") {
    next()
  } else {
    res.send({ message: "invalid token" })
  }
})





app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`MongoDB listening on PORT ${PORT}`);
})