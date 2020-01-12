import React, { useEffect,useState } from 'react';
import FilterComponent from '../component/filterComponent';
import DataTileComponent from '../component/dataTileComponent';
import DataCardComponent from '../component/dataCard'
import {sorting,getDiffYear}  from '../util';
import cuteDog from '../images/cuteDog.jpg';


const Home=(props)=>{
    const [listData, updateListData] = useState({});
    const [tileContent,updateTileContent]=useState([]);
    const [filterKey,updatefilterKey]=useState({
      'species':[],
      'gender':[],
      'origin':[]
    });
    const [setofKeytoShow,updateSetofKeytoShow]=useState([]);
    const [sortType,updateSortType]=useState('ASC');
    const [filterSpecies,updatefilterSpecies]=useState([]);
    const [filtersGender,updatefiltersGender]=useState([]);
    const [filtersOrigin,updatefiltersOrigin]=useState([]);
    const [dataCardArr,updateDataCardArr]=useState([])
    
    const [isLoading, updateLoading] = useState(true);
   
 
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
        updateListData(contentData);
        updateSetofKeytoShow(sorting(Object.keys(contentData)));
        updatefilterSpecies(speciesArr);
        updatefiltersGender(genderArr);
        updatefiltersOrigin(originArr);
       
    };
    const fetchCharacters=()=>{
        // Where we're fetching data from
        fetch(`https://rickandmortyapi.com/api/character/`)
          // We get the API response and receive data in JSON format...
          .then(response => response.json())
          // ...then we update the users state
          .then(data =>{
            
            updateLoading(false);
            prepareData(data.results);
          }
          )
          // Catch any errors we hit and update the app
          .catch(error => updateLoading(false));
      }
      const dataCardCreation=(filter)=>{
        let dataCardArr=[]
        Object.keys(filter).forEach((data)=>{
        for(let i=0;i<filter[data].length;i++){
          dataCardArr.push(<DataCardComponent data={filter[data][i]} type={data}/>)
        }
        })
       
        updateDataCardArr([...dataCardArr] );
        
      }
      
    useEffect(() => {
        fetchCharacters()
      }, []);

      useEffect(()=>{
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
                  arrContent.push(<DataTileComponent  datatoShow={listData[setofKeytoShow[j]]} />)
                }
              }
            }
           }
         }
         
        updateTileContent(arrContent)
      },[listData,setofKeytoShow,sortType,filterKey])
const changeType=data=>{
 
  updateSortType(data.currentTarget.value);
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
 let filter=Object.assign({},filterKey);
 let index=filter[name]?filter[name].indexOf(value):-1;
 if(index===-1){
  filter[name]=[...filter[name],value]
 }
else
{
  
  filter[name]=[...filter[name].slice(0, index),...filter[name].slice(index+1)];
}

updatefilterKey(Object.assign({},filter));
dataCardCreation(filter);
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
      <FilterComponent filterHeader="Species" dataList={filterKey.species} type={'species'} filterOption={filterSpecies}/>

      <FilterComponent filterHeader="Gender" dataList={filterKey.gender} type={'gender'} filterOption={filtersGender}/>

      <FilterComponent filterHeader="Origin" dataList={filterKey.origin} type={'origin'} filterOption={filtersOrigin}/>
      <img src={cuteDog} className="imgClass"/>
      </div>
      <div className="container">
      {dataCardArr.length?"Filter:":""}
      <div className="filterBar">
      
       <div className="filterValue" onClick={deActivate}>
        {dataCardArr}
        </div>
       <div className="sortOption">
      <select onChange={changeType}>
      <option value="ASC" >Ascending</option>
      <option value="DSC">Descending</option>
      </select> 
      </div> 
      </div>
<div className={tileContent.length?"contentContainer":"contentContainer noData"}>
  {tileContent.length?tileContent:<div>No Data to display.Change Filter</div>} 
  </div>
      </div>
      </div>
        </>
)
}
export default Home;