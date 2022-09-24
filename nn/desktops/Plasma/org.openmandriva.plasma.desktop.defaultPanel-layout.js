// Default Plasma panel for OpenMandriva
// Author: Tomasz Paweł Gajc (tpgxyz@gmail.com) 2013, 2014, 2015, 2016, 2020
// Bernhard Rosenkränzer <bero@lindev.ch> 2020
// Licensed under GPLv2+

print("Loading OpenMandriva Plasma panel configuration")
// remove already existing old panels
function removeOldPanels()
{
	while(panelIds.length)
		panelById(panelIds[0]).remove()
}

// remove already existing other panels
removeOldPanels()

// start new panel
var panel = new Panel
if (panelIds.length == 1) {
	// we have only one panel, so set the location for the user
	panel.location = "bottom";
}

// let's calculate desired panel height based on scren's DPI
// panel.height = gridUnit * 3
panel.height = 2 * Math.floor(gridUnit * 2.5 / 2)
panel.alignment = "left";
panel.hiding = "none";

// by default kicker is used, options are kickoff and kickerdash
var launcher = panel.addWidget("org.kde.plasma.kicker")
launcher.currentConfigGroup = ["Shortcuts"]
launcher.writeConfig("global", "Alt+F1")
launcher.currentConfigGroup = ["General"]
// launcher.writeConfig("favorites", "preferred://browser,org.kde.kmail.desktop,kcm_kdeconnect.desktop,org.kde.dolphin.desktop,org.kde.kate.desktop,org.kde.konsole.desktop,systemsettings.desktop")
launcher.writeConfig("favoriteApps", "preferred://browser,org.kde.kmail.desktop,kcm_kdeconnect.desktop,,systemsettings.desktoporg.kde.dolphin.desktop,org.kde.konsole.desktop")
launcher.writeConfig("limitDepth", "false")
launcher.writeConfig("useExtraRunners", "true")
launcher.writeConfig("alignResultsToBottom", "true")
launcher.writeConfig("appNameFormat", "0")
launcher.writeConfig("showRecentContacts", "false")
launcher.writeConfig("showRecentApps", "true")
launcher.writeConfig("showRecentDocs", "true")
launcher.writeConfig("showIconsRootLevel", "true")

panel.addWidget("org.kde.plasma.taskmanager")
// panel.addWidget("org.kde.plasma.icontasks")
panel.addWidget("org.kde.plasma.pager")

/* Next up is determining whether to add the Input Method Panel
 * widget to the panel or not. This is done based on whether
 * the system locale's language id is a member of the following
 * white list of languages which are known to pull in one of
 * our supported IME backends when chosen during installation
 * of common distributions. */

var langIds = ["as",    // Assamese
               "bn",    // Bengali
               "bo",    // Tibetan
               "brx",   // Bodo
               "doi",   // Dogri
               "gu",    // Gujarati
               "hi",    // Hindi
               "ja",    // Japanese
               "kn",    // Kannada
               "ko",    // Korean
               "kok",   // Konkani
               "ks",    // Kashmiri
               "lep",   // Lepcha
               "mai",   // Maithili
               "ml",    // Malayalam
               "mni",   // Manipuri
               "mr",    // Marathi
               "ne",    // Nepali
               "or",    // Odia
               "pa",    // Punjabi
               "sa",    // Sanskrit
               "sat",   // Santali
               "sd",    // Sindhi
               "si",    // Sinhala
               "ta",    // Tamil
               "te",    // Telugu
               "th",    // Thai
               "ur",    // Urdu
               "vi",    // Vietnamese
               "zh_CN", // Simplified Chinese
               "zh_TW"] // Traditional Chinese

if (langIds.indexOf(languageId) != -1) {
    panel.addWidget("org.kde.plasma.kimpanel");
}

panel.addWidget("org.kde.plasma.systemtray")
// systray.writeConfig("hiddenItems", "hp-systray,python3.4m")

panel.addWidget("org.kde.plasma.digitalclock")
panel.addWidget("org.kde.plasma.trash")

sleep(0.5)
panel.reloadConfig()
// if set to true it is not possible to remove panel :)
panel.locked = false;
