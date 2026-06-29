export type LineWebhookEvent = {
  type?: string;
  replyToken?: string;
};

export type LineWebhookBody = {
  events?: LineWebhookEvent[];
};