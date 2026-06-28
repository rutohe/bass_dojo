import React, { useState } from 'react';
import Score from './Score';
import Editer from './Editer';
import styles from './Display.module.css';

function Display() {
    const [allScore, setAllScore] = useState([]);
    const [activeRow, setActiveRow] = useState(0);
    const [activeBar, setActiveBar] = useState(0);
    const [activeTool, setActiveTool] = useState({ type: 'fret', value: 0, length: 'four' });

    const barsPerRow = 2;

    const handleScoreClick = (rowIndex, barIndex, noteIndex, stringIndex) => {
        if (!activeTool) return;

        const clickBarIdx = Number((rowIndex * barsPerRow) + barIndex);
        const clickStepIdx = Number(noteIndex);
        const clickStringIdx = Number(stringIndex);

        let newScore = [...allScore];

        // 🌟 A: フレット（音符）配置モード
        if (activeTool.type === 'fret') {
            const stampWidth = activeTool.length === 'four' ? 4 : activeTool.length === 'eight' ? 2 : 1;

            if (clickStepIdx + stampWidth > 16) {
                alert("⚠️ 音符が小節の右端からはみ出してしまいます！");
                return;
            }

            // 同一位置・被る範囲の「既存のfret」を削除
            newScore = newScore.filter(item => {
                if (item.type !== 'fret') return true; // fret以外（effectなど）は消さない
                if (Number(item.barIndex) !== clickBarIdx || Number(item.stringIndex) !== clickStringIdx) return true;
                
                const itemWidth = item.length === 'four' ? 4 : item.length === 'eight' ? 2 : 1;
                const isOverlap = (clickStepIdx < Number(item.noteIndex) + itemWidth) && (clickStepIdx + stampWidth > Number(item.noteIndex));
                
                return !isOverlap;
            });

            newScore.push({
                id: crypto.randomUUID(),
                type: 'fret',
                barIndex: clickBarIdx,
                stringIndex: clickStringIdx,
                noteIndex: clickStepIdx, 
                fret: activeTool.value,
                length: activeTool.length
            });

        // 🌟 B: エフェクト（H, Pなど）配置モード
        } else if (activeTool.type === 'effect') {
            // クリックしたピンポイントのマスにある「既存のeffect」を削除
            newScore = newScore.filter(item => 
                !(item.type === 'effect' && 
                  Number(item.barIndex) === clickBarIdx && 
                  Number(item.stringIndex) === clickStringIdx && 
                  Number(item.noteIndex) === clickStepIdx)
            );

            // 'none'（消しゴム）でなければ新しく追加
            if (activeTool.value !== 'none') {
                newScore.push({
                    id: crypto.randomUUID(),
                    type: 'effect',
                    barIndex: clickBarIdx,
                    stringIndex: clickStringIdx,
                    noteIndex: clickStepIdx,
                    value: activeTool.value
                });
            }

        // 🌟 C: 連符（Tuplet）配置モード (拡張用)
        } else if (activeTool.type === 'tuplet') {
            // 必要に応じてfretと同様に重複を消去してpush
            newScore = newScore.filter(item => 
                !(item.type === 'tuplet' && 
                  Number(item.barIndex) === clickBarIdx && 
                  Number(item.stringIndex) === clickStringIdx && 
                  Number(item.noteIndex) === clickStepIdx)
            );

            if (activeTool.value !== 'none') {
                newScore.push({
                    id: crypto.randomUUID(),
                    type: 'tuplet',
                    barIndex: clickBarIdx,
                    stringIndex: clickStringIdx,
                    noteIndex: clickStepIdx,
                    value: activeTool.value,
                    length: activeTool.length || 'sixteen'
                });
            }
        }

        setAllScore(newScore);
    };

    // 🌟 全データが入ったallScoreをタイプ別に1マスに整理して分配する
    const getRenderData = () => {
        let grid = Array.from({ length: 1 }, () =>
            Array.from({ length: 2 }, () => 
                Array.from({ length: 4 }, () => 
                    Array.from({ length: 16 }, () => ({ fret: null, effect: null, tuplet: null }))
                )
            )
        );

        allScore.forEach(item => {
            if (item.barIndex < 2) {
                const cell = grid[0][item.barIndex][item.stringIndex][item.noteIndex];
                if (item.type === 'fret') cell.fret = item;
                if (item.type === 'effect') cell.effect = item;
                if (item.type === 'tuplet') cell.tuplet = item;
            }
        });

        return grid;
    };

    return (
        <div className={styles.container}>
                <Score 
                    scoreData={getRenderData()} 
                    activeRow={activeRow} 
                    activeBar={activeBar}
                    onBarSelect={(r, b) => { setActiveRow(r); setActiveBar(b); }}
                    activeTool={activeTool} 
                    onScoreClick={handleScoreClick}
                />
                <Editer activeTool={activeTool} setActiveTool={setActiveTool} />
            
        </div>
    );
}

export default Display;