
const express = require("express");
const bodyParser= require("body-parser");
// const date = require(__dirname+ "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs'); //ok

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true})); //ok
// New Database in MongoDB Replacing the arrays that received the items in the list

// Adding Items to the Database
mongoose.connect("mongodb+srv://Admin-Amanda:Test123@cluster0.jtket.mongodb.net/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true });

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
  name: "Welcome to the ToDo List"
});

const item2 = new Item ({
  name: "Use + to Add a New Item"
});

const item3 = new Item ({
  name: "Check to Delete"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

// Item.insertMany(defaultItems, function(err){
//   if (err){
//     console.log(err);
//   }else{
//     console.log("New Items Saved");
//   };
// });


app.get("/", function(req, res){ //ok

//all code in date.js was here before
// const day = date.getDate();

Item.find({}, function (err, foundItems){
   if(foundItems.length === 0 ){
     Item.insertMany(defaultItems, function(err){
       if (err){
         console.log(err);
       }else{
         console.log("New Items Saved");
       };
     });
     res.redirect("/");
   }else{
     res.render("list", {listTitle: "Today", newListItems: foundItems});           //ok
   }
});
});

app.get("/:customListName", function(req,res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName }, function (err, foundList) {
    if(!err){
      if(!foundList){
        const list = new List ({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
    }else{
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
    };
  };


}); //find.One
}); //app.get

app.post("/", function(req, res){

const itemName = req.body.newItem;
const listName = req.body.list;

const item = new Item ({
  name: itemName
});
if(listName === "Today"){
   item.save();
   res.redirect("/");
 }else{
   List.findOne({name: listName}, function(err, foundList){
     foundList.items.push(item);
     foundList.save();
     res.redirect("/" + listName);
   });
 };
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

    if(listName === "Today"){
      Item.findByIdAndRemove(checkedItemId, function(err){
        if(!err){
          console.log("Successfully Deleted");
          res.redirect("/");
        }
      });
        }else{
      List.findOneAndUpdate(
        {name: listName},
        {$pull:{items:{_id: checkedItemId}}}, function(err, foundList){
        if(!err){
        res.redirect("/" + listName);
      }
    });
  };
});
app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
  console.log("Server Has Started Successfully!");
});
