import type { Request, Response } from "express";
import { DiscordService, GithubService } from "../services";


export class GithubController {
  // dependencies injection on constructor
  constructor(
    private readonly githubService = new GithubService(),
    private readonly discordService = new DiscordService()
  ) { }

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header('x-github-event') ?? 'unknown';
    const signature = req.header('x-hub-signature-256') ?? 'unknown';
    let message: string

    const payload = req.body;

    switch (githubEvent) {
      case "star":
        message = this.githubService.onStar(payload);
        break

      case "issues":
        message = this.githubService.onIssue(payload);
        break

      default:
        message = `unknown event: ${githubEvent}`;

    }

    this.discordService.notify(message)
      .then(() => res.status(202).send("Accepted"))
      .catch(() => res.status(400).json({ error: 'Internal server error' }))
  }
}