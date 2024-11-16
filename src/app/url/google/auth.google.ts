import querystring from "querystring"
import axios from "axios";

export const getGoogleAuthURL = (redirect_address: string) => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: redirect_address,
        client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
}

export async function getGoogleUser(id_token: any, access_token: any) {
    return await axios
    .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
    )
    .then((res: any) => res.data)
    .catch((error: any) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
}

export async function getTokens({
    code,
    clientId,
    clientSecret,
    redirectUri,
}: any) {
    /*
    * Uses the code to get tokens
    * that can be used to fetch the user's profile
    */
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
    };

    return await axios
        .post(url, querystring.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res: any) => res.data)
        .catch((error: any) => {
            console.error(`Failed to fetch auth tokens`);
            throw new Error(error.message);
        });
}