import FastifyVite from "@fastify/vite"
import FastifyWebsocket from "@fastify/websocket"
import Fastify from "fastify"
import { resolve } from "path"

export const fastify = Fastify({
	logger: {
		level: "debug",
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
})

await fastify.register(FastifyWebsocket)

await fastify.register(FastifyVite, {
	root: resolve(__dirname, ".."),
	dev: true,
	spa: true,
})

fastify.route({
	method: "GET",
	url: "/*",
	logLevel: "warn",
	handler: async (_, reply) => reply.html(),
})
await fastify.vite.ready()

await fastify.listen({ port: 3000, host: "0.0.0.0" })