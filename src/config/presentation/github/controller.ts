import type { Request, Response } from "express";
import { GithubService } from '../../../services/github.service';

export class GithubController {
  // dependencies injection on constructor
  constructor(private readonly githubService = new GithubService()) { }

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


    console.log({ message });

    res.status(202).send("Accepted");
  }
}