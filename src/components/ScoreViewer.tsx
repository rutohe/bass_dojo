import { Box } from "@mui/material";
import type { Tab } from "../types/create";
import { DEFAULT_TIME_SIGNATURE, getGridDivisions, getGridsPerBeat } from "../types/rhythm";
import measureStyles from "./MeasureComponent.module.css";
import noteStyles from "./NoteComponent.module.css";

interface ScoreViewerProps {
  score: Tab;
  activeGrid?: number | null;
}

function ScoreViewer({ score, activeGrid = null }: ScoreViewerProps) {
  const strings = Math.max(
    4,
    ...score.measures.flatMap((measure) => measure.notes.map((note) => note.string + 1)),
  );
  const timeSignature = score.timeSignature ?? DEFAULT_TIME_SIGNATURE;
  const gridDivisions = getGridDivisions(timeSignature);
  const gridsPerBeat = getGridsPerBeat(timeSignature);

  return (
    <Box role="region" aria-label="譜面（横スクロール可能）" tabIndex={0} sx={{width:"100%",overflowX:"auto"}}>
    <Box sx={{
      minWidth:gridDivisions*28,
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" },
      rowGap: "16px", columnGap: 0,
      borderRight: "2px solid #334155",
    }}>
      {score.measures.map((measure, measureIndex) => (
        <div className={measureStyles.measureWrapper} key={`measure_${measureIndex}`}>
          {Array.from({ length: gridDivisions }).map((_, columnIndex) => (
            <div className={`${measureStyles.measureColumn} ${columnIndex % gridsPerBeat === 0 ? measureStyles.beatColumn : ""} ${Math.floor(activeGrid ?? -1) === measureIndex * gridDivisions + columnIndex ? measureStyles.activeColumn : ""}`} key={`column_${columnIndex}`}>
              {Array.from({ length: strings }).map((_, stringIndex) => (
                <div key={`string_${stringIndex}`}></div>
              ))}
            </div>
          ))}
          {measure.notes.map((note) => {
            const subdivision = note.subdivision ?? 1;
            return (
              <div
                className={noteStyles.note}
                key={note.id}
                style={{
                  left: `${note.start * 100 / gridDivisions}%`,
                  top: `${note.string * 100 / strings}%`,
                  width: `${note.length * 100 / gridDivisions}%`,
                }}
              >
                <span className={noteStyles.fret}>{note.fret}</span>
                {subdivision > 1 && (
                  <span className={noteStyles.subdivisionLabel}>{subdivision}</span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </Box>
    </Box>
  );
}

export default ScoreViewer;
