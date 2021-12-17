import React, { useEffect } from 'react'
import axios from 'axios'

export default function EventPage() {
	useEffect(() => {
		const token = localStorage.getItem('token')
		console.log(token)
		axios

			.get('http://localhost:4000/api/event/', { headers: { Authorization: `Bearer ${token}` } })
			.then((r) => {
				console.log(r.data)
			})
			// catch error
			.catch((err) => {
				console.log('why err', err)
			})
	}, [])

	return <h1> event page</h1>
}
