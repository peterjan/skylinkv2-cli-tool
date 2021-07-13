import { Command, flags } from "@oclif/command";
import { randomBytes } from "crypto";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { genKeyPairFromSeed } from "skynet-js";
import { dirname, extname } from "path";
import { loadKeys } from "../utils/utils";

export default class Keys extends Command {
  static description = "generate a key pair";

  static args = [
    {
      name: "seed",
      required: false,
      description: "seed to generate keys with",
      default: randomBytes(24).toString("hex"),
    },
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    keyfile: flags.string({
      description: "Location of the key file.",
      default: "keys.txt",
    }),
  };

  async run() {
    const { args, flags } = this.parse(Keys);
    const { seed } = args;
    const { keyfile } = flags;

    // generate key pair
    const { privateKey: SK, publicKey: PK } = genKeyPairFromSeed(seed);

    // ensure the keyfile has a ".txt" extension
    if (extname(keyfile) !== ".txt") {
      this.error("The extension of the key file should be '.txt'");
    }

    // ensure the directory exists
    const directory = dirname(keyfile);
    if (directory !== "." && !existsSync(directory)) {
      this.log(`Creating directory ${directory}`);
      mkdirSync(directory, { recursive: true });
    }

    // write to keys file
    writeFileSync(keyfile, Buffer.from(`${PK}\n${SK}\n`));
    this.log(JSON.stringify(loadKeys(keyfile)));
  }
}
