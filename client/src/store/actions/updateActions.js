export const updateProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
// const authorId = getState().firebase.auth.uid;
const updated_project = {
name: project.name,
    phone: project.phone,
    title: project.title
}
        firestore.collection('projects').doc(project.id).update({
    updated_project

        }).then(() => {
            console.log('Updated successfully.');
            dispatch({ type: 'UPDATE_PROJECT', project });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_PROJECT_ERROR', err });
        })

    }
};

// db.collection("users")
// .doc("3P86VJxcpBK0D0lsAyYx")
// .update(
//     {
//         name: "Anbu Selvan",
//         email: "anbu.selvan@email.com",
//     },
// );