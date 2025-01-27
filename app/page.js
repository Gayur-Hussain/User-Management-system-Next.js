import Link from "next/link";

export default async function Home() {
	return (
		<div className="flex justify-center items-center flex-col gap-3 min-h-screen w-full bg-slate-300">
			<h1 className="text-5xl text-wrap p-4 text-center font-bold">
				User Management System
			</h1>
			<Link
				href={"/user-management"}
				className="px-6 py-2 bg-black text-white rounded"
			>
				Go to Dashboard
			</Link>
		</div>
	);
}
