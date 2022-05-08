import {makeAutoObservable} from "mobx";

export default class HotelStore {
    constructor() {
        this._homeHotels = [];
        this._searchHotels = [];
        this._city = '';
        this._country = '';
        this._needHotel = {};
        makeAutoObservable(this);
    }

    setHomeHotel(hotels) {
        this._homeHotels = hotels;
    }

    setSearchHotel(hotels) {
        this._city = hotels[0].city;
        this._country = hotels[0].country;
        this._searchHotels = hotels;
    }

    setNeedHotel(hotel) {
        this._needHotel = hotel;
    }

    get homeHotel() {
        return this._homeHotels;
    }

    get searchHotel() {
        return this._searchHotels;
    }

    get city() {
        return this._city;
    }

    get country() {
        return this._country;
    }

    get needHotel() {
        return this._needHotel;
    }
}