import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EventItem from './Event/EventItem'
import './EventWrapper.css'
import AddEventItem from './Event/AddEventItem'

export default function EventPage() {
	const [EventList, setEventList] = useState([])
	const [addNewEvent, setAddNewEvent] = useState(false)

	const handleClick = () => {
		setAddNewEvent(true)
	}

	useEffect(() => {
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

			<div>{addNewEvent ? <AddEventItem /> : null}</div>

			<div className='EventWrapper__row'>
				{EventList.map((item: any) => {
					return <EventItem key={item._id} from={item.from} to={item.to} content={item.content} isCompleted={item.isCompleted} />
				})}
			</div>
		</div>
	)
}
