import { FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { z } from 'zod'

interface User {
	id: string
	name: string
	email: string
	password: string
}

interface NewUserData {
	name: string
	email: string
	password: string
}

// used when there is no user in user-data.json
const firstUser =
[
	{
		'id': 'eb0ce556-c4b6-4719-afe9-6d69d4c7c5bf',
		'name': 'First User',
		'email': 'firstuser@example.com',
		'password': '123456'
	}
]

export class Users {
	private readonly filePath = './user-data.json'

	private async readUserFile(): Promise<User[]> {
		const usersData = fs.readFileSync(this.filePath, 'utf-8')

		if (usersData.length < 1) {
			return JSON.parse( JSON.stringify(firstUser, null, 2) )			
		}

		return JSON.parse(usersData)
	}

	private async writeUsersFile(users: User[]): Promise<void> {
		const userJSON = JSON.stringify(users, null, 2)
		
		fs.writeFile(this.filePath, userJSON, (err) => {
			if (err) {
				console.error('Error saving to JSON', err)
			}
		})
	}

	private validateUserInput(request: FastifyRequest): NewUserData {
		const registerUserSchema = z.object({
			name: z.string(),
			email: z.string(),
			password: z.string(),
		})
		
		return registerUserSchema.parse(request.body)
	}

	async getUsers(): Promise<User[]> {

		return await this.readUserFile()
	}

	async setUsers(users: User[]): Promise<string> {		
		await this.writeUsersFile(users)
		
		return 'Users saved in JSON successfully!'
	}

	async createUser(request: FastifyRequest): Promise<User> {
		const { name, email, password } = this.validateUserInput(request)
		const newUser: User = { id: randomUUID(), name, email, password }
		const users = await this.getUsers()
		
		users.push(newUser)
		
		await this.setUsers(users)
		
		return newUser
	}

	async updateUser(request: FastifyRequest) {
		const params = request.params as { id: string }
		const { id } = params
		const { name, email, password } = this.validateUserInput(request)
		const users = await this.getUsers()

		const index = users.findIndex(user => user.id === id)

		if (index !== -1) {
			const userBefore = users[index]
			
			users[index] = { id, name, email, password }
			
			await this.setUsers(users)
			
			console.log('User before:\n', userBefore)
			console.log('User now:\n', users[index])
			
			return 'User updated successfully!'		
		} else {
			
			return 'Error! User not found!'
		}
	}

	async deleteUser(request: FastifyRequest) {
		const params = request.params as { id: string }
		const { id } = params
		
		if (!id) {
			return
		}

		const users = await this.getUsers()
		const index = users.findIndex(user => user.id === id)
		
		if (index !== -1) {
			const userDeleted = users.splice(index, 1)[0]
			
			await this.setUsers(users)
			
			console.log('User deleted:\n', userDeleted)
			
			return 'User deleted successfully!'
		} else {
			
			return 'Error! User not found!'
		}
	}
}
