import fastify from 'fastify'

const app = fastify()
const port = 3333

app.get('/hello', () => {
	return 'Hello world!'
})

app.get('/where', async (req, reply) => {
	reply.send('I am here!')
})

app
	.listen({
		port,
	})
	.then(() => {
		console.log('🚀 HTTP Server Running!')
	})