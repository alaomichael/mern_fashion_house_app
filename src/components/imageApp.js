import React, { Component } from 'react'
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';

class ImageApp extends Component {
   
    state = {
        image: '',
        url: '',
        progress: 0
    }

    handleUploadStart = () => {
        this.setState({
            progress:0
        })
    }

    handleUploadSuccess = filename => {
this.setState({
    image: filename,
    progress: 100
})

firebase.storage().ref('avatars').child(filename).getDownloadURL()
.then(url => this.setState({
    url:url
}))
    }

    handleProgress = progress => {
        this.setState({
            progress: progress
        })
    }
    render(){
console.log(this.state);
        return (
            < >
                <h1>From IMAGEAPP.JS</h1>

<label>Progress: </label>
<p>                 {this.state.progress}</p>
<br/>
<br/>
<br/>
<label>Image: </label>
{this.state.image && <img src={this.state.url} />}
<br />

{this.state.url && <a href={this.state.url}>Download Style</a>}


                <br />
                <br />
                <br />

            <FileUploader
            accept="image/*"
            name="image"
            storageRef={firebase.storage().ref('avatars')}
            onUploadStart={this.handleUploadStart}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
/>

            </>
        );
        }

}

export default ImageApp;