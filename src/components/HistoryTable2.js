import React from 'react'
import MaterialTable from "material-table"; // , { MTablePagination }
import tableIcons from './MaterialTableIcons';
import {useState, useEffect} from 'react'; // 
import { getBinsHistory, getBinsHistoryP } from './apipath'; // getBinsHistory, 
// import { table } from 'console';
// import { CustomPagination } from './customPagination';

// TODO : 1. ask dev to send reverse sorted list of bins (latest data first)
      //  2. fix count error in data in Material Table props, totalCount = want to make variable


const columns = [
  { field: 'bin_id', title: 'Bin ID'},
  { field: 'height', title: 'Height', type: 'numeric'},
  { field: 'temperature', title: 'Temperature', type: 'numeric'},
  { field: 'rsrp', title: 'RSRP', type: 'numeric'},
  // { field: 'volt', title: 'Voltage', type: 'numeric'},
  { field: 'last_updated', title: 'Last Update Time'}
];



export const HistoryTable2 = ({count, bins}) => {

    const [binsHistory, setBinsHistory] = useState(bins);
    // const [pageStart, setStart] = useState(0);
    // const [pageSize, setSize] = useState(5);
    const [pagesCount, setCount] = useState(count);
    const [tableSettings, setSettings] = useState({
      "pageStart": 0,
      "pageSize": 5,
    })

    // console.log(tableSettings)
    console.log(binsHistory)
    console.log(pagesCount)
    // console.log(tableSettings);
    // getHistoryCount().then(response => setCount(response.count))
    // console.log(count)
    // getBinsHistoryP(0,1).then(response => {
    //     //setbins(response);

    //     console.log(response.binsHistoryList.content);

    // let binHistory = [];

    // Loading Data
    
    // const loadData = () => {
    //   // let x = parseInt(tableSettings.pagesCount/tableSettings.pageSize)-tableSettings.pageStart
    //   const y = parseInt(tableSettings.pagesCount/tableSettings.pageSize) - tableSettings.pagesCount/tableSettings.pageSize
    //   // if(y>0){
    //     // x = x-1
    //   // }
    //   console.log(y)
          
    // }

    // loadData().then(()=>console.log(binHistory))

    useEffect(() => {
      
    //   // loadData()
      getBinsHistoryP(parseInt(pagesCount/tableSettings.pageSize)-tableSettings.pageStart,tableSettings.pageSize)
      .then( response => {
    //     // console.log(response)
        if(response.count!==pagesCount){
          setBinsHistory(response.binsHistoryList.content)
        }
        console.log(binsHistory)
      })

      return () => {
        
      }
    }, [tableSettings,pagesCount])
    
        
    // Bins History List mapping to columns
    // console.log(binsHistory)
    // let data = [];
    // binHistory.forEach(e => data = [...data, 
    //   {id: e.bin_id, 
    //     height: e.height,
    //     temperature: e.temperature, 
    //     rsrp: e.rsrp,
    //     // volt: e.volt,
    //     last_updated: e.last_updated
    //   }])
    // console.log(data)
      // return <h1>Hey</h1>;
    
    // if(binsHistory.length===0){ 
    //   return <h1>Loading...</h1> 
    // } else {
      return <MaterialTable // pagesCount!==0 ? ( 
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
      data={binsHistory}
      // data={() =>
      //   new Promise((resolve, reject) => {
      //     getBinsHistoryP(parseInt(tableSettings.pagesCount/tableSettings.pageSize)-tableSettings.pageStart,tableSettings.pageSize) // parseInt((pagesCount/pageSize)-pageStart)
      //       .then((response) => {
      //         resolve({
      //           data: response.binsHistoryList.content,
      //           page: tableSettings.pageStart,//result.page - 1,
      //           totalCount: response.count, //result.total,
      //         });
      //       });
      //   })
      // } 
      options={{
        exportButton: true, 
        sorting: true, 
        filtering: true,
        paging:true,
        // pageSize:5,       // make initial page size
        emptyRowsWhenPaging: false,   // To avoid of having empty rows
        // pageSizeOptions:[5,10],    // rows selection options
      }} 
      // localization={{
      //   pagination: {
      //       labelDisplayedRows: `${(tableSettings.pageStart*tableSettings.pageSize)+1}-${(tableSettings.pageStart*tableSettings.pageSize)+tableSettings.pageSize} of ${count}`
      //   },
      // }}
      />
    //  } //) : (<div>Loading...</div>)
  };
  //eslint-disable-next-line react/react-in-jsx-scope



// Sample Bin Data
// const bins = [
//   { full_alarm: 0,
//     place: "Ward 4",
//     color: 'Green',
//     sim_no: "8991102105420276194U",
//     latitude: 23.1926,
//     longitude: 72.6462,
//     bin_id: "1866557055509626",
//     height: 394,
//     capacity: 1,
//     battery_alarm: 0,
//     volt: 3.6,
//     frame_counter: 1,
//     tilt_alarm: 0,
//     rsrp: -790,
//     angle: 0,
//     temperature: 25,
//     last_updated: "2021-11-25 05:05:36",
//     fire_alarm: 0,
//     total_height: 1200,
//     },
//     {
//     temperature: 27,
//     volt: 3.6,
//     last_updated: "2021-10-07 03:40:48",
//     bin_id: "1866557055607453",
//     full_alarm: 0,
//     height: "9999",
//     tilt_alarm: 0,
//     sim_no: "8991102105420276202U",
//     battery_alarm: 0,
//     fire_alarm: 0,
//     latitude: 23.2293,
//     longitude: 72.6739,
//     frame_counter: 1,
//     capacity: 3,
//     rsrp: -690,
//     place: "Ward 5",
//     angle: 0,
//     color: "blue"
//     }
//  ]

// Doing Actions With Buttons
// function ActionOverriding() {
//   return (
//     <MaterialTable
//       title="Action Overriding Preview"
//       columns={[
//         { title: 'Name', field: 'name' },
//         { title: 'Surname', field: 'surname' },
//         { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
//         {
//           title: 'Birth Place',
//           field: 'birthCity',
//           lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
//         },
//       ]}
//       data={[
//         { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
//         { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
//       ]}
//       actions={[
//         {
//           icon: 'save',
//           tooltip: 'Save User',
//           onClick: (event, rowData) => alert("You saved " + rowData.name)
//         }
//       ]}
//       components={{
//         Action: props => (
//           <Button
//             onClick={(event) => props.action.onClick(event, props.data)}
//             color="primary"
//             variant="contained"
//             style={{textTransform: 'none'}}
//             size="small"
//           >
//             My Button
//           </Button>
//         ),
//       }}
//     />
//   )
// }
