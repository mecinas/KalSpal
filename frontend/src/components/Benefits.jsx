import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

import "../styles/Benefits.css"

const color = "info"
export default function Benefits() {
    return (
        <Container >
            <Row>
                <Col lg={4} md={12}>
                    <Card
                        bg={color}
                        text="white"
                        style={{ width: '18rem' }}
                        className="mb-2 benefit-card"
                    >
                        <Card.Header className="benefit-header">Motywacja</Card.Header>
                        <Card.Body>
                            <Card.Title> Codzienne powiadomienia </Card.Title>
                            <Card.Text>
                                Dzięki wbudowanej możliwości ustawienia powiadomień będziesz wreszcie w stanie utrzymać regularny cykl ćwieczeń
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} md={12}>
                <Card
                        bg={color}
                        text="white"
                        style={{ width: '18rem' }}
                        className="mb-2 benefit-card"
                    >
                        <Card.Header className="benefit-header">Zdrowie</Card.Header>
                        <Card.Body>
                            <Card.Title> Zaplanuj kalorie </Card.Title>
                            <Card.Text>
                                Możliwość śledzenia spalonych kalorii w ciągu miesiąca pozwoli lepiej zaplanować dietę i ułatwić utrzymanie upragnionej wagi
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={4} md={12}>
                <Card
                        bg={color}
                        text="white"
                        style={{ width: '18rem' }}
                        className="mb-2 benefit-card"
                    >
                        <Card.Header className="benefit-header">Relacje</Card.Header>
                        <Card.Body>
                            <Card.Title> Sieć znajomych </Card.Title>
                            <Card.Text>
                                Portal społecznościowy pozwoli Ci nawiązać nowe kontakty z osobami o wspólnych pasjach i celach 
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </Container>
    )
}
