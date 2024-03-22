import React from 'react'
import SidebarSup from '../../componant/SidebarSup'
import './ReportMarks.css' 
export default function ReportMarks() {
  return (
    <div>
        
       <div id='savi_divform1'>
      <form id='savi_form1' >
  
  <div class="form-group col-md-6">
      <label for="inputState">Report title</label>
      <select id="inputState" class="form-control" >
      <option disabled selected hidden>Choose...</option>
        <option >Status document 1</option>
        <option>Log book</option>
        <option >Proposal</option>
        <option>Status document 2</option>
        <option >Final thesis</option>
      </select>
    </div>
    <div class="form-group col-md-6">
    <label for="inputState">Semester</label>
      <select id="inputState" class="form-control" >
      <option disabled selected hidden>Choose...</option>
        <option >Semester 1</option>
        <option>Semester 2</option>
      </select>
    </div>
   
    <div class="form-group col-md-6">
      <label for="s1n">Group number</label>
      <input type="text" class="form-control" id="s1n" placeholder='Enter group ID'/>
    </div>

    <button type="submit" class="btn btn-primary" id='savi_btn2'>Search</button>
  <div id='savi_div2'>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="s1n">Student 1 - Name</label>
      <input type="text" class="form-control" id="s1n"/>
    </div>
    
    <div class="form-group col-md-2">
      <label for="s1m">Student 1 - Marks</label>
      <input type="text" class="form-control" id="s1m"/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="s2n">Student 2 - Name</label>
      <input type="text" class="form-control" id="s2n"/>
    </div>
    
    <div class="form-group col-md-2">
      <label for="s2m">Student 2 - Marks</label>
      <input type="text" class="form-control" id="s2m"/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="s3n">Student 3 - Name</label>
      <input type="text" class="form-control" id="s3n"/>
    </div>
    
    <div class="form-group col-md-2">
      <label for="s3m">Student 3 - Marks</label>
      <input type="text" class="form-control" id="s3m"/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-4">
      <label for="s4n">Student 4 - Name</label>
      <input type="text" class="form-control" id="s4n"/>
    </div>
    
    <div class="form-group col-md-2">
      <label for="s4m">Student 4 - Marks</label>
      <input type="text" class="form-control" id="s4m"/>
    </div>
  </div>
  </div>
  <button type="submit" class="btn btn-primary" id='savi_btn1'>Enter</button>
</form>
    </div>
    </div>
  )
}
