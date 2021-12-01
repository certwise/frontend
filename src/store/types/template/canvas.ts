export type items = Array<image | text>;

export type item = image | text;

export interface CanvasItem {
	id: string;
	name: string;
	type: "image" | "text";
	x: number;
	y: number;
	height: number;
	width: number;
	opacity: number;
	rotation: number;
	flipX: boolean;
	flipY: boolean;
	draggable: boolean;
	isConstant: boolean;
}

export interface text extends CanvasItem {
	type: "text";
	text: string;
	fontSize: number;
	fontFamily: string;
	horizontalAlign: "center" | "left" | "right";
	verticalAlign: "top" | "middle" | "bottom";
	fontStyle: string;
	textDecoration: string;
	fontFileLink: string;
	fontFileName: string;
	fontDisplaySize: number;
	underline: boolean;
	italic: boolean;
	weight: number;
	fill: string;
}

export interface image extends CanvasItem {
	type: "image";
	storageRef: string;
	alt: string;
	scaleX: number;
	scaleY: number;
	originalWidth: number;
	originalHeight: number;
	src?: HTMLImageElement;
}

export interface canvas {
	exportCanvasAs: "jpg" | "png";
	height: number;
	width: number;
	items: items;
	activeItem: item | undefined;
	stageRef?: any;
}
