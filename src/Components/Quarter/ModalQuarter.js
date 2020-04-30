import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class ModalQuarter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nom_Quartier: null,
    }
  }

  handleUpdate(){
    this.setState({
      nom_Quartier: this.state.nom_Quartier == null ? this.props.data.nom_Quartier : this.state.nom_Quartier
    }, () => this.props.updateQuarter(this.state, this.props.data.num_Quartier))
  }

  tgfdp(){
      console.log('hello')
  }

  handleCreate(){
    this.props.createQuarter(this.state);
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
            {this.props.data ? `Edition du quartier n°${this.props.data.num_Quartier}` : "Création d'un quartier"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nom du quartier</Form.Label>
              <Form.Control type="text" onChange={(event) => this.handleChange(event)}
                defaultValue={this.props.data ? this.props.data.nom_Quartier : ""} name="nom_Quartier" placeholder="Entrer le nom du quartier" />
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

export default ModalQuarter;
