import { Line } from "react-konva";
import { grid } from "../../../../store/types";

function Grid({ props, canvas }: { props: grid; canvas: any }) {
	const gridLinesX: number[] = [];
	const gridLinesY: number[] = [];
	for (let i = props.width; i <= canvas.width; i += props.width)
		gridLinesX.push(i);

	for (let i = props.height; i <= canvas.height; i += props.height)
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
						points={[x, 0, x, canvas.height]}
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
						points={[0, y, canvas.width, y]}
						opacity={props.opacity}
					/>
				);
			})}
		</>
	);
}

export default Grid;
