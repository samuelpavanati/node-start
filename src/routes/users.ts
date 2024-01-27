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

		let pastData = fs.readFileSync(path, 'utf8')

		if (pastData) {
			pastData = JSON.parse(pastData)
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

		let currentData = JSON.stringify(saveUserSchema, null, 2)

		currentData = JSON.parse(currentData)

		console.log('pastData', pastData)
		console.log('currentData', currentData)

		// save to buffer
		let newJSON = { ...pastData, ...currentData }

		// let newJSON
		// if (pastData !== null) {
		// 	newJSON = JSON.parse((JSON.stringify(pastData, null, 2) + JSON.stringify(currentData, null, 2)).replace(/}{/g,','))
		// } else {
		// 	newJSON = JSON.parse(JSON.stringify(currentData, null, 2).replace(/}{/g,','))
		// }

		// buffers.push(buffer)

		// convert to JSON
		// const saveUserToJSON = JSON.stringify(buffers, null, 2)
		const saveUserToJSON = JSON.stringify(newJSON, null, 2).toString()

		// save to file
		fs.writeFile(path, saveUserToJSON, (err) => {
			if (err) {
				console.error('Error saving to JSON', err)
				return
			}
			console.log('Data saved in JSON:', saveUserToJSON)
		})

		// insomnia 
		return reply.send(newJSON)
	})  
}