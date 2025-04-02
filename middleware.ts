import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/products(.*)",
    "/categories(.*)",
    "/about",
    "/contact",
    "/help-center(.*)",
    "/shipping",
    "/returns",
    "/faq",
    "/careers",
    "/press",
    "/sale",
    "/new-arrivals",
    "/featured",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api(.*)",
  ],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

