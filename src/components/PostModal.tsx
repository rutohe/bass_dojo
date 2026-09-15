// 譜面投稿時のモーダル
import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

export interface PostDetails {
  title: string;
  description: string;
  difficulty: number;
}

interface PostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (details: PostDetails) => Promise<void>;
}

function PostModal({ open, onClose, onSubmit }: PostModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const submit = async () => {
    if (title.trim() === "" || difficulty === null) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      await onSubmit({ title: title.trim(), description: description.trim(), difficulty });
      setTitle("");
      setDescription("");
      setDifficulty(null);
    } catch (error) {
      console.error("投稿に失敗しました", error);
      setSubmitError("投稿に失敗しました。接続設定とテーブル設定を確認してください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>タブ譜を投稿</DialogTitle>
      <DialogContent sx={{ display: "grid", gap: 2, pt: "12px !important" }}>
        {submitError !== "" && <Alert severity="error">{submitError}</Alert>}
        <TextField
          autoFocus
          label="タイトル"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="説明"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          multiline
          minRows={3}
          fullWidth
        />
        <Typography component="div">
          難易度（必須）
          <div role="radiogroup" aria-label="難易度" style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
            {Array.from({ length: 5 }, (_, index) => {
              const value = index + 1;
              const selected = difficulty !== null && value <= difficulty;

              return (
                <Button
                  key={value}
                  aria-label={`難易度 ${value}`}
                  aria-pressed={difficulty === value}
                  disableRipple
                  onClick={() => setDifficulty(value)}
                  sx={{
                    minWidth: 0,
                    width: "40px",
                    height: "40px",
                    padding: 0,
                    color: selected ? "#f59e0b" : "#cbd5e1",
                    fontSize: "28px",
                    lineHeight: 1,
                    "&:hover": { backgroundColor: "transparent", color: selected ? "#f59e0b" : "#cbd5e1" },
                  }}
                >
                  ★
                </Button>
              );
            })}
          </div>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>キャンセル</Button>
        <Button
          variant="contained"
          onClick={submit}
          disabled={title.trim() === "" || difficulty === null || isSubmitting}
        >
          投稿する
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PostModal;
