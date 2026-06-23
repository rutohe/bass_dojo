import { useState } from 'react'
import styles from './Editer.module.css'
import Button from '../../components/Button'
function Editer({}) {
    const [tabMenu,setTabMenu] = useState('four')
    const [selectTab,setSelectTab] = useState({})
    const tabs = ['four','eight','sixteen','method']
    const frets = Array.from({length:24},(_,i)=>i)
    return(
        <>
            <div className={styles.tabArea}>
                <Button
                    name={'四分音符'}
                    onClick={()=>{setTabMenu('four')}}
                    className={styles.tabBtn}
                />
                <Button
                    name={'八分音符'}
                    onClick={()=>{setTabMenu('eight')}}
                    className={styles.tabBtn}
                />
                <Button
                    name={'十六分音符'}
                    onClick={()=>{setTabMenu('sixteen')}}
                    className={styles.tabBtn}
                />
                <Button
                    name={'奏法など'}
                    onClick={()=>{setTabMenu('method')}}
                    className={styles.tabBtn}
                />
            </div>
            <div className={styles.container}>
                {tabs.map((item,index)=>{
                    return (item === tabMenu) && <div className={styles.menu}>
                        {frets.map((it,idx)=>{
                            return <Button
                                className={styles.item}
                                onClick={setSelectTab({length:item,content:it})}
                                name={it}
                            />
                        })}
                        <div className={styles.btnArea}>
                            <Button
                                className={styles.submitBtn}
                                onClick={()=>{}}
                                name={'この入力で確定する'}

                            />
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}
export default Editer