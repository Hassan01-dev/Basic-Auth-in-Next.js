'use client'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import React, { useState } from 'react'

export default function ProfileIndexPage() {
	const router = useRouter()
	const [userId, setUserId] = useState(null)

	const getUserId = async () => {
		const res = await axios.get('/api/users/me')
		console.log(res.data)
		setUserId(res.data.user._id)
	}

	const handleLogout = async () => {
		try {
			const response = await axios.get('/api/users/logout')
			toast.success(response.data.message)
			router.push('/login')
		} catch (error: any) {
			console.log(error.message)
			toast.error(error.message)
		}
	}

	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h1 className='text-3xl font-bold'>Profile index page</h1>
			<hr />
			<h2 className='rounded p-2 bg-violet-500'>
				{userId === null ? (
					'Fetch User ID first'
				) : (
					<Link href={`/profile/${userId}`}>{userId}</Link>
				)}
			</h2>
			<button
				onClick={getUserId}
				className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
			>
				Fetch User ID
			</button>
			<hr />
			<button
				onClick={handleLogout}
				className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Logout
			</button>
		</div>
	)
}
