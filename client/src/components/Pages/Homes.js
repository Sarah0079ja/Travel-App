import React, { useContext, useEffect } from 'react';

import AuthContext from "../../context/auth/authContext";

const Homes = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
         authContext.loadUser();
         //eslint-disable-next-line
    }, []);

    return (
        <div>
           <h1>hello</h1> 
        </div>
    )
}
export default Homes