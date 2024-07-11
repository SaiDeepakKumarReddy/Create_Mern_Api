const express=require('express');
const mongoose=require('mongoose');
const app=express();
const BrandName =require('./model');
const mongoUrl="mongodb://localhost:27017/api";

app.use(express.json())

app.get('/',(req,res)=>{
    res.send(`<h1>Welcome home</h1>`)
}) 

app.post('/addbrands',async (req,res)=>{
    const {brandname}=req.body;
    try{
        const newData=new BrandName({brandname});
        await newData.save();
        return res.json(await BrandName.find())
    }
    catch (err){
       console.log(err.message);
    }

})

app.get('/getallbrands',async (req,res)=>{
  try{
     const allData=await BrandName.find();
     return res.json(allData);
  }
  catch(err){
    console.log(err.message);
  }
})


app.get('/getallbrands/:id',async (req,res)=>{
    try{
       const Data=await BrandName.findById(req.params.id);
       return res.json(allData);
    }
    catch(err){
      console.log(err.message);
    }
  })

  app.delete('/deletebrand/:id',async (req,res)=>{
    try{
       await BrandName.findByIdAndDelete(req.params.id);
       return res.json(await BrandName.find())
    }
    catch(err){
      console.log(err.message);
    }
  })

  app.put('/updatebrand/:id',async (req,res)=>{
    try{
       await BrandName.findByIdAndUpdate(req.params.id, req.body);
       return res.json(await BrandName.find())
    }
    catch(err){
      console.log(err.message);
    }
  })

app.listen(3000, ()=>{
    console.log('Server Running......')
})

mongoose.connect(mongoUrl)
.then(()=>{
    console.log("DB Connected")
})
.catch(err => console.log(err))