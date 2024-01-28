import { FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { z } from 'zod'

export class User {
	constructor() {
	}

	async read() {
		const users = fs.readFileSync('./user-data.json', 'utf8')

		return await JSON.parse(users)
	}

	async create(request: FastifyRequest) {
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
			name,
			email,
			password,
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

	async delete(id: string) {
		const users = await this.read()

		let userDeleted = null

		for (let i = 0; i < users.length; i++) {
			if (id === users[i].id) {
				userDeleted = users[i]
				users.splice(i, 1)
				break
			}
		}
		
		if (userDeleted) {
			console.log(userDeleted)

			const saveUsersToJSON = JSON.stringify(users, null, 2)

			// save to file
			fs.writeFile('./user-data.json', saveUsersToJSON, (err) => {
				if (err) {
					console.error('Error saving to JSON', err)
					return
				}
				console.log('Saved to JSON successfully!')
			})
			
			return 'User deleted successfully!'

		} else {
			return 'Error! User not found!'
		}

	}
}