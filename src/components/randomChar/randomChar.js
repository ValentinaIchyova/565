import React, {useState, useEffect} from 'react';
import './randomChar.css';
import gotService from '../../services/gotServices';
import { Spinner } from 'reactstrap';
import { Alert } from 'reactstrap';

function RandomChar() {   
    const service = new gotService();
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    function updateChar() {        
        const id = Math.floor(Math.random()*140 + 25); //25-140
        service.getCharacter(id)
            .then( (data) => {
                setChar(data);
                setLoading(false);
                console.log('char loaded');
            })
            .catch( (err) => {
                setError(true);
                setLoading(false);
                console.log(err);
            });
    }

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 10000);
        console.log('mount or update');
            return ( () => {
                clearInterval(timerId);
                console.log('did unmount');
            })
    }, [])
       
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

export default RandomChar;


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

