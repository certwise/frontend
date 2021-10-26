import { useContext, useEffect } from "react";
import { Line } from "react-konva";
import { templateActions } from "../../../store";
import Context from "../../../store/context";
import { grid } from "../../../store/templates/types";
export type gridProps = {
	points: Array<{ x: number; y: number }>;
	canvasWidth: number;
	canvasHeight: number;
	gridWidth: number;
	gridHeight: number;
	gridColor: string;
	gridOpacity: number;
	gridLineWidth: number;
};
function Grid(props: gridProps) {
	const { store, dispatch } = useContext(Context);
	useEffect(() => {
		const grid: grid = {
			width: props.gridWidth,
			height: props.gridHeight,
			opacity: props.gridOpacity,
			points: props.points,
			pointsX: [...props.points.map((point) => point.x)],
			pointsY: [...props.points.map((point) => point.y)],
			lineWidth: props.gridLineWidth,
			stroke: props.gridColor,
			isEnabled: store.templates.currentTemplate.grid.isEnabled,
		};
		dispatch(templateActions.setGrid(grid));
	}, []);
	const gridLinesX: number[] = [];
	const gridLinesY: number[] = [];
	for (let i = props.gridWidth; i <= props.canvasWidth; i += props.gridWidth) {
		gridLinesX.push(i);
	}
	for (
		let i = props.gridHeight;
		i <= props.canvasHeight;
		i += props.gridHeight
	) {
		gridLinesY.push(i);
	}
	return (
		<>
			{gridLinesX.map((x: number) => {
				return (
					<Line
						fill="#000"
						stroke={props.gridColor}
						strokeWidth={props.gridLineWidth}
						dash={[10, 5]}
						points={[x, 0, x, props.canvasHeight]}
						opacity={props.gridOpacity}
					/>
				);
			})}
			{gridLinesY.map((y: number) => {
				return (
					<Line
						fill="#000"
						stroke={props.gridColor}
						strokeWidth={props.gridLineWidth}
						dash={[10, 5]}
						points={[0, y, props.canvasWidth, y]}
						opacity={props.gridOpacity}
					/>
				);
			})}
		</>
	);
}

export default Grid;
