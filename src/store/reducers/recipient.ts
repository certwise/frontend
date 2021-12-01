import {
	action,
	recipientState,
	SET_ALL_RECIPIENTS,
	SET_SELECTED_RECIPIENTS,
	SET_SELECTED_RECIPIENTS_IN_CERTIFICATE,
	SET_SELECTED_RECIPIENTS_IN_GROUP,
} from "../types";

const reducer = (state: recipientState, action: action): recipientState => {
	switch (action.type) {
		case SET_ALL_RECIPIENTS:
			return {
				...state,
				all: action.payload,
			};

		case SET_SELECTED_RECIPIENTS:
			return {
				...state,
				selected: {
					...state.selected,
					recipients: action.payload,
				},
			};
		case SET_SELECTED_RECIPIENTS_IN_GROUP:
			return {
				...state,
				selected: {
					...state.selected,
					[action.payload.groupId]: action.payload.recipients,
				},
			};

		case SET_SELECTED_RECIPIENTS_IN_CERTIFICATE:
			return {
				...state,
				selected: {
					...state.selected,
					recipients: action.payload,
				},
			};
		default:
			return state;
	}
};

export default reducer;
