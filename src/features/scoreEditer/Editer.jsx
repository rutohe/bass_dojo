import React, { useState } from 'react';
import styles from './Editer.module.css';

function Editer({ activeTool, setActiveTool }) {
    const tabs = [
        { id: 'four', label: '4分音符 ♩', type: 'length' },
        { id: 'eight', label: '8分音符 ♪', type: 'length' },
        { id: 'sixteen', label: '16分音符 ♬', type: 'length' },
        { id: 'effectMode', label: 'エフェクト ✨', type: 'mode' }
    ];

    const fretNumbers = [...Array.from({ length: 25 }, (_, i) => i), 'x'];
    
    const effectsList = [
        { id: 'none', label: '通常' },
        { id: 'H', label: 'H' },
        { id: 'P', label: 'P' },
        { id: 'Slur', label: 'Slur' }
    ];

    const [fretMemory, setFretMemory] = useState({ four: 0, eight: 0, sixteen: 0 });
    const [selectedEffect, setSelectedEffect] = useState('none');
    const [activeTab, setActiveTab] = useState('four');

    const handleTabClick = (tab) => {
        setActiveTab(tab.id);
        if (tab.type === 'length') {
            setActiveTool({ type: 'fret', value: fretMemory[tab.id], length: tab.id });
        } else {
            setActiveTool({ type: 'effect', value: selectedEffect, length: null });
        }
    };

    const handleFretInput = (num) => {
        const val = num === 'x' ? -1 : Number(num);
        setFretMemory(prev => ({ ...prev, [activeTab]: val }));
        setActiveTool({ type: 'fret', value: val, length: activeTab });
    };

    const handleEffectSelect = (id) => {
        setSelectedEffect(id);
        setActiveTool({ type: 'effect', value: id, length: null });
    };

    const currentFret = fretMemory[activeTab];

    return (
        <div className={styles.container}>
            <div className={styles.tabHeader}>
                {tabs.map(tab => (
                    <button 
                        key={tab.id}
                        className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.statusArea}>
                {activeTab !== 'effectMode' ? (
                    <div>
                        準備中のスタンプ: フレット <span className={styles.textGreen}>{currentFret === -1 ? 'x' : currentFret}</span>
                    </div>
                ) : (
                    <div>
                        準備中のスタンプ: <span className={styles.textPurple}>
                            {effectsList.find(e => e.id === selectedEffect)?.label || '通常'}
                        </span>
                    </div>
                )}
            </div>

            <hr className={styles.divider} />

            <div className={styles.keyboardArea}>
                {activeTab !== 'effectMode' && (
                    <div className={styles.section}>
                        <p className={styles.sectionTitle}>🔢 フレットスタンプを選ぶ</p>
                        <div className={styles.fretGrid}>
                            {fretNumbers.map(num => {
                                const isSelected = num === 'x' ? currentFret === -1 : currentFret === num;
                                const buttonClasses = [
                                    styles.pad,
                                    styles.padButton,
                                    num === 'x' ? styles.muteButton : '',
                                    isSelected ? styles.activeFretPad : ''
                                ].join(' ').trim();

                                return (
                                    <button
                                        key={num}
                                        className={buttonClasses}
                                        onClick={() => handleFretInput(num)}
                                    >
                                        {num}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeTab === 'effectMode' && (
                    <div className={styles.section}>
                        <p className={styles.sectionTitle}>🎸 奏法スタンプを選ぶ</p>
                        <div className={styles.effectGrid}>
                            {effectsList.map(eff => {
                                const isSelected = selectedEffect === eff.id;
                                const buttonClasses = [
                                    styles.pad,
                                    styles.padButton,
                                    styles.effectButton,
                                    isSelected ? styles.activeEffectPad : ''
                                ].join(' ').trim();

                                return (
                                    <button
                                        key={eff.id}
                                        className={buttonClasses}
                                        onClick={() => handleEffectSelect(eff.id)}
                                    >
                                        {eff.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Editer;