import { FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { z } from 'zod'

export class User {
	constructor() {
	}

	async read() {
		let users = fs.readFileSync('./user-data.json', 'utf8')

		if (users) {
			users = JSON.parse(users)
		}

		const buffers = []

		for await (const chunk of users) {
			buffers.push(chunk)
		}

		return [ ...buffers ]
	}

	async write(request: FastifyRequest) {
		// get users
		const users = await this.read()

		// get new user
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

		users.push(JSON.parse(newUser))

		// save to buffer
		const buffers = [ ...users ]

		// convert JSON to string
		const saveUsersToJSON = JSON.stringify(buffers, null, 2)

		// save to file
		fs.writeFile('./user-data.json', saveUsersToJSON, (err) => {
			if (err) {
				console.error('Error saving to JSON', err)
				return
			}

			console.log('Data saved in JSON:', saveUsersToJSON)
		})

		return newUser
	}

}