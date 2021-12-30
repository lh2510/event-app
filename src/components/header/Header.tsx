import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Header.css'
import { useSelector, RootStateOrAny } from 'react-redux'
interface HeaderProps {
	content: string
}
export default function Header(props: HeaderProps) {
	const userName = useSelector((state: RootStateOrAny) => state.userName)
	const [show, setShow] = useState(false)
	const history = useHistory()
	const handleClick = () => {
		setShow(!show)
	}

	const handleClickLogout = () => {
		localStorage.removeItem('token')
		history.push('./login')
		setShow(false)
	}
	return (
		<div className='Header'>
			<div className='Header__logo'>Event List</div>
			{(() => {
				if (props.content !== 'logined') {
					if (props.content === 'login' || props.content === 'register') {
						return (
							<Link
								to={{
									pathname: `/${props.content.toLowerCase()}`,
								}}
							>
								<div className='Header__login'>{props.content}</div>
							</Link>
						)
					} else {
						return (
							<div className='Header__login'>
								<Link
									to={{
										pathname: `/login`,
									}}
								>
									<div className='login'>Login</div>
								</Link>

								<Link
									to={{
										pathname: `/register`,
									}}
								>
									<div>Register</div>
								</Link>
							</div>
						)
					}
				} else {
					return (
						<div className='Header-logined'>
							<span className='Header-logined__welcome'>Welcome,{userName} </span>
							<span className='Header-logined__avatar' onClick={handleClick}></span>
							<div className='Header__logout' style={{ display: show ? 'block' : 'none' }} onClick={handleClickLogout}>
								{' '}
								Logout
							</div>
						</div>
					)
				}
			})()}
		</div>
	)
}
