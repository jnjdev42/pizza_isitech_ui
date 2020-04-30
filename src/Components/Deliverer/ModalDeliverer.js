import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { API_URI } from '../../Config';

class ModalDeliverer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom_Livreur: null,
      num_Quartier: null,
      allQuarters: null
    }
  }

  handleUpdate(){
    this.setState({
      nom_Livreur: this.state.nom_Livreur == null ? this.props.data.nom_Livreur : this.state.nom_Livreur,
      num_Quartier: this.state.num_Quartier == null ? this.props.data.quartier.num_Quartier : this.state.num_Quartier
    }, () => this.props.updateDeliverer(this.state, this.props.data.num_Liv))
  }

  componentDidMount(){
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
            allQuarters: quarters
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

export default ModalDeliverer;