import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class ModalPizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom_Pizza: null,
      taille_Pizza: null,
      prix_Pizza: null,
    }
  }

  handleUpdate(){
    this.setState({
      nom_Pizza: this.state.nom_Pizza == null ? this.props.data.nom_Pizza : this.state.nom_Pizza,
      taille_Pizza: this.state.taille_Pizza == null ? this.props.data.taille_Pizza : this.state.taille_Pizza,
      prix_Pizza: this.state.prix_Pizza == null ? this.props.data.prix_Pizza : this.state.prix_Pizza,
    }, () => this.props.updatePizza(this.state, this.props.data.num_Pizza))
  }

  handleCreate(){
    this.props.createPizza(this.state);
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
            {this.props.data ? `Edition de la pizza n°${this.props.data.num_Pizza}` : "Création d'une pizza"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom de la pizza</Form.Label>
              <Form.Control type="text" onChange={(event) => this.handleChange(event)}
                defaultValue={this.props.data ? this.props.data.nom_Pizza : ""} name="nom_Pizza" placeholder="Entrer le nom de la pizza" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Taille de la pizza (en cm)</Form.Label>
              <Form.Control type="number" onChange={(event) => this.handleChange(event)}
                defaultValue={this.props.data ? this.props.data.taille_Pizza : ""} name="taille_Pizza" placeholder="Entrer la taille en cm" />
            </Form.Group>

            <Form.Group >
              <Form.Label>Prix en la pizza (en €)</Form.Label>
              <Form.Control type="number" onChange={(event) => this.handleChange(event)} 
                defaultValue={this.props.data ? this.props.data.prix_Pizza : ""} step="any" name="prix_Pizza" placeholder="Entrer le prix en €" />
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

export default ModalPizza;
