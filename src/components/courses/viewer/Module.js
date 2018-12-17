import React from "react";
import Lesson from "./Lesson";

const Module = ({ onSelect, module }) => {
	const { title, materialsIds = [], materials = {} } = module;
	return (
		<div className="lessons-module-card">
			<h4>{title}</h4>
			{materialsIds.map((id, i) => (
				<Lesson onSelect={onSelect} index={i} key={i} {...materials[id]} />
			))}
		</div>
	);
};

export default Module;
