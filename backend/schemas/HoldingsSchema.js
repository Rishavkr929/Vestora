const {Schema} = require("mongoose");

const HoldingsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name:String,
    qty:Number,
    avg:Number,
    price:Number,
    net: String,
    day:String,
    // The reason given the most recent time this stock was bought. Used to
    // group "trades made for this reason" in the journal insights.
    lastBuyReason: {
        type: String,
        enum: ["trending", "tip", "research", "trying_out", null],
        default: null,
    },
}) ;

module.exports={HoldingsSchema};