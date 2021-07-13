import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('skylinkv2', () => {
  // test
  // .stdout()
  // .do(() => cmd.run([]))
  // .it('runs hello', ctx => {
  //   expect(ctx.stdout).to.contain('hello world')
  // })

  test
  .stdout()
  .do(() => cmd.run(['--seed', 'superSecretKey', '--dataKey', 'nameForRegistryEntry', '--skylink', 'sia://MABdWWku6YETM2zooGCjQi26Rs4a6Hb74q26i-vMMcximQ']))
  .it('runs -k "superSecretSeed" -d "nameForRegistryEntry" -s "sia://MABdWWku6YETM2zooGCjQi26Rs4a6Hb74q26i-vMMcximQ"', ctx => {
    expect(ctx.stdout).to.contain('https://siasky.net/AQC_LZ91HrWsfHxEft0HSdC7pE4pxznw8Q2o_kIYO6T8hQ')
  })
})
