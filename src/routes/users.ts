import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { User } from './userActions'

export async function HTTPMethods(app: FastifyInstance) {
	app.get('/users', async(request: FastifyRequest, reply: FastifyReply) => {
		const users = new User()

		const buffers = await users.read()

		reply.send(buffers)
	})  

	app.post('/create', async(request: FastifyRequest, reply: FastifyReply) => {
		const users = new User()

		const newUser = await users.write(request)

		return reply.send(newUser)
	})  
}