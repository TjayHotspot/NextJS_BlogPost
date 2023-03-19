import React from "react";
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Not a valid Input" });
      return;
    }

    const newMessage = {
      email: email,
      name: name,
      message: message,
    };

    const varUrl = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.o5hmqly.mongodb.net/?retryWrites=true&w=majority`;

    let client;
    try {
      const url =
        "mongodb+srv://tjayhotspot:Admin12341234@cluster0.o5hmqly.mongodb.net/?retryWrites=true&w=majority";

      client = await new MongoClient(varUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to server" });
      return;
    }
    await client.connect();

    const dataBase = client.db(process.env.mongodb_database);
    const collection = dataBase.collection("messages");
    const response = await collection.insertOne(newMessage);
    newMessage.id = response.insertedId;

    res.status(201).json({ message: "succesfully added " + response });
    client.close();
  }
}

export default handler;
