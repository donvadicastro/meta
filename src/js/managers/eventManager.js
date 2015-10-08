///<reference path='../../../typings/backbone.d.ts'/>
var MetaApp;
(function (MetaApp) {
    var Managers;
    (function (Managers) {
        var EventManager = (function () {
            function EventManager() {
                //CUSTOM EVENT CONSTANTS
                this.INIT = "APP_INIT";
                this.CHANNEL = "APP_CHANNEL";
                this.COMPLETE = "APP_COMPLETE";
                this.ERROR_CATALOG_LOADED = "APP_ERROR_CATALOG_LOADED";
                this.ERROR_LOGGED = "APP_ERROR_LOGGED";
                this.USER_REGISTER = "APP_USER_REGISTER";
                this.USER_LOGIN = "APP_USER_LOGIN";
                _.extend(this, Backbone.Events);
            }
            return EventManager;
        })();
        Managers.EventManager = EventManager;
    })(Managers = MetaApp.Managers || (MetaApp.Managers = {}));
})(MetaApp || (MetaApp = {}));

//# sourceMappingURL=eventManager.js.map
