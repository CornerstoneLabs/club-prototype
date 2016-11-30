import {Injectable} from "@angular/core";
import {WindowRef} from "../app/app.window_provider";

var _io;
var _subscribers = {};

@Injectable()
export class SocketManager {
    socket: any;

    initialise () {
        _io = this.window.nativeWindow.io('http://localhost:3000/');

        var _this = this;

        _io.on('connect', function () {
            console.log('Connected');
            _io.send('hi');

            _io.on('update', function (msg) {
                _this.receivedUpdate();
            });
        });
    }

    constructor (private window: WindowRef) {
        if (typeof _io === 'undefined') {
            this.initialise();
        }

        this.socket = _io;
    }

    onUpdate(fn) {
        if (typeof _subscribers['onUpdate'] === 'undefined') {
            _subscribers['onUpdate'] = [];
        }
        _subscribers['onUpdate'].push(fn);
    }

    sendUpdate() {
        this.socket.emit('update');
    }

    receivedUpdate () {
        _subscribers['onUpdate'].forEach((fn)=> {
            fn();
        });
    }
}
