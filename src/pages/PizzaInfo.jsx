import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PizzaInfo = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pizzaData, setPizzaData] = useState({});
    const { title, price, imageUrl } = pizzaData;

    const getPizzaInfo = async () => {
        try {
            const { data } = await axios.get(`https://62a8c6edec36bf40bdadcca5.mockapi.io/items/${id}`);
            setPizzaData(data);
        } catch (error) {
            console.log(error, 'catch error');
            alert("There is no such pizza here");
            navigate("/");
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