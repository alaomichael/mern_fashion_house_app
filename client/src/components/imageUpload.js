import React, { Component } from 'react'
import { storage } from '../config/firebaseConfig'

class ImageUpload extends Component {

   
    constructor(props) {
        super(props);
           this.state = {
            image: null,
            url: ''
        }

this.handleChange = this.handleChange.bind(this);
       this.handleUpload = this.handleUpload.bind(this);
    }

     handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
    }

     handleUpload = () => {
            const {image} =this.state;
            const uploadTask = storage.ref(`images/styles/${image.name}`).put(image);
            uploadTask.on('state_change',
            (snapshot) => {
                // progress function
                console.log(snapshot);
                
            },
            (error) => {
                // Error function
                console.log(error);
                
            },
            () => {
                // complete function
                storage.ref('images/styles').child(image.name).getDownloadURL.then(url => {
                    console.log(url);
                    this.setState({url});
                })
            }
            )
        
    }

    render() {
        return (
            <div>
            <input type="file"
            name='image'
        id='image'
        accept="image/*" multiple = "false"
        placeholder='Add Chosen Style Picture'
        onChange={this.handleChange} />
        
            <button onClick={this.handleUpload} >Upload</button>
            <br/>
            <img src={this.state.url || 'https://via.placeholder.com/150' } alt="Uploaded Style" height="150" width="150" />
            </div>
            
        )
    }
}

export default ImageUpload;