import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { useHistory } from 'react-router-dom'
interface EditEventItem {
	id?: string
	from?: string
	to?: string
	content?: string
	isCompleted?: boolean
}
export default function EditEventItem(props: EditEventItem) {
	const store = useStore()
	const history = useHistory()
	const dispatch = useDispatch()
	const [saveOrDelete, setSaveOrDelete] = useState('')
	const [deleteSuccess, setDeleteSuccess] = useState(false)
	const [checked, setChecked] = useState(props.isCompleted)
	const [from, setFrom] = useState(props.from?.slice(0, 16))
	const [to, setTo] = useState(props.to?.slice(0, 16))
	const [content, setContent] = useState(props.content)
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
					console.log(data)
					dispatch({ type: 'editItem_save', payload: { data: data, id: props.id } })
					console.log(store.getState())
				})
				// catch error
				.catch((err) => {
					console.log('why err', err)
					history.push('/login')
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
	const handleClick = () => {
		setChecked(!checked)
	}

	const handleOnChangeFrom = (e: any) => {
		setFrom(e.currentTarget.value)
	}
	const handleOnChangeTo = (e: any) => {
		setTo(e.currentTarget.value)
	}
	const handleOnChangeContent = (e: any) => {
		setContent(e.currentTarget.value)
	}

	return (
		<>
			{deleteSuccess === true ? null : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='row-wrapper'>
						<div>
							<input type='datetime-local' value={from} {...register('from')} onChange={handleOnChangeFrom} />
						</div>

						<div>
							<input type='datetime-local' value={to} {...register('to')} onChange={handleOnChangeTo} />
						</div>

						<div>
							<input type='text' value={content} {...register('content')} onChange={handleOnChangeContent} />
						</div>

						<div>
							<input type='checkbox' checked={checked ? true : false} onClick={handleClick} {...register('isCompleted')} />
						</div>

						<div>
							<input className='input-submit' type='submit' value='Save' onClick={handleSave} /> <input className='input-submit' type='submit' value='Delete' onClick={handleDelete} />
						</div>
					</div>
				</form>
			)}
		</>
	)
}
