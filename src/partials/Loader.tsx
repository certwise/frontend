import CSS from "../css/Loader.module.scss";
function Loader() {
	return (
		<div className={CSS.container}>
			<svg
				className={CSS.svg}
				viewBox="0 0 100 100"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle className={CSS.circle} cx="50" cy="50" r="46" />
			</svg>
		</div>
	);
}

export default Loader;
