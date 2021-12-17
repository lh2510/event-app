import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import axios from 'axios'

interface EditEventItem {
	id?: string
	from?: string
	to?: string
	content?: string
	isCompleted?: boolean
}
export default function EditEventItem(props: EditEventItem) {
	const [saveOrDelete, setSaveOrDelete] = useState('')
	const [deleteSuccess, setDeleteSuccess] = useState(false)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = (data: any) => {
		const token = localStorage.getItem('token')

		if (saveOrDelete === 'save') {
			axios
				.put(`http://localhost:4000/api/event/${props.id}`, data, { headers: { Authorization: `Bearer ${token}` } })
				.then((r) => {
					console.log(r.data)
				})
				// catch error
				.catch((err) => {
					console.log('why err', err)
				})
		} else if (saveOrDelete === 'delete') {
			axios
				.delete(`http://localhost:4000/api/event/${props.id}`, { headers: { Authorization: `Bearer ${token}` } })
				.then((r) => {
					console.log(r.data)
					setDeleteSuccess(true)
				})
				// catch error
				.catch((err) => {
					console.log('why err', err)
				})
		}
		console.log(data)
	}

	const handleSave = () => {
		setSaveOrDelete('save')
	}
	const handleDelete = () => {
		setSaveOrDelete('delete')
	}

	return (
		<>
			{deleteSuccess === true ? null : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='row-wrapper'>
						<div>
							<input type='datetime-local' placeholder={props.from} {...register('from')} />
						</div>

						<div>
							<input type='datetime-local' placeholder={props.to} {...register('to')} />
						</div>

						<div>
							<input type='text' placeholder={props.content} {...register('content')} />
						</div>

						<div>
							<input type='checkbox' placeholder='' {...register('isCompleted')} />
						</div>

						<input className='input-submit' type='submit' value='Save' onClick={handleSave} />
						<input className='input-submit' type='submit' value='Delete' onClick={handleDelete} />
					</div>
				</form>
			)}
		</>
	)
}
