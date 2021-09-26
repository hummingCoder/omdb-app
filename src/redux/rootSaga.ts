import {takeLeading} from "redux-saga/effects";
import {
    CHECK_TODO_ITEM,
    CREATE_TODO_ITEM,
    DELETE_TODO_ITEM,
    GET_TODO_ITEM,
    GET_TODOS,
    UPDATE_TODO_ITEM
} from "./todos/constants";
import {
    handleCheckToDo,
    handleCreateToDo,
    handleDeleteToDo,
    handleGetToDo,
    handleGetToDos,
    handleUpdateToDo
} from "./todos/sagas";

export function* watcherSaga() {
    yield takeLeading(GET_TODOS, handleGetToDos);
    yield takeLeading(GET_TODO_ITEM, handleGetToDo);
    yield takeLeading(UPDATE_TODO_ITEM, handleUpdateToDo);
    yield takeLeading(CHECK_TODO_ITEM, handleCheckToDo);
    yield takeLeading(CREATE_TODO_ITEM, handleCreateToDo);
    yield takeLeading(DELETE_TODO_ITEM, handleDeleteToDo);
}
