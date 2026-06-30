import { messagingApi, validateSignature } from "@line/bot-sdk";

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
