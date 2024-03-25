import "./presentationPanneltabComp.scss";
import { DataGrid } from "@mui/x-data-grid";
import { PresentationPannelColumns, userRows } from "../../../datatablesource.js";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch.js"
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import SearchIcon from '@mui/icons-material/Search';


const PresentationPannelTable = () => {
  const [list, setList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const { data, loading, error } = useFetch("http://localhost:3001/presentation-pannel");

  
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
          axios.delete(`http://localhost:3001/presentation-pannel/${id}`);
          setList(list.filter((item) => item._id !== id));
          console.log(`${id}`);
          Swal.fire("Deleted!", "Pannel has been deleted.", "success");
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
              to={`/presentation-pannel/update/${params.row._id}`}
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
    const text="Presentation Pannel";
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
          "Pannel Name",       
          "Examiner 01",
          "Examiner 02",
          "Examiner 03",
        ],
      ],
      body: list.map((item) => [
        item.pannelID,
        item.examiner_1,
        item.examiner_2,
        item.examiner_3,
      ]),
    });
    doc.save("Presentation Pannel.pdf");
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

  const addPannelButton = (
        <Link to="/presentation-pannel/addpresentationpannel" >
          <button className="export">
            Add Presentation Panel
          </button>
        </Link>
      );  

  return (
    
    <div className="R_PresentationPannelTable">
      
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
      
        <h1>Presentataion Pannels</h1>
        <DataGrid
          className="datagrid"
          rows={list}
          columns={PresentationPannelColumns.concat(actionColumn)}
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
              </div>
            ),
          }}
        />
      </div>

  );
};
export default PresentationPannelTable;











