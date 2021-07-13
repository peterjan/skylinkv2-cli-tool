import { readFileSync, existsSync } from "fs";
import { KeyPair } from "skynet-js";

export function loadKeys(path: string): KeyPair {
  if (!existsSync(path)) {
    throw new Error(`Could not find keys file at '${path}'.`);
  }

  const contents = readFileSync(path);
  const [publicKey, privateKey] = contents.toString().split("\n");
  if (!publicKey || !privateKey) {
    throw new Error(`Could not parse keys at '${path}'.`);
  }

  return { publicKey, privateKey };
}
