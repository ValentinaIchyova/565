import React, {useEffect, useState} from 'react';
import Spinner from 'reactstrap/lib/Spinner';
import ErrorMessage  from '../errorMessage/errorMessage';
import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}


function ItemDetails({itemId, getData, children}) {
   
    const [item, setItem] = useState([]);
    const [loading, setLoad] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        
            if(!itemId){
                return;
            }
            getData(itemId)
            .then((data) => {
                setItem(data);
                setLoad(false);
                setError(false);
            })
            .catch(onError)                

    }, [itemId]);

    function onError() {
        console.log('error load')
        setLoad(false);
        setError(true);
    }
 

    if(!itemId) {
        return <span className='select-error'>Please select item in the list</span>
    }
    const {name} = item;
    const spinner = loading ? <Spinner ></Spinner> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {spinner}
                {errorMessage}
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </div>
    );
 
}

export default ItemDetails