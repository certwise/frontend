import { CustomField } from "..";
import { canvas } from "./canvas";
import { grid, snapPoints } from "./grid";

export * from "./canvas";
export * from "./grid";
export * from "./dispatchTypes";

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
	templateFields: CustomField[];
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
