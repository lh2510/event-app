import { createStore } from 'redux'

function reducer(state = { addNewEvent: false, editSave: false, todos: [] }, action) {
	switch (action.type) {
		case 'initialize':
			return { ...state, todos: action.payload }

		case 'addNewEvent':
			return { ...state, addNewEvent: true }

		case 'addNewEvent_save':
			return { ...state, addNewEvent: false, todos: [action.payload, ...state.todos] }

		case 'makeEditSaveTrue': //when true, will update the list and render the list
			return { ...state, editSave: true }
		case 'makeEditSaveFalse':
			return { ...state, editSave: false }

		default:
			return state
	}
}

export let store = createStore(reducer)
