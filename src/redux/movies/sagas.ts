import {call, put, select} from "redux-saga/effects";
import {setToDoItemAction, setToDosAction, ToDo} from "./actions";
import axios from "axios";

const apiUrl = "https://todo--express.herokuapp.com";

export function requestGetToDos() {
    return axios.request({
        method: "get",
        url: `${apiUrl}/todos`
    });
}

export function* handleGetToDos(action: { type: string }) {
    try {
        const response: { data: Array<ToDo> } = yield call(requestGetToDos);
        const {data} = response;
        yield put(setToDosAction(data));
    } catch (error) {
        console.log(error);
    }
}

export function requestGetToDo(id: number) {
    return axios.request({
        method: "get",
        url: `${apiUrl}/todos/${id}`
    });
}

export function* handleGetToDo(action: { type: string, id: number }) {
    try {
        const response: { data: ToDo } = yield call(requestGetToDo, action.id);
        const {data} = response;
        yield put(setToDoItemAction(data));
    } catch (error) {
        console.log(error);
    }
}

export function requestCreateToDo(toDo: ToDo) {
    return axios.request({
        method: "post",
        url: `${apiUrl}/todos`,
        data: toDo
    });
}

export function* handleCreateToDo(action: { type: string, onSuccess?: () => void, onFailure?: (message: string) => void }) {
    try {
        // @ts-ignore
        const state = yield select();
        const toDo = state.toDoReducer.toDo;
        const response: { data: ToDo } = yield call(requestCreateToDo, toDo);
        const {data} = response;
        yield put(setToDoItemAction(data));
        if (action.onSuccess) {
            action.onSuccess();
        }
    } catch (error) {
        if (action.onFailure) {
            action.onFailure("Todo item cannot be added.");
        }
    }
}

export function requestUpdateToDo(toDo: ToDo) {
    return axios.request({
        method: "put",
        url: `${apiUrl}/todos/${toDo._id}`,
        data: toDo,
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });

}

export function* handleUpdateToDo(action: { type: string, onSuccess?: () => void, onFailure?: (message: string) => void }) {
    try {
        // @ts-ignore
        const state = yield select();
        const toDo = state.toDoReducer.toDo;
        const response: { data: ToDo } = yield call(requestUpdateToDo, toDo);
        const {data} = response;
        yield put(setToDoItemAction(data));
        if (action.onSuccess) {
            action.onSuccess();
        }
    } catch (error) {
        if (action.onFailure) {
            action.onFailure("Todo item cannot be updated.");
        }
    }
}

export function* handleCheckToDo(action: { type: string, id: number, onSuccess?: () => void, onFailure?: (message: string) => void }) {
    try {
        const item: { data: ToDo } = yield call(requestGetToDo, action.id);
        const {data} = item;
        data.completed = !data.completed;
        const response: { data: ToDo } = yield call(requestUpdateToDo, data);
        yield put(setToDoItemAction(data));
        if (action.onSuccess) {
            action.onSuccess();
        }
    } catch (error) {
        if (action.onFailure) {
            action.onFailure("Todo item cannot be checked.");
        }
    }
}

export function requestDeleteToDo(id: number) {
    return axios.request({
        method: "delete",
        url: `${apiUrl}/todos/${id}`,
    });
}

export function* handleDeleteToDo(action: { type: string, id: number ,onSuccess?: () => void, onFailure?: (message: string) => void }) {
    try {
        const response: { data: ToDo } = yield call(requestDeleteToDo, action.id);
        const {data} = response;
        yield put(setToDoItemAction(data));
        if (action.onSuccess) {
            action.onSuccess();
        }
    } catch (error) {
        if (action.onFailure) {
            action.onFailure("Todo item cannot be checked.");
        }
    }
}
