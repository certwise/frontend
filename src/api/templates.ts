import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { certificate } from "../store/certificates/types";
import { getNewImage } from "../store/templates/elements";
import {
	baseImage,
	image,
	items,
	template,
	text,
} from "../store/templates/types";
import axios from "axios";
import { env } from "../config";

export const createTemplate = async (info: any) => {
	const { uid, name, description } = info;
	const baseImage: baseImage = {
		type: "base-image",
		x: 0,
		y: 0,
		id: makeid(12),
		name: "Base template image",
		alt: "Example image",
		imageStorageRef: "default_template_images/base.jpg",
		width: 1920,
		height: 1080,
		opacity: 0,
		rotation: 0,
		isConstant: true,
	};
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
	const template: any = {
		name,
		description,
		uid,
		createdAt: new Date(),
		numberOfCertificates: 0,
		canvas: {
			width: baseImage.width,
			height: baseImage.height,
			items: [baseImage, text],
			exportCanvasAs: "png",
		},
		id: "",
		updatedAt: new Date(),
	};
	const result = "";
	axios.post(env.url + "/template", template).then((res) => {
		console.log(res);
	});
	return result;
};

export const getTemplates = async (uid: any): Promise<Array<template>> => {
	let res = await axios.get(env.url + "/template/uid/" + uid);
	const templates: template[] = res.data as unknown as Array<template>;
	return templates;
};

export const editTemplateItems = async (id: any, items: items) => {
	const doc = await axios.get(env.url + "/template/one/" + id);
	if (doc.data !== false) {
		let template = doc.data as template;
		let itemss: items = [];
		for (let i in items) {
			itemss.push(items[i]);
		}
		itemss.map((item: any) => {
			if (item.type === "image" || item.type === "base-image") {
				item.src = null;
			}
			return item;
		});
		template = {
			...template,
			canvas: {
				...template.canvas,
				items: items,
			},
			id: id,
		};
		const result = await axios.put(
			env.url + "/template/update/" + id,
			template
		);
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
	console.log(id, name, "Gibberish");
	try {
		const data = { id: id, name: name };
		const res = await axios.put(env.url + "/template/rename", data);
		console.log("REss", res);
		return res.data;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const deleteTemplate = async (id: string) => {
	console.log("id", id);
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
	console.log("Uploaded");
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
