import { useState, useEffect } from 'react';

export const NewsCard = ({data}) => {
    console.log(data)

    function GFG_Fun(str2) {
        var regex = /(<([^>]+)>)/ig;
        return str2.replace(regex, "");
    }
    return (
        <div style={{ color: "white" }}>
            <h3>{data.title}</h3>
            <p>{GFG_Fun(data.description)}</p>
            <img src={data.urlToImage} width="500px"></img>
        </div>
    );
};