export const CREATE_ITEM = "CREATE_ITEM";
export const EDIT_CANVAS = "EDIT_CANVAS";
export const SET_ACTIVE_ITEM = "SET_ACTIVE_ITEM";
export const SET_STAGE_REF = "SET_STAGE_REF";
export const EDIT_WHOLE_CANVAS = "EDIT_WHOLE_CANVAS";

export const SET_CURRENT_TEMPLATE = "SET_CURRENT_TEMPLATE";
export const SET_USER_TEMPLATES = "SET_USER_TEMPLATES";
export const SET_USER_TEMPLATES_LOADING = "SET_USER_TEMPLATES_LOADING";

export const SET_FONTS = "SET_FONTS";
export const SET_FONTS_LOADING = "SET_FONTS_LOADING";
export const ADD_FONT = "ADD_FONT";
export const SET_NUMBER_OF_FONTS = "SET_NUMBER_OF_FONTS";

export const DOWLOAD_CURRENT_TEMPLATE = "DOWLOAD_CURRENT_TEMPLATE";
export const IS_EDITING_TEMPLATE = "IS_EDITING_TEMPLATE";

export const SET_GRID = "SET_GRID";

export const SET_SNAP = "SET_SNAP";

export type template = {
	id: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	uid: string;
	canvas: canvas;
	numberOfCertificates: number;
	image?: any;
};

export type canvas = {
	exportCanvasAs: "jpg" | "png";
	height: number;
	width: number;
	items: items;
	activeItem: item | undefined;
	stageRef?: any;
};

export type image = {
	name: string;
	id: string;
	type: "image";
	isConstant: boolean;
	imageStorageRef: string;
	height: number;
	width: number;
	x: number;
	y: number;
	opacity: number;
	rotation: number;
	alt?: string;
	scaleX?: number;
	scaleY?: number;
	flipX?: boolean;
	flipY?: boolean;
	draggable?: boolean;
	src?: HTMLImageElement;
};

export type text = {
	id: string;
	type: "text";
	x: number;
	y: number;
	name: string;
	height: number;
	fill: string;
	width: number;
	isConstant: boolean;
	text: string;
	fontSize: number;
	fontFamily: string;
	textAlign: string;
	rotation: number;
	opacity: number;
	fontStyle?: string;
	fontWeight?: string;
	textDecoration?: string;
	fontFileLink?: string;
	fontFileName?: string;
	fontDisplaySize?: number;
	draggable?: boolean;
};

export type createTemplateRequestBody = {
	name: string;
	uid: string;
	template: template;
};

export type updateTemplateRequestBody = {
	id: string;
	template: template;
};

export type fields = {
	name: string;
	value: string;
};

export type currentTemplate = {
	id: string;
	canvas: canvas;
	name: string;
	isEditing: boolean;
	downloadCurrentTemplate: boolean;
};
export type templatesState = {
	currentTemplate: currentTemplate;
	userTemplates: Array<template>;
	isSaving: boolean;
	fonts: Array<any>;
	doneSaving: boolean;
	fontsLoading: boolean;
	numberOfFonts: number;
	grid: grid;
	snapPoints: snapPoints;
};

export type items = Array<image | text>;
export type item = image | text;

///////////////////////// Frontend //////////////////////////

export type grid = {
	width: number;
	height: number;
	opacity: number;
	points: Array<point>;
	pointsX: Array<number>;
	pointsY: Array<number>;
	lineWidth: number;
	stroke: string;
	isEnabled: boolean;
};

type point = {
	x: number;
	y: number;
};

export type snapPoints = {
	isEnabled: boolean;
	xLines: Array<number>;
	yLines: Array<number>;
	points: Array<point>;
	activeX?: number;
	activeY?: number;
};
