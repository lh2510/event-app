import React from 'react'
import './Login.css'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
	let history = useHistory()
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = (data: any) => {
		console.log(data)

		axios
			.post('http://localhost:4000/api/user/login', {
				username: data.userName,
				password: data.password,
			})

			.then((r) => {
				console.log(r.data)
				history.push({
					pathname: `/event`,
				})
			})
			// catch error
			.catch((err) => {
				console.log('why err', err)
			})
	}

	return (
		<div className='Login'>
			<h1> Login</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<div>
						<label> Username</label>
						<input type='text' placeholder='User name' {...register('userName', { required: true, maxLength: 20 })} />
					</div>

					<div>
						<label> Password</label>
						<input type='password' placeholder='Password' {...register('password', { required: true })} />
					</div>
				</div>

				<input className='next' type='submit' value='Next' />
			</form>
		</div>
	)
}
