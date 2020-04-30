import React, { Component } from 'react';
import GridDeliverer from './GridDeliverer';
import ModalDeliverer from './ModalDeliverer';
import { API_URI } from '../../Config';
import { Button } from 'react-bootstrap';
import NavbarHeader from '../../Navbar';

class Deliverer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        openedModal: false,
        doubleClickdata: {},
        rowData: [],
        selectedIds: []
    }

    this.setModalHide = this.setModalHide.bind(this);
    this.setModalShow = this.setModalShow.bind(this);
    this.updateDeliverer = this.updateDeliverer.bind(this);
    this.createDelivererFromModal = this.createDelivererFromModal.bind(this);
    this.updateGridSelection = this.updateGridSelection.bind(this);
  }

  componentDidMount(){
    this.updateGrid();
  }

  updateGrid(){
    fetch(`${API_URI}/livreurs`,
    {
      method: 'GET',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error('Error - 404 Not Found')
        }

        return response.json();
    })
    .then(deliverers => {
        let array = [];
        deliverers.forEach(deliverer => {
            array.push({
                num_Liv: deliverer.num_Liv,
                nom_Livreur: deliverer.nom_Livreur,
                nom_Quartier: deliverer.quartier.nom_Quartier
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

  updateDeliverer(delivererData, id){
    fetch(`${API_URI}/livreurs/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(delivererData),
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

  handleCreateDeliverer(){
      this.setState({
          doubleClickdata: null
      })
      this.setModalShow();
  }

  createDelivererFromModal(delivererData){
    fetch(`${API_URI}/livreurs`,
    {
      method: 'POST',
      body: JSON.stringify(delivererData),
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

  handleDeleteDeliverers(){
    fetch(`${API_URI}/livreurs`,
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
        fetch(`${API_URI}/livreurs/${id}`,
        {
          method: 'GET',
        })
        .then((response) => {
            if(!response.ok){
                throw new Error('Error - 404 Not Found')
            }
    
            return response.json();
        })
        .then(deliverer => {
            this.setState({
                doubleClickdata: deliverer
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
        <h1 className="text-center">Liste des livreurs</h1>
        <div className="buttonsDiv">
            <Button className="addPizzaButton" onClick={() => this.handleCreateDeliverer()} variant="success">Nouveau Livreur</Button>
            <Button onClick={() => this.handleDeleteDeliverers()} variant="danger">Supprimer</Button>
        </div>      
        <GridDeliverer openModal={this.setModalShow} updateSelection={this.updateGridSelection} rowData={this.state.rowData}></GridDeliverer>
        <ModalDeliverer data={this.state.doubleClickdata} createDeliverer={this.createDelivererFromModal} updateDeliverer={this.updateDeliverer} show={this.state.openedModal} hide={this.setModalHide}></ModalDeliverer>
      </div>
      </div>
    );
  }
}

export default Deliverer;