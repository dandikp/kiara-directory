import { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Handler = (req: NextRequest, context?: any) => Promise<Response>;

export function withAuth(handler: Handler): Handler {
  return async (req, context) => {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: "Silakan login terlebih dahulu.",
        }),
        { status: 401 },
      );
    }

    return handler(req, context);
  };
}
