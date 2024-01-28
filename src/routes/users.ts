import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { User } from './userActions'

export async function HTTPMethods(app: FastifyInstance) {
	app.get('/users', async(_, reply: FastifyReply) => {
		const users = new User()

		const buffers = await users.read()

		return reply.send(buffers)
	})  

	app.post('/create', async(request: FastifyRequest, reply: FastifyReply) => {
		const users = new User()

		const newUser = await users.create(request)

		return reply.send(newUser)
	})

	app.delete('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {

		const { id } = request.params

		const users = new User()

		const status = await users.delete(id)

		console.log(status)

		return reply.code(204).send(status)
	})
}
