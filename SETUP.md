# First Install Node

Go to this page: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Look for macOS Installer (.pkg) for [64-bit / ARM64](https://nodejs.org/dist/v16.15.1/node-v16.15.1.pkg)

# Install Vue / Vite

Paste this into terminal:

```jsx
npm install vite
```

# Make Terminal Look Nice

Paste this into terminal:

```
cat >~/.zshrc <<EOL
export PS1="%1~ \$ "
EOL
source ~/.zshrc
```

# Setup VS Code

Go to the [website](https://code.visualstudio.com) and download for Mac.

Once downloaded, drag to Applications folder.

Click the app icon for VS Code to run it.

Then press `Command-Shift-P`

Type `shell command`

Select `Install code in path`

# Download Vue App Template

```jsx
cd ~/Documents
mkdir code
cd code
git clone git@github.com:delaurentis/new-to-vue.git
cd new-to-vue
npm install
```

# Run the Vue App

Type this in the terminal from the `~/Documents/code/new-to-vue` folder:

```jsx
npm run dev
```

Press `Command + C` to stop it at any time

# Edit the Vue App

You can type this from any folder:

```jsx
code ~/Documents/code/new-to-vue
```

Or if you are already in the `new-to-vue` folder:

```jsx
code ./
```