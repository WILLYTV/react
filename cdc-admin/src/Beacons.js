import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import SubmitCustomizado from './componentes/SubmitCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from  './TratadorErros';
import { Modal,Button } from 'react-bootstrap';





class TabelaBeacons extends Component {

    render() {
        return(
                    <div>            
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <th>Beacon Type</th>
                            <th>Namespace</th>
                            <th>Beacon identifier</th>
                            <th>Beacon Alias</th>
                            <th>Acao</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.lista.map(function(beacon){
                              return (
                                <tr key={beacon._id}>
                                  <td>{beacon.type}</td> 
                                  <td>{beacon.namespace}</td>
                                  <td>{beacon.identifier}</td>
                                  <td>{beacon.alias}</td>
                                  <td>
                                      <button className="pure-button pure-button-primary">Localizar...</button>
                                  </td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table> 
                    </div>                     
        );
    }

  constructor() {
    super();    
    this.localizarBeacon = this.localizarBeacon.bind(this);    
  }

  localizarBeacon(evento){
    evento.preventDefault(); 
    console.log('localizarBeacon....executed...');
  }


}

export default class BeaconsBox extends Component {

  constructor() {
    super();    
    this.state = {lista : []};    
  }

  componentDidMount(){  
    $.ajax({
        url:"https://api-beaconstracking-v1.herokuapp.com/api/beacon",
        dataType: 'json',
        success:function(resposta){    
          this.setState({lista:resposta});
        }.bind(this)
      } 
    );          

    // var that = this;
    // var url = 'http://api-beaconstracking-v1.herokuapp.com/api/beacon'
    
    // fetch(url)
    // .then(function(response) {
    //   if (response.status >= 400) {
    //     throw new Error("Bad response from server");
    //   }
    //   console.log(response)
    //   // return response.json();
    // })
    // .then(function(data) {
    //   console.log("fetch return..."+data)
    //   // that.setState({ person: data.person });
    //   that.setState({lista:data});
    // });

  }   


  render(){
    return (
      <div>
        <div className="header">
          <h1>Consulta de Beacons</h1>
        </div>
        <div className="content" id="content">                            
          <TabelaBeacons lista={this.state.lista}/>        
        </div>      

      </div>
    );
  }
}