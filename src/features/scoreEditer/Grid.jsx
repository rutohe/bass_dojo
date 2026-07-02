import styles from "./Grid.module.css"
function Grid({length}) { //lengthは必要なグリッド数として、増えたら描画も増やす
    const [top, bottom] = timeSignature.split("/").map(Number);
    const sixteenNum = (top * 16) / bottom;
    const array = Array.from({length:sixteenNum}) //グリッド描画用の配列
    const strings = Array.from({length:stringNum}) //弦表示用の配列
    return (
        <div className={styles.container}>
        {/* ここに表示用のGridと音符用のNoteを入れる */}
            <div className={styles.effecArea}></div>
            <div className={styles.notesArea}>
                {strings.map}
            </div>
        </div>
    )
}
export default Grid