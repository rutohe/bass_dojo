function TestScore({columnInRow}) {
    const defaultColumn = {
        fret:new Array(stringNum),
        effect: 'hummer_on',
        bar:false
    }
    const createNewRow = () => {
        return Array.from({ length:columnInRow }, () => ({
            ...defaultColumn,
            fret: [...defaultColumn.fret] // スプレッド構文で配列の住所変えてるから1使えたら全部変わることを防いでるらしい
        }))
    }
    return(
        <>
            
        </>
    )
}
export default TestScore