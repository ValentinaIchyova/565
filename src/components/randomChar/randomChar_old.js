import React, {Component, useEffect, useState} from 'react';
import './randomChar.css';
import gotService from '../../services/gotServices';
import { Spinner } from 'reactstrap';
import { Alert } from 'reactstrap';


export default class RandomChar extends Component {
    
    gotService = new gotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 15000);
    }

    componentWillUnmount(){
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25); //25-140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {

        const { char, loading, error } = this.state;
        const errorMessage = error ?   <Alert color="danger">
                                            Something goes wrong
                                        </Alert> : null;
        const spinner = loading ? <Spinner color="primary" /> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="random-block rounded">
                {content}
                {spinner}
                {errorMessage}
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}

