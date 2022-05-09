import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._user = {};
        this._userInforamation = null;
        makeAutoObservable(this);
    }

    setUser(user)  {
        this._user = user;
    }

    setUserInformation(userInfo) {
        this._userInforamation = userInfo;
    }

    get UserInformation() {
        return this._userInforamation;
    }

    get User() {
        return this._user;
    }
}