import { getNewImage, getNewText, baseImage } from "./elements";
import { templatesState } from "./types";
const text = getNewText();
const image: any = getNewImage();

image["storageRef"] = "default_template_images/image.jpg";

export const initialState: templatesState = {
	userTemplates: [],
	currentTemplate: {
		id: "",
		name: "",
		isEditing: false,
		downloadCurrentTemplate: false,
		canvas: {
			activeItem: undefined,
			items: [text, image, baseImage],
			exportCanvasAs: "png",
			height: 1080,
			width: 1920,
		},
	},
	fonts: [],
	doneSaving: true,
	fontsLoading: false,
	isSaving: false,
	numberOfFonts: 100,
	grid: {
		isEnabled: false,
		width: 100,
		height: 100,
		opacity: 0.4,
		points: [],
		pointsX: [],
		pointsY: [],
		lineWidth: 1,
		stroke: "black",
	},
	snapPoints: {
		isEnabled: false,
		xLines: [],
		yLines: [],
		points: [],
	},
};
