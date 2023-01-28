const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/User');

const app = express();

app.use(cors());
app.use('/user',userRouter);

// mongoose.connect('mongodb://localhost:27017/amazon',{useNewUrlParser:true,useUnifiedTopology:true},(err,db)=>{
//     if(err){
//         console.log("Error connecting the db");
//         return;
//     }
//     console.log("database connected");
// });

const port = process.env.PORT || 8000 ;

app.listen(8000,()=>{

    console.log(
        "Application started at the server side"
    );
})