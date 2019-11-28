import { combineReducers } from 'redux';

const selectedTask = (state = null, action) => {
    switch(action.type) {
        case "SELECT_TASK": {
            return action.payload
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
            var newState = state.filter(x => x.id != action.payload.id);
            return [...newState, action.payload];
        }
        case "MOVE_TO_DO": {
            var newState = state.filter(x => x.id != action.payload.id);
            return [...newState, action.payload];
        }
        case "REMOVE_TASK": {
            var newState = state.filter(x => x.id != action.payload);
            return [...newState];
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
            var newState = state.filter(x => x.id != action.payload.id);
            return [...newState];
        }
        case "MOVE_TO_DO": {
            return [...state, action.payload];
        }
        case "REMOVE_TASK": {
            var newState = state.filter(x => x.id != action.payload);
            return [...newState];
        }
        default: {
            return state;
        }
    }
}

const doneTasks = (state = [], action) => {
    switch(action.type) {
        case "MOVE_TO_DO": {
            var newState = state.filter(x => x.id != action.payload.id);
            return [...newState];
        }
        case "MOVE_TO_DONE": {
            return [...state, action.payload];
        }
        case "REMOVE_TASK": {
            var newState = state.filter(x => x.id != action.payload);
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