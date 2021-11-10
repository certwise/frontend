import { image, text } from "../../store/templates/types";

export const createTemplate = (info: any) => {
	const { uid, name, description } = info;
	const text: text = {
		type: "text",
		name: "Text field",
		text: "Example text field",
		x: 25,
		y: 25,
		fill: "#000",
		opacity: 1,
		fontSize: 100,
		fontFamily: "Roboto",
		fontWeight: "normal",
		fontDisplaySize: 100,
		rotation: 0,
		height: 200,
		width: 800,
		isConstant: false,
		id: "",
		textAlign: "",
	};
	const image: image = {
		name: "Sample image",
		id: "sampleimage",
		type: "image",
		isConstant: false,
		imageStorageRef: "default_template_images/base.jpg",
		height: 1080,
		width: 1920,
		x: 0,
		y: 0,
		opacity: 100,
		rotation: 0,
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
			items: [image, text],
			exportCanvasAs: "png",
		},
		id: "",
		updatedAt: new Date(),
	};
	return template;
};
