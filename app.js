var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var app=express();
const port=process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://Harsh:Harsh123@cluster0.wjclwqi.mongodb.net/Todolist",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"Welcome",
});
const item2=new Item({
    name:"Write Your TODOs",
});
const d=[item1,item2];

app.get("/",function(req,res)
{
   Item.find({},function(err,f)
   {
      if(f.length===0)
      {
        Item.insertMany(d,function(err)
        {
            if(err){
                console.log(err);
            }
            else{
                console.log("Successfully saved items to DB");
            }
        });
      res.redirect("/");
      }
      else{
      res.render("list",{newListItems:f});
      }
   })
  ;
})
app.post("/",function(req,res)
{
     const itemName=req.body.n;
   const item=new Item({
       name:itemName
   });
item.save();
res.redirect("/");
});
app.post("/delete",function(req,res)
{
  const check=req.body.checkbox;
  Item.findByIdAndRemove(check,function(err)
  {
      if(!err)
      {
          console.log("Successfully deleted");
          res.redirect("/");
      }
  })
});

app.listen(port,function()
{
    console.log(`Server is listening to port ${port}`);
})

