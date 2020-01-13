import React from 'react';
import PropTypes from 'prop-types'

const DataCardComponent=(props)=>{
    let dataValue=props.data||'';
    let type=props.type||'';
    return(
        <div className="card">
            <span>{dataValue}</span> 
            <span data-internaldata={dataValue} data-filtername={type}  className="closeButton">&#10005;</span>
        </div>
    );
};
DataCardComponent.propTypes = {
    data: PropTypes.string,
    type: PropTypes.string,
};
export default DataCardComponent;