const mongoose = require("mongoose");
const { campgroundSchema } = require("../schemas");
const Review = require('./review')

const schema = mongoose.Schema;

const CampgroundSchema = new schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews,
            },
        });
    }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
