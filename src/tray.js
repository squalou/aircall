const {app, Tray, Menu, ipcMain} = require("electron");
const pathsManifest = require("./paths");
const WindowManager = require('./window');
const fs = require('fs');
let mainWindow;
let systemTrayIcon;

const onShowEntryClicked = () => {
	(! mainWindow.isVisible() || mainWindow.isMinimized()) ? mainWindow.show() : mainWindow.hide();
}

const onQuitEntryClicked = () => {
	WindowManager.setIsQuitting(true);
	app.quit();
}

const onSystemTrayIconClicked = () => {
	(! mainWindow.isVisible() || mainWindow.isMinimized()) ? mainWindow.show() : mainWindow.focus();
}

const buildContextMenu = (mainWindow) => {
	const template = [
		{
			"label": "Show/Hide",
			"click": () => {
				onShowEntryClicked();
			},
		}, {
			label: 'Force reload', click: function () {
				mainWindow.webContents.reload();
			}
		}, {
			type: 'separator'
        }, {
			"label": "Quit",
			"click": () => {
				onQuitEntryClicked();
			}
		}
	]

	const contextMenu = Menu.buildFromTemplate(template);
	systemTrayIcon.setContextMenu(contextMenu);
	systemTrayIcon.setToolTip(process.title);
	systemTrayIcon.setTitle(process.title);

	systemTrayIcon.on("click", () => {
		onSystemTrayIconClicked();
	});

	return systemTrayIcon;
}

const initializeTray = (windowObj) => {
	systemTrayIcon = new Tray(pathsManifest.ICON_UNKNOWN);
	mainWindow = windowObj;
	mainWindow.webContents.on('dom-ready', () => {
	    mainWindow.webContents.executeJavaScript('var ipc; try{var ipc = require(\'electron\').ipcRenderer; var ico=null;function upd(){var avico = document.querySelector(".availability.available"); ipc.send("icon-changed", avico !== null);};function awaitIco(){ico=document.querySelector(".ico:not(.ng-scope)"); if(ico == null){setTimeout(awaitIco, 150);} else {upd();observeIco(ico)}}; awaitIco(); function observeIco(ico){ var callback = function(mutationList) {upd();};var observer = new MutationObserver(callback); observer.observe(ico, { attributes: true, subtree: true })};}catch (e){console.log(e)};');
	});
	return buildContextMenu(mainWindow);

};

ipcMain.on('incoming-call', (evt,n) => {
	mainWindow.show();
});

ipcMain.on('icon-changed', (evt, available) => {
	var itype = "";
	if (available) {
		itype = "AVAILABLE";
	}else{
		itype = "UNAVAILABLE";
		incoming();
	}
	setIcon(itype);
});

function incoming(){
//setTimeout ... does not wotk for a function with parameters. Googl fucked up things for supposed security again, so I use global variable instead. Go wonder.
mainWindow.webContents.executeJavaScript('var ipc; try{var ipc = require(\'electron\').ipcRenderer; var incom=null;	const MAX=20; var k=0;function awaitIncom(){k++;incom=document.querySelector("#br-incoming-call-main-button");if(incom !== null){ipc.send("incoming-call")}else if(k<MAX){setTimeout(awaitIncom, 300);}}; awaitIncom();}catch (e){console.log(e)};')
}

function iconForType(iconType) {
	if (iconType == "AVAILABLE") {
		return pathsManifest.ICON_AVAILABLE;
	}else if (iconType == "UNAVAILABLE") {
		return pathsManifest.ICON_UNAVAILABLE;
	}
	return pathsManifest.ICON_UNKNOWN;
}

const setIcon = (iconType) => {
       systemTrayIcon.setImage(iconForType(iconType));
}
	

module.exports = {
	initializeTray: initializeTray
};
