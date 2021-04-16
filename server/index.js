const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodModel = require("./models/Food")

app.use(express.json());
app.use(cors());

app.post("/insert", async (req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;

    const food = new FoodModel({foodName: foodName,daysSinceIAte: days});

    try{
        await food.save();
        res.send("Inserted Data!!");
    }catch(err){
        console.log(err);
    }
});

app.get("/read", async (req, res) => {
    FoodModel.find({}, (error,result) => {
        if(error){
            res.send(error);
        }

        res.send(result)
    })
});

app.put("/update", async (req, res) => {
    const newfoodname = req.body.newfoodName;
    const id = req.body.id;

    try{
        await FoodModel.findById(id, (err, updatedFoodObject) => {
            updatedFoodObject.foodName = newfoodname;
            updatedFoodObject.save();
            res.send("Updated Successfully");
        });
    }catch(err){
        console.log(err);
    }
});

app.get("/readById/:id", async (req, res) => {
    const id = req.params.id;

    FoodModel.find({_id:id}, (error,result) => {
        if(error){
            res.send(error);
        }

        res.send(result)
    })
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await FoodModel.findByIdAndRemove(id).exec();
    res.send("Deleted Successfully!!!");
});



mongoose.connect("mongodb+srv://sanjay:sanjay-8330@demo.qhv03.mongodb.net/Food?retryWrites=true&w=majority", {
    useNewUrlParser: true,
})

app.listen(3001,() => {
    console.log("Server is started and running on 3001");
})

