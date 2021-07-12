skylinkv2
=========

Creates and Updates v2 Skylinks

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/skylinkv2.svg)](https://npmjs.org/package/skylinkv2)
[![Downloads/week](https://img.shields.io/npm/dw/skylinkv2.svg)](https://npmjs.org/package/skylinkv2)
[![License](https://img.shields.io/npm/l/skylinkv2.svg)](https://github.com/dghelm/skylinkv2-cli-tool/blob/master/package.json)

<!-- toc -->
- [skylinkv2](#skylinkv2)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g skylinkv2
$ skylinkv2 (-v|--version|version)
skylinkv2/0.0.0 win32-x64 node-v14.15.1
$ skylinkv2 --help [COMMAND]
Create/Update Registry Entry for Given Seed & DataKey

USAGE
  $ skylinkv2 [SKYLINK V2 LABEL]

OPTIONS
  -d, --dataKey=dataKey  dataKey for registry entry
  -h, --help             show CLI help
  -k, --seed=seed        seed to generate keys
  -p, --portal=portal    Skynet Portal URL
  -s, --skylink=skylink  Skylink to point Skylink v2 at
  -v, --version          show CLI version

...
```
<!-- usagestop -->
# Commands
> You probably should just `yarn` and then `.\bin\run` with commands for now.
<!-- commands -->
```sh-session
$ skylinkv2 -k "superSecretSeed" -d "nameForRegistryEntry" "sia://MABdWWku6YETM2zooGCjQi26Rs4a6Hb74q26i-vMMcximQ"
https://siasky.net/AQC_LZ91HrWsfHxEft0HSdC7pE4pxznw8Q2o_kIYO6T8hQ
```


<!-- commandsstop -->
