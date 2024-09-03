import GmailLogo from "~/public/icons8-gmail.svg";
import GithubLogo from "~/public/icons8-github.svg";
import WebhookLogo from "~/public/icons8-webhook.svg";
import NotionLogo from "~/public/icons8-notion.svg";
import DiscordLogo from "~/public/icons8-discord.svg";
import DriveLogo from "~/public/icons8-drive.svg"

export interface ActionImagesType {
    [key: string]: React.ComponentType<any>
}

export const ActionImages: ActionImagesType = {
    Github: GithubLogo,
    Gmail: GmailLogo,
    Webhook: WebhookLogo,
    Notion: NotionLogo,
    Discord: DiscordLogo,
    Drive: DriveLogo
}