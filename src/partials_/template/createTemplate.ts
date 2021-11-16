import { text } from "../../store/templates/types";

export const createTemplate = (info: any) => {
	const { uid, name, description } = info;
	const text: text = {
		type: "text",
		name: "Getting started",
		text: "Add a new layer to get started",
		x: 10,
		y: 450,
		fill: "#000",
		opacity: 1,
		fontSize: 60,
		fontFamily: "Roboto",
		fontWeight: "normal",
		fontDisplaySize: 60,
		rotation: 0,
		height: 300,
		width: 1920,
		isConstant: false,
		id: "",
		textAlign: "center",
	};

	const template: any = {
		name,
		description,
		uid,
		createdAt: new Date(),
		numberOfCertificates: 0,
		canvas: {
			width: 1920,
			height: 1080,
			items: [text],
			exportCanvasAs: "png",
		},
		id: "",
		updatedAt: new Date(),
	};
	return template;
};
