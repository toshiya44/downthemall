/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is DownThemAll! tray handler
 *
 * The Initial Developers of the Original Code is Nils Maier
 * Portions created by the Initial Developers are Copyright (C) 2008
 * the Initial Developers. All Rights Reserved.
 *
 * Contributor(s):
 *    Nils Maier <MaierMan@web.de>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

function TrayHandler() {
	if (!('trayITrayService' in Ci)) {
		this.available = false;
		return;
	}
	this._trayService = Serv('@tn123.ath.cx/trayservice;1', 'trayITrayService');
	this.available = !!this._trayService;
	window.addEventListener(
		'TrayDblClick',
		function(event) {
			if (event.button == 0) {
				TrayHandler.restore();
			}
		},
		true
	);
	window.addEventListener(
		'TrayClick',
		function(event) {
			if (event.button == 2) {
				TrayHandler.showMenu(event.screenX, event.screenY);
			}
		},
		true
	);
}

TrayHandler.prototype = {
	watch: function tray_watch() {
		if (this.available) {
			this._trayService.watchMinimize(window);
		}
	},
	unwatch: function tray_unwatch() {
		if (this.available) {
			this._trayService.unwatchMinimize(window);
		}
	},
	restore: function tray_restore() {
		if (this.available) {
			this._trayService.restore(window);
		}
	},
	showMenu: function(x, y) {
		$('traymenu').showPopup(
			document.documentElement,
			x,
			y,
			"context",
			"",
			"bottomleft"
		);		
	}
};
TrayHandler = new TrayHandler();