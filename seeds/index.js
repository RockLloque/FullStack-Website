const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cities = require("./cities");
const CampGround = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopolgy: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function seedDB() {
  await CampGround.deleteMany({});
  for (let i = 0; i < 250; ++i) {
    const express = require("express");
    const path = require("path");
    const mongoose = require("mongoose");
    const cities = require("./cities");
    const CampGround = require("../models/campground");
    const { places, descriptors } = require("./seedHelpers");

    mongoose.connect("mongodb://localhost:27017/yelp-camp", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopolgy: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => {
      console.log("Database connected");
    });

    const sample = (array) => array[Math.floor(Math.random() * array.length)];

    async function seedDB() {
      await CampGround.deleteMany({});
      for (let i = 0; i < 250; ++i) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new CampGround({
          //Harcoded Author ID!!
          author: "600f2911d79a602e73e068a3",
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)}, ${sample(places)}`,
          geometry: {
            type: "Point",
            coordinates: [
              cities[random1000].longitude,
              cities[random1000].latitude,
            ],
          },
          images: {
            url:
              "https://res.cloudinary.com/rocklloque/image/upload/v1611762377/YelpCamp/vuwwijn9npgw6gqkbb2a.jpg",
            filename: "YelpCamp/vuwwijn9npgw6gqkbb2a",
          },
          description:
            "Adipisicing unde accusantium corporis culpa accusamus. Incidunt qui eum quam aliquid itaque reiciendis Reprehenderit adipisci at explicabo illum similique Earum veniam atque placeat tempore ad laboriosam porro sit, provident Ipsum.",
          price,
        });
        await camp.save();
      }
    }
    seedDB().then(() => {
      mongoose.connection.close();
    });
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new CampGround({
      //Harcoded Author ID!!
      author: "600f2911d79a602e73e068a3",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)}, ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: {
        url:
          "https://res.cloudinary.com/rocklloque/image/upload/v1611762377/YelpCamp/vuwwijn9npgw6gqkbb2a.jpg",
        filename: "YelpCamp/vuwwijn9npgw6gqkbb2a",
      },
      description:
        "Adipisicing unde accusantium corporis culpa accusamus. Incidunt qui eum quam aliquid itaque reiciendis Reprehenderit adipisci at explicabo illum similique Earum veniam atque placeat tempore ad laboriosam porro sit, provident Ipsum.",
      price,
    });
    await camp.save();
  }
}
seedDB().then(() => {
  mongoose.connection.close();
});
