import "./main.css";
import React from "react";
import NavButton from "./NavButton";
import Link from "next/link";

const NavBar = () => {
	return (
		<div className="navbar_container">
			<div className="nav_container">
				<NavButton>
					<Link href={"/"}>Home</Link>
				</NavButton>
				<NavButton>
					<Link href={"/skills"}>Skills</Link>
				</NavButton>
				<NavButton>
					<Link target="_blank" href={"https://github.com/Frusadev"}>Github</Link>
				</NavButton>
				<NavButton>
					<Link
          href={"mailto:frusadev@gmail.com"}>Contact</Link>
				</NavButton>
			</div>
		</div>
	);
};

export default NavBar;
