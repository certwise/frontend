import { useContext, useEffect, useState } from "react";
import { Context } from "../../store";
import { useParams } from "react-router-dom";
import CanvasContainer from "../../partials/template/builder/canvasContainer";
import { actions } from "../../store";
import getCurrentTemplateItems from "../../partials/template/getCurrentTemplate";
import {
	loadFontIntoCSS,
	loadFonts,
} from "../../partials/template/builder/textComponent/fontLoader";
import { template } from "../../store/types";
import { useGetOne } from "../../api/template";
function TemplateBuilder() {
	const { store, dispatch } = useContext(Context);
	const { id }: any = useParams();
	const template = useGetOne(id);
	const [isLoading, setIsLoading] = useState(true);
	const [isValidUrl, setIsValidUrl] = useState(true);
	const numberOfFonts = store.templates.numberOfFonts;

	useEffect(() => {
		dispatch(actions.templates.isEditingTemplate(true));
		dispatch(actions.templates.setNumberOfFonts(100));
		return () => {
			dispatch(actions.templates.isEditingTemplate(false));
		};
	}, []);

	useEffect(() => {
		dispatch(actions.templates.setFontsLoading(true));
		loadFonts("popularity").then((fonts) => {
			fonts = fonts.slice(0, numberOfFonts);
			for (let i in fonts) {
				try {
					let apiUrl = [];
					apiUrl.push("https://fonts.googleapis.com/css?family=");
					apiUrl.push(fonts[i].family.replace(/ /g, "+"));
					var url = apiUrl.join("");
					let style = document.createElement("link");
					style.href = url;
					style.rel = "stylesheet";
					document.head.appendChild(style);
				} catch {}
			}
			dispatch(actions.templates.setFonts(fonts));
			dispatch(actions.templates.setFontsLoading(false));
		});
	}, [store.templates.numberOfFonts]);

	useEffect(() => {
		dispatch(actions.templates.isEditingTemplate(true));
		setIsLoading(true);
		if (template.data) {
			setCurrentTemplate(template.data.data).then(() => {
				setIsLoading(false);
			});
		}
		return () => {
			dispatch(actions.templates.isEditingTemplate(false));
		};
	}, [template.data]);

	useEffect(() => {
		if (template.data && !store.templates.downloadCurrentTemplate) {
			setCurrentTemplate(template.data.data).then(() => {
				setIsLoading(false);
			});
		}
		return () => {
			dispatch(actions.templates.isEditingTemplate(false));
		};
	}, [store.templates.downloadCurrentTemplate]);

	const setCurrentTemplate = (srcTemplate: template) => {
		return new Promise((resolve, reject) => {
			dispatch(actions.templates.setCurrentTemplateNull());
			getCurrentTemplateItems(srcTemplate.canvas.items).then((res) => {
				for (let i in res) {
					let imgItem = res[i];
					srcTemplate.canvas.items.map((item) => {
						if (item.id === imgItem.id) return imgItem;
						else return item;
					});
				}
				srcTemplate.canvas.items.forEach((item) => {
					if (item.type === "text") {
						if (item.fontFamily) {
							loadFontIntoCSS(item.fontFamily);
						}
					}
				});
				dispatch(actions.templates.setCurrentTemplate(srcTemplate));
				resolve(true);
			});
		});
	};
	return (
		<>
			{isLoading && (
				<div className="w-screen h-screen loading">Loading template...</div>
			)}
			{!isLoading && isValidUrl && <CanvasContainer />}
		</>
	);
}

export default TemplateBuilder;
