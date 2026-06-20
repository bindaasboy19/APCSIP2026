import app from './app.js'
import { connectDatabase, getPersistenceMode } from './config/db.js'
import { env } from './config/env.js'

async function startServer() {
  await connectDatabase()

  app.listen(env.port, env.host, () => {
    console.log(`[server] Listening on ${env.host}:${env.port} (${getPersistenceMode()} mode)`)
  })
}

startServer().catch((error) => {
  console.error('[server] Failed to start application.', error)
  process.exit(1)
})
