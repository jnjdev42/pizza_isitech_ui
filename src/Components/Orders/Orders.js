import React, { Component } from 'react';
import GridOrders from './GridOrders';
import { API_URI } from '../../Config';
import { Button } from 'react-bootstrap';
import NavbarHeader from '../../Navbar';
import { Redirect } from 'react-router';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
        doubleClickdata: {},
        rowData:[],
        selectedIds: []
    }

    this.updateGridSelection = this.updateGridSelection.bind(this);
    this.gridHandleDoubleClick = this.gridHandleDoubleClick.bind(this);
  }

  componentDidMount(){
    this.updateGrid();
  }

  updateGrid(){
    fetch(`${API_URI}/commandes`,
    {
      method: 'GET',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error('Error - 404 Not Found')
        }

        return response.json();
    })
    .then(orders => {
        let array = [];
        orders.forEach(order => {
            array.push({
                num_Cde_Cli: order.num_Cde_Cli,
                nom_Cli: order.client.nom_Cli,
                addresse: order.client.addresse,
                livre_Emporte: order.livre_Emporte ? "Oui" : "Non",
                date_Cde: order.date_Cde
            });
        })
        this.setState({
            rowData: array
        })
    })
  }

  updateGridSelection(selectedIds){
    this.setState({
        selectedIds: selectedIds
    })
  }

  sizeToFit = () => {
      this.gridApi.sizeColumnsToFit();
  }

  gridHandleDoubleClick(event){
    let id = event.data.num_Cde_Cli
    this.props.history.push(`/commandes/detail/${id}`);
  }

  handleDeleteOrders(){
    fetch(`${API_URI}/commandes`,
    {
      method: 'DELETE',
      body: JSON.stringify(this.state.selectedIds),
      headers: {
          'Content-Type': 'application/json'
      }
    })
    .then((response) => {
        if(!response.ok){
            throw new Error('Error - 404 Not Found')
        }
    })
    .then(_ => {
        this.updateGrid();
    })
  }

  render() {
    return (
    <div className="Catalogue">
      <NavbarHeader></NavbarHeader>
      <div className="divCenter">
        <h1 className="text-center">Liste des commandes clients</h1>
        <div className="buttonsDiv">
            <Button className="addPizzaButton" onClick={() => this.handleCreatePizza()} variant="success">Nouvelle commande</Button>
            <Button onClick={() => this.handleDeleteOrders()} variant="danger">Supprimer</Button>
        </div>      
        <GridOrders handleDoubleClick={this.gridHandleDoubleClick} updateSelection={this.updateGridSelection} rowData={this.state.rowData}></GridOrders>
      </div>
      </div>
    );
  }
}

export default Orders;
