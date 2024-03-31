import React from 'react'

export default function Edit() {
  return (
    <div>
      <div  >
        <form id='f1234' style={{marginLeft:'30%',marginTop:'3%'}}>
        <h2>Update Co-Supervisor Marks For Reports</h2>
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
