# pendant

CLI interface for portable Linux SBC. This project uses [Ink](https://github.com/vadimdemedes/ink) to build a React based command line application.

## Features

- Main menu navigated with arrow keys or a D-Pad
- Home directory listing
- Placeholder screen for WiFi configuration

## Controls

- **Up/Down**: Navigate menu items
- **A / Enter**: Select menu item
- **B / Esc**: Go back to the previous screen

## Usage

Install dependencies (requires Node.js and npm):

```bash
npm install
```

Run the application:

```bash
npm start
```

On a Raspberry Pi with physical buttons, map the buttons to the corresponding key events (Up, Down, A, B).
