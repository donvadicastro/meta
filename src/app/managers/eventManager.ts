/**
 * Global event mediator class implementation. Used to receive and send event across application.
 * Components can subscribe to app events through this mediator as well as send events through mediator.
 */
import _ from "underscore";
import Backbone from "backbone";

export class EventManager {
    /**
     * Constructor
     */
    constructor(){
        _.extend(this , Backbone.Events);
    }

    //Call interface for Backbone.Events
    on:any;
    off:any;
    trigger:any;
    once:any;

    listenTo:any;
    stopListening:any;


    //CUSTOM EVENT CONSTANTS
    INIT:string =                   "APP_INIT";
    CHANNEL:string =                "APP_CHANNEL";
    COMPLETE:string =               "APP_COMPLETE";

    ERROR_CATALOG_LOADED:string =   "APP_ERROR_CATALOG_LOADED";
    ERROR_LOGGED:string =           "APP_ERROR_LOGGED";

    USER_REGISTER:string =          "APP_USER_REGISTER";
    USER_LOGIN:string =             "APP_USER_LOGIN";
}
