import React from "react";

const video =
	"https://video.xx.fbcdn.net/v/t42.9040-2/48562535_271162560214246_7352952069080219648_n.mp4?_nc_cat=101&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ht=video.fmex6-1.fna&oh=389bb9829a2134ae5be232a4e32cdecb&oe=5C170765";

const Lessons = ({ link = video }) => {
	console.log(link);
	return (
		<div className="viewer-lessons">
			<article>
				<video controls style={{ height: "100%" }} src={link || video} />
				<div className="viewer-lessons-selector" />
			</article>
		</div>
	);
};

export default Lessons;
