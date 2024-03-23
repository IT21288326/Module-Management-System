import "./presentationSheduletabComp.scss";
import { DataGrid } from "@mui/x-data-grid";
import { PresentationSheduleColumns, userRows } from "../../../datatablesource.js";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch.js"
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import SearchIcon from '@mui/icons-material/Search';


const PresentationSheduleTable = () => {
  const [list, setList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const { data, loading, error } = useFetch("http://localhost:3001/presentation-shedule");

  
  useEffect(() => {
    setList(data);
    setFilterData(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(141, 67, 252)",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3001/presentation-shedule/${id}`);
          setList(list.filter((item) => item._id !== id));
          console.log(`${id}`);
          Swal.fire("Deleted!", "Your record has been deleted.", "success");
        }
      });
    } catch (err) {}
  };


//   const handleSearch = (event) => {
//     const getSearch = event.target.value;
//     setQuery(getSearch);

//     if (getSearch.length > 0) {
//       const searchData = list.filter((item) =>
//         item.groupNo.toLowerCase().includes(getSearch)
//       );
//       setList(searchData);
//     } else {
//       setList(filterData);
//     }
//   };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link style={{textDecoration:"none"}}
              className="updateButton"
              type="button"
              to={`/presentation-shedule/update/${params.row._id}`}
            >
              Update
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    const text="Presentation Shedule";
    const textWidth = doc.getTextDimensions(text).w;
    const pageWidth = doc.internal.pageSize.width;
    const x = (pageWidth - textWidth) / 2;
    doc.text(text, x, 50);
    var fontSize = 20;
    doc.setFontSize(fontSize);
    doc.autoTable({
      startY:60,
      theme: "striped",
      headStyles :{fillColor : [92, 30, 154]}, 
      alternateRowStyles: {fillColor : [231, 215, 252]}, 
      tableLineColor: [92, 30, 154], 
      tableLineWidth: 0.1,
      head: [
        [  
          "Group Number",       
          "Date",
          "Time",
          "Venue",
        ],
      ],
      body: list.map((item) => [
        item.groupNo,
        item.date,
        item.time,
        item.venue,
      ]),
    });
    doc.save("Presentation Shedule.pdf");
  };

  const actions = [
    {
      icon: () => (
        <button onClick={downloadPdf} className="export">
          Export as PDF
        </button>   
      ),
      
      tooltip: "Export to Pdf",
      isFreeAction: true,
    },
  ];

  const addRecordButton = (
        <Link to="/presentation-shedule/addrecord" >
          <button className="export">
            Add New Record
          </button>
        </Link>
      );  

  return (
    
    <div className="R_PresentationSheduleTable">
      
      {/* <div className="R_datatableTitle">
       Presentation Shedule
      </div> */}
      {/* <SearchIcon className="SearchIcon"/> 
      <input
        type="text"
        value={query}
        className="search"
        onChange={(e) => handleSearch(e)}
        placeholder="Search by Group Number"
        
      /> */}
      
      <DataGrid
        className="datagrid"
        rows={list}
        columns={PresentationSheduleColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(row) => row._id}
        components={{
          Toolbar: () => (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '20px' }}>
              <div>
                {actions.map((action, index) => (
                  <action.icon key={index} onClick={action.onClick} />
                ))}
              </div>
              <div>
                {addRecordButton}
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};
export default PresentationSheduleTable;


