const {app} = require('electron');
const WindowManager = require('./window');
const TrayManager = require('./tray');
const ConfigManager = require('./configs');
const applicationVersion = require('./../package.json').version;
let mainWindow, hiddenWindow, systemTrayIcon, config, contextMenu;

process.title = 'Google Chat Linux (Unofficial)';
console.log(process.title + ' - v' + applicationVersion);
console.log('Node.js runtime version:', process.version);

const initialize = () => {
	config = ConfigManager.loadConfigs();
	
	if(!mainWindow) {
		mainWindow = WindowManager.initializeWindow(config);
	}	

	if(!systemTrayIcon) {
		systemTrayIcon = TrayManager.initializeTray(mainWindow, config);
	}
	
};

app.on("ready", initialize);
app.on("activate", initialize);
