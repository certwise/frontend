import { action } from "..";
import { getNewText } from "./elements";
import * as types from "./types";

export const createTextItem = () => {
	return {
		type: types.CREATE_ITEM,
		payload: getNewText(),
	};
};
export const editCanvas = (items: types.items) => {
	return {
		type: types.EDIT_CANVAS,
		payload: items,
		info: "description",
	};
};
export const setActiveItem = (item: undefined | types.item) => {
	return {
		type: types.SET_ACTIVE_ITEM,
		payload: item,
		info: "description",
	};
};
export const setStageRef = (stage: any) => {
	return {
		type: types.SET_STAGE_REF,
		payload: stage,
		info: "description",
	};
};
export const editWholeCanvas = (items: types.canvas) => {
	return {
		type: types.EDIT_WHOLE_CANVAS,
		payload: items,
		info: "description",
	};
};

export const setUserTemplates = (templates: types.template[]) => {
	return {
		type: types.SET_USER_TEMPLATES,
		payload: templates,
		info: "description",
	};
};
export const setUserTemplatesLoading = (loading: boolean) => {
	return {
		type: types.SET_USER_TEMPLATES_LOADING,
		payload: loading,
		info: "description",
	};
};
export const setCurrentTemplate = (template: types.template) => {
	return {
		type: types.SET_CURRENT_TEMPLATE,
		payload: template,
		info: "description",
	};
};
export const setCurrentTemplateNull = () => {
	return {
		type: types.SET_CURRENT_TEMPLATE,
		payload: { id: null, canvas: { items: [], rev: [] } },
		info: "description",
	};
};

export const addFont = (font: any) => {
	return {
		type: types.ADD_FONT,
		payload: font,
		info: "description",
	};
};
export const setFonts = (fonts: any) => {
	return {
		type: types.SET_FONTS,
		payload: fonts,
		info: "description",
	};
};
export const createImageItem = (img: types.image) => {
	return {
		type: types.CREATE_ITEM,
		payload: img,
	};
};

export const setFontsLoading = (state: boolean) => {
	return {
		type: types.SET_FONTS_LOADING,
		payload: state,
	};
};

export const downloadCurrentTemplate = (bool: boolean) => {
	return {
		type: types.DOWLOAD_CURRENT_TEMPLATE,
		payload: bool,
	};
};

export const isEditingTemplate = (bool: boolean) => {
	return {
		type: types.IS_EDITING_TEMPLATE,
		payload: bool,
	};
};

export const setGrid = (grid: types.grid) => {
	return {
		type: types.SET_GRID,
		payload: grid,
	};
};

export const setNumberOfFonts = (number: number): action => {
	return {
		type: types.SET_NUMBER_OF_FONTS,
		payload: number,
	};
};

export const setSnap = (snap: types.snapPoints) => {
	return {
		type: types.SET_SNAP,
		payload: snap,
	};
};

export const setTemplateSaving = (bool: boolean) => {
	return {
		type: types.SET_SAVING_TEMPLATE,
		payload: bool,
	};
};
