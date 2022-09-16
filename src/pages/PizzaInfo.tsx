import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PizzaInfo: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pizzaData, setPizzaData] = useState<{
        title: string;
        price: number;
        imageUrl: string;
    }>();

    const getPizzaInfo = async () => {
        try {
            const { data } = await axios.get(
                `https://62a8c6edec36bf40bdadcca5.mockapi.io/items/${id}`,
            );
            console.log(data);
            setPizzaData(data);
        } catch (error) {
            console.log(error, "catch error");
            alert("There is no such pizza here");
            navigate("/");
        }
    };

    useEffect(() => {
        getPizzaInfo();
        // eslint-disable-next-line
    }, []);

    if (!pizzaData) {
        return <>Идет Загрузка...</>;
    }

    const { title, price, imageUrl } = pizzaData;
    return (
        <div className="container">
            <img src={imageUrl} alt={title} style={{ width: "320px" }} />
            <h2>{title}</h2>
            <p>Pizza Description</p>
            <h4>Price: {price}</h4>
        </div>
    );
};

export default PizzaInfo;
