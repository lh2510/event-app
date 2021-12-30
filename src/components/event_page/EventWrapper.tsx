import React, { useState, useEffect } from 'react'
import axios from 'axios'

import EventItem from './Event/EventItem'
import './EventWrapper.css'
import AddEventItem from './Event/AddEventItem'
import { useSelector, useDispatch, useStore, RootStateOrAny } from 'react-redux'
import { useHistory } from 'react-router-dom'
export default function EventPage() {
	const history = useHistory()
	const [EventList, setEventList] = useState([])
	const dispatch = useDispatch()
	const store = useStore()
	console.log(store)
	console.log('store', store)
	const addNewEventValue = useSelector((state: RootStateOrAny) => state.addNewEvent)

	const handleClick = () => {
		dispatch({ type: 'makeTrue' })
		console.log(store.getState())
	}

	useEffect(() => {
		store.subscribe(() => {
			if (store.getState().addNewEvent === false) {
				//then get the updated list
				axios
					.get('http://localhost:4000/api/event/', { headers: { Authorization: `Bearer ${token}` } })
					.then((r) => {
						console.log(r.data)
						setEventList(r.data.result)
					})
					// catch error
					.catch((err) => {
						console.log('why err', err)
						alert('you are out of session. Login again')
						history.push('/login')
					})
			}
		})

		const token = localStorage.getItem('token')
		console.log(token)
		axios
			.get('http://localhost:4000/api/event/', { headers: { Authorization: `Bearer ${token}` } })
			.then((r) => {
				console.log(r.data)
				setEventList(r.data.result)
			})
			// catch error
			.catch((err) => {
				console.log('why err', err)
				history.push('/login')
			})
	}, [])

	return (
		<div className='EventWrapper'>
			<div className='EventWrapper__add'>
				<button onClick={handleClick}>Add Event</button>
			</div>

			<div className='EventWrapper__title'>
				<div>From</div>
				<div>To</div>
				<div>Content</div>
				<div>Status</div>
				<div>Actions</div>
			</div>

			<div>{addNewEventValue ? <AddEventItem /> : null} </div>

			<div className='EventWrapper__row'>
				{EventList.map((item: any) => {
					return <EventItem key={item._id} id={item._id} from={item.from} to={item.to} content={item.content} isCompleted={item.isCompleted} />
				})}
			</div>
		</div>
	)
}
