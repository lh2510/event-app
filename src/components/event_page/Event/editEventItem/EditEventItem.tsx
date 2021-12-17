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

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = (data: any) => {
		const token = localStorage.getItem('token')
		if (saveOrDelete === 'save') {
			alert('save')
		} else if (saveOrDelete === 'delete') {
			alert('delete')
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='row-wrapper'>
				<div>
					<input type='datetime-local' placeholder={props.from} {...register('from', { required: true })} />
				</div>

				<div>
					<input type='datetime-local' placeholder={props.to} {...register('to', { required: true })} />
				</div>

				<div>
					<input type='text' placeholder={props.content} {...register('content', { required: true })} />
				</div>

				<div>
					<input type='checkbox' checked={props.isCompleted ? true : false} placeholder='' {...register('isCompleted')} />
				</div>

				<input className='input-submit' type='submit' value='Save' onClick={handleSave} />
				<input className='input-submit' type='submit' value='Delete' onClick={handleDelete} />
			</div>
		</form>
	)
}
