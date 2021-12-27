import React from 'react'
import logo from './logo.svg'
import Header from './components/header/Header'
import Register from './components/register/Register'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/login/Login'
import EventPage from './components/event_page/EventWrapper'

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/login'>
						<Header content='register' />
						<Login />
					</Route>

					<Route path='/register'>
						<Header content='login' />
						<Register />
					</Route>

					<Route path='/event'>
						<Header content='logined' />
						<EventPage />
					</Route>

					<Route path='/'>
					<Header content='register' />
						<Login />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
