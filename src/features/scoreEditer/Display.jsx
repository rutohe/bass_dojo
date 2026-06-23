import { useState } from "react";
import styles from "./Display.module.css"
import Score from "./Score";
import Editer from "./Editer"
import Button from "../../components/Button";

function Display({}) {
    const createDefaultNote = () => {
        return {
            length: "four",
            fret: [-2, -2, -2, -2], // 💡 毎回新しい配列インスタンスを作る
            effect: null,
            tuplet: null
        }
    };
    const initBar = Array.from({length:8},()=>{return createDefaultNote()})
    const [isOpen,setIsOpen] = useState(false)
    const [editRow,setEditRow] = useState(-1)
    const [beatsPerBar,setBeatsPerBar] = useState(4)
    const [scoreData, setScoreData] = useState(initBar);
    const lengthToBeats = {
        "four": 1.0,
        "eight": 0.5,
        "sixteen": 0.25
    };
    return(
        <>
            <div className={styles.container}>
                {/* 🛠️ 拍子切り替え用の簡易セレクター */}
                <div className={styles.settingHeader}>
                    <label>🎵 拍子の設定: </label>
                    <select 
                    value={beatsPerBar} 
                    onChange={(e) => setBeatsPerBar(Number(e.target.value))}
                    >
                    <option value={4}>4/4 拍子 (4拍)</option>
                    <option value={3}>3/4 拍子 (3拍)</option>
                    <option value={5}>5/4 拍子 (5拍)</option>
                    </select>
                </div>
                <Score
                    scoreData={scoreData}
                    beatsPerBar={beatsPerBar}
                    lengthToBeats = {lengthToBeats}
                />
                <div className={styles.btnContainer}>
                    <Button
                        className={styles.editBtn}
                        onClick={()=>{}}
                        name={'この行を編集'}
                    />
                    <Button
                        className={styles.editBtn}
                        onClick={()=>{}}
                        name={'この行を削除'}
                    />
                    <Button
                        className={styles.editBtn}
                        onClick={()=>{}}
                        name={'行を挿入'}
                    />

                </div>
            </div>
            {isOpen && <Editer/>}
        </>
    )
}
export default Display