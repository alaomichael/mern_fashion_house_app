import React, { Component } from 'react'
import axios from 'axios';

class Username extends Component {

    componentDidMount(){
       // this.toggle();

        axios.get('http://localhost:4000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        usernames: response.data.map(username => username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    } 

  render() {
    return (
      <>
      <div className="form-group">
<label>Username: </label>
<select ref="userInput"
required
className="form-control"
value={ this.state.username }
onChange={ this.onChangeUsername }>
{ this.state.usernames && 
this.state.usernames.map(function (username) {
return <option
key={ username }
value={ username }>{ username }
</option>;
})
}
</select>
</div> 
        
      </>
    )
  }
}

export default Username
