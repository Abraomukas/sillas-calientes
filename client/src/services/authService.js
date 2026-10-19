import { jwtDecode } from "jwt-decode";
import { clientConfig } from "../config/appConfig";

export async function loginWithGoogle(credential) {
  const claims = jwtDecode(credential);

  if (!claims.email_verified) {
    throw new Error("Your Google email is not verified.");
  }

  // "hd" (hosted domain) is only present for Google Workspace accounts
  const workspaceDomain = claims.hd?.toLowerCase();

  if (workspaceDomain !== clientConfig.emailDomain) {
    throw new Error(
      `Please sign in with your @${clientConfig.emailDomain} company account.`,
    );
  }

  return {
    email: claims.email,
    name: claims.name,
    picture: claims.picture,
    credential,
  };
}
