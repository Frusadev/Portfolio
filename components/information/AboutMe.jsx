import Link from "next/link";
import "./main.css";
import React from "react";
import Photo from "./Photo";

export const AboutMe = () => {
	return (
		<div className="flex flex-col md:flex-col font-bold items-start sm:items-start w-screen info sm:m-0">
			<div className="flex flex-col justify-center gap-10 content-between info h-screen">
				<div className="name_text">
					<h1 className="text-6xl">Hi,</h1>
					<h1 className="text-6xl">I'm Daniel!</h1>
				</div>
				<div className="contact_me_section">
					<Link
						className="p-4 contact_btn font-medium"
						href={"mailto:frusadev@gmail.com"}
					>
						Contact Me
					</Link>
				</div>
			</div>
		</div>
	);
};
