import React, { Component } from 'react';
import GridQuarter from './GridQuarter';
import ModalQuarter from './ModalQuarter';
import { API_URI } from '../../Config';
import { Button } from 'react-bootstrap';
import NavbarHeader from '../../Navbar';

class Quarter extends Component {
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
    this.updateQuarter = this.updateQuarter.bind(this);
    this.createQuarterFromModal = this.createQuarterFromModal.bind(this);
    this.updateGridSelection = this.updateGridSelection.bind(this);
  }

  componentDidMount(){
    this.updateGrid();
  }

  updateGrid(){
    fetch(`${API_URI}/quartiers`,
    {
      method: 'GET',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error('Error - 404 Not Found')
        }

        return response.json();
    })
    .then(quarters => {
        this.setState({
            rowData: quarters
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

  updateQuarter(quarterData, id){
    fetch(`${API_URI}/quartiers/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(quarterData),
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

  handleCreateQuarter(){
      this.setState({
          doubleClickdata: null
      })
      this.setModalShow();
  }

  createQuarterFromModal(quarterData){
    fetch(`${API_URI}/quartiers`,
    {
      method: 'POST',
      body: JSON.stringify(quarterData),
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

  handleDeleteQuarters(){
    fetch(`${API_URI}/quartiers`,
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
        fetch(`${API_URI}/quartiers/${id}`,
        {
          method: 'GET',
        })
        .then((response) => {
            if(!response.ok){
                throw new Error('Error - 404 Not Found')
            }
    
            return response.json();
        })
        .then(quarter => {
            this.setState({
                doubleClickdata: quarter
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
        <h1 className="text-center">Liste des quartiers</h1>
        <div className="buttonsDiv">
            <Button className="addPizzaButton" onClick={() => this.handleCreateQuarter()} variant="success">Nouveau Quartier</Button>
            <Button onClick={() => this.handleDeleteQuarters()} variant="danger">Supprimer</Button>
        </div>      
        <GridQuarter openModal={this.setModalShow} updateSelection={this.updateGridSelection} rowData={this.state.rowData}></GridQuarter>
        <ModalQuarter data={this.state.doubleClickdata} createQuarter={this.createQuarterFromModal} updateQuarter={this.updateQuarter} show={this.state.openedModal} hide={this.setModalHide}></ModalQuarter>
      </div>
      </div>
    );
  }
}

export default Quarter;
