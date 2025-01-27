import { fetchUsersAction } from "@/actions";
import AddNewUser from "@/components/add-new-user";
import UserCard from "@/components/user-card";

const UserManagement = async () => {
	const users = await fetchUsersAction();
	return (
		<div className=" p-5 sm:p-20 w-full min-h-screen bg-slate-300 ">
			<div className="flex justify-between flex-col sm:flex-row gap-5">
				<h1 className="text-2xl sm:text-3xl font-bold">
					User Management
				</h1>
				<AddNewUser />
			</div>
			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{users && users.data && users.data.length > 0 ? (
					users.data.map((user, index) => (
						<UserCard user={user} key={index} />
					))
				) : (
					<h1>No user found!</h1>
				)}
			</div>
		</div>
	);
};
export default UserManagement;

export const metadata = {
	title: "Dashboard-User-Management-System",
	description: "Created by Gayur hussain",
};
