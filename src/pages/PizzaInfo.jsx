import React from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react';

const PizzaInfo = (props) => {
    const { id } = useParams();
    const [pizzaData, setPizzaData] = useState({});
    const { title, price, imageUrl } = pizzaData;
    console.log(pizzaData);

    const getPizzaInfo = async () => {
        try {
            const { data } = await axios.get(`https://62a8c6edec36bf40bdadcca5.mockapi.io/items/${id}`);
            setPizzaData(data);
        } catch (error) {
            console.log(error, 'catch error');
        }
    }

    useEffect(() => {
        getPizzaInfo();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
            <img src={imageUrl} alt={title} style={{ width: "320px" }} />
            <h2>{title}</h2>
            <p>Pizza Description</p>
            <h4>Price: {price}</h4>
        </div>
    )
}

export default PizzaInfo