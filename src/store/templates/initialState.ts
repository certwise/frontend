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
			height: 640,
			width: 480,
		},
		grid: {
			isEnabled: false,
			width: 0,
			height: 0,
			opacity: 0,
			points: [],
			pointsX: [],
			pointsY: [],
			lineWidth: 0,
			stroke: "",
		},
		snapPoints: {
			xLines: [],
			yLines: [],
			points: [],
		},
	},
	fonts: [],
	doneSaving: true,
	fontsLoading: false,
	isSaving: false,
	numberOfFonts: 0,
};
