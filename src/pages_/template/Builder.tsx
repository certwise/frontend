import { useContext, useEffect, useState } from "react";
import Context from "../../store/context";
import { useParams } from "react-router-dom";
import CanvasContainer from "../../partials_/template/builder/canvasContainer";
import { templateActions } from "../../store";
import getCurrentTemplateItems from "../../partials_/template/getCurrentTemplate";
import {
	loadFontIntoCSS,
	loadFonts,
} from "../../partials_/template/builder/textComponent/fontLoader";
import { template } from "../../store/templates/types";
import { useGetOne } from "../../api/template";
function TemplateBuilder() {
	const { store, dispatch } = useContext(Context);
	const { id }: any = useParams();
	const template = useGetOne(id);
	const [isLoading, setIsLoading] = useState(true);
	const [isValidUrl, setIsValidUrl] = useState(true);
	const numberOfFonts = store.templates.numberOfFonts;

	useEffect(() => {
		dispatch(templateActions.isEditingTemplate(true));
		dispatch(templateActions.setNumberOfFonts(100));
		return () => {
			dispatch(templateActions.isEditingTemplate(false));
		};
	}, []);

	useEffect(() => {
		dispatch(templateActions.setFontsLoading(true));
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
			dispatch(templateActions.setFonts(fonts));
			dispatch(templateActions.setFontsLoading(false));
		});
	}, [store.templates.numberOfFonts]);

	useEffect(() => {
		dispatch(templateActions.isEditingTemplate(true));
		setIsLoading(true);
		if (template.data) {
			setCurrentTemplate(template.data.data).then(() => {
				setIsLoading(false);
			});
		}
		return () => {
			dispatch(templateActions.isEditingTemplate(false));
		};
	}, [template.data]);

	const setCurrentTemplate = (srcTemplate: template) => {
		return new Promise((resolve, reject) => {
			dispatch(templateActions.setCurrentTemplateNull());
			getCurrentTemplateItems(srcTemplate.canvas.items).then((res) => {
				for (let i in res) {
					console.log("1920 res[i]", res[i]);
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
				dispatch(templateActions.setCurrentTemplate(srcTemplate));
				console.log("1920 Current Template is set", srcTemplate);
				resolve(true);
			});
		});
	};
	return (
		<>
			{" "}
			{isLoading && <div className="w-screen h-screen loading">Loading</div>}
			{!isLoading && isValidUrl && <CanvasContainer />}
		</>
	);
}

export default TemplateBuilder;
