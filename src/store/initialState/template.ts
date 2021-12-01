import {
	canvas,
	MailTemplate,
	template,
	templatesState,
} from "../types/template";

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

const initialState: templatesState = {
	currentTemplate,
	userTemplates: [],
	isSaving: false,
	fonts: [],
	fontsLoading: false,
	numberOfFonts: 0,
	grid: {
		width: 100,
		height: 100,
		opacity: 0.5,
		points: [],
		pointsX: [],
		pointsY: [],
		lineWidth: 4,
		stroke: "#999",
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

export default initialState;
