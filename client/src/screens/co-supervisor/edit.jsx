import React from 'react'

export default function Edit() {
  return (
    <div>
      <div  >
        <form id='f1234' style={{marginLeft:'30%',paddingTop:'30px'}}>
        <h2 >Update Co-Supervisor Marks For Reports</h2>
        <br></br>
          <div className="form-group col-md-7">
            <label type="text" htmlFor="inputState">Report title</label>
            <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
          </div>
          <div className="form-group col-md-7">
            <label type="text" htmlFor="inputState" >Semester</label>
            <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
          </div>


          <div className="form-group col-md-7 ">
            <label htmlFor="s1n">Group number</label>
            <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
          </div><br></br>
                  <div className="form-row ">
                    <div className="form-group col-md-3">
                      <label >Student name</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks by Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks by Co-Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-3">
                      <label >Student name</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks by Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks by Co-Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-3">
                      <label >Student name</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks by Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks by Co-Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-3">
                      <label >Student name</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks by Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks by Co-Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    </div>
               
                <button type="submit" className="btn btn-primary" id='savi_btn1'>Update</button>
              
           
          

        </form>
      </div>
    </div>
  )
}






// css poddk  hadaganna oyata ona widiyata
// aluth code eka meken yata tiyena tika


// import React from 'react'
// import CancelIcon from '@mui/icons-material/Cancel';
// import './edit.scss';


// export default function Edit({onClose}) {
//   return (
//     <div className="savidya_update">
//       <div className="savidya_modal-overlay">
//         <div className="savidya_modal-content">
//           <button className="savidya_close-modal-button" onClick={onClose}>
//             <CancelIcon />
//           </button>

        
//             <form id='f1234' style={{marginLeft:'30%',paddingTop:'30px'}}>
//             <h2 >Update Co-Supervisor Marks For Reports</h2>
//             <br></br>
//               <div className="form-group col-md-7">
//                 <label type="text" htmlFor="inputState">Report title</label>
//                 <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
//               </div>
//               <div className="form-group col-md-7">
//                 <label type="text" htmlFor="inputState" >Semester</label>
//                 <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
//               </div>


//               <div className="form-group col-md-7 ">
//                 <label htmlFor="s1n">Group number</label>
//                 <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
//               </div><br></br>
//                       <div className="form-row ">
//                         <div className="form-group col-md-3">
//                           <label >Student name</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         <div className="form-group col-md-2">
//                           <label >Marks by Supervisor</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         <div className="form-group col-md-2">
//                           <label >Marks by Co-Supervisor</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         </div>

//                         <div className="form-row">
//                         <div className="form-group col-md-3">
//                           <label >Student name</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         <div className="form-group col-md-2">
//                           <label >Marks by Supervisor</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         <div className="form-group col-md-2">
//                           <label >Marks by Co-Supervisor</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         </div>

//                         <div className="form-row">
//                         <div className="form-group col-md-3">
//                           <label >Student name</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         <div className="form-group col-md-2">
//                           <label >Marks by Supervisor</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         <div className="form-group col-md-2">
//                           <label >Marks by Co-Supervisor</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         </div>

//                         <div className="form-row">
//                         <div className="form-group col-md-3">
//                           <label >Student name</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         <div className="form-group col-md-2">
//                           <label >Marks by Supervisor</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         <div className="form-group col-md-2">
//                           <label >Marks by Co-Supervisor</label>
//                           <input type="text" className="form-control"  />
//                         </div>
//                         </div>
                  
//                     <button type="submit" className="btn btn-primary" id='savi_btn1'>Update</button>
                  
              
              

//             </form>

//         </div>
//       </div>
//     </div>
//   )
// }






