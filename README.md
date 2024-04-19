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

> ⚠️ _**WARNING** - Please make sure to read and follow the [Getting Started](#getting-started-prerequisites) section before continuing to the other sections to avoid running into any issues_

<br/>
<br/>

# Getting Started (Prerequisites)

1. Download and install [Node Version Manager]
2. Install and use a version of Node.js `>= v20.10`

```sh
$ nvm install 20.10
$ nvm use 20.10

$ node --version
v20.10.0

$ npm --version
v10.2.3
```

3. Run `corepack enable` to enable [Corepack]
4. You should now be able to use the [`yarn`] package manager which you **MUST** use for this project

```sh
$ yarn --version
v4.1.1
```

> 📝 _**NOTE** - Yarn comes bundled with [Corepack] and is the preferred way to install/manage Yarn. Check out the [Yarn Installation Guide] for more info_

> 📝 _**NOTE** - The current version of Yarn should match the `packageManager` version in the [`package.json`](/package.json)_

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
