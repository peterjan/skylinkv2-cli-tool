import { SkynetClient as SkynetClientNodeJS } from "@nebulous/skynet";
import { Command, flags } from "@oclif/command";
import { unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { SkynetClient } from "skynet-js";
import { randomBytes } from "crypto";
import { loadKeys } from "../utils/utils";

export default class Create extends Command {
  static description = "create a V2 skylink";

  static args = [
    {
      name: "dataKey",
      required: false,
      default: randomBytes(24).toString("hex"),
    },
  ];

  static flags = {
    force: flags.boolean({
      char: "f",
      description:
        "Forcefully recreate the V2 Skylink if necessary, this will overwrite the existing data.",
      default: false,
    }),
    help: flags.help({ char: "h" }),
    portal: flags.string({
      char: "p",
      description: "Skynet Portal URL",
      default: "https://siasky.net",
    }),
    keyfile: flags.string({
      description: "Location of the key file.",
      default: "keys.txt",
    }),
  };

  async run() {
    const { args, flags } = this.parse(Create);
    const { dataKey } = args;
    const { portal, keyfile, force } = flags;

    // load the keys
    const keys = loadKeys(keyfile);
    const { publicKey, privateKey } = keys;

    // check whether the entry exists
    const client = new SkynetClient(portal);
    if (!force) {
      const { entry } = await client.registry.getEntry(publicKey, dataKey);
      if (entry !== null) {
        this.error(
          `The entry for dataKey '${dataKey}' is already initialized, to overwrite it and clear the data behind is, pass the --force (-f) flag.`
        );
      }
    }

    // create placeholder
    const clientNodeJS = new SkynetClientNodeJS(portal);
    const skylinkV1 = await this.uploadEmptySkyfile(clientNodeJS);
    if (!skylinkV1) {
      return;
    }

    // create a registry entry that points at the placeholder
    await client.db.setDataLink(privateKey, dataKey, skylinkV1);

    // create a V2 skylink that points at the registry entry
    const skylinkV2 = await client.registry.getEntryLink(publicKey, dataKey);
    const skylinkURL = await client.getSkylinkUrl(skylinkV2);

    this.log(`DataKey: ${dataKey}`);
    this.log(`Skylink: ${skylinkV2}`);
    this.log(`URL: ${skylinkURL}`);
  }

  async uploadEmptySkyfile(client: any): Promise<string | null> {
    const tmpFilePath = join(__dirname, "tmp.txt");

    try {
      // create an empty file
      //
      // NOTE: data should be empty but can not be empty for now because Skynet
      // does not allow to download an empty Skyfile due to a bug (416 status).
      const tmpFileData = new Date().toString();
      writeFileSync(tmpFilePath, Buffer.from(tmpFileData));

      // upload the empty file to Skynet
      return await client.uploadFile(tmpFilePath);
    } catch (error) {
      this.log(`failed to upload empty skyfile, err: ${error}`);
    } finally {
      // delete the file
      try {
        unlinkSync(tmpFilePath);
      } catch (error) {
        this.log(`failed to delete tmp file, err: ${error}`);
      }
    }

    return null;
  }
}
