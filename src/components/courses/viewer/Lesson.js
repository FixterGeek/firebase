import React from "react";

const logo =
	"https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png";

const Lesson = ({ onSelect, duration = 0, title, index, link }) => {
	let min = String((duration / 60).toPrecision(2));
	min.replace(".", ":");
	return (
		<div onClick={() => onSelect(link)} className="lesson-card">
			<span style={{ marginTop: 15 }}>{index + 1}</span>
			<div class="lesson-icon">
				<img width="20" src={logo} alt="seen" />
				<img
					width="20"
					src="http://icons.iconarchive.com/icons/icons-land/vista-multimedia/256/Play-1-Hot-icon.png"
					alt="play"
				/>
			</div>
			<div>
				<h2>{title}</h2>
				<p
					style={{
						fontWeight: 50,
						fontSize: ".7rem",
						color: "hsla(0, 0%, 100%, 0.5)",
						display: "flex"
					}}
				>
					<span>{min} min</span>
					<span> {"\t • \t"} </span>
					<span> Héctor BlisS</span>
				</p>
			</div>
		</div>
	);
};

export default Lesson;
