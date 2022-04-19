import { action, certificateState } from "../types";

const reducer = (state: certificateState, action: action): certificateState => {
	switch (action.type) {
		case "CREATE_SET_SELECTED_TEMPLATE": {
			return {
				...state,
				createCertificate: {
					...state.createCertificate,
					selectedTemplate: action.payload,
				},
			};
		}
		case "CREATE_SET_TYPE": {
			return {
				...state,
				createCertificate: {
					...state.createCertificate,
					type: action.payload,
				},
			};
		}
		case "CREATE_SET_SELECTED_GROUP": {
			return {
				...state,
				createCertificate: {
					...state.createCertificate,
					selectedGroup: action.payload,
				},
			};
		}
		case "CREATE_SET_SELECTED_RECIPIENT": {
			return {
				...state,
				createCertificate: {
					...state.createCertificate,
					selectedRecipient: action.payload,
				},
			};
		}
		case "CREATE_SET_SINGLE_RECIPIENT_CERTIFICATE_FIELDS": {
			return {
				...state,
				createCertificate: {
					...state.createCertificate,
					singleCertificateFields: action.payload,
				},
			};
		}

		case "CREATE_SET_GROUP_CERTIFICATE_FIELDS": {
			return {
				...state,
				createCertificate: {
					...state.createCertificate,
					groupCertificateFields: action.payload,
				},
			};
		}

		case "CREATE_SET_PAGE_NUMBER": {
			return {
				...state,
				createCertificate: {
					...state.createCertificate,
					page: action.payload,
				},
			};
		}

		case "SET_SELECTED_CERTIFICATES": {
			return {
				...state,
				selected: action.payload,
			};
		}

		case "CREATE_SET_GROUP_TEMPLATE_FIELDS": {
			return {
				...state,
				createCertificate: {
					...state.createCertificate,
					groupCertificateFields: action.payload,
				},
			};
		}
		case "CREATE_CERTIFICATE_RESET":
			return {
				...state,
				createCertificate: action.payload,
			};

		default:
			return state;
	}
};

export default reducer;
