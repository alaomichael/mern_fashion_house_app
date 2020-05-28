const initState = {
    usernames: [
        { username: 'Michael'},
        { username:  'Esther'},
        { username:  'Peculiar'},
        { username:  'Glory'}
    ]
}

const usernameReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_USERNAME':
            console.log('created username', action.username);
            return state;
        case 'CREATE_USERNAME_ERROR':
            console.log('created username error', action.err);
            return state;
        default:
            return state;
    }
}

export default usernameReducer;