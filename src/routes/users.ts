import { randomUUID } from 'node:crypto'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function users(fastify: FastifyInstance) {
	fastify.get('/users', async(request: FastifyRequest, reply: FastifyReply) => {
		reply.send({
			id: randomUUID(),
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})
	})  
}