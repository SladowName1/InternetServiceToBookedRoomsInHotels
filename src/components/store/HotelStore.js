import {makeAutoObservable} from "mobx";

export default class HotelStore {
    constructor() {
        this._homeHotels = [];
        this._searchHotels = [];
        this._city = '';
        this._country = '';
        this._needHotel = {};
        this._hotelFromHomePage = {};
        this._managerHotel = [];
        makeAutoObservable(this);
    }

    setManagerHotel(hotels) {
        this._managerHotel = hotels;
    }

    setHomeHotel(hotels) {
        this._homeHotels = hotels;
    }

    setHotelFromHomePage(hotel) {
        this._hotelFromHomePage = hotel;
    }

    setSearchHotel(hotels) {
        this._city = hotels[0]?.city;
        this._country = hotels[0]?.country;
        this._searchHotels = hotels;
    }

    setNeedHotel(hotel) {
        this._needHotel = hotel;
    }

    get managerHotels() {
        return this._managerHotel;
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

    get hotelFromHomePage() {
        return this._hotelFromHomePage;
    }
}