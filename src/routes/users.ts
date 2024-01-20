import { randomUUID } from 'node:crypto'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function users(app: FastifyInstance) {
	app.get('/users', async(request: FastifyRequest, reply: FastifyReply) => {
		reply.send({
			id: randomUUID(),
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		})
	})  

	app.post('/create', async(request: FastifyRequest, reply: FastifyReply) => {
		const registerUserSchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(6),
		})

		const { name, email, password } = registerUserSchema.parse(request.body)

		reply.send({
			id: randomUUID(),
			name,
			email,
			password,
		})
	})  
}