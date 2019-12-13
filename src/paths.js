const path = require("path");
const {app} = require("electron");

module.exports = {
	"configsPath" : path.join(app.getPath("appData"), "aircall-linux.json"),
	"iconPath" : path.join(__dirname, "../assets/icon/icon.png"),
	"ICON_UNKNOWN" : path.join(__dirname, "../assets/icon/icon-unknown.png"),
	"ICON_UNAVAILABLE" : path.join(__dirname, "../assets/icon/icon-unavailable.png"),
	"ICON_AVAILABLE" : path.join(__dirname, "../assets/icon/icon-available.png")
}