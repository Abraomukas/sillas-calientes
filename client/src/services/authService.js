import { jwtDecode } from "jwt-decode";
import { tenantConfig } from "../config/appConfig";

export async function loginWithGoogle(credential) {
  const claims = jwtDecode(credential);

  if (!claims.email_verified) {
    throw new Error("Your Google email is not verified.");
  }

  // "hd" (hosted domain) is only present for Google Workspace accounts
  const workspaceDomain = claims.hd?.toLowerCase();

  if (workspaceDomain !== tenantConfig.emailDomain) {
    throw new Error(
      `Please sign in with your @${tenantConfig.emailDomain} company account.`,
    );
  }

  return {
    email: claims.email,
    name: claims.name,
    picture: claims.picture,
    credential, // the backend will receive this token in Step 4
  };
}
