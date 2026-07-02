import { useState } from "react"
import Button from "../../components/Button"
import styles from "./Editer.module.css"
function Editer({setTool}) {
    const [tabmenu,setTabmenu] = useState('音符')
    const ary = Array.from({length:24},(_,i)=>{return `${i}`})
    const effect = ['ハンマリング','プリングオフ','スラー']
    return(
        <div className={styles.container}>
            <div className={styles.tabContainer}>
                <Button
                    name={'音符'}
                    className={`${styles.tabBtn} ${tabmenu === '音符' ? `${styles.active}` : ''}`}
                    onClick={()=>{setTabmenu('音符')}}
                />   
                <Button
                    name={'奏法'}
                    className={`${styles.tabBtn} ${tabmenu === '奏法' ? `${styles.active}` : ''}`}
                    onClick={()=>{setTabmenu('奏法')}}
                />
            </div>
            <div className={styles.btnContainer}>
                {tabmenu === '音符' && <div className={styles.content}>
                    {ary.map((item,index)=>{
                        return <Button
                            name={item}
                            className={styles.contentBtn}
                            onClick={()=>{setTool(item)}}
                        />
                    })}   
                </div>}
                {tabmenu === '奏法' && <div className={styles.content}>
                    {effect.map((item,index)=>{
                        return <Button
                            name={item}
                            className={styles.contentBtn}
                            onClick={()=>{setTool(item)}}
                        />
                    })}
                </div>}
            </div>
        </div>
    )
}
export default Editer