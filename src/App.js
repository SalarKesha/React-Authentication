import React from 'react'
import './style.css'
import { useAuthState } from './Context/auth-context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Dashboard from './Pages/Dashboard'
import NotFound from './Pages/NotFound'
import { Link, Routes, Route } from 'react-router-dom'
import PrivateRoute from './Components/PrivateRoute';


export default function App() {
	// const { token } = useAuthState()
	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{/* {token ? <Dashboard /> : <Login />} */}
			<ul className='nav'>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/blog'>Blog</Link></li>
				<li><Link to='/dashboard'>Dashboard</Link></li>
			</ul>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/blog' element={<Blog />} />
				<Route element={<PrivateRoute />}>
					<Route path='/dashboard' element={<Dashboard />} />
				</Route>
				<Route path='*' element={<NotFound />} />
			</Routes>

		</>
	)
}

