import React from 'react';
import styles from './Score.module.css'

function Score({ scoreData, beatsPerBar = 4, lengthToBeats }) {
    // 💡 1. 累積の拍数を管理する変数
    let currentBeats = 0;

    return (
        <div className={styles.container}>
            {scoreData.map((item, index) => {
                currentBeats += lengthToBeats[item.length] || 0;
                const totalBeatsInFixed = Math.round(currentBeats * 100);
                const beatsPerBarInFixed = Math.round(beatsPerBar * 100);
                const isEndOfBar = (totalBeatsInFixed % beatsPerBarInFixed) === 0;

                return (
                    <div 
                        key={item.id || index}
                        /* 💡 isEndOfBar が真の時だけ styles.endOfBar を付与 */
                        className={`${styles.note} ${styles[item.length]} ${isEndOfBar ? styles.endOfBar : ''}`} 
                        id={index}
                    >
                        <div className={styles.effectarea}>{item.effect}</div>
                        <div className={styles.tuplet}>{item.tuplet}</div>
                        {item.fret.map((it, idx) => (
                            <div className={styles.line} key={idx}>
                                {it !== -2 && (
                                    <div className={styles.fret}>
                                        <p>{it === -1 ? 'x' : it}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default Score;