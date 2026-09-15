import type { Note } from "../types/create";
export const addNote = (newNote:Note,allNote:Note[]) => {
    if(newNote.fret === ''){
        return [...allNote];
    }
    const existIndex = allNote.findIndex((n) => {
        if(n.string !== newNote.string) return false;
        // 重なり判定
        return(
            newNote.start < n.start + n.length &&
            n.start < newNote.start + newNote.length
        );
    })
    // 重なりなしは単純に追加
    if(existIndex === -1){
        return [...allNote,newNote];
    }
    //重なりあり=ノーツにクリック判定吸われるから必要はないけど念のため残す
    const existNote = allNote[existIndex];
        
    if (existNote.fret === newNote.fret) {
        console.log('delete');
        return allNote.filter((_, index) => index !== existIndex);
    }
    return allNote.map((note,index)=>{
        return (index === existIndex) ? 
        newNote : note;
    })
}
