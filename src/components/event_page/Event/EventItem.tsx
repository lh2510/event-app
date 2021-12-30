import React, { useState } from 'react'
import './EventItem.css'
import EditEventItem from './EditEventItem'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { displayTime } from '../../../utils/displayTime'
interface EventItemProps {
	id: string
	from: string
	to: string
	content: string
	isCompleted: boolean
}
export default function EventItem(props: EventItemProps) {
	const saved = useSelector((state: RootStateOrAny) => state.editSave)

	const [editId, setEditId] = useState('')

	const handleClick = (e: any) => {
		console.log(e.currentTarget.id)
		setEditId(e.currentTarget.id)
	}
	return (
		<>
			{editId === props.id && saved === false ? ( //if user click this eventItem
				<EditEventItem id={props.id} from={props.from} to={props.to} content={props.content} isCompleted={props.isCompleted} />
			) : (
				<div className='EventItem'>
					<div className='row-wrapper'>
						<div>{displayTime(props.from)}</div>
						<div>{displayTime(props.to)}</div>
						<div>{props.content}</div>
						<div>{props.isCompleted ? 'completed' : 'pending'}</div>
						<button id={props.id} onClick={handleClick}>
							Edit
						</button>
					</div>
				</div>
			)}
		</>
	)
}
