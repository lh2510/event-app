import { createStore } from 'redux'

function reducer(state = { addNewEvent: false, editSave: false, todos: [], editIdList: [], userName: '' }, action) {
	switch (action.type) {
		case 'setUsername':
			return { ...state, userName: action.payload }

		case 'initialize':
			return { ...state, todos: action.payload }

		case 'addNewEvent':
			return { ...state, addNewEvent: true }

		case 'addNewEvent_save':
			const id = action.payload.id
			const newObj = { ...action.payload, _id: id }
			return { ...state, addNewEvent: false, todos: [newObj, ...state.todos] }

		case 'editItem_save':
			const index = state.todos.findIndex((todo) => todo._id === action.payload.id) //finding index of the item
			const newArray = [...state.todos] //making a new array
			newArray[index] = action.payload.data //changing value in the new array
			newArray[index]._id = action.payload.id
			const filteredEditIdList = state.editIdList.filter((id) => id !== action.payload.id) //pop the id from editIdList
			return { ...state, editSave: true, todos: newArray, editIdList: filteredEditIdList }

		case 'makeEditSaveFalse':
			return { ...state, editSave: false }

		case 'pushToeditIdList':
			return { ...state, editIdList: [action.payload, ...state.editIdList] }

		default:
			return state
	}
}

export let store = createStore(reducer)
