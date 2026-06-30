import { messagingApi, webhook } from "@line/bot-sdk"

export const receiveFollow = async (client: messagingApi.MessagingApiClient, event: webhook.FollowEvent) => {
  const { replyToken } = event
  try {
    const { userId } = event.source
    if (!userId) {
      throw new Error('userId is not found.')
    }

    await replyMessage(client, replyToken, messages)

  } catch (e) {
    throw e
  }
}

export const receiveUnFollow = async (client: messagingApi.MessagingApiClient, event: webhook.UnfollowEvent) => {
  try {
    const { userId } = event.source
    if (!userId) {
      throw new Error('userId is not found.')
    }

} catch (e) {

    throw e
  }
}