import { useContext, useEffect, useState } from "react";
import { Line } from "react-konva";
import Context from "../../../store/context";

function Grid() {
	const { store } = useContext(Context);
	const props = store.templates.grid;
	const gridLinesX = [];
	const gridLinesY = [];
	console.log("Grid changed");
	for (
		let i = props.width;
		i <= store.templates.currentTemplate.canvas.width;
		i += props.width
	)
		gridLinesX.push(i);

	for (
		let i = props.height;
		i <= store.templates.currentTemplate.canvas.height;
		i += props.height
	)
		gridLinesY.push(i);

	return (
		<>
			{gridLinesX.map((x: number, i) => {
				return (
					<Line
						key={i}
						fill="#000"
						stroke={props.stroke}
						strokeWidth={props.lineWidth}
						dash={[10, 5]}
						points={[x, 0, x, store.templates.currentTemplate.canvas.height]}
						opacity={props.opacity}
					/>
				);
			})}
			{gridLinesY.map((y: number, i) => {
				return (
					<Line
						key={i}
						fill="#000"
						stroke={props.stroke}
						strokeWidth={props.lineWidth}
						dash={[10, 5]}
						points={[0, y, store.templates.currentTemplate.canvas.width, y]}
						opacity={props.opacity}
					/>
				);
			})}
		</>
	);
}

export default Grid;
