import React from 'react'
import MaterialTable from "material-table"; // , { MTablePagination }
import tableIcons from './MaterialTableIcons';
import { useState } from 'react'; //, useEffect 
import { getBinsHistoryP } from './apipath'; // getBinsHistory, 


const columns = [
  { field: 'bin_id', title: 'Bin ID'},
  { field: 'height', title: 'Height', type: 'numeric'},
  { field: 'temperature', title: 'Temperature', type: 'numeric'},
  { field: 'rsrp', title: 'RSRP', type: 'numeric'},
  { field: 'angle', title: 'Angle', type: 'numeric'},
  { field: 'tilt_alarm', title: 'Tilt Alarm', type: 'numeric'},
  { field: 'last_updated', title: 'Last Update Time'}
];



export const HistoryTable = ({count}) => {

    const [pagesCount, setCount] = useState(0);
    const [tableSettings, setSettings] = useState({
      "pageStart": 0,
      "pageSize": 5,
    })
    
    if (pagesCount === 0){
      getBinsHistoryP(0, 1).then(response => {
        setCount(response.binsHistoryList.totalElements);
      })
    }
         
  return pagesCount!==0 ? (<MaterialTable 
    onChangePage={(e, pg) => {
      //console.log(e)  
      setSettings(prevSettings => {
        return {...prevSettings, "pageStart":e}
      }); // (pageStart + pg - 1)
    }}
    onChangeRowsPerPage={e => {
      // console.log(e)
      setSettings(prevSettings => {
        return {...prevSettings, "pageSize":e, "pageStart":0}
      });
    }}
    title="Sensor Data" 
    icons={tableIcons} 
    columns={columns} 
    // data={data}
    data={() =>
      new Promise((resolve, reject) => {
        getBinsHistoryP(parseInt(pagesCount/tableSettings.pageSize)-tableSettings.pageStart,tableSettings.pageSize) // parseInt((pagesCount/pageSize)-pageStart)
          .then((response) => {
            resolve({
              data: response.binsHistoryList.content.reverse(),
              page: tableSettings.pageStart,//result.page - 1,
              totalCount: response.binsHistoryList.totalElements, //result.total,
            });
          });
      })
    } 
    options={{
      exportButton: true, 
      sorting: true, 
      filtering: true,
      paging:true,
      emptyRowsWhenPaging: false,   // To avoid of having empty rows
    }} 
    />) :
    (<div>Loading...</div>)

  //eslint-disable-next-line react/react-in-jsx-scope
};

