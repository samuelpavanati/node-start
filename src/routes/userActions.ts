import { FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { z } from 'zod'

export class Users {
	constructor() {
	}

	async getUsers() {
		const users = fs.readFileSync('./user-data.json', 'utf8')

		return await JSON.parse(users)
	}

	async setUsers(users: string[]) {
		const buffers = [ ...users ]

		const saveUsersToJSON = JSON.stringify(buffers, null, 2)

		fs.writeFile('./user-data.json', saveUsersToJSON, (err) => {
			if (err) {
				console.error('Error saving to JSON', err)
				return
			}
		})

		return 'Users saved in JSON successfully!'
	}

	async createUser(request: FastifyRequest) {
		const users = await this.getUsers()

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
	
		await this.setUsers(users)

		return newUser
	}

	async updateUser(request: FastifyRequest) {
		const { id } = request.params

		const registerUserSchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string().min(6),
		})

		const { name, email, password } = registerUserSchema.parse(request.body)

		let userBefore = null
		let userNow = null

		const users = await this.getUsers()

		for (let i = 0; i < users.length; i++) {
			if (id === users[i].id) {
				userBefore = users[i]

				users[i] = { id, name, email, password }

				userNow = users[i]
				break
			}
		}

		await this.setUsers(users)

		if (userBefore) {
			console.log('User before:\n', userBefore)
			console.log('User now:\n', userNow)
			return 'User updated successfully!'		
		} else {
			return 'Error! User not found!'
		}
	}

	async deleteUser(request: FastifyRequest) {
		const { id } = request.params

		const users = await this.getUsers()

		let userDeleted = null

		for (let i = 0; i < users.length; i++) {
			if (id === users[i].id) {
				userDeleted = users[i]
				users.splice(i, 1)
				break
			}
		}
		
		if (userDeleted) {
			console.log('User deleted:\n', userDeleted)
			await this.setUsers(users)
			return 'User deleted successfully!'
		} else {
			return 'Error! User not found!'
		}

	}
}
