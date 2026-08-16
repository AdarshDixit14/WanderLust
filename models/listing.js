
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { ref } = require("joi");

const listingSchema = new Schema({
  
  title: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  price:Number,
  country: String,

  category: {
      type: String,
      enum: [
            "Trending",
            "Rooms",
            "Iconic Cities",
            "Castles",
            "Amazing pools",
            "Camping",
            "Farms",
            "Mountains",
            "Arctic",
            "Boats",
        ]
    },

image: {
    url: String,
    filename: String
},
reviews:[
  {
    type:Schema.Types.ObjectId,
    ref:"Review"
  }
],
  owner: { 
    type:Schema.Types.ObjectId,
    ref:"User",
  }
})

listingSchema.post("findByIdAndDelete", async (listing) => {
  if(listing){
    await Review.deleteMany({_id: {$in:listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;