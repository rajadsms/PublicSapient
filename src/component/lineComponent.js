import React from 'react';
import PropTypes from 'prop-types';


const LineComponent=(props)=>{
    let header=props.header?props.header:'';
    let value=props.value?props.value:'';
    return(
        <div className="lineContainer" >
            <span className="lineHeader">
                {header}
            </span>
            <span className="lineValue">
                {value}
            </span>
        </div>
    );
};
LineComponent.propTypes = {
    header: PropTypes.string,
    value:PropTypes.string,
    
};
export default LineComponent;