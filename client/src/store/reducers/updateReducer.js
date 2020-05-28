const initState = {
    project: {}
}

const updateReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_PROJECT':
            console.log('updated project', action.project);
            return state;
        case 'UPDATE_PROJECT_ERROR':
            console.log('updated project error', action.err);
            return state;
        default:
            return state;
    }
}

export default updateReducer;