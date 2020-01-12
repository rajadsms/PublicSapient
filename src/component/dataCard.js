import React from 'react';


const DataCardComponent=(props)=>{
let dataValue=props.data||"";
let type=props.type||""
return(
    <div className="card">
       <span>{dataValue}</span> 
       <span data-internaldata={dataValue} data-filtername={type}  className="closeButton">&#10005;</span>
    </div>
)
}
export default DataCardComponent