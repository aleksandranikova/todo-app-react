import { combineReducers } from 'redux';

const selectedTask = (state = null, action) => {
    switch(action.type) {
        case "SELECT_TASK": {
            return action.payload;
        }
        case "SAVE_EDIT": {
            return null;
        }
        case "MOVE_TO_DONE": {
            return null;
        }
        case "MOVE_TO_DO": {
            return null;
        }
        case "REMOVE_TASK": {
            return null;
        }
        default: {
            return state;
        }
    }
}
const allTasks = (state = [], action) => {
    switch(action.type) {
        case "ADD_TASK": {
            return [...state, action.payload];
        }
        case "MOVE_TO_DONE": {
            var task = state.find(x => x.id === action.payload.id);
            task.done = true;
            return [...state];
        }
        case "MOVE_TO_DO": {
            task = state.find(x => x.id === action.payload.id);
            task.done = false;
            return [...state];
        }
        case "REMOVE_TASK": {
            var newState = state.filter(x => x.id !== action.payload);
            return [...newState];
        }
        case "SAVE_EDIT": {
            task = state.find(x => x.id === action.payload.id);
            task.description = action.payload.description;
            return [...state];
        }
        default: {
            return state;
        }
    }
}

const activeTasks = (state = [], action) => {
    switch(action.type) {
        case "ADD_TASK": {
            return [...state, action.payload];
        }
        case "MOVE_TO_DONE": {
            var newState = state.filter(x => x.id !== action.payload.id);
            return [...newState];
        }
        case "MOVE_TO_DO": {
            return [...state, action.payload];
        }
        case "REMOVE_TASK": {
            newState = state.filter(x => x.id !== action.payload);
            return [...newState];
        }
        case "SAVE_EDIT": {
            var task = state.find(x => x.id === action.payload.id);
            task.description = action.payload.description;
            return [...state];
        }
        default: {
            return state;
        }
    }
}

const doneTasks = (state = [], action) => {
    switch(action.type) {
        case "MOVE_TO_DO": {
            var newState = state.filter(x => x.id !== action.payload.id);
            return [...newState];
        }
        case "MOVE_TO_DONE": {
            return [...state, action.payload];
        }
        case "REMOVE_TASK": {
            newState = state.filter(x => x.id !== action.payload);
            return [...newState];
        }
        default: {
            return state;
        }
    }
}

export default combineReducers({
    selectedTask,
    allTasks,
    activeTasks,
    doneTasks
});