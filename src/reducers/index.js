import { combineReducers } from 'redux';

const selectedTask = (state = null, action) => {
    return state;
}

const allTasks = (state = [], action) => {
    switch(action.type) {
        case "ADD_TASK": {
            return [...state, action.payload];
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
        default: {
            return state;
        }
    }
}

const doneTasks = (state = [], action) => {
    return state;
}

export default combineReducers({
    selectedTask,
    allTasks,
    activeTasks,
    doneTasks
});