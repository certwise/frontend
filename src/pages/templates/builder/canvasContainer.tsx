import Canvas from "./canvas";
import CanvasItems from "./canvasItems";
import CanvasLayers from "./canvasLayers";

function BuilderContainer() {
	return (
		<div className="" style={{ overflow: "hidden" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
					alignItems: "center",
				}}
			>
				<div
					className="w-1/6  scrollbar-hide border-r bg-trueGray-50 border-gray-300"
					style={{ height: window.innerHeight, overflowY: "scroll" }}
				>
					<CanvasLayers />
				</div>
				<div
					className="w-2/3 p-2 "
					style={{
						display: "flex",
						justifyContent: "space-evenly",
						alignItems: "center",
						height: window.innerHeight,
					}}
				>
					<Canvas />
				</div>
				<div
					className="w-1/5 h-full bg-trueGray-50 scrollbar-hide p-2 pt-3 rounded border-l border-gray-300"
					style={{
						overflowY: "scroll",
						overflowX: "hidden",
						height: window.innerHeight,
					}}
				>
					<CanvasItems />
				</div>
			</div>
		</div>
	);
}

export default BuilderContainer;
