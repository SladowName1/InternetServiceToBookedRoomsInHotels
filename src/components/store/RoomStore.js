import {makeAutoObservable} from "mobx";

export default class RoomStore {
    constructor() {
        this._rooms = [];
        makeAutoObservable(this);
    }

    setRooms(rooms) {
        this._rooms = rooms;
    }

    get Rooms() {
        return this._rooms;
    }
}