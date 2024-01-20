// import { users } from './routes/users'
// import fastify from 'fastify'
// import fastifyCookie from '@fastify/cookie'

import { app } from './app'
import { env } from './env'

app
	.listen({
		host: '0.0.0.0',
		port: env.PORT,
	})
	.then(() => {
		console.log('🚀 HTTP Server Running!')
	})