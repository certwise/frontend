import { template, text } from "../../store/types";

export const createTemplate = (t: any) => {
	const text: text = {
		type: "text",
		name: "Getting started",
		text: "Add a new layer to get started",
		x: t.width / 2 - 250 || 800,
		y: t.height / 2 - 100 || 440,
		fill: "#000",
		opacity: 1,
		fontSize: 50,
		fontFamily: "Roboto",
		weight: 500,
		fontDisplaySize: 60,
		rotation: 0,
		height: 200,
		width: 500,
		isConstant: false,
		id: "dfFG4D4fkj4Fwss4",
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
		name: t.name,
		description: t.description,
		createdAt: new Date(),
		updatedAt: new Date(),
		isArchived: false,
		canvas: {
			width: t.width || 1920,
			height: t.height || 1080,
			items: [text],
			activeItem: text,
			stageRef: "",
			exportCanvasAs: "jpg",
		},
		numberOfCertificates: 0,
		imageRef: "",
		createdBy: t.uid,
		organization: t.organization,
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
