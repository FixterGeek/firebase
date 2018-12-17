import React from "react";

const logo =
	"https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png";

const Lesson = ({ index }) => {
	return (
		<div className="lesson-card">
			<span>{index}</span>
			<div class="lesson-icon">
				<img width="20" src={logo} alt="seen" />
				<img
					width="20"
					src="https://www.freeiconspng.com/uploads/start-green-play-icon-1.png"
					alt="play"
				/>
			</div>
			<div>
				<h2>Introduction to State and Effect with React Hooks</h2>
				<p
					style={{
						fontWeight: 50,
						fontSize: ".7rem",
						color: "hsla(0, 0%, 100%, 0.5)",
						display: "flex"
					}}
				>
					<span>1:52 min</span>
					<span> {"\t • \t"} </span>
					<span> Héctor BlisS</span>
				</p>
			</div>
		</div>
	);
};

export default Lesson;
