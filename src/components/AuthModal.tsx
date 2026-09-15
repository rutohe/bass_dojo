import { useState } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { supabase } from "../utils/supabase";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setMessage("");
    setIsSubmitting(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName.trim() },
          },
        });
        if (error) throw error;
        if (data.session === null) {
          setMessage("確認メールを送信しました。メール内のリンクを開いてください。");
        } else {
          onClose();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onClose();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "認証に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>ログイン</DialogTitle>
      <DialogContent sx={{ display: "grid", gap: 2, pt: "12px !important" }}>
        <ToggleButtonGroup
          exclusive
          value={mode}
          onChange={(_, value) => value !== null && setMode(value)}
          size="small"
          fullWidth
        >
          <ToggleButton value="login">ログイン</ToggleButton>
          <ToggleButton value="signup">新規登録</ToggleButton>
        </ToggleButtonGroup>
        {message !== "" && <Alert severity={message.includes("送信") ? "success" : "error"}>{message}</Alert>}
        {mode === "signup" && (
          <TextField label="表示名" value={displayName} onChange={(event) => setDisplayName(event.target.value)} required fullWidth />
        )}
        <TextField label="メールアドレス" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required fullWidth />
        <TextField label="パスワード" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required fullWidth />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isSubmitting}>キャンセル</Button>
        <Button variant="contained" onClick={submit} disabled={email === "" || password.length < 6 || (mode === "signup" && displayName.trim() === "") || isSubmitting}>
          {mode === "login" ? "ログイン" : "登録する"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AuthModal;
