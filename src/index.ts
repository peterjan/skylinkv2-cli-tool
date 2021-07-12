import {Command, flags} from '@oclif/command'
import { SkynetClient, genKeyPairFromSeed } from 'skynet-js';


class Skylinkv2 extends Command {
  static description = 'Create/Update Registry Entry for Given Seed & DataKey'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
    // flag with a value (-p, --portal=VALUE)
    portal: flags.string({char: 'p', description: 'Skynet Portal URL'}),
    // flag with a value (-k, --seed=VALUE)
    seed: flags.string({char: 'k', description: 'seed to generate keys'}),
    // flag with a value (-d, --dataKey=VALUE)
    dataKey: flags.string({char: 'd', description: 'dataKey for registry entry'}),
    // flag with a value (-s, --skylink=VALUE)
    skylink: flags.string({char: 's', description: 'Skylink to point Skylink v2 at'}),
  }

  static args = [{name: "file", portal: "https://siasky.net", seed: "superSecretSeed", dataKey: "nameForRegistryEntry", skylink: "sia://MABdWWku6YETM2zooGCjQi26Rs4a6Hb74q26i-vMMcximQ"}];

  async run() {
    const {args, flags} = this.parse(Skylinkv2);

    const portal = flags.portal ?? 'https://siasky.net';
    const client = new SkynetClient(portal);

    // Setup Keys for Read/Write of Mutable Data
    const { privateKey, publicKey } = genKeyPairFromSeed( flags.seed ?? 'superSecretSeed' );
    const dataKey = flags.dataKey ?? "dataKey";

    // skylink to point to with v2 Skylink
    // const skylink = "";
    const dataLink = flags.skylink ?? 'sia://MABdWWku6YETM2zooGCjQi26Rs4a6Hb74q26i-vMMcximQ';

    // Set Registry Entry to point at our Skylink
    await client.db.setDataLink(privateKey, dataKey, dataLink);

    // Get the Skylink V2 that represents the registry entry
    const skylinkV2 = await client.registry.getEntryLink(publicKey, dataKey);

    // Get the URL for the skylink, at `siasky.net`
    const publicUrl = await client.getSkylinkUrl(skylinkV2);

    this.log(publicUrl);
  }
}

export = Skylinkv2
