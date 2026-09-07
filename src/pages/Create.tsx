import { useState } from "react"
import TabComponent from "../components/TabComponent"
import type { Tab } from "../types/create"

interface CreateProps{
    tab:Tab
}

function Create ({tab}:CreateProps){
    const [strings,setStrings] = useState<number>(4)
    
    return(
        <>
            {/* 譜面表示するコンポーネント */}
            <TabComponent
                measures={tab.measures}
                strings={strings}
            />
            {/* 編集用のボタンエリアとか */}
        </>
    )
}
export default Create