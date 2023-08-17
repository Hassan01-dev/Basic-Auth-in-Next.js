import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json()
		const { email, password } = reqBody

		const user = await User.findOne({ email })
		if (!user) {
			return NextResponse.json({ message: 'User not found' }, { status: 400 })
		}

		const validPassword = await bcryptjs.compare(password, user.password)
		if (!validPassword) {
			return NextResponse.json({ message: 'Invalid Password' }, { status: 400 })
		}

		const tokenPayload = {
			id: user._id,
			username: user.username,
			email: user.email,
		}
		const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
			expiresIn: '1d',
		})

		const response = NextResponse.json(
			{ message: 'Login successful', success: true },
			{ status: 200 }
		)
		response.cookies.set('token', token, { httpOnly: true })
		return response
	} catch (err: any) {
		console.log('my server error', err)

		return NextResponse.json({ error: err }, { status: 500 })
	}
}
