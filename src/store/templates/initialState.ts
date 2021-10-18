import { getNewImage, getNewText, baseImage } from "./elements";
const text = getNewText();
const image: any = getNewImage();

image["storageRef"] = "default_template_images/image.jpg";

export const initialState = {
	userTemplates: [],
	currentTemplate: {
		id: null,
		canvas: {
			stageRef: null,
			items: [baseImage, text],
			activeItem: text,
			fontsLoading: false,
		},
		downloadCurrentTemplate: false,
		isEditing: false,
	},
	fonts: [],
	doneSaving: false,
};

export interface ITemplateState {
	userTemplates: any[];
	currentTemplate: {
		id: string;
		canvas: {
			stageRef: any;
			items: any[];
			activeItem: any;
			fontsLoading: boolean;
		};
		downloadCurrentTemplate: boolean;
		isEditing: boolean;
	};
	fonts: any[];
	doneSaving: boolean;
}
