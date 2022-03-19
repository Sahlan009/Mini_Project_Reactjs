import React from "react";
import {Row, Col, Card, CardImg, CardText,CardTitle, Button, Container } from 'reactstrap';

import Header from "../../component/Header";
import Footer from "../../component/Footer";

import './style.scss'

    const Catalog = () => {
    return (
        <div>
            <Header/>
            <div className="catalog" >
              <br />
              <Container>
            <Row>

      <Col sm="4">
        <Card body className="card-container">
          <CardImg className="img-container" src='https://wallpapercave.com/wp/wp2122194.jpg'/>
          <CardTitle>Mouse</CardTitle>
          <CardText>Rp.200.000</CardText>
          <Button>Buy</Button>
        </Card>
      </Col> 

      <Col sm="4">
        <Card body className="card-container">
          <CardImg className="img-container" src='https://wallpapercave.com/wp/wp2122194.jpg'/>
          <CardTitle>Keyboard</CardTitle>
          <CardText>Rp.500.000</CardText>
          <Button>Buy</Button>
        </Card>
      </Col>

      <Col sm="4">
        <Card body className="card-container">
          <CardImg className="img-container" src='https://wallpapercave.com/wp/wp2122194.jpg'/>
          <CardTitle>Headset</CardTitle>
          <CardText>Rp.500.000</CardText>
          <Button>Buy</Button>
        </Card>
      </Col>
    </Row>
    </Container>

    <br/>

    <Container>  
    <Row>

      <Col sm="4">
        <Card body className="card-container">
          <CardImg className="img-container" src='https://wallpapercave.com/wp/wp2122194.jpg'/>
          <CardTitle>Mousepad</CardTitle>
          <CardText>Rp.150.000</CardText>
          <Button>Buy</Button>
        </Card>
      </Col>

      <Col sm="4">
        <Card body className="card-container">
          <CardImg className="img-container" src='https://wallpapercave.com/wp/wp2122194.jpg'/>
          <CardTitle>Gaming Table</CardTitle>
          <CardText>Rp.1.500.000</CardText>
          <Button>Buy</Button>
        </Card>
      </Col>

      <Col sm="4">
        <Card body className="card-container">
          <CardImg className="img-container"  src='https://wallpapercave.com/wp/wp2122194.jpg' />
          <CardTitle>Gaming Chair</CardTitle>
          <CardText>Rp.1.200.000</CardText>
          <Button>Buy</Button>
        </Card>
      </Col>

    </Row>
    </Container>
    <br />
    </div>
            <Footer/>
        </div>
    )
}

export default Catalog;
