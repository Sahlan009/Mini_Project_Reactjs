import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Button
 } from 'reactstrap';
 import './style.scss'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Navbar className='navbar' color='light' light expand="md">
          <NavbarBrand>Askara Gaming</NavbarBrand>
                <NavbarBrand>CATALOG</NavbarBrand>
                <Button className='btn-submit' onClick={this.toggle}>{this.props.buttonLabel} Logout</Button>
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Logout</ModalHeader>
          <ModalBody>
             Are you sure want to Logout  ?
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggle} href="/" >Yes</Button>{' '}
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
