import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Example of role-based sub-route protection if needed
        // if (path.startsWith("/admin/dashboard/super") && token?.role !== "SUPERUSER") {
        //     return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        // }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/admin/login",
        },
    }
);

export const config = {
    matcher: ["/admin/dashboard/:path*"],
};
