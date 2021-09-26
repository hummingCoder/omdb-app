import {
    CHECK_TODO_ITEM,
    CREATE_TODO_ITEM,
    DELETE_TODO_ITEM,
    GET_TODO_ITEM,
    GET_TODOS,
    SET_TODO_ITEM,
    SET_TODOS,
    UPDATE_TODO_ITEM
} from "./constants";

export interface ToDo {
    _id?: string;
    title: string;
    completed: boolean;
    userId?: number;
}

export const getToDosAction = () => ({
    type: GET_TODOS,
});

export const setToDosAction = (toDos: Array<ToDo>) => ({
    type: SET_TODOS,
    toDos
});
export const getToDoItemAction = (id: number) => ({
    type: GET_TODO_ITEM,
    id
});
export const setToDoItemAction = (toDo: ToDo) => ({
    type: SET_TODO_ITEM,
    toDo
});
export const checkToDoItemAction = (id: string, onSuccess?: () => void, onFailure?: (message: string) => void) => ({
    type: CHECK_TODO_ITEM,
    id,
    onSuccess,
    onFailure
});
export const createToDoItemAction = (onSuccess?: () => void, onFailure?: (message: string) => void) => ({
    type: CREATE_TODO_ITEM,
    onSuccess,
    onFailure
});
export const updateToDoItemAction = (onSuccess?: () => void, onFailure?: (message: string) => void) => ({
    type: UPDATE_TODO_ITEM,
    onSuccess,
    onFailure
});
export const deleteToDoItemAction = (id: number,onSuccess?: () => void, onFailure?: (message: string) => void) => ({
    type: DELETE_TODO_ITEM,
    id,
    onSuccess,
    onFailure
});
