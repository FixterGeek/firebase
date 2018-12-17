import React from "react";
import Module from "./Module";

const promo =
	"https://duyt4h9nfnj50.cloudfront.net/sku/6e256406dc5c802ddd8f0d23adb792f3";
const img =
	"https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/264/thumb/EGH_ReactHooks_Final_%281%29.png";

const Selector = ({
	modules,
	modulesOrder,
	title,
	badge,
	courseTitle,
	className,
	promoImage,
	onSelect
}) => {
	return (
		<div className={className}>
			<div className="lessons-ad-card">
				<div>
					<h4>Save 45% for a limited time.</h4>
					<p>Extend your membership today.</p>
				</div>
				<img
					style={{ marginLeft: 5 }}
					height="100%"
					src={promoImage || promo}
					alt="promo"
				/>
			</div>
			<div className="lessons-title-card">
				<img
					style={{ marginLeft: 5 }}
					height="100%"
					src={badge || img}
					alt="promo"
				/>
				<h2 style={{ marginLeft: 10 }}>
					{title || "Reusable state and effects with React hooks"}
				</h2>
			</div>
			<div className="lessons-scrollable">
				{modulesOrder.map((id, i) => (
					<Module onSelect={onSelect} index={i} key={i} module={modules[id]} />
				))}
			</div>
		</div>
	);
};

export default Selector;
