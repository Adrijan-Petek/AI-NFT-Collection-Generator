import pinataSDK from "@pinata/sdk";
import { env } from "@/lib/env";

const pinata = env.PINATA_JWT
  ? new pinataSDK({ pinataJWTKey: env.PINATA_JWT })
  : null;

export async function uploadJSONToIPFS(json: unknown, name: string) {
  if (!pinata) {
    throw new Error("Pinata is not configured");
  }

  const result = await pinata.pinJSONToIPFS(json, {
    pinataMetadata: { name },
  });

  return {
    cid: result.IpfsHash,
    gatewayUrl: `${env.PINATA_GATEWAY}/${result.IpfsHash}`,
  };
}
