import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';

(async () => {
  await main()
})()

async function main() {
  const app = express()

  // if we want work with xwww-form-urlencoded
  // app.use(express.urlencoded({ extended: true }))

  app.use(express.json())

  app.use(GithubSha256Middleware.verifySignature)

  const controller = new GithubController()


  app.post("/api/github", controller.webhookHandler)



  app.listen(envs.PORT, () => {
    console.log('Server running on port', envs.PORT);
  })

}