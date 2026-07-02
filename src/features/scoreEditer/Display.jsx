import { useState } from "react";
import Editer from "./Editer"
import styles from "./Display.module.css"

function Display() {
    const [tool,setTool] = useState('')
    const [score,setScore] = useState([]) //音符のオブジェクト配列
    const note = {
        fret:5,   //押さえるフレット
        string:3, //3弦
        start:0,  //16分を並べたグリッドでの開始位置
        length:4, //長さ(4分や8分など)
        measureId:1, //何小節にあるか
        effext:{
            type:'h', //ハンマリングなど、noneで何もなしにする
            tuplet:3, //三連符など
        }
    }
    return(
        <div className={styles.container}>
            <Editer
                setTool={setTool}
            />
        </div>
    )
}
export default Display