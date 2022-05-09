import {makeAutoObservable} from "mobx";

export default class RoomStore {
    constructor() {
        this._rooms = [];
        this._room = {};
        makeAutoObservable(this);
    }

    setRooms(rooms) {
        this._rooms = rooms;
    }

    setRoom(room) {
        this._room = room;
    }

    get Rooms() {
        return this._rooms;
    }

    get Room() {
        return this._room;
    }
}