import { messagingApi, webhook } from "@line/bot-sdk"
import { replyMessage } from "../repos/line-client-repos"

export const receiveFollow = async (
  client: messagingApi.MessagingApiClient, 
  event: webhook.FollowEvent
) => {
  const { replyToken } = event

  const messages = [
    {
      type: 'text',
      text: [
        'フォローありがとうございます！',
      ].join('\n'),
    } as messagingApi.TextMessage,
  ]

  await replyMessage(client, replyToken, messages)
}

export const receiveUnFollow = async () => {

}