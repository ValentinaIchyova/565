import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import './app.css';
import RandomChar from '../randomChar';
import { Button } from 'reactstrap';
import { Alert } from 'reactstrap';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from '../pages';
import gotService from '../../services/gotServices';
import {BrowserRouter as Router, Route} from 'react-router-dom';

export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,       
        error: false,
        selectedHouse: 20
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => { 
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }
    

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <Alert color="danger">Something goes wrong</Alert>
        }


        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                <Button className='mb-4' color="primary" onClick={this.toggleRandomChar}>Toggle Random Character</Button>
                            </Col>                    
                        </Row>
                        <Route path='/' exact component={() => <h1 className='text'>Welcome to home page of database of Game of Thrones! </h1>}/>
                        <Route path='/characters' component={CharacterPage}/>                   
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={({match}) => {
                                const {id} = match.params;
                            return <BooksItem bookId={id}/>}}/>
                    </Container>
                </div>
            </Router>
        );
    }
    
};
