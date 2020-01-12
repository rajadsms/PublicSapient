import React from 'react';


function LineComponent(props){
let header=props.header?props.header:''
let value=props.value?props.value:''
return(
<div className="lineContainer" key={value}>
    <span className="lineHeader">
{header}
    </span>
    <span className="lineValue">
{value}
    </span>
</div>
)
}
export default LineComponent;