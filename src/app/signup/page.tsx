'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function SignupPage() {
	const router = useRouter()
	const [buttonDisabled, setButtonDisabled] = useState(false)
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState({
		email: '',
		password: '',
		username: '',
	})
	const { username, email, password } = user

	useEffect(() => {
		if (email.length > 0 && password.length > 0 && username.length > 0) {
			setButtonDisabled(false)
		} else {
			setButtonDisabled(true)
		}
	}, [email, password, username])

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	const onFormSubmit = async (e: React.FormEvent<SubmitEvent>) => {
		try {
			e.preventDefault()
			setLoading(true)

			const response = await axios.post('/api/users/signup', user)

			console.log('Signup completed', response.data)
			toast.success(response.data.message)
			router.push('/login')
		} catch (error: any) {
			console.log('Signup failed', error)
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h1 className='mb-4 text-2xl font-bold'>
				{loading ? 'Processing Request for Signup' : 'Signup'}
			</h1>
			<hr />
			<form onSubmit={onFormSubmit}>
				<div className='mb-6'>
					<label
						htmlFor='username'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Username
					</label>
					<input
						id='username'
						className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
						type='text'
						placeholder='Enter your username'
						name='username'
						value={username}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div className='mb-6'>
					<label
						htmlFor='email'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Email
					</label>
					<input
						id='email'
						className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
						type='text'
						placeholder='Enter your email'
						name='email'
						value={email}
						onChange={handleFormChange}
						required
					/>
				</div>
				<div className='mb-6'>
					<label
						htmlFor='password'
						className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
					>
						Password
					</label>
					<input
						id='password'
						className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
						type='password'
						placeholder='Enter your password'
						name='password'
						value={password}
						onChange={handleFormChange}
						required
					/>
				</div>
				<button
					type='submit'
					className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:text-white'
					disabled={buttonDisabled}
				>
					{buttonDisabled ? 'Incomplete Information for signup' : 'Signup'}
				</button>
			</form>
			<Link href='/login'>Visit Login Page</Link>
		</div>
	)
}
