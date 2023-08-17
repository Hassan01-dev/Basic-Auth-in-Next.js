'use client'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function ProfileIndexPage() {
	const router = useRouter()
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
			<button
				onClick={handleLogout}
				className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
			>
				Logout
			</button>
		</div>
	)
}
