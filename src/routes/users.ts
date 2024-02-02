import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Users } from './userManager'
import { PrismaClient } from '@prisma/client'

export async function HTTPMethods(app: FastifyInstance) {
	const users = new Users()
	const prisma = new PrismaClient()
	
	app.get('/users', async(_, reply: FastifyReply) => {
		const buffers = await users.getUsers()

		return reply.send(buffers)
	})  

	app.post('/users', async(request: FastifyRequest, reply: FastifyReply) => {
		const user = await users.createUser(request)

		prisma.user.create({
			data: {
				id: user.id,
				name: user.name,
				email: user.email,
				password_hash: user.password,
			},
		})

		return reply.send(user)
	})

	app.put('/users/:id', async(request: FastifyRequest, reply: FastifyReply) => {
		const status = await users.updateUser(request)
		console.log(status)

		return reply.send(status)
	})

	app.delete('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
		const status = await users.deleteUser(request)
		console.log(status)

		return reply.send(status)
	})
}
