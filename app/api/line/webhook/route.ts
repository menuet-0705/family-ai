import { getMessagingClient, verifyLineSignature } from "@/app/com/repos/line-client";
import { receiveFollow, receiveUnFollow } from '@/app/com/service/follow-service';
import {
  LINE_SIGNATURE_HTTP_HEADER_NAME,
  messagingApi,
  webhook,
} from '@line/bot-sdk';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get(LINE_SIGNATURE_HTTP_HEADER_NAME);

    if (!verifyLineSignature(rawBody, signature)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid LINE signature",
        },
        { status: 401 },
      );
    }

    const body: webhook.CallbackRequest = JSON.parse(rawBody);
    const events = body.events ?? [];

    await Promise.all([handleWebhookEvent(events)])

    return NextResponse.json({
      ok: true,
      eventCount: events.length,
    });
  } catch (error) {
    console.error("LINE webhook error", error);
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

const handleWebhookEvent = async (events: webhook.Event[]) => {
  if (!events) {
    return
  }

  let client: messagingApi.MessagingApiClient | undefined = undefined;
  try {
    client = getMessagingClient();
    for (const event of events) {
      switch (event.type) {
        case 'message':
          await receiveMessage(client, event)
          break
        case 'postback':
          await receivePostback(client, event)
          break
        case 'follow':
          await receiveFollow(client, event)
          break
        case 'unfollow':
          await receiveUnFollow(client, event)
          break
        default: {
          break
        }
      }
    }
  } catch (e) {
    throw e
  } finally {

  }
}
