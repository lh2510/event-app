import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
	content: string
}
export default function Header(props: HeaderProps) {
	return (
		<div className='Header'>
			<div className='logo'></div>
			{(() => {
				if (props.content !== 'logined') {
					if (props.content === 'login' || props.content === 'register') {
						return (
							<Link
								to={{
									pathname: `/${props.content.toLowerCase()}`,
								}}
							>
								<div className='login'>{props.content}</div>
							</Link>
						)
					} else {
						return (
							<>
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
									<div className='login'>Register</div>
								</Link>
							</>
						)
					}
				} else {
					return (
						<div className='logined'>
							<span className='avatar'></span>
						</div>
					)
				}
			})()}
		</div>
	)
}
