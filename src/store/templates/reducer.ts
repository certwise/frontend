import { action } from "../../types/store";
import { templatesState } from "../../types/template";
import * as types from "./types";

const reducer = (state: templatesState, action: action): templatesState => {
	switch (action.type) {
		case types.SET_CURRENT_TEMPLATE:
			return {
				...state,
				currentTemplate: action.payload,
			};

		case types.SET_USER_TEMPLATES:
			return {
				...state,
				userTemplates: action.payload,
			};

		case types.CREATE_ITEM:
			return {
				...state,
				currentTemplate: {
					...state.currentTemplate,
					canvas: {
						...state.currentTemplate.canvas,
						items: [...state.currentTemplate.canvas.items, action.payload],
						activeItem: action.payload,
					},
				},
			};
		case types.EDIT_CANVAS: {
			return {
				...state,
				currentTemplate: {
					...state.currentTemplate,
					canvas: {
						...state.currentTemplate.canvas,
						items: action.payload,
					},
				},
			};
		}
		case types.SET_ACTIVE_ITEM:
			return {
				...state,
				currentTemplate: {
					...state.currentTemplate,
					canvas: {
						...state.currentTemplate.canvas,
						activeItem: action.payload,
					},
				},
			};
		case types.SET_STAGE_REF:
			return {
				...state,
				currentTemplate: {
					...state.currentTemplate,
					canvas: {
						...state.currentTemplate.canvas,
						stageRef: action.payload,
					},
				},
			};
		case types.EDIT_WHOLE_CANVAS:
			return {
				...state,
				currentTemplate: {
					...state.currentTemplate,
					canvas: {
						...state.currentTemplate.canvas,
						...action.payload,
					},
				},
			};

		case types.SET_FONTS:
			return {
				...state,
				fonts: action.payload,
			};

		case types.ADD_FONT: {
			return {
				...state,
				fonts: [...state.fonts, action.payload],
			};
		}

		case types.SET_FONTS_LOADING:
			return {
				...state,
				fontsLoading: action.payload,
			};
		case types.DOWLOAD_CURRENT_TEMPLATE:
			return {
				...state,
				downloadCurrentTemplate: action.payload,
			};
		case types.IS_EDITING_TEMPLATE: {
			return {
				...state,
				isEditing: action.payload,
			};
		}
		case types.SET_SAVING_TEMPLATE: {
			return {
				...state,
				isSaving: action.payload,
			};
		}
		case types.SET_GRID: {
			return {
				...state,
				grid: action.payload,
			};
		}
		case types.SET_NUMBER_OF_FONTS: {
			return {
				...state,
				numberOfFonts: action.payload,
			};
		}
		case types.SET_SNAP: {
			return {
				...state,
				snapPoints: action.payload,
			};
		}

		default:
			return state;
	}
};

export default reducer;
