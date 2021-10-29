import { getURL } from "../../api/templates";
import { getStorage, ref } from "firebase/storage";
import { image, items } from "../../store/templates/types";

const getCurrentTemplateImageItems = (items: items) => {
	let promises = [];
	for (let it in items) {
		let item = items[it];
		if (item.type === "image") {
			promises.push(getImageItemWithSourceUrl(item));
		}
	}
	return Promise.all(promises);
};

const getImageItemWithSourceUrl = (item: image): Promise<image> => {
	let im = new Image();
	im.crossOrigin = "anonymous";
	let storageRef = item.imageStorageRef;
	console.log(storageRef);
	return new Promise((resolve, reject) => {
		if (storageRef) {
			let imgRef = ref(getStorage(), storageRef);
			getURL(imgRef)
				.then((url) => {
					im.src = url;
					im.onload = () => {
						item["src"] = im;
						item["width"] = item.width || im.width;
						item["height"] = item.height || im.height;
						resolve(item);
					};
				})
				.catch((err) => {
					reject(err);
				});
		}
	});
};

export default getCurrentTemplateImageItems;
