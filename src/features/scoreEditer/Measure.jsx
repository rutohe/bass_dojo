import styles from "./Measure.module.css"

function Measure({timeSignature,stringNum}) {
    const [top, bottom] = timeSignature.split("/").map(Number);
    const sixteenNum = (top * 16) / bottom;
    const array = Array.from({length:sixteenNum}) //グリッド描画用の配列
    const strings = Array.from({length:stringNum}) //弦表示用の配列
    return(
        <>
            {array.map((column,index)=>{
                return(
                    <div className={styles.container}>
                        <div className={styles.effectArea}></div>
                        <div className={styles.stringsArea}>
                            {strings.map((string,idx)=>{
                                return (
                                    <div className={styles.string} key={idx}></div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </>                    
    )
}
export default Measure