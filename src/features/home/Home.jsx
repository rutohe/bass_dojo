import Button from "../../components/Button"
import styles from './Home.module.css'

function Home({setScreen}) {
    const pickupPhrase = {
        title: "16ビート・ゴーストノート地獄（初級）",
        technique: "指弾き",
        target: "レイキングと右手のミュートコントロール",
        difficulty: "★★☆☆☆"
    }
    return(        
        <div className={styles.container}>
            <section className={styles.hero}>
                <div className={styles.title}>ベース初心者道場</div>
                <p className={styles.description}>
                    ブラウザ上で直感的にベースのタブ譜を作成・練習できるWebアプリケーションです。<br />
                    リズムや運指の筋トレに特化したオリジナルフレーズを投稿・攻略し、楽しくベーシストになろう。
                </p>
            
                <div className={styles.btns}>  
                    <Button 
                        name="🥷 道場に入る（フレーズ一覧）"
                        className={styles.go}
                        onClick={() => setScreen('dojo')}
                    />
                    <Button 
                        name="🎸 新しい譜面を作成（エディタ）"
                        className={styles.go}
                        onClick={() => setScreen('editor')}
                    />
                </div>
            </section>
            <section className={styles.pickup}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span className={styles.cardTag}>🔥 本日の修行フレーズ</span>
                        <span className={styles.cardDifficult}>{pickupPhrase.difficulty}</span>
                    </div>
                    <h4>{pickupPhrase.title}</h4>
                    <p className={styles.text}>🎯 <strong>狙い:</strong> {pickupPhrase.target}</p>
                    <p className={styles.text}>🎸 <strong>奏法:</strong> {pickupPhrase.technique}</p>
                    <Button 
                        name="このフレーズに挑戦する"
                        className={styles.challenge}
                        onClick={() => setScreen('dojo')}
                    />
                </div>
            </section>
            <footer className={styles.footer}>
                <p className={styles.note}>※スマートフォンで使用する場合、画面を横向きにしてください。</p>
                <div className={styles.form}>
                <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSep7f0JgzIMA8gSsLTyj_r-tvIzWQTH7RxIHNxp7jsXBcaLFA/viewform?usp=header" 
                    className={styles.formLink}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    道場へのご意見・要望はこちら ➔
                </a>
                </div>
            </footer>
        </div>
    )
}
export default Home