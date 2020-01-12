import React, { useEffect,useState } from 'react';


function FilterComponent(props){
    const [filterDataState,setFilterDataState]=useState([]);
    let filterHeader=props.filterHeader||"";
    let filterOption=props.filterOption||[];
    let dataList=props.dataList||[];
   let type=props.type;
    function filterDataCreation(){
        if(filterOption.length>0){
          return filterOption.map((data)=>{
            
                    return(
                      <div className="filterContaien" key={data.key}>
                       <div  className="singleOption">
                           <input  type="checkbox" name={type} value={data.val} checked={dataList.indexOf(data.val)!==-1}/>
                            {data.val}
                            </div>  
                            </div> 
                    )
            })
        }
    }
    useEffect(()=>{
      let filterData= filterDataCreation(filterOption);
      setFilterDataState(filterData);
    },[filterOption,dataList])
return(
        <div className="filterContainer">
       <div className="headerPart">
       {filterHeader}
       </div>
       <div className="dataPart">
        {filterDataState}
       </div>
       </div>
)
}
export default FilterComponent;