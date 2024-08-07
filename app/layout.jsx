import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navigation/NavBar";
import Bubbles from "@/components/visual/Bubbles";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Frusadev (Daniel)",
	description: "Get to know me",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className.concat(" h-screen flex flex-col")}>
				<NavBar />
				<Bubbles />

				{children}
			</body>
		</html>
	);
}
