# Custom New Tab Extension (CNTE)

A beautiful, functional, and minimal custom new tab page extension for Google Chrome. It replaces the default new tab with customizable widgets, shortcuts, and search functionality.

## Features

- **Search Engine**: Quick access to your favorite search engine.
- **Shortcuts**: Customizable quick links to frequently visited websites.
- **Widgets**: Grid-based layout for personalized widgets.
- **Modern UI**: Built with React, Tailwind CSS, and Shadcn UI.

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Emacs / ESLint / Prettier

## Development

First, install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

For a Chrome Extension, the dev server provides a web interface. To test the extension directly in Chrome:
1. Run `pnpm build`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `dist` folder.

## Release Process

We use an automated release script to bump versions, build the extension, and package it for the Chrome Web Store and GitHub Releases.

```bash
pnpm build:upload --type <version-type>
```

Available types:
- `patch` or `p`: for backwards-compatible bug fixes (0.0.x)
- `minor` or `m`: for backwards-compatible new features (0.x.0)
- `major` or `M`: for breaking changes (x.0.0)

Example:
```bash
pnpm build:upload --type p
```

This will:
1. Bump the version in `package.json` and `manifest.json`.
2. Build the extension.
3. Archive the `dist/` folder into a `.zip` file.
4. Commit the version bumps, tag the commit, and push.
5. Create a GitHub Release with the `.zip` file attached.

## License

MIT License
