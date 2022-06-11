import { useState, useEffect } from 'react';

export const NewsCard = ({data}) => {
    
    function GFG_Fun(str2) {
        var regex = /(<([^>]+)>)/ig;
        return str2.replace(regex, "");
    }
    return (
        <div style={{ color: "white" , width:"500px", backgroundColor:"red", margin:"15px" }}>
            <h3>{data.title}</h3>
            <p>{GFG_Fun(data.description)}</p>
            <img src={data.urlToImage} width="200px"></img>
        </div>
    );
};