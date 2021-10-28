export const setPageTitle = (title: string) => {
	return {
		type: "SET_PAGE_TITLE",
		payload: title,
	};
};
