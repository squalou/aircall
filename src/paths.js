const path = require("path");
const {app} = require("electron");

module.exports = {
	"configsPath" : path.join(app.getPath("appData"), "aircall-linux.json"),
	"iconPath" : path.join(__dirname, "../assets/icon/icon.png"),
	"ICON_NO_NEW_MSG" : path.join(__dirname, "../assets/icon/no-new.png"),
	"ICON_NEW_NON_NOTIF_MSG" : path.join(__dirname, "../assets/icon/new-non-notif.png"),
	"ICON_NEW_NOTIF_MSG" : path.join(__dirname, "../assets/icon/new-notif.png"),
	"ICON_OFFLINE_MSG" : path.join(__dirname, "../assets/icon/offline.png")
}