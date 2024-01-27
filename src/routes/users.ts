import { randomUUID } from 'node:crypto'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import fs from 'node:fs'

export async function users(app: FastifyInstance) {
	app.get('/users', async(request: FastifyRequest, reply: FastifyReply) => {

		const path = './user-data.json'

		// reading latest data
		let users = fs.readFileSync(path, 'utf8')

		if (users) {
			users = JSON.parse(users)

		}

		const usersObject = []

		for await (const chunk of users) {
			usersObject.push(chunk)

		}

		const buffers = [ ...usersObject ]

		reply.send(buffers)
	})  

	app.post('/create', async(request: FastifyRequest, reply: FastifyReply) => {
		const path = './user-data.json'

		// reading user data
		let users = fs.readFileSync(path, 'utf8')

		if (users) {
			users = JSON.parse(users)

		}

		const usersObject = []

		for await (const chunk of users) {
			usersObject.push(chunk)

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

		const newUser = JSON.stringify(saveUserSchema, null, 2)

		usersObject.push(JSON.parse(newUser))

		for (const i of usersObject) {
			console.log(i)
		}

		// save to buffer
		const buffers = [ ...usersObject ]

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
		return reply.send(newUser)
	})  
}