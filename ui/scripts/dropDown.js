﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

define([
	"require",
	"exports",
	"VSS/Utils/Core",
	"VSS/Host",
	"VSS/Controls",
	"VSS/Controls/Menus"
	], function (require, exports, Core, VSS_HOST, Controls, MenuControls) {

    var ItemsView = (function (_super) {
        __extends(ItemsView , _super);
        function ItemsView(options) {
            _super.call(this, options);

            this._menu = null;
        }

       /**
        *   Initialize will be called when this control is created.  This will setup the UI, 
        *   attach to events, etc.
        */
        ItemsView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);

            this._createToolbar();
        };
		
		ItemsView.prototype._createToolbar = function () {
            this._menu = Controls.BaseControl.createIn(MenuControls.MenuBar, this._element.find("div.menu-container"), {
                items: this._createToolbarItems()
            });
            MenuControls.menuManager.attachExecuteCommand(Core.delegate(this, this._onToolbarItemClick));
        };
		
		ItemsView.prototype._createToolbarItems = function () {
            return [
				{ id: "refresh-items", title: "Refresh", icon: "icon-refresh", showText: false },
				{ separator: true },
				{
                    id: "item-actions",
                    idIsAction: false,
                    text: "Actions",
                    noIcon: true,
                    childItems: [
                        { id: "manage-items", text: "Manage"},
                        { separator: true },
                        { id: "manage-security", text: "Security"}
                    ]
                }
			];
        };
		
		ItemsView.prototype._refreshItems = function(){
			alert("refresh");
		};
		
		ItemsView.prototype._manageItems = function(){
			alert("manage");
		};
		
		ItemsView.prototype._security = function(){
			alert("security");
		};

        ItemsView.prototype._onToolbarItemClick = function (sender, args) {
            var command = args.get_commandName(), commandArgument = args.get_commandArgument(), that = this, result = false;
			switch (command) {
				case "refresh-items":
					this._refreshItems();
					break;
				case "manage-items":
					this._manageItems();
					break;
				case "manage-security":
					this._security();
					break;
				default:
					result = true;
					break;
			}
			return result;
        };
		
        return ItemsView;
    })(Controls.BaseControl);
    exports.ItemsView = ItemsView;
	
	Controls.Enhancement.registerEnhancement(ItemsView, ".hub-view");
});