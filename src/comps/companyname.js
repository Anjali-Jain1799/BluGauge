import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../components/apipath";

const CompanyName = () => {
    const [name, setName] = useState({});

    useEffect(
        () => {
            getCurrentUser().then(response => {
                setName(response);
                //console.log(response);
            })
        },[ ]
    )

    //console.log(name);


    return (
        <div>
            <h1>{name.name}</h1>
        </div>
    )

}

export default CompanyName;