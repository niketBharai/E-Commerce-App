const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const User = require("../models/User");
const Product = require("../models/Product");

// Connect to database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    console.log("Cleared existing data...");

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    // Create regular user
    const regularUser = await User.create({
      name: "John Doe",
      email: "user@example.com",
      password: "user123",
      role: "user",
    });

    console.log("Created users...");

    console.log("Created categories...");

    // Create products
    const products = [
      {
        name: "Wireless Bluetooth Headphones",
        description:
          "Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
        price: 199.99,
        category: "Electronics",
        images: [
          {
            url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
            alt: "Wireless Bluetooth Headphones",
          },
        ],
        stock: 25,
      },
      {
        name: "Organic Cotton T-Shirt",
        description:
          "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Made from 100% organic cotton.",
        price: 29.99,
        category: "Clothing",
        images: [
          {
            url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=500",
            alt: "Organic Cotton T-Shirt",
          },
        ],
        stock: 50,
      },
      {
        name: "Stainless Steel Water Bottle",
        description:
          "Insulated stainless steel water bottle that keeps drinks cold for 24 hours and hot for 12 hours.",
        price: 24.99,
        category: "Sports",
        images: [
          {
            url: "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=500",
            alt: "Stainless Steel Water Bottle",
          },
        ],
        stock: 35,
      },
      {
        name: "Smart Fitness Watch",
        description:
          "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone connectivity.",
        price: 299.99,
        category: "Electronics",
        images: [
          {
            url: "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg?auto=compress&cs=tinysrgb&w=500",
            alt: "Smart Fitness Watch",
          },
        ],
        stock: 15,
      },
      {
        name: "Leather Laptop Bag",
        description:
          "Professional leather laptop bag with multiple compartments and shoulder strap. Fits laptops up to 15 inches.",
        price: 89.99,
        category: "Accessories",
        images: [
          {
            url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500",
            alt: "Leather Laptop Bag",
          },
        ],
        stock: 20,
      },
      {
        name: "Yoga Mat",
        description:
          "Non-slip yoga mat made from eco-friendly materials with carrying strap. Perfect for yoga and fitness.",
        price: 39.99,
        category: "Sports",
        images: [
          {
            url: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500",
            alt: "Yoga Mat",
          },
        ],
        stock: 40,
      },
    ];

    await Product.create(products);

    console.log("Created products...");
    console.log("Seed data created successfully!");
    console.log("\nLogin credentials:");
    console.log("Admin: admin@example.com / admin123");
    console.log("User: user@example.com / user123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
