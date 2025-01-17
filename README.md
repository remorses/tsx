# tsx <a href="https://npm.im/tsx"><img src="https://badgen.net/npm/v/tsx"></a> <a href="https://npm.im/tsx"><img src="https://badgen.net/npm/dm/tsx"></a> <a href="https://packagephobia.now.sh/result?p=tsx"><img src="https://packagephobia.now.sh/badge?p=tsx"></a>

> _TypeScript Execute (`tsx`)_: Node.js enhanced with [esbuild](https://esbuild.github.io/) to run TypeScript & ESM files

### Features
- Blazing fast on-demand TypeScript & ESM compilation
- Works in both [CommonJS and ESM packages](https://nodejs.org/api/packages.html#type)
- Supports next-gen TypeScript extensions (`.cts` & `.mts`)
- Supports `node:` import prefixes
- Hides experimental feature warnings
- TypeScript REPL
- Resolves `tsconfig.json` [`paths`](https://www.typescriptlang.org/tsconfig#paths)
- Tested on Linux & Windows with Node.js v12~18

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## About
`tsx` is a CLI command (alternative to `node`) for seamlessly running TypeScript & ESM, in both `commonjs` & `module` package types.

It's powered by [esbuild](https://esbuild.github.io/) so it's insanely fast.

Want to just run TypeScript code? Try tsx:

```sh
npx tsx ./script.ts
```

How does it compare to [ts-node](https://github.com/TypeStrong/ts-node)? Checkout the [comparison](https://github.com/privatenumber/ts-runtime-comparison).


## Install

### Local installation
If you're using it in an npm project, install it as a development dependency:
```sh
npm install --save-dev tsx
```

You can reference it directly in the `package.json#scripts` object:
```json5
{
    "scripts": {
        "dev": "tsx ..."
    }
}
```

To use the binary, you can call it with [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) while in the project directory:

```sh
npx tsx ...
```

### Global installation

If you want to use it in any arbitrary project without [`npx`](https://docs.npmjs.com/cli/v8/commands/npx), install it globally:

```sh
npm install --global tsx
```

Then, you can call `tsx` directly:

```sh
tsx ...
```

## Usage

`tsx` is designed to be a drop-in replacement for `node`, so you can use it just the way you would use Node.js. All command-line arguments (with the exception of a few) are propagated to Node.js.


### Run TypeScript / ESM / CJS module

Pass in a file to run:

```sh
tsx ./file.ts
```

### Watch mode
Run file and automatically rerun on changes:

```sh
tsx watch ./file.ts
```

All imported files are watched except from the following directories:
`node_modules`, `bower_components`, `vendor`, `dist`, and `.*` (hidden directories).

#### Tips
- Press <kbd>Return</kbd> to manually rerun
- Pass in `--clear-screen=false` to disable clearing the screen on rerun

### REPL
Start a TypeScript REPL by running with no arguments:

```sh
tsx
```

### Cache
Modules transformations are cached in the system cache directory ([`TMPDIR`](https://en.wikipedia.org/wiki/TMPDIR)). Transforms are cached by content hash, so duplicate dependencies are not re-transformed.

Set the `--no-cache` flag to disable the cache:

```sh
tsx --no-cache ./file.ts
```

### Node.js Loader

`tsx` is a standalone binary designed to be used in place of `node`, but sometimes you'll want to use `node` directly. For example, when adding TypeScript & ESM support to npm-installed binaries.

To use `tsx` with Node.js, pass it to the [`--loader`](https://nodejs.org/api/esm.html#loaders) flag.

> Note: Node.js's experimental feature warnings will not be suppressed when used as a loader.

```sh
# As a CLI flag
node --loader tsx ./file.ts

# As an environment variable
NODE_OPTIONS='--loader tsx' node ./file.ts
```

> Tip: In rare circumstances, you might be limited to using the [`-r, --require`](https://nodejs.org/api/cli.html#-r---require-module) flag.
>
> You can use [`@esbuild-kit/cjs-loader`](https://github.com/esbuild-kit/cjs-loader), but transformations will only be applied to `require()`.

## Dependencies

- [@esbuild-kit/esm-loader](https://github.com/esbuild-kit/esm-loader) - Node.js Loader to transform TypeScript to ESM.

- [@esbuild-kit/cjs-loader](https://github.com/esbuild-kit/cjs-loader) - Node.js `require()` hook to transform TypeScript & ESM to CommonJS.


## FAQ

### Why is it named `tsx`?

`tsx` stands for "TypeScript execute", similar to [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) ("Node.js package execute").

It has an unfortunate overlap with React's [TSX/JSX](https://www.typescriptlang.org/docs/handbook/jsx.html), which stands for "JavaScript XML". However, we believe the naming is appropriate for what it does.

### Does it do type-checking?

No, [esbuild does not support type checking](https://esbuild.github.io/faq/#:~:text=TypeScript%20type%20checking%20(just%20run%20tsc%20separately)).

It's recommended to run TypeScript separately as a command (`tsc --noEmit`) or via [IDE IntelliSense](https://code.visualstudio.com/docs/languages/typescript).


### How is `tsx` different from [`ts-node`](https://github.com/TypeStrong/ts-node)?

They are both tools to run TypeScript files.

The main difference is that `tsx` is powered by [esbuild](https://esbuild.github.io/) for blazing fast TypeScript compilation, whereas `ts-node` uses the TypeScript compiler, [which is not as fast](https://esbuild.github.io/faq/#:~:text=typescript%20benchmark).

Because esbuild doesn't do type checking, `tsx` is more equivalent to `ts-node --esm --transpileOnly`.

[Here's an exhaustive comparison](https://github.com/privatenumber/ts-runtime-comparison) between `tsx` vs `ts-node` (and other runtimes).

If you migrated from `ts-node`, please share your performance gains [here](https://github.com/esbuild-kit/tsx/discussions/10)!


### Can it use esbuild plugins?

No. tsx uses esbuild's [Transform API](https://esbuild.github.io/api/#transform-api), which doesn't support plugins.

### Does it have a configuration file?

No. tsx's integration with Node.js is designed to be seamless so there is no configuration.
