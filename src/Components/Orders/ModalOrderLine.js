import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URI } from '../../Config';

class ModalOrderLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num_Client: null,
      num_Pizza: null,
      quantite: null,
      allPizzas: null,
      orderId: null
    }
  }

  handleUpdate(){
    this.setState({
      numClient: this.state.num_Client == null ? this.props.data.num_Client : this.state.num_Client,
      numPizza: this.state.num_Pizza == null ? this.props.data.num_Pizza : this.state.num_Pizza,
      quantite: this.state.num_quantite == null ? this.props.data.quantite : this.state.quantite,
      orderId: this.props.orderId
    }, () => this.props.updateOrderLine(this.state, this.props.data.num_Liv))
  }

  componentDidMount(){
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
            allPizzas: pizzas
        })
    })
  }

  handleCreate(){
    this.props.createDeliverer(this.state);
  }

  handleChange(event){
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }

  render() {
    return (
      <Modal show={this.props.show}
        onHide={this.props.hide}
        size="lg"
        centered
        className="pizzaModal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modalCenteredTitle">
            {this.props.data ? `Edition du livreur n°${this.props.data.num_Liv}` : "Création d'un livreur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom du livreur</Form.Label>
              <Form.Control type="text" onChange={(event) => this.handleChange(event)}
                defaultValue={this.props.data ? this.props.data.nom_Livreur : ""} name="nom_Livreur" placeholder="Entrer le nom du livreur" />
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
            <div className="text-center modalPizzaValidButton">
              {this.props.data ? <Button variant="primary" type="button" onClick={() => this.handleUpdate()}>
                Mettre à jour
              </Button> : <Button variant="success" type="button" onClick={() => this.handleCreate()}>
                Créer
              </Button>}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ModalOrderLine;