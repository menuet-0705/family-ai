import {
  messagingApi, validateSignature
} from "@line/bot-sdk";

export const getMessagingClient = () => {
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!channelAccessToken) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not set");
  }

  return new messagingApi.MessagingApiClient({
    channelAccessToken,
  });
};

export const verifyLineSignature = (body: string, signature: string | null) => {

  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  if (!channelSecret) {
    throw new Error("LINE_CHANNEL_SECRET is not set");
  }

  if (!signature) {
    return false;
  }

  return validateSignature(body, channelSecret, signature);
};

export const replyMessage = async (
  messageClient: messagingApi.MessagingApiClient,
  replyToken: string,
  messages: messagingApi.Message[]
) => {
  await messageClient.replyMessage({
    replyToken: replyToken,
    messages: messages,
  })
}

export const replySimpleMessage = async (
  messageClient: messagingApi.MessagingApiClient,
  replyToken: string,
  message: string
) => {
  await messageClient.replyMessage({
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: message,
      },
    ],
  })
}

export const pushSimpleMessage = async (
  messageClient: messagingApi.MessagingApiClient,
  userId: string,
  message: string
) => {
  const replyMessage: messagingApi.PushMessageRequest = {
    to: userId,
    messages: [
      {
        type: 'text',
        text: message,
      },
    ],
  }

  await messageClient.pushMessage(replyMessage)
}

export const replyGuidanceMessage = async (
  messageClient: messagingApi.MessagingApiClient,
  replyToken: string | null
) => {
  // FIXME: ユーザーにわかりやすいメッセージ
  await replySimpleMessage(
    messageClient, 
    replyToken, 
    '未サポートの処理です。'
  )
}