skylinkv2-cli
=============



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/skylinkv2-cli.svg)](https://npmjs.org/package/skylinkv2-cli)
[![Downloads/week](https://img.shields.io/npm/dw/skylinkv2-cli.svg)](https://npmjs.org/package/skylinkv2-cli)
[![License](https://img.shields.io/npm/l/skylinkv2-cli.svg)](https://github.com/peterjan/skylinkv2-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g skylinkv2-cli
$ skylinkv2 COMMAND
running command...
$ skylinkv2 (-v|--version|version)
skylinkv2-cli/0.0.0 darwin-x64 node-v16.3.0
$ skylinkv2 --help [COMMAND]
USAGE
  $ skylinkv2 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`skylinkv2 hello [FILE]`](#skylinkv2-hello-file)
* [`skylinkv2 help [COMMAND]`](#skylinkv2-help-command)

## `skylinkv2 hello [FILE]`

describe the command here

```
USAGE
  $ skylinkv2 hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ skylinkv2 hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/peterjan/skylinkv2-cli/blob/v0.0.0/src/commands/hello.ts)_

## `skylinkv2 help [COMMAND]`

display help for skylinkv2

```
USAGE
  $ skylinkv2 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
