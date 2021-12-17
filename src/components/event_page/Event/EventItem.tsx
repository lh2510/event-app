import React, { useState } from 'react'
import './EventItem.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'

interface EventItemProps {
	from: string
	to: string
	content: string
	isCompleted: boolean
}
export default function EventItem(props: EventItemProps) {
	return (
		<div className='EventItem'>
			<div className='row-wrapper'>
				<div>{props.from}</div>
				<div>{props.to}</div>
				<div>{props.content}</div>
				<div>{props.isCompleted ? 'completed' : 'pending'}</div>
				<button>Edit</button>
			</div>
		</div>
	)
}
