"use client";

import { AddNewUserAction, updateUserAction } from "@/actions";
import { Button } from "../ui/button";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addNewUserFormControl, addNewUserFormInitialState } from "@/utils";
import { useContext } from "react";
import { UserContext } from "@/context";

const AddNewUser = () => {
	const {
		open,
		setOpen,
		addNewUserFormData,
		setAddNewUserFormData,
		currentEditedId,
		setCurrentEditedId,
	} = useContext(UserContext);

	// We are checking here the value of keys is empty or not based on this the button will !disable
	function handleSaveButtonValid() {
		return Object.keys(addNewUserFormData).every(
			(key) => addNewUserFormData[key] !== ""
		);
	}

	// Call server action to store data into database
	async function handleAddNewUserAction() {
		const result =
			currentEditedId !== null
				? await updateUserAction(
						currentEditedId,
						addNewUserFormData,
						"/user-management"
				  )
				: await AddNewUserAction(
						addNewUserFormData,
						"/user-management"
				  );
		console.log(result);

		setOpen(false);
		setAddNewUserFormData(addNewUserFormInitialState);
		setCurrentEditedId(null);
	}
	return (
		<div>
			<Button onClick={() => setOpen(true)}>Add New User</Button>
			<Dialog
				open={open}
				onOpenChange={() => {
					setAddNewUserFormData(addNewUserFormInitialState);
					setOpen(false);
					setCurrentEditedId(null);
				}}
			>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{currentEditedId !== null
								? "Edit User"
								: "Add New User"}
						</DialogTitle>
					</DialogHeader>

					<form action={handleAddNewUserAction} className="mb-5">
						{addNewUserFormControl.map((controlItem) => (
							<div key={controlItem.name}>
								<Label
									htmlFor={controlItem.name}
									className="text-right"
								>
									{controlItem.label}
								</Label>
								<Input
									id={controlItem.name}
									name={controlItem.name}
									placeholder={controlItem.placeholder}
									type={controlItem.type}
									value={addNewUserFormData[controlItem.name]}
									onChange={(event) =>
										setAddNewUserFormData({
											...addNewUserFormData,
											[controlItem.name]:
												event.target.value,
										})
									}
									className="col-span-3"
								/>
							</div>
						))}
						<DialogFooter>
							<Button
								className="disabled:opacity-55 mt-3"
								disabled={!handleSaveButtonValid()}
								type="submit"
							>
								Save
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default AddNewUser;
