import viteFastify from "@fastify/vite/plugin"
import react from "@vitejs/plugin-react"
import { join } from "path"
import { defineConfig } from "vite"
	
export default defineConfig(({ mode }) => ({
	root: join(__dirname, "src", "client"),
	plugins: [viteFastify({ spa: true }), react()],
}))
