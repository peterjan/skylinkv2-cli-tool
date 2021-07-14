import { SkynetClient as SkynetClientNodeJS } from "@nebulous/skynet";
import { Command, flags } from "@oclif/command";
import { SkynetClient } from "skynet-js";
import { loadKeys } from "../utils/utils";

export default class Fetch extends Command {
  static description = "fetch the contents of a V2 skylink";

  static args = [
    {
      name: "dataKey",
      required: true,
    },
    {
      name: "path",
      required: true,
    },
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
    const { args, flags } = this.parse(Fetch);
    const { dataKey, path } = args;
    const { portal, keyfile } = flags;

    // load the keys
    const keys = loadKeys(keyfile);
    const { publicKey } = keys;

    // fetch the V2 skylink
    const client = new SkynetClient(portal);
    const skylinkV2 = await client.registry.getEntryLink(publicKey, dataKey);

    // fetch the data and write it to the given path
    const clientNodeJS = new SkynetClientNodeJS(portal);
    await clientNodeJS.downloadFile(path, skylinkV2);

    this.log("Fetch successful");
  }
}
