import {makeAutoObservable} from "mobx";

export default class DateStore {
    constructor() {
        this._isStart = null;
        this._isEnd = null;
        this._countOfPeople = null;
        makeAutoObservable(this);
    }

    setIsStart(start) {
        this._isStart = start;
    }

    setIsEnd(end) {
        this._isEnd = end;
    }

    setCountOfPeople(count) {
        this._countOfPeople = count;
    }

    get IsStart() {
        return this._isStart;
    }

    get IsEnd() {
        return this._isEnd;
    }

    get CountOfPeople() {
        return this._countOfPeople;
    }
}