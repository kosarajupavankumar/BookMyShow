import mongoose from "mongoose";

class MongoConnection {
  constructor(uri, dbName = "bookMyShow") {
    this.uri = uri;
    this.dbName = dbName; // Default to "bookMyShow" if no DB name is provided
  }

  // Connect to the database
  async connect() {
    try {
      console.log(`Connecting to MongoDB cluster...`);
      await mongoose.connect(this.uri, { dbName: this.dbName });
      console.log(
        `Connected to the cluster and using database: ${this.dbName}`
      );
      return mongoose.connection; // Return the mongoose connection object
    } catch (error) {
      console.error("Error connecting to the database:", error.message);
      process.exit(1); // Exit if database connection fails
    }
  }

  // Create a new document in a specified collection
  async createDocument(collectionName, data) {
    try {
      const collection = mongoose.connection.collection(collectionName); // Directly using mongoose connection
      const result = await collection.insertOne(data);
      console.log("Document created:", result);
      return result;
    } catch (error) {
      console.error("Error creating document:", error.message);
      throw error;
    }
  }

  // Read documents from a specified collection
  async getDocuments(collectionName, filter = {}) {
    try {
      const collection = mongoose.connection.collection(collectionName);
      const documents = await collection.find(filter).toArray();
      console.log("Documents retrieved:", documents);
      return documents;
    } catch (error) {
      console.error("Error retrieving documents:", error.message);
      throw error;
    }
  }

  // Update a document by ID in a specified collection
  async updateDocumentById(collectionName, id, data) {
    try {
      const collection = mongoose.connection.collection(collectionName);
      const result = await collection.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: data }
      );
      console.log("Document updated:", result);
      return result;
    } catch (error) {
      console.error("Error updating document:", error.message);
      throw error;
    }
  }

  // Delete a document by ID in a specified collection
  async deleteDocumentById(collectionName, id) {
    try {
      const collection = mongoose.connection.collection(collectionName);
      const result = await collection.deleteOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      console.log("Document deleted:", result);
      return result;
    } catch (error) {
      console.error("Error deleting document:", error.message);
      throw error;
    }
  }
}

export default MongoConnection;
