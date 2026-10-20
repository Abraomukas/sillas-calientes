import { jwtDecode } from "jwt-decode";
import { clientConfig } from "../config/appConfig";

export async function loginWithGoogle(credential) {
  const claims = jwtDecode(credential);

  if (!claims.email_verified) {
    throw new Error("Your Google email is not verified.");
  }

  // "hd" (hosted domain) is only present for Google Workspace accounts
  // const workspaceDomain = claims.hd?.toLowerCase();

  // if (workspaceDomain !== clientConfig.emailDomain) {
  //   throw new Error(
  //     `Please sign in with your @${clientConfig.emailDomain} company account.`,
  //   );
  // }

  let domain = claims.email.split("@")[1];

  if (claims.email.split("@")[1] !== clientConfig.emailDomain) {
    throw new Error(
      `Please sign in with your @${clientConfig.emailDomain} company account.`,
    );
  } else {
    console.log("EMAIL\n" + claims.email);
    console.log("DOMAIN\n" + domain);
    console.log("AUTH PASSED");
  }

  return {
    email: claims.email,
    name: claims.name,
    picture: claims.picture,
    credential,
  };
}
