import React, {useEffect, useState} from 'react';
import './itemList.css';
import { Spinner } from 'reactstrap';

function ItemList({ getData, renderItem, onItemSelected }) {

    const [itemList, setList] = useState([]);

    useEffect(() => {
        getData()
        .then( (data) => {
             setList(data)  
        })
    }, [])

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }
        
    if (!itemList) {
        return <Spinner color="primary" />
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
        {items}
        </ul>
    );
}

export default ItemList;