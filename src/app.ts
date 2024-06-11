import express from 'express';
import { envs } from './config';
import { GithubController } from './presentation/github/controller';

(async () => {
  await main()
})()

async function main() {
  const app = express()

  app.use(express.json())
  // if we want work with xwww-form-urlencoded
  // app.use(express.urlencoded({ extended: true }))

  const controller = new GithubController()

  app.post("/api/github", controller.webhookHandler)



  app.listen(envs.PORT, () => {
    console.log('Server running on port', envs.PORT);
  })

}