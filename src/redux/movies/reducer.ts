import {SET_TODO_ITEM, SET_TODOS} from "./constants";
import {ToDo} from './actions';

const initialState = {
    toDo: {
        id: 0,
        title: "",
        completed: false,
        userId: 0
    },
    toDos: []
};
export default (state = initialState, action: { type: string, toDo: ToDo, toDos: Array<ToDo> }) => {
    switch (action.type) {
        case SET_TODO_ITEM:
            const {toDo} = action;
            return {...state, toDo};
        case SET_TODOS:
            const {toDos} = action;
            return {...state, toDos};
        default:
            return state;
    }
};
