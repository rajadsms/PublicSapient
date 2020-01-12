import React, { useEffect,useState } from 'react';
import LineComponent from '../component/lineComponent'

function DataTileComponent(props){
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
        <div className="transLabelVal">{datatoShow.name}</div>
        {setofLines}
        </div>
)
}
export default DataTileComponent;