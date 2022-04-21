import * as React from 'react';
import {useState, useEffect} from 'react';
import { getBinData } from '../apipath';
import { DataGrid } from '@material-ui/data-grid';





export default function DataTable() {

  const [bins, setBins] = useState([]);

    useEffect(() => {
        getBinData().then(response => {
            setBins(response);
            // console.log(response)
        })
        return () => {
            console.log("Done")
        }
    }, [])

    const columns = [
      { field: 'id', headerName: 'Bin ID', width: 120 },
      { field: 'place', headerName: 'Place', width: 150 },
      { field: 'color', headerName: 'Color', width: 150 },
      {
        field: 'capacity',
        headerName: 'Capacity',
        type: 'number',
        width: 150,
      },
      {
        field: 'temperature',
        headerName: 'Temperature',
        type: 'number',
        width: 180,
      },
      {
        field: 'last_updated',
        headerName: 'Last Update Time',
        width: 200
      }
    ];

    let rows = [];
    bins.forEach(e => rows = [...rows, {id: e.bin_id, place: e.place, color: e.color, capacity: e.capacity, temperature: e.temperature, last_updated: e.last_updated}])
    


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

// import * as React from 'react';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';

// export default function BasicFilteringGrid() {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 100,
//     maxColumns: 6,
//   });

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         {...data}
//         components={{
//           Toolbar: GridToolbar,
//         }}
//         initialState={{
//           filter: {
//             filterModel: {
//               items: [
//                 {
//                   columnField: 'commodity',
//                   operatorValue: 'contains',
//                   value: 'rice',
//                 },
//               ],
//             },
//           },
//         }}
//       />
//     </div>
//   );
// }