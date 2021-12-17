import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function Login() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = (data: any) => {
		console.log(data)
		if (data.password === data.repeatPassword) {
			axios
				.post('http://localhost:4000/api/user/signup', {
					username: data.userName,
					password: data.password,
				})

				.then((r) => {
					console.log(r.data)
				})
				// catch error
				.catch((err) => {
					console.log('why err', err)
				})
		} else {
			alert('repeat password does not match the password')
		}
	}

	return (
		<div className='Register'>
			<h1>Register</h1>
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

					<div>
						<label> Repeat password</label>
						<input type='password' placeholder='Repeat Password' {...register('repeatPassword', { required: true })} />
					</div>
				</div>

				<input className='next' type='submit' value='Next' />
			</form>
		</div>
	)
}
