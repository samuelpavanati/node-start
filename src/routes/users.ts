import { randomUUID } from 'node:crypto'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import fs from 'node:fs'

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
		const path = './user-data.json'

		let buffer = fs.readFileSync(path, 'utf8')

		const buffers = []

		console.log(buffer)

		if (buffer) {
			buffer = JSON.parse(buffer)
			buffers.push(buffer)
			console.log(buffers)

		}

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

		console.log('buffer antes', buffers)

		buffer = JSON.stringify(saveUserSchema, null, 2)

		buffer = JSON.parse(buffer)

		// save to buffer
		// buffers = { ...buffer }
		buffers.push(buffer)

		// convert to JSON
		// const saveUserToJSON = JSON.stringify(buffers, null, 2)
		const saveUserToJSON = JSON.stringify(buffers, null, 2).toString()

		// save to file
		fs.writeFile(path, saveUserToJSON, (err) => {
			if (err) {
				console.error('Error saving to JSON', err)
				return
			}
			console.log('Data saved in JSON:', saveUserToJSON)
		})

		// insomnia 
		return reply.send(buffers)
	})  
}