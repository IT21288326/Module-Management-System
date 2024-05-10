import MarkingRubricsCard from '../Final Marking Rubric/FinalMarkring'
import ReportMarkingRubricsCard from '../Final Marking Rubric/FinalReportMarking'
import './finalMarkingComp.scss'


const FinalMarkComp = () => {
    return (
        <div className='Russa_marking_Weights'>
            <h3>Marking Weights for Assesments</h3>
            <div className="marking-container">
                <div>
                    <MarkingRubricsCard/>
                </div>
                <div>
                    <ReportMarkingRubricsCard/>
                </div>
            </div>
        </div>
    )
}

export default FinalMarkComp