import React, { useEffect,useState } from 'react';
import LineComponent from '../component/lineComponent'

const DataTileComponent=(props)=>{
    const [setofLines,updateSetofLines]=useState([])
   let datatoShow=props.datatoShow;
   
   function createSetofData(data){
    return Object.keys(data).map((eachVal,index)=>{
        return(
            <LineComponent key={eachVal} header={eachVal} value={data[eachVal]}/>
        )
       
            
        
    })
   }

    useEffect(()=>{
let lineSet=createSetofData(datatoShow.line)
updateSetofLines(lineSet)
    },[datatoShow])
return(
        <div className="tileContainer">
        <img  src={datatoShow.image} className="profilePic"></img>
        <div className="transLabelVal">
            <div>{datatoShow.name}</div>
<div><span>id:{datatoShow.id}</span> - <span>{datatoShow.created}</span></div>
            </div>
        {setofLines}
        </div>
)
}
export default DataTileComponent;