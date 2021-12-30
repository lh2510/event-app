import { createStore } from 'redux'

function reducer(state = { addNewEvent: false, editSave: false }, action) {
	switch (action.type) {
		case 'makeTrue':
			return { addNewEvent: true }

		case 'makeFalse':
			return { addNewEvent: false }

		case 'makeEditSaveTrue':
			return { editSave: true }

		default:
			return state
	}
}

export let store = createStore(reducer)
