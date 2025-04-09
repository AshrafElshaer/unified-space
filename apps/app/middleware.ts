import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import {
	type MiddlewareConfig,
	type NextRequest,
	NextResponse,
} from "next/server";

const publicRoutes = ["/auth", "/api/auth"];

export async function middleware(request: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const pathname = request.nextUrl.pathname;

	if (publicRoutes.includes(pathname)) {
		return NextResponse.next();
	}

	if (!session) {
		return NextResponse.redirect(
			new URL(`/auth?redirect_url=${pathname}`, request.url),
		);
	}

	return NextResponse.next({
		headers: {
			"x-pathname": pathname,
			"x-user-id": session.user.id,
		},
	});
}

export const config = {
	runtime: "nodejs",
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
