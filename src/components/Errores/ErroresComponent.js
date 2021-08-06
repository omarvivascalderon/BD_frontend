import './Errores.css';
import React from 'react';

const ErroresComponent = ({ errores }) => {
    if(errores.length > 0){
        return (
            <div className="errores-container">
                {errores.map((error, index) => {
                    return <span key={index}>{error}</span>
                })}
            </div>
        );
    }else{
        return (<span></span>) 
    }
}

export default ErroresComponent;
