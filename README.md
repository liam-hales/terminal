<div align="center">
  <h1>
    Liam Hales - Dev Tools
  </h1>
  <P>
    Useful dev tools accessed via a browser and used like a terminal
  </p>
</div>

<br/>
<br/>

# Content Index

- [Getting Started](#getting-started-prerequisites)
- [Dependency Management](#dependency-management)

<br/>
<br/>

# Getting Started (Prerequisites)

1. Download and install [Node Version Manager]
2. Install and use a version of Node.js `>= v18.12`

```sh
$ nvm install 18.12
$ nvm use 18.12

$ node --version
v18.12.0

$ npm --version
v8.19.1
```

3. Run `corepack enable` to enable [Corepack]

> ⚠️ _**WARNING** - You must use the [`yarn`] package manager_

<br/>
<br/>

# Dependency Management

Managing dependencies is done using `npm-check-updates` under the hood which has the ability to check for new dependency versions and upgrade dependencies to a specified target version.

1. Run `yarn deps` to list upgradable dependencies

## Options

- `--target ${latest | minor | patch}` to scope dependencies to a specific target version
- `--upgrade` to upgrade dependencies
- `--interactive` to choose which dependencies to upgrade in interactive mode

Check out the [`npm-check-updates`] docs or run `yarn ncu --help` for more info.

[Node Version Manager]: https://github.com/nvm-sh/nvm
[`yarn`]: https://yarnpkg.com
[Corepack]: https://nodejs.org/api/corepack.html
[`npm-check-updates`]: https://npmjs.com/package/npm-check-updates
