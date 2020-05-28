import React from 'react';
import moment from 'moment'
import {Card,CardBody, CardTitle, Button,CardLink} from 'reactstrap'
import { Link } from 'react-router-dom';
import UpdateProject from './updateProject'

const ProjectSummary = ({ project }) => {
  
    return (
<Card >
<div className=" card z-depth-0 project-summary">
<CardTitle >{ project.title } { ` ` } { project.name }</CardTitle>
<CardBody> 
<div className="card-content grey-text text-darken-3">
<h5>Bust: { project.bust }</h5>
<h5>Waist: { project.waist }</h5>
<h5>Underbust: { project.underbust }</h5>
<h5>Hip: { project.hip }</h5>
<h5>Length: { project.length }</h5>
<h5 className="green-text"> To be Collected on : { moment(project.date.toDate()).calendar() }</h5>
<div>{ project.image && <img src={ project.url } height="100" width="100" /> }</div>

<p className="grey-text"> { moment(project.createdAt.toDate()).calendar() }</p>
</div>
// <CardLink>
// <Link to={ '/project/' + project.id } key={ project.id }>
// <UpdateProject project={ project }   />Update2
// </Link>
// </CardLink>
                    <CardLink><Link to={ '/update/project/' + project.id } >Update</Link></CardLink>
</CardBody>
</div>
</Card>
    )
}

export default ProjectSummary;