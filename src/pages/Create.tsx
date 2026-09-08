import { useState } from "react"
import TabComponent from "../components/TabComponent"
import EditParts from "../components/EditParts"
import type { Tab } from "../types/create"

interface CreateProps{
    tab:Tab
}

function Create ({tab}:CreateProps){
    const [strings,setStrings] = useState<number>(4)
    const [part,setPart] = useState<string>('');

    return(
        <div style={{width:'100%',height:'100%',display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'5px'}}>
            {/* 譜面表示するコンポーネント */}
            <TabComponent
                measures={tab.measures}
                strings={strings}
            />
            {/* 編集用のボタンエリアとか */}
            <EditParts
                part={part}
                setPart={setPart}
            />
        </div>
    )
}
export default Create