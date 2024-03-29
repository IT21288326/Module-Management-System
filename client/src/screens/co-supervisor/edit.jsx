import React from 'react'

export default function Edit() {
  return (
    <div>
      <div id='savi_divform1'>
        <form id='savi_form1 col-md-6' >
        <h2>Update Co-Supervisor Marks For Reports</h2>
        <br></br>
          <div className="form-group col-md-6">
            <label type="text" htmlFor="inputState">Report title</label>
            <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
          </div>
          <div className="form-group col-md-6">
            <label type="text" htmlFor="inputState" >Semester</label>
            <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
          </div>


          <div className="form-group col-md-6">
            <label htmlFor="s1n">Group number</label>
            <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
          </div>
                  <div className="form-row ">
                    <div className="form-group col-md-2">
                      <label >Student name</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks provided by Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks ptovided by Co-Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-2">
                      <label >Student name</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks provided by Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks ptovided by Co-Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-2">
                      <label >Student name</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks provided by Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks ptovided by Co-Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-group col-md-2">
                      <label >Student name</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks provided by Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    <div className="form-group col-md-2">
                      <label >Marks ptovided by Co-Supervisor</label>
                      <input type="text" className="form-control"  />
                    </div>
                    </div>
               
                <button type="submit" className="btn btn-primary" id='savi_btn1'>Update</button>
              
           
          

        </form>
      </div>
    </div>
  )
}
