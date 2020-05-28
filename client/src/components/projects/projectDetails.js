import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect,Link } from 'react-router-dom';
import moment from 'moment'
import {Button} from 'reactstrap'

const ProjectDetails = (props) => {
    const { project, auth } = props;
    // Redirect to the signin page if user has not login
    if (!auth.uid) return <Redirect to='/signin' />

    // Check if there is project to display
    if (project) {
        return (
    <>
    <div className="container section project-details">
    <div className="card z-depth-0">
    <div className="card-content">
<h2>
<span className="card-title center"> { project.title }{ ` ` } { project.name }</span></h2>
    <h5>Bust: { project.bust }</h5>
    <h5>Waist: { project.waist }</h5>
    <h5>Underbust: { project.underbust }</h5>
    <h5>Hip: { project.hip }</h5>
    <h5>Length: { project.length }</h5>
    <h5>Sleeve: { project.sleeve }</h5>
    <h5>Round Sleeve: { project.round_sleeve }</h5>
    <h5>Nip: { project.nip }</h5>
    <h5>Stk: { project.stk }</h5>
    <h5>Sholuder: { project.shoulder }</h5>
    <h5>Gown Length: { project.gown_length }</h5>
    <h5>Skirt Length: { project.skirt_length }</h5>
    <h5>Blouse Length: { project.blouse_length }</h5>
    <h5>Skirt Waist: { project.skirt_waist }</h5>   
<div><a href={ project.url }>
{ project.image && <img src={ project.url } height="150" width="150" /> }
</a></div>
</div>      
    <h5 className="center"> Extra Information</h5>
    <h5>Style Description: { project.todo_description }</h5>
    <h5>Person-in-Charge: { project.todo_responsible }</h5>
    <h5>Prority Level: { project.todo_priority }</h5>
<h5>Completed:
{ project.todo_completed }</h5>
<h5 className="green-text"> To be Collected on : { moment(project.date.toDate()).calendar() }</h5>
<h5 className="center"> Contact Information </h5>
    <h5>Phone: { project.phone }</h5>
    <h5>E-mail: { project.email }</h5>
    
    <div className="card-action grey lighten-4 grey-text">
    <div>Posted by { project.todo_responsible } </div>
    <div>{ moment(project.createdAt.toDate()).calendar() }</div>
    </div>
    <div className="container center">
    <Link to={ '/' }>
    <Button className="btn btn-success" >Back</Button>
    </Link>
    </div>
    </div>
    </div>
    </>
    )
    } else {

        return (
            <div className="conatainer center">
                <h3>Loading project...</h3>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null
    return {
        project: project,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails)

