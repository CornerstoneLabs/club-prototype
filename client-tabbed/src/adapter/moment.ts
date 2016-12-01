import {WindowRef} from "../app/app.window_provider";
import {Injectable} from "@angular/core";

@Injectable()
export class MomentJs {
    constructor (private window: WindowRef) {

    }

    public moment(): any {
        return this.window.nativeWindow.moment();
    }
}
