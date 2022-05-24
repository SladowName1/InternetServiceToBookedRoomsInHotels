import {makeAutoObservable} from "mobx";

export default class RoomStore {
    constructor() {
        this._rooms = [];
        this._room = {};
        this._hotelId = null;
        this._managerRooms = [];
        makeAutoObservable(this);
    }

    setManagerRooms(rooms) {
        this._managerRooms = rooms;
    }

    setHotelId(id) {
        this._hotelId = id;
    }

    setRooms(rooms) {
        this._rooms = rooms;
    }

    setRoom(room) {
        this._room = room;
    }

    get HotelId() {
        return this._hotelId;
    }

    get Rooms() {
        return this._rooms;
    }

    get Room() {
        return this._room;
    }

    get ManagerRooms() {
        return this._managerRooms;
    }
}