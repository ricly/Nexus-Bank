import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/forgot-password(.*)",
  "/",
  "/portal(.*)",
  "/images(.*)",
  "/favicon.ico",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // console.log("IS NOT PUBLIC ROUTE", request.nextUrl.href);
    await auth.protect();
  }

  // console.log("IS PUBLIC", request.nextUrl.href);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
