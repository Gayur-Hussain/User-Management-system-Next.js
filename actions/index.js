"use server";

import connectToDatabase from "@/lib/db";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

// Add new user

export async function AddNewUserAction(formData, pathToRevalidate) {
	await connectToDatabase();
	try {
		const newlyCreatedUser = await User.create(formData);
		if (newlyCreatedUser) {
			revalidatePath(pathToRevalidate);
			return {
				success: true,
				message: "User Created Successfully!",
			};
		} else {
			return {
				success: false,
				message: "User not created! Please try again",
			};
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Some error occurred! Please try again",
		};
	}
}

// Fetch Users
export async function fetchUsersAction() {
	await connectToDatabase();
	try {
		const userList = await User.find({});
		if (userList) {
			return {
				success: true,
				data: JSON.parse(JSON.stringify(userList)),
			};
		} else {
			return {
				success: false,
				message: "Some error occurred! Please try again",
			};
		}
	} catch (error) {
		return {
			success: false,
			message: "Some error occurred! Please try again",
		};
	}
}
// Delete user

export async function deleteUserAction(id, pathToRevalidate) {
	await connectToDatabase();
	try {
		const deleteUser = await User.findByIdAndDelete(id);
		if (deleteUser) {
			revalidatePath(pathToRevalidate);
			return {
				success: true,
				message: "User deleted successfully!",
			};
		} else {
			return {
				success: false,
				message: "Not able to delete operation! please try again later",
			};
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Some error occurred! Please try again",
		};
	}
}

// Update user

export async function updateUserAction(id, formData, pathToRevalidate) {
	await connectToDatabase();
	const { firstName, lastName, email, address } = formData;
	try {
		const updateUser = await User.findOneAndUpdate(
			{ _id: id },
			{ firstName, lastName, email, address },
			{ new: true }
		);
		if (updateUser) {
			revalidatePath(pathToRevalidate);
			return {
				success: true,
				message: "User Updated Successfully!",
			};
		} else {
			return {
				success: false,
				message: "Not able to update user! Please try again",
			};
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Some error occurred! Please try again",
		};
	}
}
