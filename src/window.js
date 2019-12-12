const {BrowserWindow, ipcMain, shell} = require("electron");
const pathsManifest = require('./paths');
const ConfigManager = require('./configs');
const fs = require('fs');
let mainWindow;
let isQuitting= false;
ipcMain.on('open-link', (evt, href) => {
	shell.openExternal(href);
});

const setIsQuitting = (b) => {
	isQuitting = b;
};

const getBrowserWindowOptions = () => {
	return {
		"title": process.title,
		"autoHideMenuBar": true,
		"webPreferences": {
			"nodeIntegration": true,
			"sandbox": true

		},
		"show": false,
		"backgroundColor": "#262727",
		"icon": pathsManifest.iconPath,
	}
}

const getExtraOptions = () => {
	return {
		"name": "Aircall for Linux",
		"url": "https://phone.aircall.io",
		"openLocally": true
	};
}


const handleRedirect = (e, url) => {
	// leave redirect for double auth mechanisme, trap crappy blocked url link
	if (url == "about:blank#blocked") {

	} else if (! url.includes("accounts/SetOSID?authuser=0&continue=")){
		shell.openExternal(url);
		e.preventDefault();
	}
};

const initializeWindow = (config) => {
	const bwOptions = (config && config.bounds) ? Object.assign(getBrowserWindowOptions(), config.bounds) : getBrowserWindowOptions()
	const extraOptions = getExtraOptions();

	mainWindow = new BrowserWindow(bwOptions);
	mainWindow.loadURL(extraOptions.url);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});

	mainWindow.on('close', (e) => {
		if(isQuitting){
			let isMaximized = mainWindow.isMaximized();
			configsData = {};
			configsData.bounds = mainWindow.getBounds();
			configsData.wasMaximized = isMaximized;
			ConfigManager.updateConfigs(configsData);
		}else{
			e.preventDefault();
			mainWindow.hide();
		}
	});

	mainWindow.webContents.on('will-navigate', handleRedirect);
	mainWindow.webContents.on('new-window', handleRedirect);

	return mainWindow;
}

module.exports = {
	initializeWindow: initializeWindow,
	setIsQuitting: setIsQuitting
}
