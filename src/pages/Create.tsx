import { useState } from "react"
import TabComponent from "../components/TabComponent"
import EditParts from "../components/EditParts"
import PostModal from "../components/PostModal"
import RhythmPlayer from "../components/RhythmPlayer"
import type { PostDetails } from "../components/PostModal"
import type { Tab } from "../types/create"
import type { Part } from "../types/parts"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { Link } from "react-router-dom"
import { DEFAULT_TIME_SIGNATURE, getGridDivisions, TIME_SIGNATURES } from "../types/rhythm"

interface CreateProps{
    onPublish:(post:PostDetails & {score:Tab}) => Promise<void>,
    isAuthenticated:boolean,
}

const emptyTab: Tab = {
    measures: [{ notes: [] }],
    timeSignature: DEFAULT_TIME_SIGNATURE,
}

function Create ({onPublish,isAuthenticated}:CreateProps){
    const [strings] = useState<number>(4)
    const [part,setPart] = useState<Part | ''>('');
    const [score,setScore] = useState<Tab>(emptyTab)
    const [isPostModalOpen,setIsPostModalOpen] = useState(false)
    const [activeGrid,setActiveGrid] = useState<number | null>(null)
    const timeSignature = score.timeSignature ?? DEFAULT_TIME_SIGNATURE;

    const changeTimeSignature = (value:string) => {
        const [beats, beatUnit] = value.split("/").map(Number);
        const nextTimeSignature = { beats, beatUnit: beatUnit as 4 | 8 };
        const nextGridDivisions = getGridDivisions(nextTimeSignature);
        const hasNotesOutsideMeasure = score.measures.some((measure) => (
            measure.notes.some((note) => note.start + note.length > nextGridDivisions)
        ));
        if (hasNotesOutsideMeasure) {
            window.alert("この拍子では小節の範囲を超えるノーツがあります。ノーツを短くするか、先に削除してください。");
            return;
        }
        setScore((previousScore) => ({
            ...previousScore,
            timeSignature: nextTimeSignature,
        }));
    }

    const publish = async (details:PostDetails) => {
        await onPublish({...details,score})
        setIsPostModalOpen(false)
    }

    return(
        <div style={{width:'100%',height:'100%',display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'5px'}}>
            {/* 譜面表示するコンポーネント */}
            <TabComponent
                strings={strings}
                part={part}
                score={score}
                setScore={setScore}
                activeGrid={activeGrid}
            />
            <RhythmPlayer score={score} onActiveGridChange={setActiveGrid} />
            <FormControl size="small" sx={{alignSelf:'flex-start', minWidth:120}}>
                <InputLabel id="time-signature-label">拍子</InputLabel>
                <Select
                    labelId="time-signature-label"
                    label="拍子"
                    value={`${timeSignature.beats}/${timeSignature.beatUnit}`}
                    onChange={(event) => changeTimeSignature(event.target.value)}
                >
                    {TIME_SIGNATURES.map((signature) => (
                        <MenuItem key={`${signature.beats}/${signature.beatUnit}`} value={`${signature.beats}/${signature.beatUnit}`}>
                            {signature.beats}/{signature.beatUnit}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {/* 編集用のボタンエリアとか */}
            <EditParts
                part={part}
                setPart={setPart}
            />
            <div style={{alignSelf:'flex-end', display:'flex', gap:'8px'}}>
                <Button component={Link} to="/" variant="outlined">ホームに戻る</Button>
                <Button
                    variant="contained"
                    sx={{minWidth:'120px', fontWeight:700}}
                    onClick={()=>setIsPostModalOpen(true)}
                    disabled={!isAuthenticated}
                >
                    保存
                </Button>
            </div>
            <PostModal
                open={isPostModalOpen}
                onClose={()=>setIsPostModalOpen(false)}
                onSubmit={publish}
            />
        </div>
    )
}
export default Create
