import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  login,
  selectUser,
  selectIsLoading,
  selectError,
  clearError,
  selectIsInitialized,
} from "@/redux/authSlice";
import styles from "@/styles/Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const isInitialized = useAppSelector(selectIsInitialized);

  const router = useRouter();

  useEffect(() => {
    // Eğer kullanıcı zaten giriş yapmışsa ve sistem başlatıldıysa, ana sayfaya yönlendir
    if (isInitialized && user) {
      router.push("/");
    }
  }, [user, isInitialized, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!username || !password) {
      // Form validasyonu
      return;
    }

    dispatch(login({ username, password }));
  };

  // Sistem başlatılmadıysa veya yükleniyor durumundaysa
  if (!isInitialized || isLoading) {
    return <div>Yükleniyor...</div>;
  }

  // Kullanıcı giriş yapmışsa ve hala bu sayfadaysa
  if (user) {
    return <div>Yönlendiriliyor...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Giriş Yap</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınızı girin"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Giriş Yap
          </button>
        </form>
        <p className={styles.hint}>Kullanıcı adı: admin, Şifre: 12345</p>
      </div>
    </div>
  );
}
