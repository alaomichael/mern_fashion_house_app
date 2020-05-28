import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
class FormModal extends Component {
  componentDidMount(){
      document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  });

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.slider');
      var instances = M.Slider.init(elems, {});
    });
  }
  render() {
    return (
      <>
        <div className="container">
        
<a className="waves-effect waves-light btn modal-trigger" href="#modal1" >Modal</a>
          <button data-target="modal1" className="btn modal-trigger">Modal Button</button>
          
  <div className="slider">
    <ul className="slides">
      <li>
        <img src="https://lorempixel.com/580/250/nature/1" /> 
        <div className="caption center-align">
          <h3>This is our big Tagline!</h3>
          <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>
      </li>
      <li>
        <img src="https://lorempixel.com/580/250/nature/2" /> 
        <div className="caption left-align">
          <h3>Left Aligned Caption</h3>
          <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>
      </li>
      <li>
        <img src="https://lorempixel.com/580/250/nature/3" /> 
        <div className="caption right-align">
          <h3>Right Aligned Caption</h3>
          <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>
      </li>
      <li>
        <img src="https://lorempixel.com/580/250/nature/4" />
        <div className="caption center-align">
          <h3>This is our big Tagline!</h3>
          <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
        </div>
      </li>
    </ul>
  </div>
      
<div id="modal1" className="modal">
<div className="modal-content">

<h4>Modal Header</h4>
<p>Bunch of Text</p>
              <div className="row">
                <div className="col s6">
                  Col 1
        </div>
                <div className="col s6">
                  Col 2
        </div>
              </div>
 <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
</div>
</div>


        </div> 
      </>
    )
  }
}

export default FormModal
