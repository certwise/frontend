export type grid = {
	width: number;
	height: number;
	opacity: number;
	points: Array<point>;
	pointsX: Array<number>;
	pointsY: Array<number>;
	lineWidth: number;
	stroke: string;
	isEnabled: boolean;
};

type point = {
	x: number;
	y: number;
};

export type snapPoints = {
	isEnabled: boolean;
	xLines: Array<number>;
	yLines: Array<number>;
	points: Array<point>;
	activeX?: number;
	activeY?: number;
};
