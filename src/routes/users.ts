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

		// reading latest data
		let pastData = fs.readFileSync(path, 'utf8')

		if (pastData) {
			pastData = JSON.parse(pastData)

		}

		const pastDataObject = []

		for await (const chunk of pastData) {
			pastDataObject.push(chunk)

		}

		// getting new user
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

		const addUser = JSON.stringify(saveUserSchema, null, 2)

		pastDataObject.push(JSON.parse(addUser))

		for (const i of pastDataObject) {
			console.log(i)
		}

		// save to buffer
		const buffers = [ ...pastDataObject ]

		// convert JSON to string
		const saveUserToJSON = JSON.stringify(buffers, null, 2)

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