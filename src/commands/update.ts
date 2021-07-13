import { SkynetClient as SkynetClientNodeJS } from "@nebulous/skynet";
import { Command, flags } from "@oclif/command";
import { SkynetClient } from "skynet-js";
import { loadKeys } from "../utils/utils";

export default class Update extends Command {
  static description = "update a V2 skylink";

  static args = [
    {
      name: "dataKey",
      required: true,
    },
    { name: "path", required: true },
  ];

  static flags = {
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
    const { args, flags } = this.parse(Update);
    const { dataKey, path } = args;
    const { portal, keyfile } = flags;

    // load the keys
    const keys = loadKeys(keyfile);
    const { privateKey } = keys;

    // update the data at given path
    const clientNodeJS = new SkynetClientNodeJS(portal);
    const skylinkV1 = await clientNodeJS.uploadFile(path);
    this.log("Uploaded data to", skylinkV1);

    // create a registry entry that points at the placeholder
    const client = new SkynetClient(portal);
    await client.db.setDataLink(privateKey, dataKey, skylinkV1);

    this.log("Update successful");
  }
}
