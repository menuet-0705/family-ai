import { messagingApi, webhook } from "@line/bot-sdk";

export const receivePostback = async (
  messageClient: messagingApi.MessagingApiClient, 
  event: webhook.PostbackEvent
) => {

}