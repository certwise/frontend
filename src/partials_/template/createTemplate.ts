import { template, text } from "../../store/templates/types";

export const createTemplate = (info: any) => {
	const { uid, name, description, organization } = info;
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
		weight: 500,
		fontDisplaySize: 60,
		rotation: 0,
		height: 300,
		width: 1920,
		isConstant: false,
		id: "",
		horizontalAlign: "center",
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

	const template: template = {
		name,
		description,
		createdAt: new Date(),
		updatedAt: new Date(),
		isArchived: false,
		canvas: {
			width: 1920,
			height: 1080,
			items: [text],
			activeItem: text,
			stageRef: "",
			exportCanvasAs: "jpg",
		},
		numberOfCertificates: 0,
		imageRef: "",
		createdBy: uid,
		organization,
		templateFields: [],
		mailTemplate: {
			subject: "",
			from: "",
			to: "",
			message: "",
			cc: "",
		},
	};
	return template;
};
