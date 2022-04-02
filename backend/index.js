import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

import recipeDAO from "./dao/recipeDAO.js"

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.RECIPES_DB_URI,{
        wtimeoutMS:2500,

    }
).catch(err =>{

    console.error(err.stack)
    process.exit(1)
})
.then(async client=>{
    await recipeDAO.injectDB(client)
    app.listen(port,()=>{
        console.log(`Listening on port ${port}`)
    })
})