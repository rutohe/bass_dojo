import React, { useState } from 'react';
import styles from './Score.module.css';

function Score({ scoreData, activeRow, activeBar, onBarSelect, activeTool, onScoreClick }) {
    const strings = [0, 1, 2, 3];
    const steps = Array.from({ length: 16 }, (_, i) => i);
    const barsPerRow = 2;

    const [hoveredGrid, setHoveredGrid] = useState({ barIdx: null, stringIdx: null, stepIdx: null });

    const getToolLengthClass = () => {
        if (!activeTool || activeTool.type === 'effect' || !activeTool.length) {
            return styles.preview_sixteen;
        }
        return styles[`preview_${activeTool.length}`];
    };

    const getStepIndexFromEvent = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        return Math.floor(offsetX / 32);
    };

    const handleMouseMove = (e, absoluteBarIndex, stringIdx) => {
        const stepIdx = getStepIndexFromEvent(e);
        if (stepIdx >= 0 && stepIdx < 16) {
            setHoveredGrid(prev => {
                if (prev.barIdx === Number(absoluteBarIndex) && prev.stringIdx === Number(stringIdx) && prev.stepIdx === stepIdx) {
                    return prev;
                }
                return { barIdx: Number(absoluteBarIndex), stringIdx: Number(stringIdx), stepIdx };
            });
        }
    };

    const handleMouseLeave = () => {
        setHoveredGrid({ barIdx: null, stringIdx: null, stepIdx: null });
    };

    const handleStringClick = (e, rowIndex, barIndex, absoluteBarIndex, stringIdx) => {
        e.stopPropagation();
        onBarSelect(rowIndex, barIndex);

        const targetStepIdx = getStepIndexFromEvent(e);
        if (targetStepIdx >= 0 && targetStepIdx < 16) {
            onScoreClick(rowIndex, barIndex, targetStepIdx, stringIdx);
        }
    };

    return (
        <div className={styles.container}>
            {scoreData.map((row, rowIndex) => (
                <div className={styles.rowWrapper} key={rowIndex}>
                    <div className={styles.row}>
                        {row.map((bar, barIndex) => {
                            const isCurrentBar = rowIndex === activeRow && barIndex === activeBar;
                            const absoluteBarIndex = (rowIndex * barsPerRow) + barIndex;

                            return (
                                <div 
                                    key={barIndex} 
                                    className={`${styles.bar} ${isCurrentBar ? styles.activeBar : ''}`}
                                    onClick={() => onBarSelect(rowIndex, barIndex)}
                                >
                                    {strings.map((stringIdx) => (
                                        <div 
                                            key={stringIdx} 
                                            className={styles.stringRow}
                                            onMouseMove={(e) => handleMouseMove(e, absoluteBarIndex, stringIdx)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={(e) => handleStringClick(e, rowIndex, barIndex, absoluteBarIndex, stringIdx)}
                                        >
                                            {steps.map((stepIdx) => {
                                                // 🌟 1マスの中の各種データタイプを取得
                                                const cellData = bar[stringIdx][stepIdx];
                                                const fretItem = cellData.fret;
                                                const effectItem = cellData.effect;
                                                const tupletItem = cellData.tuplet;

                                                // フレットの先回りプレビューが被らないようにチェック
                                                let isCoveredForFret = false;
                                                for (let checkIdx = 0; checkIdx < stepIdx; checkIdx++) {
                                                    const prevFret = bar[stringIdx][checkIdx].fret;
                                                    if (prevFret) {
                                                        const w = prevFret.length === 'four' ? 4 : prevFret.length === 'eight' ? 2 : 1;
                                                        if (checkIdx + w > stepIdx) {
                                                            isCoveredForFret = true;
                                                            break;
                                                        }
                                                    }
                                                }

                                                const isEffectMode = activeTool && activeTool.type === 'effect';
                                                const isTupletMode = activeTool && activeTool.type === 'tuplet';
                                                
                                                const isHoveredNow = 
                                                    hoveredGrid.barIdx === Number(absoluteBarIndex) &&
                                                    hoveredGrid.stringIdx === Number(stringIdx) &&
                                                    hoveredGrid.stepIdx === stepIdx;

                                                return (
                                                    <div key={stepIdx} className={styles.gridCell}>
                                                        
                                                        {/* ─────── 1層目：エフェクトエリア ─────── */}
                                                        <div className={styles.effectLayer}>
                                                            {/* 条件分岐描画：effectオブジェクトが存在する場合 */}
                                                            {effectItem && effectItem.type === 'effect' && (
                                                                <span className={styles.effectTag}>{effectItem.value}</span>
                                                            )}
                                                            {/* エフェクトツールホバー時の発光枠 */}
                                                            {isHoveredNow && isEffectMode && (
                                                                <div className={styles.effectPreviewSquare} />
                                                            )}
                                                        </div>

                                                        {/* ─────── 2層目：フレット線（ベースの弦） ─────── */}
                                                        <div className={styles.stringLineLayer}>
                                                            <div className={styles.stringHorizontalLine} />
                                                        </div>

                                                        {/* ─────── 🌟 3層目：絶対配置アイテム群 ─────── */}
                                                        
                                                        {/* 条件分岐描画：fretオブジェクトが存在する場合（線の上に被せる） */}
                                                        {fretItem && fretItem.type === 'fret' && (
                                                            <div className={`${styles.fretCapsule} ${styles[fretItem.length]} ${fretItem.fret === -1 ? styles.mute : ''}`}>
                                                                <span className={styles.fretText}>
                                                                    {fretItem.fret === -1 ? 'X' : fretItem.fret}
                                                                </span>
                                                            </div>
                                                        )}

                                                        {/* 条件分岐描画：tupletオブジェクトが存在する場合 */}
                                                        {tupletItem && tupletItem.type === 'tuplet' && (
                                                            <div className={`${styles.tupletBadge} ${styles[tupletItem.length || 'sixteen']}`}>
                                                                <span className={styles.tupletText}>{tupletItem.value}</span>
                                                            </div>
                                                        )}

                                                        {/* フレットツール選択時の先回りプレビュー */}
                                                        {isHoveredNow && !isEffectMode && !isTupletMode && !isCoveredForFret && (
                                                            <div className={`${styles.previewCapsule} ${getToolLengthClass()}`} />
                                                        )}

                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Score;