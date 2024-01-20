import { users } from './routes/users'
import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'

const app = fastify()

app.register(fastifyCookie)
app.register(users)

const host = '0.0.0.0'
const port = 3333

app.get('/hello', () => {
	return 'Hello world!'
})

app.get('/where', async (req, reply) => {
	reply.send('I am here!')
})

app
	.listen({
		host,
		port,
	})
	.then(() => {
		console.log('🚀 HTTP Server Running!')
	})