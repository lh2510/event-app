import { createStore } from 'redux'

function reducer(state = { addNewEvent: false }, action) {
	switch (action.type) {
		case 'makeTrue':
			return { addNewEvent: true }
		case 'makeFalse':
			return { addNewEvent: false }
		default:
			return state
	}
}

export let store = createStore(reducer)
