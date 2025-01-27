"use client";

import { addNewUserFormInitialState } from "@/utils";

const { useState, createContext } = require("react");

export const UserContext = createContext(null);

export default function UserState({ children }) {
	const [currentEditedId, setCurrentEditedId] = useState(null);
	const [open, setOpen] = useState(false);
	const [addNewUserFormData, setAddNewUserFormData] = useState(
		addNewUserFormInitialState
	);

	return (
		<UserContext.Provider
			value={{
				currentEditedId,
				setCurrentEditedId,
				open,
				setOpen,
				addNewUserFormData,
				setAddNewUserFormData,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
