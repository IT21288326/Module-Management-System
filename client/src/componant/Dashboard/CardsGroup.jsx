import React from 'react'

export default function CardsGroup() {
  return (
    <div>
     <div class="card  text-white" style={{background:"#3ebd46", borderRadius:"25px"}}>
        
     <h4 class="card-title text-center" style={{fontWeight:"bold", color:"WHITE", marginTop:"20px"}}>Module Pass Rate</h4>
     <h1 class="text-center" style={{fontWeight:"bold", color:"WHITE" }}>70.17%</h1>

  <div class="card-body" style={{display: "flex", justifyContent:"space-between"}} >     
    <div>
      <p class="card-text">
        Data Science : 60% <br/>
        Software Engineering : 72% <br/>
        Information Technology : 66% <br/>
      </p>
    </div>
    <div style={{marginLeft:"50px"}}>
      <p class="card-text">
        Network Engineering : 55%<br/>
        Cyber Security : 88%<br></br>
        Computer System Engineering : 80%
      </p>
    </div>
  </div>
  </div>

<br></br>

<div class="card  text-white" style={{background:"#d4382a", borderRadius:"25px"}}>
     <h4 class="card-title text-center" style={{fontWeight:"bold", color:"WHITE", marginTop:"20px"}}>Module Fail Rate</h4>
     <h1 class="text-center" style={{fontWeight:"bold", color:"WHITE" }}>33.33%</h1>

  <div class="card-body" style={{display: "flex", justifyContent:"space-between"}} >     
    <div>
      <p class="card-text">
        Data Science : 30% <br/>
        Software Engineering : 42% <br/>
        Information Technology : 30% <br/>
      </p>
    </div>
    <div style={{marginLeft:"50px"}}>
      <p class="card-text">
        Network Engineering : 67%<br/>
        Cyber Security : 21%<br></br>
        Computer System Engineering : 10%
      </p>
    </div>
  </div>
</div>




    </div>
  )
}
