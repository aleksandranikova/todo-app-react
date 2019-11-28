export const addTask = (task) => dispatch => {
    dispatch({ type: "ADD_TASK", payload: task});
}

export const moveToDone = (task) => dispatch => {
    dispatch({ type: "MOVE_TO_DONE", payload: task});
}

export const moveToDo = (task) => dispatch => {
    dispatch({ type: "MOVE_TO_DO", payload: task});
}

export const removeTask = (id) => dispatch => {
    dispatch({ type: "REMOVE_TASK", payload: id});
}

export const selectTask = (task) => dispatch => {
    dispatch({ type: "SELECT_TASK", payload: task});
}

export const saveEdit = (task) => dispatch => {
    dispatch({ type: "SAVE_EDIT", payload: task});
}