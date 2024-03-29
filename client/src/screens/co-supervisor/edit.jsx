import React from 'react'

export default function edit() {
  return (
    <div>
      <div id='savi_divform1'>
        <form id='savi_form1' >
        <h2>Update Co-Supervisor Marks For Reports</h2>
        <br></br>
          <div className="form-group col-md-7">
            <label htmlFor="inputState">Report title</label>
            
          </div>
          <div className="form-group col-md-7">
            <label htmlFor="inputState">Semester</label>
            
          </div>


          <div className="form-group col-md-7">
            <label htmlFor="s1n">Group number</label>
            <input type="text" name="groupNumber" className="form-control" id="s1n" placeholder='Enter group ID'  />
          </div>
          <div id='savi_div2'>
              <div>
                  <div className="form-row">
                    <div className="form-group col-md-3">
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
              </div>
           
          </div>

        </form>
      </div>
    </div>
  )
}
