const mongoose = require("mongoose");
const campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");

mongoose
    .connect("mongodb://localhost:27017/yelp-camp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log("Oops! Connection failed");
        console.log(err);
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected successfully");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: `${Math.floor(Math.random() * 50) + 10}`,
            image: "https://random.imagecdn.app/500/250",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, amet. Impedit molestiae, amet qui incidunt explicabo illum quasi accusamus suscipit cumque cum autem officia nostrum quam, ipsum nulla dolores dolore.",
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
