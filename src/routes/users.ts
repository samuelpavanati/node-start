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

		const buffer = fs.readFileSync(path, 'utf8')

		console.log('buffer', buffer)

		const buffers = []

		buffers.push(buffer)

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

		// save to buffer
		buffers.push(saveUserSchema)

		// fs.readFile(path, 'utf-8')
		// , (err, data) => {
		// 	if (err) {
		// 		console.log('Error! Cannot read the file!')
		// 		return
		// 	}

		// 	try {
		// 		const getData = JSON.parse(data)
		// 		console.log('Data read from JSON file: ', getData) 
		// 	} catch (err) {
		// 		console.error('Error parsing JSON: ', err)
		// 	}
		// })

		// terminal
		// console.log(buffers)
		
		// convert to JSON
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