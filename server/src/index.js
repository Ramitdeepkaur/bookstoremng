
import dotenv from 'dotenv'
dotenv.config({path:'./env'})
import connectDB from './db/index.js';
import app from './app.js'
const PORT=process.env.PORT||5555
connectDB().then(()=>{
app .on('error',(err)=>{
    console.log('ERRRRRR:',err)
    throw err
})
   app.on('listening',()=>{
    console.log('server alr listening')
   })
    app.listen(5555,()=>{
        console.log('Listening on port ',5555);
    })
}).catch((err)=>{
    console.log("MONGODB CONNECTION ERROR",err)
})





