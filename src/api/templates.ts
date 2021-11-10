import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { certificate } from "../store/certificates/types";
import { getNewImage } from "../store/templates/elements";
import {
	currentTemplate,
	image,
	items,
	template,
	text,
} from "../store/templates/types";
import axios from "axios";
import { env } from "../config";

export const createTemplate = async (info: any) => {
	const { uid, name, description } = info;

	const text: text = {
		type: "text",
		name: "Text field",
		text: "Example text field",
		x: 25,
		y: 25,
		fill: "#000",
		opacity: 1,
		fontSize: 100,
		fontFamily: "Roboto",
		fontWeight: "normal",
		fontDisplaySize: 100,
		rotation: 0,
		height: 200,
		width: 800,
		isConstant: false,
		id: "",
		textAlign: "",
	};
	const image: image = {
		name: "Sample image",
		id: "sampleimage",
		type: "image",
		isConstant: false,
		imageStorageRef: "default_template_images/base.jpg",
		height: 1080,
		width: 1920,
		x: 0,
		y: 0,
		opacity: 100,
		rotation: 0,
	};
	const template: any = {
		name,
		description,
		uid,
		createdAt: new Date(),
		numberOfCertificates: 0,
		canvas: {
			width: 1920,
			height: 1080,
			items: [image, text],
			exportCanvasAs: "png",
		},
		id: "",
		updatedAt: new Date(),
	};
	const result = "";
	await axios.post(env.url + "/template", template).then((res) => {});
	return result;
};

export const getTemplates = async (uid: any): Promise<Array<template>> => {
	let res = await axios.get(env.url + "/template/uid/" + uid);
	const templates: template[] = res.data as unknown as Array<template>;
	return templates;
};

export const editTemplate = async (template_: currentTemplate) => {
	let template = { ...template_ };
	const doc = await axios.get(env.url + "/template/one/" + template.id);
	if (doc.data !== false) {
		let templateDoc = doc.data as template;
		let itemss: items = [];
		for (let i in template.canvas.items) {
			itemss.push(template.canvas.items[i]);
		}
		itemss.map((item: any) => {
			if (item.type === "image") {
				console.log("Setting image to null");
				item.src = null;
			}
			return item;
		});

		templateDoc = {
			...templateDoc,
			canvas: {
				...templateDoc.canvas,
				items: itemss,
				width: template.canvas.width,
				height: template.canvas.height,
			},
			updatedAt: new Date(),
			id: template.id,
		};
		const result = await axios.put(env.url + "/template/update", templateDoc);
		return result.data;
	} else {
		return Promise.resolve(false);
	}
};

export const getCertificates = async (
	uid: string
): Promise<certificate[] | false> => {
	const result = await axios.get(env.url + "/certificate/owner/" + uid);
	return result.data;
};

export const getTemplatesNamesByUid = async (
	uid: any
): Promise<string[] | false> => {
	const res = await axios.get(env.url + "/template/names/" + uid);
	return res.data;
};

export const getTemplateById = async (templateId: any, uid: any) => {
	const res = await axios.get(env.url + "/template/one/" + templateId);
	return res.data;
};

export const getTemplateByName = async (
	templateName: any,
	uid: any
): Promise<template | false> => {
	const res = await axios.get(
		env.url + "/template/name-uid?templateName=" + templateName + "&uid=" + uid
	);
	return res.data;
};

export const renameTemplate = async (id: any, name: any): Promise<boolean> => {
	try {
		const data = { id: id, name: name };
		const res = await axios.put(env.url + "/template/rename", data);
		return res.data;
	} catch (e) {
		return false;
	}
};

export const deleteTemplate = async (id: string) => {
	await axios.delete(env.url + "/template/" + id);
};

export const makeid = (length: number) => {
	let result = "";
	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const uploadImage = async (image: any, refs: any) => {
	//upload image to firebase storage
	const storage = getStorage();
	const imageRef = ref(storage, refs);
	const result = await uploadBytes(imageRef, image);
	return result;
};

export const getURL = async (refs: any) => {
	const storage = getStorage();
	const imageRef = ref(storage, refs);
	const result = await getDownloadURL(imageRef);
	return result;
};

export const addImg = (width: any, height: any): Promise<image> => {
	return new Promise((resolve, reject) => {
		getDownloadURL(ref(getStorage(), "default_template_images/image.jpg")).then(
			(url) => {
				let im = new window.Image();
				im.crossOrigin = "anonymous";
				im.src = url;
				im.onload = () => {
					const img: image = {
						isConstant: false,
						id: getNewImage().id,
						name: "new image",
						type: "image",
						src: im,
						draggable: true,
						x: 100,
						y: 100,
						width,
						height,
						imageStorageRef: "default_template_images/image.jpg",
						opacity: 100,
						rotation: 0,
					};
					resolve(img);
				};
			}
		);
	});
};
