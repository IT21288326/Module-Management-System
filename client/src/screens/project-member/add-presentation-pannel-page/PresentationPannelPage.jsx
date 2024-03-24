import "./addPresentationPannelPage.scss"
import AddPresentationPannel from "../../../componant/project-member/add-presentation-pannel-comp/AddPresentationPannelComp"
import PresentationPannelTable from "../../../componant/project-member/presentation-pannel-tab-comp/PresentationPanneltabComp"

const Addpresentationpannel = () =>{
    return(
        <div className="addpresentationpannel_R">  
            <div className="homeContainer">
                <h1>Add new Pannel</h1>
                <AddPresentationPannel/>
                <PresentationPannelTable/>             
            </div>
        </div>
    )
}

export default Addpresentationpannel