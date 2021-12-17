import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EventItem from './Event/EventItem'
import './EventWrapper.css'

export default function EventPage() {
	const [EventList, setEventList] = useState([])
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
			<h1> event page</h1>

			<div className='EventWrapper__title'>
				<div>From</div>
				<div>To</div>
				<div>Content</div>
				<div>Status</div>
				<div>Actions</div>
			</div>
			<div className='EventWrapper__row'>
				{EventList.map(() => {
					return <EventItem />
				})}
			</div>
		</div>
	)
}
