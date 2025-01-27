import mongoose from "mongoose";

const connectToDatabase = async () => {
	if (mongoose.connections[0].readyState) {
		console.log("Already connected to the database");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Blog database connected successfully!");
	} catch (error) {
		console.error("Error connecting to the database:", error);
		process.exit(1);
	}
};

export default connectToDatabase;
