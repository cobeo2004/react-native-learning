import NextAuth from "next-auth/next";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                const res = await fetch("/api/login", {
                    method: 'POST',
                    body: JSON.stringify({
                        username: credentials.username,
                        password: credentials.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                if (user) {
                    return user
                } else {
                    return null
                }

            }
        })
    ]
});

export { handler as GET, handler as POST }

function CredentialsProvider(arg0: {
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: string;
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: { username: { label: string; type: string; placeholder: string; }; password: { label: string; type: string; }; }; authorize(credentials: any, req: any): Promise<any>;
}): import("next-auth/providers/index").Provider {
    throw new Error("Function not implemented.");
}
