const mongoose = require("mongoose");
const { listingSchema } = require("../schema");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const linstingSchema = new Schema({
    title:{
        type:String,
        require:true,
    },
    description:String,
    image:{
        url: String,
        filename: String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

linstingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});

const Linsting = mongoose.model("Listing",linstingSchema);

module.exports = Linsting; 