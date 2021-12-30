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
	const dispatch = useDispatch()
	const editIdList = useSelector((state: RootStateOrAny) => state.editIdList)

	const handleClick = (e: any) => {
		dispatch({ type: 'pushToeditIdList', payload: e.currentTarget.id })
	}
	return (
		<>
			{editIdList.includes(props.id) ? ( //if user click this eventItem
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
