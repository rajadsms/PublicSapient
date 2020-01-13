import React, { useEffect,useState } from 'react';


const FilterComponent=(props)=>{
    const [filterDataState,setFilterDataState]=useState([]);
    let {filterHeader,filterOption,dataList,type}=props;
    
   function change(){}
    function filterDataCreation(){
        if(filterOption.length>0){
          return filterOption.map((data,index)=>{
            
                    return(
                      <div className="filterContaien" key={index}>
                       <div  className="singleOption">
                           <input  type="checkbox" name={type} value={data.val} onChange={change} checked={dataList.indexOf(data.val)!==-1}/>
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