import mongoose from 'mongoose'

const database=process.env.URL

const databaseConnect= mongoose.connect('mongodb+srv://asooraj47:thfLSwOHwq230prw@cluster0.pyxfig8.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("atlas is connected")
  }
  )
  .catch((error)=>{
    console.log("the mongodb error")
  })

  export default databaseConnect
