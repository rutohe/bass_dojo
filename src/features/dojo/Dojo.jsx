// src/features/dojo/Dojo.jsx
import { useState } from 'react'
import Button from '../../components/Button'
import styles from './Dojo.module.css'

function Dojo({ setScreen, technique}) {
  // 💡 奏法での絞り込み用 State ('all', '指弾き', 'スラップ', 'ピック')
  const [filterTechnique, setFilterTechnique] = useState(technique[0])

  // 練習フレーズの仮データ（モック）
  // 今後、新しく設計する「音価やスラー入りの楽譜オブジェクト(score)」をここに内包させます！
  const samplePhrases = [
    {
      id: "phrase-1",
      title: "クロマチック・フィンガリング（基礎の筋トレ）",
      difficulty: "★☆☆☆☆",
      bpm: 90,
      technique: "指弾き",
      target: "左手の独立・ストレッチ",
      tips: "メトロノームに合わせて、すべての音が均等な長さになるようにしっかり押弦します。"
    },
    {
      id: "phrase-2",
      title: "親指連続打ち！サムピング持久戦",
      difficulty: "★★★☆☆",
      bpm: 120,
      technique: "スラップ",
      target: "親指のフォーム安定・持久力アップ",
      tips: "手首の回転を使って、無駄な力を抜いて叩き続けるのがコツです。"
    },
    {
      id: "phrase-3",
      title: "16ビート・ゴーストノート地獄",
      difficulty: "★★☆☆☆",
      bpm: 105,
      technique: "指弾き",
      target: "レイキングと右手のミュートコントロール",
      tips: "ゴーストノート（x）の音量がバラつかないように、優しく、でもタイトにピッキングします。"
    }
  ]

  // フィルター処理：選択された奏法だけを抽出
  const filteredPhrases = filterTechnique === 'すべて'
    ? samplePhrases
    : samplePhrases.filter(p => p.technique === filterTechnique)

  return (
    <div className={styles.container}>
      {/* 上部ヘッダー（戻るボタンと投稿ボタン） */}
      <header className={styles.header}>
        <Button name="⬅ ホームに戻る" className={styles.naviBtn} onClick={() => setScreen('home')} />
        <h2>🥷 修行の間（フレーズ一覧）</h2>
        {/* 将来的に投稿フォーム画面へ行くためのボタン（今はアラート） */}
        <Button name="➕ フレーズを投稿する" className={styles.navibtn} onClick={() => alert('今後、投稿フォームへ切り替えるロジックを入れます！')} />
      </header>

      {/* 絞り込みタブエリア */}
      <div className={styles.filterArea}>
        {technique.map((item,index)=>{
            return <Button
                className={(filterTechnique === item) ? `${styles.active} ${styles.filterBtn}` : styles.filterBtn}
                onClick={()=>{setFilterTechnique(item)}}
                name={item}
                key={`tab${index}`}
            />
        })}
      </div>

      {/* フレーズ一覧（グリッド表示） */}
      <div className={styles.grid}>
        {filteredPhrases.map((phrase) => (
          <div key={phrase.id} className={styles.phraseCard}>
            <div className={styles.cardHeader}>
              <span className={styles.techniqueBadge}>{phrase.technique}</span>
              <span className={styles.difficulty}>{phrase.difficulty}</span>
            </div>
            
            <h3 className={styles.phraseTitle}>{phrase.title}</h3>
            
            <div className={styles.infoRow}>
              <span>⏱️ 推奨BPM: <strong>{phrase.bpm}</strong></span>
            </div>
            
            <p className={styles.target}>🎯 <strong>狙い:</strong> {phrase.target}</p>
            <p className={styles.tips}>💡 <strong>コツ:</strong> {phrase.tips}</p>
            
            {/* このフレーズを練習するボタン */}
            <Button 
              name="🔥 このフレーズを練習する" 
              className={styles.practice}
              onClick={() => {
                // 将来的に選んだフレーズのデータを保持して、エディタ（ビューア兼用）画面を開く
                alert(`${phrase.title} の練習画面を開きます（データ構造決定後に合流！）`)
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dojo