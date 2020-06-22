# electron wrapper for aircall

Nothing much else to say, see www.aircall.io for more info about aircall.

I'm not affiliated to aircall company in any way, just trying to use their IP Phone solution on linux.

## build and run

```sh
npm install
./aircall.sh
```

## make it work manually

electron 6 beta is required
(works with 5.0.1 and up, with some minor annoyances)

```sh
npm install electron@beta
export PATH=$HOME/node_modules/.bin:$PATH
```

fix the rights on sandbox executable as the error message will suggest:

```sh
sudo chown root:root $HOME/node_modules/electron/dist/chrome-sandbox && sudo chown 4755 $HOME/node_modules/electron/dist/chrome-sandbox
electron .
```
    
OR if you're in a hurry :

```sh
export ELECTRON_DISABLE_SANDBOX=true; electron .
```

## Linux packages

## Arch (Manjaro, Antergos)

a package 'aircall' is availabe on AUR for Arch Linux and derivatives.

## Debian based (Ubuntu, Mint ...)

**Tested on** Ubuntu 18.04, Mint

Run :

```sh
npm run dist
```

will build a .deb file in `dist/`. Run for instance `sudo dkpg -i dist/aircall*.deb`.

Installation of the .deb file is tested under Ubuntu, and works fine. Under Mint it installs well but react with emotes crashes the app. Go wonder.

NOTE : to run from a terminal you'll have to :

- either `sudo chown root:root /opt/aircall/chrome-sandbox && sudo chown 4755 /opt/aircall/chrome-sandbox` after the .deb is inYYstalled
- or run `export ELECTRON_DISABLE_SANDBOX=true` before the launch of `/opt/aircall/aircall`

The provided .desktop file takes care of it, so running from your desktop launcher will work.
