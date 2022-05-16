import {makeAutoObservable} from "mobx";

export default class ViewUpContainerStore{
    constructor() {
        this._isView = true;
        makeAutoObservable(this);
    }

    setIsView(isView) {
        this._isView = isView;
    }

    get isView() {
        return this._isView;
    }
}