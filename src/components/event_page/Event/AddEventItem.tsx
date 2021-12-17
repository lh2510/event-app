import React, { useState, useEffect } from 'react'
import './EventItem.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { store } from '../../../redux/addNewEvent.redux'

export default function AddEventItem() {
	const [EventList, setEventList] = useState([])
	const [update, forceUpdate] = useState(false)
	useEffect(() => {
		store.subscribe(() => {
			forceUpdate((pre) => !pre)
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
			})
	}, [])

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = (data: any) => {
		const token = localStorage.getItem('token')

		console.log(data)
		axios
			.post('http://localhost:4000/api/event', data, { headers: { Authorization: `Bearer ${token}` } })

			.then((r) => {
				console.log(r.data)
				store.dispatch({ type: 'makeFalse' })
			})
			// catch error
			.catch((err) => {
				console.log('why err', err)
			})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='row-wrapper'>
				<div>
					<input type='datetime-local' placeholder='' {...register('from', { required: true })} />
				</div>

				<div>
					<input type='datetime-local' placeholder='' {...register('to', { required: true })} />
				</div>

				<div>
					<input type='text' placeholder='' {...register('content', { required: true })} />
				</div>

				<div>
					<input type='checkbox' placeholder='' {...register('isCompleted')} />
				</div>

				<input className='input-submit' type='submit' value='Save' />
			</div>
		</form>
	)
}
