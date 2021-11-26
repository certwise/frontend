import { canvas } from "./canvas";
import { grid, snapPoints } from "./grid";

export interface template {
	_id?: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	canvas: canvas;
	numberOfCertificates: number;
	imageRef: string;
	createdBy: string;
	organization: string;
	templateFields: TemplateField[];
	mailTemplate: MailTemplate;
	isArchived: boolean;
}
export interface MailTemplate {
	from: string;
	to: string;
	subject: string;
	cc: string;
	message: string;
}

export type TemplateField = {
	name: string;
	type: "text" | "image";
	value?: string;
};

export type templatesState = {
	currentTemplate: template;
	userTemplates: Array<template>;
	isSaving: boolean;
	fonts: Array<any>;
	fontsLoading: boolean;
	numberOfFonts: number;
	grid: grid;
	isEditing: boolean;
	downloadCurrentTemplate: boolean;
	snapPoints: snapPoints;
};
