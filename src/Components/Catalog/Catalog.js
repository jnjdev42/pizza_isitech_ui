import React, { Component } from 'react';
import GridCatalog from './GridCatalog';
import ModalPizza from './ModalPizza';
import { API_URI } from '../../Config';
import { Button } from 'react-bootstrap';
import NavbarHeader from '../../Navbar';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
        openedModal: false,
        doubleClickdata: {},
        rowData:[],
        selectedIds: []
    }

    this.setModalHide = this.setModalHide.bind(this);
    this.setModalShow = this.setModalShow.bind(this);
    this.updatePizza = this.updatePizza.bind(this);
    this.createPizzaFromModal = this.createPizzaFromModal.bind(this);
    this.updateGridSelection = this.updateGridSelection.bind(this);
  }

  componentDidMount(){
    this.updateGrid();
  }

  updateGrid(){
    fetch(`${API_URI}/pizzas`,
    {
      method: 'GET',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error('Error - 404 Not Found')
        }

        return response.json();
    })
    .then(pizzas => {
        this.setState({
            rowData: pizzas
        })
    })
  }

  updateGridSelection(selectedIds){
    this.setState({
        selectedIds: selectedIds
    })
  }

  onGridReady = params => {
      this.gridApi = params.api;
      this.griColumnApi = params.columnApi;
      this.sizeToFit();
  }

  sizeToFit = () => {
      this.gridApi.sizeColumnsToFit();
  }

  setModalHide(){
    this.setState({
        openedModal: false
    })
  }

  updatePizza(pizzaData, id){
    fetch(`${API_URI}/pizzas/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(pizzaData),
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
        this.setModalHide();
    })
  }

  handleCreatePizza(){
      this.setState({
          doubleClickdata: null
      })
      this.setModalShow();
  }

  createPizzaFromModal(pizzaData){
    fetch(`${API_URI}/pizzas`,
    {
      method: 'POST',
      body: JSON.stringify(pizzaData),
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
        this.setModalHide();
    })
  }

  handleDeletePizzas(){
    fetch(`${API_URI}/pizzas`,
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
        this.setModalHide();
    })
  }

  setModalShow(id){
    if(id){
        fetch(`${API_URI}/pizzas/${id}`,
        {
          method: 'GET',
        })
        .then((response) => {
            if(!response.ok){
                throw new Error('Error - 404 Not Found')
            }
    
            return response.json();
        })
        .then(pizza => {
            this.setState({
                doubleClickdata: pizza
            }, () => this.setState({
                openedModal: true
            }));
        })
    }
    else{
        this.setState({
            openedModal: true
        })
    }
  }

  render() {
    return (
    <div className="Catalogue">
      <NavbarHeader></NavbarHeader>
      <div className="divCenter">
        <h1 className="text-center">Catalogue des pizzas</h1>
        <div className="buttonsDiv">
            <Button className="addPizzaButton" onClick={() => this.handleCreatePizza()} variant="success">Nouvelle pizza</Button>
            <Button onClick={() => this.handleDeletePizzas()} variant="danger">Supprimer</Button>
        </div>      
        <GridCatalog openModal={this.setModalShow} updateSelection={this.updateGridSelection} rowData={this.state.rowData}></GridCatalog>
        <ModalPizza data={this.state.doubleClickdata} createPizza={this.createPizzaFromModal} updatePizza={this.updatePizza} show={this.state.openedModal} hide={this.setModalHide}></ModalPizza>
      </div>
      </div>
    );
  }
}

export default Catalog;
