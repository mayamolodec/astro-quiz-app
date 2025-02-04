import './ProgressBar.css'
export default function ProgressBar({totalScore, curQuestionId, questionsLength}){


    return(
        <>
        <div class="container">
            <div className="progress-bar" style={{ width: `${(curQuestionId / questionsLength) * 100}%` }}>
                {(totalScore!="") && <>{totalScore}/{questionsLength}</>}
            </div>
        </div>
        </>
    );

}