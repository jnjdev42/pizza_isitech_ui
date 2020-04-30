import React, { Component } from 'react';
import GridOrderLines from './GridOrderLines';
import ModalOrderLine from './ModalOrderLine';
import { API_URI } from '../../Config';
import { Button } from 'react-bootstrap';
import NavbarHeader from '../../Navbar';
import { Form } from 'react-bootstrap';

class OrderUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
        openedModal: false,
        doubleClickdata: {},
        rowData: [],
        selectedIds: [],
        num_Client: null
    }

    this.setModalHide = this.setModalHide.bind(this);
    this.setModalShow = this.setModalShow.bind(this);
    this.updateOrderLine = this.updateOrderLine.bind(this);
    this.createOrderLineFromModal = this.createOrderLineFromModal.bind(this);
    this.updateGridSelection = this.updateGridSelection.bind(this);
  }

  componentDidMount(){
    this.updateGrid();
  }

  updateGrid(){
    fetch(`${API_URI}/commandes/${this.props.match.params.id}`,
    {
      method: 'GET',
    })
    .then((response) => {
        if(!response.ok){
            throw new Error('Error - 404 Not Found')
        }

        return response.json();
    })
    .then(order => {
        this.setState({
            orderData: order
        })
        let array = [];
        order.ligne_Cde_Clis.forEach(orderLine => {
            array.push({
                num_Ligne_Cde: orderLine.num_Ligne_Cde,
                num_Pizza: orderLine.catalogue_Pizza.num_Pizza,
                nom_Pizza: orderLine.catalogue_Pizza.nom_Pizza,
                taille_Pizza: orderLine.catalogue_Pizza.taille_Pizza,
                quantite: orderLine.quantite
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

  updateOrderLine(orderLineData, id){
    fetch(`${API_URI}/livreurs/${id}`,
    {
      method: 'PUT',
      body: JSON.stringify(orderLineData),
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

  handleCreateOrderLine(){
      this.setState({
          doubleClickdata: null
      })
      this.setModalShow();
  }

  createOrderLineFromModal(orderLineData){
    fetch(`${API_URI}/lignescommandes`,
    {
      method: 'POST',
      body: JSON.stringify(orderLineData),
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

  handleDeleteOrderLines(){
    fetch(`${API_URI}/lignescommandes`,
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
        fetch(`${API_URI}/lignescommandes/${id}`,
        {
          method: 'GET',
        })
        .then((response) => {
            if(!response.ok){
                throw new Error('Error - 404 Not Found')
            }
    
            return response.json();
        })
        .then(orderline => {
            this.setState({
                doubleClickdata: orderline
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
        <h1 className="text-center">{`Modification de la commande n°${this.props.match.params.id}`}</h1>
        <Form className="orderDetailForm">
            <Form.Group>
              <Form.Label>Client</Form.Label>
              <Form.Control as="select" onChange={(event) => this.handleChange(event)} name="num_Quartier"
                defaultValue={this.props.data && this.props.data.quartier != undefined ? this.props.data.quartier.num_Quartier : ""}>
                    <option></option>
                  {this.state.allQuarters ? this.state.allQuarters.map(quarter =>
                    <option key={quarter.num_Quartier} value={quarter.num_Quartier}>{quarter.nom_Quartier}</option>) : null}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Quartier</Form.Label>
              <Form.Control as="select" onChange={(event) => this.handleChange(event)} name="num_Quartier"
                defaultValue={this.props.data && this.props.data.quartier != undefined ? this.props.data.quartier.num_Quartier : ""}>
                    <option></option>
                  {this.state.allQuarters ? this.state.allQuarters.map(quarter =>
                    <option key={quarter.num_Quartier} value={quarter.num_Quartier}>{quarter.nom_Quartier}</option>) : null}
              </Form.Control>
            </Form.Group>
          </Form>
        <div className="buttonsDiv">
            <Button className="addPizzaButton" onClick={() => this.handleCreateDeliverer()} variant="success">Nouvelle ligne</Button>
            <Button onClick={() => this.handleDeleteDeliverers()} variant="danger">Supprimer</Button>
        </div>      
        <GridOrderLines openModal={this.setModalShow} updateSelection={this.updateGridSelection} rowData={this.state.rowData}></GridOrderLines>
        <ModalOrderLine orderId={this.props.match.params.id} data={this.state.doubleClickdata} createDeliverer={this.createDelivererFromModal} updateDeliverer={this.updateDeliverer} show={this.state.openedModal} hide={this.setModalHide}></ModalOrderLine>
      </div>
      <div className="text-center modalPizzaValidButton">
              {this.props.data ? <Button variant="primary" type="button" onClick={() => this.handleUpdate()}>
                Mettre à jour
              </Button> : <Button variant="success" type="button" onClick={() => this.handleCreate()}>
                Créer
              </Button>}
            </div>
      </div>
    );
  }
}

export default OrderUpdateForm;