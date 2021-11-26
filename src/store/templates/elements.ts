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
		weight: 500,
		fontDisplaySize: 75,
		width: 800,
		height: 120,
		horizontalAlign: "center",
		rotation: 0,
		opacity: 0,
		verticalAlign: "top",
		fontStyle: "",
		textDecoration: "",
		fontFileLink: "",
		fontFileName: "",
		underline: false,
		italic: false,
		flipX: false,
		flipY: false,
		draggable: false,
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
		storageRef: "",
		height: 0,
		width: 0,
		opacity: 0,
		rotation: 0,
		alt: "",
		originalWidth: 0,
		originalHeight: 0,
		flipX: false,
		flipY: false,
		draggable: false,
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
