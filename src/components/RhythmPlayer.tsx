import { useEffect, useRef, useState } from "react";
import { Box, Button, Slider, Typography } from "@mui/material";
import type { Tab } from "../types/create";
import { DEFAULT_TIME_SIGNATURE, getGridDivisions } from "../types/rhythm";

interface RhythmPlayerProps {
  score: Tab;
  onActiveGridChange?: (grid: number | null) => void;
}

function RhythmPlayer({ score, onActiveGridChange }: RhythmPlayerProps) {
  const [tempo, setTempo] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const eventTimeoutsRef = useRef<number[]>([]);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const stop = () => {
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    eventTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
    eventTimeoutsRef.current = [];
    oscillatorsRef.current.forEach((oscillator) => {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch {
        // すでに停止済みのオシレーターは何もしない。
      }
    });
    oscillatorsRef.current = [];
    timeoutRef.current = null;
    onActiveGridChange?.(null);
    setIsPlaying(false);
  };

  useEffect(() => stop, []);

  const play = async () => {
    stop();
    const gridDivisions = getGridDivisions(score.timeSignature ?? DEFAULT_TIME_SIGNATURE);
    const eventsByStart = new Map<number, number>();
    score.measures.forEach((measure, measureIndex) => {
      measure.notes.forEach((note) => {
        const subdivision = note.subdivision ?? 1;
        const durationInGrids = note.length / subdivision;
        for (let index = 0; index < subdivision; index += 1) {
          const startGrid = measureIndex * gridDivisions + note.start + index * durationInGrids;
          const existingDuration = eventsByStart.get(startGrid);
          // 同じタイミングの和音は1音にまとめ、短い区切りを優先してリズムを聞き取りやすくする。
          eventsByStart.set(startGrid, existingDuration === undefined
            ? durationInGrids
            : Math.min(existingDuration, durationInGrids));
        }
      });
    });
    if (eventsByStart.size === 0) return;

    const context = contextRef.current ?? new AudioContext();
    contextRef.current = context;
    await context.resume();

    const secondsPerGrid = 60 / tempo / 4;
    const rhythmEvents = [...eventsByStart.entries()]
      .map(([startGrid, durationInGrids]) => ({ startGrid, durationInGrids }))
      .sort((first, second) => first.startGrid - second.startGrid);
    const startTime = context.currentTime + 0.08;

    rhythmEvents.forEach(({ startGrid, durationInGrids }) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const time = startTime + startGrid * secondsPerGrid;
      const soundLength = Math.max(0.035, durationInGrids * secondsPerGrid * 0.85);
      oscillator.frequency.value = 440;
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(0.18, time + 0.008);
      gain.gain.setValueAtTime(0.18, time + soundLength - 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + soundLength);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(time);
      oscillator.stop(time + soundLength + 0.01);
      oscillatorsRef.current.push(oscillator);
    });

    // ノーツの有無にかかわらず、再生カーソルは全グリッド列を進める。
    const lastGrid = score.measures.length * gridDivisions;
    for (let grid = 0; grid < lastGrid; grid += 1) {
      eventTimeoutsRef.current.push(window.setTimeout(() => {
        onActiveGridChange?.(grid);
      }, (0.08 + grid * secondsPerGrid) * 1000));
    }
    timeoutRef.current = window.setTimeout(stop, (lastGrid * secondsPerGrid + 0.2) * 1000);
    setIsPlaying(true);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", mb: 2 }}>
      <Button variant="contained" onClick={isPlaying ? stop : () => void play()} disabled={!isPlaying && score.measures.every((measure) => measure.notes.length === 0)}>
        {isPlaying ? "停止" : "リズムを再生"}
      </Button>
      <Box sx={{ width: 180 }}>
        <Typography variant="body2">テンポ: {tempo} BPM</Typography>
        <Slider value={tempo} min={40} max={180} step={1} onChange={(_, value) => setTempo(value as number)} />
      </Box>
      <Typography variant="body2" color="text.secondary">長さを音の伸び、2連・3連を等分した連続音として再生します。</Typography>
    </Box>
  );
}

export default RhythmPlayer;
