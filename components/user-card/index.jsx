"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { deleteUserAction } from "@/actions";
import { useContext } from "react";
import { UserContext } from "@/context";

const UserCard = ({ user }) => {
	const { setOpen, setAddNewUserFormData, setCurrentEditedId } =
		useContext(UserContext);
	const handleDeleteUser = async (id) => {
		const result = await deleteUserAction(id, "/user-management");
		console.log(result);
	};
	const handleEditUser = async (user) => {
		setOpen(true);
		setAddNewUserFormData({
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			address: user?.address,
		});
		setCurrentEditedId(user?._id);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Name: {user?.firstName} {user?.lastName}
				</CardTitle>
				<CardDescription>Email: {user?.email}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Address: {user?.address}</p>
			</CardContent>
			<div className="flex gap-2 px-5 py-4">
				<Button onClick={() => handleEditUser(user)}>Edit</Button>
				<Button onClick={() => handleDeleteUser(user?._id)}>
					Delete
				</Button>
			</div>
		</Card>
	);
};
export default UserCard;
