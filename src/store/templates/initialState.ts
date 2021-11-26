import { getNewImage, getNewText } from "./elements";
import { canvas, MailTemplate, template, templatesState } from "./types";
const text = getNewText();
const image: any = getNewImage();

image["storageRef"] = "default_template_images/image.jpg";

const mailTemplate: MailTemplate = {
	from: "",
	to: "",
	subject: "",
	cc: "",
	message: "",
};
const Canvas: canvas = {
	exportCanvasAs: "jpg",
	height: 0,
	width: 0,
	items: [],
	activeItem: undefined,
};

const currentTemplate: template = {
	_id: "",
	name: "",
	description: "",
	createdAt: new Date(),
	updatedAt: new Date(),
	canvas: Canvas,
	numberOfCertificates: 0,
	imageRef: "",
	createdBy: "",
	organization: "",
	templateFields: [],
	mailTemplate,
	isArchived: false,
};

export const initialState: templatesState = {
	currentTemplate,
	userTemplates: [],
	isSaving: false,
	fonts: [],
	fontsLoading: false,
	numberOfFonts: 0,
	grid: {
		width: 0,
		height: 0,
		opacity: 0,
		points: [],
		pointsX: [],
		pointsY: [],
		lineWidth: 0,
		stroke: "",
		isEnabled: false,
	},
	isEditing: false,
	downloadCurrentTemplate: false,
	snapPoints: {
		isEnabled: false,
		xLines: [],
		yLines: [],
		points: [],
		activeX: undefined,
		activeY: undefined,
	},
};
