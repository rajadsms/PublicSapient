import React, { useEffect,useState } from 'react';
import LineComponent from '../component/lineComponent';
import PropTypes from 'prop-types';


const DataTileComponent=(props)=>{
    const [setofLines,updateSetofLines]=useState([]);
    let {datatoShow}=props;
   
    function createSetofData(data){
        return Object.keys(data).map((eachVal)=>{
            return(
                <LineComponent key={eachVal} header={eachVal} value={data[eachVal]}/>
            );
       
            
        
        });
    }

    useEffect(()=>{
        let lineSet=createSetofData(datatoShow.line);
        updateSetofLines(lineSet);
    },[datatoShow]);
    

    return(
        <>
            <div  className="tileContainer">
                <img  src={datatoShow.image} className="profilePic"></img>
                <div className="transLabelVal">
                    <div>{datatoShow.name}</div>
                    <div><span>id:{datatoShow.id}</span> - <span>{datatoShow.created}</span></div>
                </div>
                {setofLines}
            </div>
        </>
    );
};
DataTileComponent.propTypes = {
    datatoShow: PropTypes.object,
};


function idComparator(prevProps, nextProps) {
    if(prevProps.datatoShow.id == nextProps.datatoShow.id) {
        return false;
    } else {
        return true;
    }
}
var memonizedDataTile=React.memo(DataTileComponent,idComparator);
export default memonizedDataTile;
