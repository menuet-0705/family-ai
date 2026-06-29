import { LineWebhookBody } from "@/app/com/dto/line";
import { getMessagingClient, verifyLineSignature } from "@/app/com/repos/line-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("x-line-signature");
    const rawBody = await request.text();

    if (!verifyLineSignature(rawBody, signature)) {
      return NextResponse.json(
        {
          ok: false,
          message: "Invalid LINE signature",
        },
        { status: 401 },
      );
    }

    const body = JSON.parse(rawBody) as LineWebhookBody;
    const client = getMessagingClient();
    const events = body.events ?? [];

    await Promise.all(
      events
        .filter((event) => typeof event.replyToken === "string" && event.replyToken.length > 0)
        .map((event) =>
          client.replyMessage({
            replyToken: event.replyToken as string,
            messages: [
              {
                type: "text",
                text: "メッセージありがとう！",
              },
            ],
          }),
        ),
    );

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
