
export const createUsername = (username) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const usernames = getState().firebase.usernames;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('usernames').add({
            ...username,
            username: usernames,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_USERNAME', username });
        }).catch((err) => {
            dispatch({ type: 'CREATE_USERNAME_ERROR', err });
        })

    }
};