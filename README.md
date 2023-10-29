# Jogo da Velha

In the project directory, you can run:

### `npm install`

This command will initiate the installation of all the project's dependencies as defined in your package.json file.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

##

If there are problems with `npm install` and you need to set the `NODE_OPTIONS` environment variable, follow these instructions based on your operating system:

### `Windows (Command Prompt - cmd):`

If you're using Windows with Command Prompt (`cmd`), use the following command:

```batch
set NODE_OPTIONS=--openssl-legacy-provider
```

### `Unix/Linux (Bash Shell):`

On Unix/Linux systems with a Bash shell, use this command:

```batch
export NODE_OPTIONS=--openssl-legacy-provider
```

### `Windows (PowerShell):`

For Windows users running PowerShell, set the `NODE_OPTIONS` environment variable using this command:

```batch
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```

Choose the appropriate command for your operating system to configure the `NODE_OPTIONS` environment variable as needed."

You will also need to change your `"start": "react-scripts start"` to `"start": "react-scripts --openssl-legacy-provider start"` in the `package.json` file regardless of your operating system.