import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
	content: string
}
export default function Header(props: HeaderProps) {
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
									<div >Register</div>
								</Link>
							</div>
						)
					}
				} else {
					return (
						<div className='Header-logined'>
							<span className='Header-logined__avatar'></span>
						</div>
					)
				}
			})()}
		</div>
	)
}
