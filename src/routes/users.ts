import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Users } from './userActions'

export async function HTTPMethods(app: FastifyInstance) {
	app.get('/users', async(_, reply: FastifyReply) => {
		const users = new Users()

		const buffers = await users.getUsers()

		return reply.send(buffers)
	})  

	app.post('/create', async(request: FastifyRequest, reply: FastifyReply) => {
		const users = new Users()

		const newUser = await users.createUser(request)

		return reply.send(newUser)
	})

	app.put('/update/:id', async(request: FastifyRequest, reply: FastifyReply) => {
		const users = new Users()

		const status = await users.updateUser(request)

		console.log(status)

		return reply.send(status)
	})

	app.delete('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
		const users = new Users()

		const status = await users.deleteUser(request)

		console.log(status)

		return reply.send(status)
	})
}
