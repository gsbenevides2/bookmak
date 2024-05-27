import axios from "axios";
import jwt from "jsonwebtoken";
import { readJsonFile } from "../readJsonFile";

export interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export async function retriveAccessToken(
  serviceAccount: ServiceAccount,
): Promise<string> {
  const token = jwt.sign(
    {
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      aud: "https://oauth2.googleapis.com/token",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    },
    serviceAccount.private_key,
    {
      algorithm: "RS256",
    },
  );

  const accessTokenResponse = await axios.post(
    `https://oauth2.googleapis.com/token`,
    {
      client_id: serviceAccount.client_id,
      client_secret: serviceAccount.private_key,
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: token,
    },
  );
  const accessToken = accessTokenResponse.data.access_token as string;
  return accessToken;
}

export function getServiceAccountPath(): string {
  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (path == null) throw new Error("GOOGLE_APPLICATION_CREDENTIALS not found");
  return path;
}

export function getServiceAccount(): ServiceAccount {
  const creds = getServiceAccountPath();
  const serviceAccount = readJsonFile<ServiceAccount>(creds);
  return serviceAccount;
}
