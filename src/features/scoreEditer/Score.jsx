import styles from "./Score.module.css"

function Score({score,timeSignature}) {
    const [top, bottom] = timeSignature.split("/").map(Number);
    const sixteenNum = (top * 16) / bottom;
    const array = Array.from({length:sixteenNum})
    return(
        <div className={styles.container}>
            {array.map((grid,index)=>{
                return <div className={styles.column}>
                    
                </div>
            })}
        </div>
    )
}
export default Score