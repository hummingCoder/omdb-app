import {createSelector} from "reselect";

export const toDosSelector = createSelector(
    (state: any) => state.toDoReducer.toDos,
    (toDos) => {
        return toDos
    }
);
export const toDoSelector = createSelector(
    (state: any) => state.toDoReducer.toDo,
    (toDo) => {
        return toDo
    }
);
