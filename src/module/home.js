import React, { useEffect,useState } from 'react';
import FilterComponent from '../component/filterComponent';
import DataTileComponent from '../component/dataTileComponent';
import DataCardComponent from '../component/dataCard'
import {sorting,getDiffYear}  from '../util';
import cuteDog from '../images/cuteDog.jpg';


const Home=(props)=>{
  const[state,setState]=useState({
    listData:{},
    tileContent:[],
    filterKey:{
    'species':[],
    'gender':[],
    'origin':[]
    },
    dataCardArr:[],
    setofKeytoShow:[],
    sortType:'ASC',
    filterSpecies:[],
    filtersGender:[],
    filtersOrigin:[],
    isLoading:true

  })
    
   
 
    const prepareData=(data)=>{
        let speciesArr=[],genderArr=[],originArr=[],contentData={}
        data.forEach((data,index)=>{
            speciesArr=speciesArr.find((chkData)=>chkData.key===data.species)===undefined?[...speciesArr,{val:data.species,key:data.species}]:speciesArr;
            genderArr=genderArr.find((chkData)=>chkData.key===data.gender)===undefined?[...genderArr,{val:data.gender,key:data.gender}]:genderArr;
            originArr=originArr.find((chkData)=>chkData.key===data.origin.name)===undefined?[...originArr,{val:data.origin.name,key:data.origin.name}]:originArr;
            contentData[data.id]={
                id:data.id,
                name:data.name,
                type:data.type,
                image:data.image,
                created:getDiffYear(data.created),
                line:{
                    status:data.status,
                    species:data.species, 
                    gender:data.gender,
                    origin:data.origin.name,
                    'last location':data.location.name,
                }
            }
        })
        let keys=sorting(Object.keys(contentData));
        setState({
          ...state,
          listData:contentData,
          setofKeytoShow:keys,
          filterSpecies:speciesArr,
          filtersGender:genderArr,
          filtersOrigin:originArr,
        })
       
    };
    const fetchCharacters=()=>{
        // Where we're fetching data from
        fetch(`https://rickandmortyapi.com/api/character/`)
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>{
            setState({
              ...state,
              isLoading:false
            })
           // updateLoading(false);
            prepareData(data.results);
          }
          )
          // Catch any errors we hit and update the app
          .catch(error =>  setState({
            ...state,
            isLoading:false
          }));
      }
      const dataCardCreation=(filter)=>{
        let dataCardArr=[]
        Object.keys(filter).forEach((data)=>{
        for(let i=0;i<filter[data].length;i++){
          dataCardArr.push(<DataCardComponent key={filter[data][i].toString()+data} data={filter[data][i]} type={data}/>)
        }
        })

       setState({
         ...state,
         dataCardArr
       })
        
      }
      
    useEffect(() => {
        fetchCharacters()
      }, []);
      useEffect(()=>{
        let{filterKey,setofKeytoShow,listData,sortType}=state;
        let speciesLen=filterKey.species.length;
        let genderLen=filterKey.gender.length;
        let originLen=filterKey.origin.length;
          let arrContent=[];
      
          if(sortType==="ASC"){
            for(let i=0,len=setofKeytoShow.length;i<len;i++){
              if(!speciesLen || (speciesLen && filterKey.species.indexOf(listData[setofKeytoShow[i]].line.species)!==-1) ){
                if(!genderLen || (genderLen && filterKey.gender.indexOf(listData[setofKeytoShow[i]].line.gender)!==-1) ){
                  if(!originLen || (originLen && filterKey.origin.indexOf(listData[setofKeytoShow[i]].line.origin)!==-1) )
                  {
                    arrContent.push(<DataTileComponent key={listData[setofKeytoShow[i]].id}  datatoShow={listData[setofKeytoShow[i]]} />)
                  }
                }
              }
             }
          }
        else{
          for(let j=setofKeytoShow.length-1;j>=0;j--){
            if(!speciesLen || (speciesLen && filterKey.species.indexOf(listData[setofKeytoShow[j]].line.species)!==-1) ){
              if(!genderLen || (genderLen && filterKey.gender.indexOf(listData[setofKeytoShow[j]].line.gender)!==-1) ){
                if(!originLen || (originLen && filterKey.origin.indexOf(listData[setofKeytoShow[j]].line.origin)!==-1) ){
                  arrContent.push(<DataTileComponent key={listData[setofKeytoShow[j]].id}  datatoShow={listData[setofKeytoShow[j]]} />)
                }
              }
            }
           }
         }
         setState({
           ...state,
           tileContent:arrContent
         })
      },[state.dataList,state.setofKeytoShow,state.sortType,state.filterKey.species,
        state.filterKey.origin,state.filterKey.gender])
const changeType=data=>{
 setState({
   ...state,
   sortType:data.currentTarget.value
 })
}
const changeFunc=(data,flag)=>{
  let name="",value=""
if(!flag){
  name=data.target.name;
  value=data.target.value;
}else{
  name=data.filterName;
  value=data.filterVal;
}
let {filterKey}=state;

 let index=filterKey[name]?filterKey[name].indexOf(value):-1;
 if(index===-1){
  filterKey[name]=[...filterKey[name],value]
 }
else
{
  
  filterKey[name]=[...filterKey[name].slice(0, index),...filterKey[name].slice(index+1)];
}

setState({
  ...state,
  filterKey
})
dataCardCreation(filterKey);
}
const deActivate=data=>{
var filterVal= data.target.dataset.internaldata;
var filterName=data.target.dataset.filtername;
changeFunc({filterVal,filterName},true)
}
return(
        <>
        <div className="outerContainer">
      <div className="filterWrapperContainer" onChange={changeFunc}>
      <FilterComponent key={'Species'} filterHeader="Species" dataList={state.filterKey.species} type={'species'} filterOption={state.filterSpecies}/>

      <FilterComponent key={'Gender'} filterHeader="Gender" dataList={state.filterKey.gender} type={'gender'} filterOption={state.filtersGender}/>

      <FilterComponent key={'origin'} filterHeader="Origin" dataList={state.filterKey.origin} type={'origin'} filterOption={state.filtersOrigin}/>
      <img src={cuteDog} className="imgClass"/>
      </div>
      <div className="container">
      {state.dataCardArr.length?"Filter:":""}
      <div className="filterBar">
      
       <div className="filterValue" onClick={deActivate}>
        {state.dataCardArr}
        </div>
       <div className="sortOption">
      <select onChange={changeType}>
      <option value="ASC" >Ascending</option>
      <option value="DSC">Descending</option>
      </select> 
      </div> 
      </div>
<div className={state.tileContent.length?"contentContainer":"contentContainer noData"}>
  {state.tileContent.length?state.tileContent:<div>No Data to display.Change Filter</div>} 
  </div>
      </div>
      </div>
        </>
)
}
export default Home;


