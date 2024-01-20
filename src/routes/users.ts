import { randomUUID } from 'node:crypto'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import fs from 'fs/promises'

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

		const buffers = []

		const registerUserSchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(6),
		})

		const { name, email, password } = registerUserSchema.parse(request.body)

		const saveUserSchema = {
			id: randomUUID(),
			name: name,
			email: email,
			password: password,
		}

		// save to buffer
		buffers.push(saveUserSchema)

		// terminal
		console.log(buffers)
		
		// convert to JSON
		const saveUserToJSON = JSON.stringify(buffers, null, 2)

		const saveFile = './user-data.json'

		// save to file
		await fs.appendFile(saveFile, saveUserToJSON)

		// insomnia 
		return reply.send(buffers)
	})  
}
