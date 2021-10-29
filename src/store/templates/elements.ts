import { image, text } from "./types";

export const getNewText = (): text => {
	let text: text = {
		id: makeid(15),
		isConstant: true,
		type: "text",
		name: "Text field",
		text: "Example text field",
		fill: "#000",
		x: 50,
		y: 50,
		fontSize: 75,
		fontFamily: "Roboto",
		fontWeight: "normal",
		fontDisplaySize: 75,
		width: 800,
		height: 120,
		textAlign: "",
		rotation: 0,
		opacity: 0,
	};
	return text;
};

export const getNewImage = (): image => {
	let image: image = {
		isConstant: false,
		id: makeid(15),
		type: "image",
		name: "image",
		x: 10,
		y: 10,
		scaleX: 1,
		scaleY: 1,
		imageStorageRef: "",
		height: 0,
		width: 0,
		opacity: 0,
		rotation: 0,
	};
	return image;
};

const makeid = (length: number) => {
	let result = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export interface IText {
	id: string;
	isConstant: boolean;
	type: string;
	name: string;
	value: string;
	fill: string;
	x: number;
	y: number;
	fontSize: number;
	fontFamily: string;
	fontWeight: string | number;
	width: number;
	height: number;
	fontDisplaySize?: number;
	attr?: any;
}

export interface IImage {
	id: string;
	isConstant: boolean;
	type: string;
	name: string;
	x: number;
	y: number;
	scale: number;
	draggable: boolean;
	src?: string | null;
}
