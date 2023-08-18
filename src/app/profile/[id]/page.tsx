export default function ProfileShowPage({ params }: any) {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen py-2'>
			<h1 className='text-3xl font-bold'>Profile show page for</h1>
			<span className='p-2 border border-gray-300 rounded-lg'>{params.id}</span>
		</div>
	)
}
