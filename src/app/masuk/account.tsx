"use client";

// Tahap sebelum pilih profil: masuk/daftar akun rumah (Supabase Auth) dan buat rumah baru.

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { BALOO } from "@/components/launcher";
import { LatarKampus } from "./latar-kampus";
import { Icon } from "@/components/ui";
import { CAT, MEMBER_COLORS, PLAY, type ColorKey } from "@/lib/catalog";
import { friendlyError, supabase } from "@/lib/supabase/client";
import { createFamily, signOutAccount } from "@/lib/supabase/family";
import { useRumila, type Theme } from "@/lib/store";
import { setPeranAkademi, setUsiaAnak } from "@/lib/akademi/konten";
import {
  cekDaftar,
  dataDaftar,
  umurDari,
  type PeranDaftar,
} from "@/lib/akun/daftar";

const PI = "#0b2545";
const NV = "#1F3044";

export function useLook(theme: Theme) {
  const play = theme === "playful";
  const card: CSSProperties = play
    ? {
        borderRadius: 40,
        boxShadow: "0 10px 0 rgba(11,37,69,.1), 0 40px 80px rgba(11,37,69,.15)",
      }
    : {
        borderRadius: 32,
        border: "1px solid #ece9e3",
        boxShadow: "0 30px 80px rgba(31,48,68,.12)",
      };
  const title: CSSProperties = play
    ? {
        fontFamily: BALOO,
        fontSize: 30,
        fontWeight: 800,
        color: PI,
        lineHeight: 1.1,
      }
    : { fontSize: 24, fontWeight: 700, color: NV, letterSpacing: "-.02em" };
  const input: CSSProperties = {
    height: 50,
    borderRadius: 14,
    border: `1.5px solid ${play ? "#f0e4d2" : "#dfe2e7"}`,
    padding: "0 14px",
    fontSize: 15,
    fontWeight: play ? 700 : 500,
    color: play ? PI : NV,
    background: "#fff",
    outline: "none",
    width: "100%",
  };
  const primary: CSSProperties = play
    ? {
        height: 54,
        borderRadius: 18,
        background: "#fd861d",
        color: "#0b2545",
        fontWeight: 900,
        fontSize: 17,
        boxShadow: "0 4px 0 #d95a00",
      }
    : {
        height: 52,
        borderRadius: 14,
        background: NV,
        color: "#fff",
        fontWeight: 700,
        fontSize: 15,
      };
  const muted = play ? "#5b6b85" : "#7A8494";
  return { play, card, title, input, primary, muted, ink: play ? PI : NV };
}

export function Field({
  label,
  children,
  muted,
}: {
  label: string;
  children: ReactNode;
  muted: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span style={{ fontSize: 13, fontWeight: 700, color: muted }}>
        {label}
      </span>
      {children}
    </label>
  );
}

export function ErrorLine({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <p
      role="alert"
      className="rounded-xl px-3 py-2 text-sm font-semibold"
      style={{ background: "#FDE2E3", color: "#B5434A" }}
    >
      {msg}
    </p>
  );
}

/* ---------------- Masuk / Daftar akun ---------------- */

/** Domain internal untuk akun berbasis nama pengguna (Supabase Auth hanya mengenal email). */
const USERNAME_DOMAIN = "rumila.local";
const isUsername = (v: string) => !v.includes("@");
/** "rumila" → "rumila@rumila.local"; email biasa dibiarkan. */
export const toLoginEmail = (v: string) =>
  isUsername(v) ? `${v.trim().toLowerCase()}@${USERNAME_DOMAIN}` : v.trim();
/** Kebalikannya, untuk ditampilkan: "rumila@rumila.local" → "rumila". */
export const displayLogin = (email: string | null) =>
  email?.endsWith("@" + USERNAME_DOMAIN) ? email.split("@")[0] : email;

/** Kirim email "buat kata sandi baru" (Supabase Auth → SMTP Resend kampus@pulaurinoya.com). Tautan kembali ke /masuk/sandi-baru. */
export const kirimAturUlangSandi = (email: string) =>
  supabase().auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/masuk/sandi-baru`,
  });

export function AccountStage({ theme }: { theme: Theme }) {
  const L = useLook(theme);
  const [mode, setMode] = useState<"masuk" | "daftar" | "lupa">("masuk");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [peran, setPeran] = useState<PeranDaftar | "">("");
  const [lahir, setLahir] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState<"" | "email" | "username" | "reset">("");
  const [lihatSandi, setLihatSandi] = useState(false);
  const ruangKampusHp = useRef<HTMLDivElement>(null);
  const ruangKampusTablet = useRef<HTMLDivElement>(null);
  const ruangKampus = useMemo(() => [ruangKampusHp, ruangKampusTablet], []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    const login = email.trim();
    if (mode === "daftar") {
      const salah = cekDaftar({ email: login, peran, lahir });
      if (salah) {
        setErr(salah);
        return;
      }
    }
    if (isUsername(login) && !/^[a-z0-9._-]{3,30}$/i.test(login)) {
      setErr(
        "Nama pengguna 3–30 karakter: huruf, angka, titik, strip, atau garis bawah.",
      );
      return;
    }
    if (mode === "lupa" && isUsername(login)) {
      setErr(
        "Akun nama pengguna tidak punya email untuk menerima tautan. Masuk lewat perangkat yang masih tersambung, atau hubungi kampus@pulaurinoya.com.",
      );
      return;
    }
    setBusy(true);
    try {
      const sb = supabase();
      if (mode === "lupa") {
        const { error } = await kirimAturUlangSandi(login);
        if (error) throw error;
        setSent("reset");
      } else if (mode === "masuk") {
        const { error } = await sb.auth.signInWithPassword({
          email: toLoginEmail(login),
          password,
        });
        if (error) throw error;
      } else {
        const { data, error } = await sb.auth.signUp({
          email: toLoginEmail(login),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/masuk`,
            data: {
              peran,
              ...(peran === "siswa" ? { tanggal_lahir: lahir } : {}),
            },
          },
        });
        if (error) throw error;
        // Tanpa sesi = Supabase masih mewajibkan konfirmasi email.
        if (!data.session) setSent(isUsername(login) ? "username" : "email");
      }
    } catch (e) {
      setErr(friendlyError(e));
    } finally {
      setBusy(false);
    }
  };

  const gantiMode = (m: "masuk" | "daftar" | "lupa") => {
    setMode(m);
    setErr("");
  };

  return (
    <div className="fixed inset-0 z-30 flex flex-col overflow-y-auto bg-[#0b2545] md:items-center md:justify-center md:p-8">
      {/* Kampus 3D hidup jadi latar penuh; di HP gedungnya utuh di ruang atas, di tablet di seluruh layar. */}
      <LatarKampus ruang={ruangKampus} />
      <div ref={ruangKampusHp} className="relative min-h-[34svh] w-full flex-1 md:hidden">
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{ top: "calc(env(safe-area-inset-top) + 14px)" }}
        >
          <span className="rounded-full bg-white/95 px-4 py-2 text-[13px] font-extrabold tracking-wide text-[#0b2545] shadow-[0_4px_14px_rgba(11,37,69,.25)]">
            Kampus RINOYA
          </span>
        </div>
      </div>
      <div ref={ruangKampusTablet} aria-hidden className="pointer-events-none fixed inset-0 hidden md:block" />

      {/* Lembar isi: menempel ke bawah di HP, kartu melayang di tablet. */}
      <div
        className="anim-sheet relative -mt-7 flex shrink-0 rounded-t-[32px] flex-col bg-white px-6 pt-3 md:mt-0 md:w-full md:max-w-[440px] md:flex-none md:rounded-[36px] md:px-8 md:pt-6 md:pb-7 md:shadow-[0_10px_0_rgba(11,37,69,.12),0_40px_80px_rgba(11,37,69,.35)]"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom) + 20px)",
        }}
      >
        <span
          aria-hidden
          className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-[#e3e8f0] md:hidden"
        />
        <div className="flex flex-col items-center gap-1">
          <Image
            src="/brand/rinoya-logo-r.png"
            alt="RINOYA Academy"
            width={1137}
            height={800}
            priority
            className="h-auto w-[118px] md:w-[150px]"
          />
        </div>

        {sent ? (
          <div className="mt-5 flex flex-1 flex-col items-center gap-4 text-center">
            <span className="flex size-20 items-center justify-center rounded-full bg-[#e0f7f3]">
              <Icon
                name={sent === "username" ? "info" : "mark_email_read"}
                size={44}
                style={{ color: "#0e9e8e" }}
              />
            </span>
            <h1 style={L.title}>
              {sent === "username" ? "Satu langkah lagi" : "Cek email kamu"}
            </h1>
            <p style={{ color: L.muted, fontWeight: 600, lineHeight: 1.5 }}>
              {sent === "reset" ? (
                <>
                  Kalau <b style={{ color: L.ink }}>{email}</b> terdaftar, kami
                  sudah kirim tautan untuk membuat kata sandi baru dari
                  kampus@pulaurinoya.com. Tautannya berlaku 1 jam. Cek juga
                  folder Spam atau Promosi.
                </>
              ) : sent === "email" ? (
                <>
                  Kami kirim tautan konfirmasi ke{" "}
                  <b style={{ color: L.ink }}>{email}</b>. Buka tautannya, lalu
                  kamu akan kembali ke sini untuk membuat rumah.
                </>
              ) : (
                <>
                  Akun <b style={{ color: L.ink }}>{email}</b> dibuat, tapi
                  server masih mewajibkan konfirmasi email. Untuk masuk pakai
                  nama pengguna, matikan &ldquo;Confirm email&rdquo; di Supabase
                  (Authentication → Sign In / Providers → Email), lalu masuk
                  lagi.
                </>
              )}
            </p>
            <button
              onClick={() => {
                setSent("");
                if (mode === "lupa") setMode("masuk");
              }}
              className="mt-auto w-full transition-transform active:translate-y-[3px]"
              style={L.primary}
            >
              Kembali
            </button>
          </div>
        ) : (
          <>
            {mode === "lupa" ? (
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => gantiMode("masuk")}
                  aria-label="Kembali ke Masuk"
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#eef3fa] active:scale-95"
                >
                  <Icon name="arrow_back" size={24} style={{ color: PI }} />
                </button>
                <h1 style={{ ...L.title, fontSize: 26 }}>Lupa kata sandi</h1>
              </div>
            ) : (
              <div
                className="mt-4 grid grid-cols-2 rounded-[18px] bg-[#eef3fa] p-1.5"
                role="tablist"
                aria-label="Masuk atau daftar"
              >
                {(["masuk", "daftar"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => gantiMode(m)}
                    className="h-11 rounded-[14px] text-[15px] font-extrabold transition-colors"
                    style={
                      mode === m
                        ? {
                            background: "#fff",
                            color: PI,
                            boxShadow:
                              "0 2px 0 rgba(11,37,69,.08), 0 4px 12px rgba(11,37,69,.1)",
                          }
                        : { color: "#5b6b85" }
                    }
                  >
                    {m === "masuk" ? "Masuk" : "Daftar gratis"}
                  </button>
                ))}
              </div>
            )}

            <p
              className="mt-3 text-center"
              style={{ color: L.muted, fontWeight: 600, fontSize: 14 }}
            >
              {mode === "masuk"
                ? "Selamat datang lagi! Satu akun untuk seluruh keluarga."
                : mode === "lupa"
                  ? "Tulis email akun rumahmu. Kami kirim tautan untuk membuat kata sandi baru."
                  : "Pakai email aktif. Kami kirim tautan konfirmasi ke sana."}
            </p>

            <form onSubmit={submit} className="mt-4 flex flex-1 flex-col gap-3">
              {mode === "daftar" && (
                <div className="flex flex-col gap-1.5 text-left">
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: L.muted }}
                  >
                    Saya mendaftar sebagai
                  </span>
                  <div
                    className="grid grid-cols-2 gap-2"
                    role="radiogroup"
                    aria-label="Saya mendaftar sebagai"
                  >
                    {(
                      [
                        ["orang_tua", "Orang tua", "family_restroom"],
                        ["siswa", "Siswa", "school"],
                      ] as const
                    ).map(([v, label, ikon]) => (
                      <button
                        key={v}
                        type="button"
                        role="radio"
                        aria-checked={peran === v}
                        onClick={() => setPeran(v)}
                        className="flex h-[52px] items-center justify-center gap-1.5 rounded-[16px] border-2 text-[14px] font-extrabold"
                        style={{
                          borderColor: peran === v ? "#0567c2" : "#e3e8f0",
                          background: peran === v ? "#e3f1fd" : "#f6f8fb",
                          color: L.ink,
                        }}
                      >
                        <Icon name={ikon} size={20} /> {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <KotakIsian
                ikon={mode === "masuk" ? "person" : "mail"}
                label={mode === "masuk" ? "Email atau nama pengguna" : "Email"}
              >
                <input
                  type={mode === "masuk" ? "text" : "email"}
                  required
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  autoComplete={mode === "masuk" ? "username" : "email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={ISIAN}
                  placeholder={
                    mode === "masuk"
                      ? "Email atau nama pengguna"
                      : "nama@email.com"
                  }
                  aria-label={
                    mode === "masuk" ? "Email atau nama pengguna" : "Email"
                  }
                />
              </KotakIsian>
              {mode === "daftar" && peran === "siswa" && (
                <>
                  <span
                    className="-mb-1.5 text-left"
                    style={{ fontSize: 13, fontWeight: 700, color: L.muted }}
                  >
                    Tanggal lahir siswa
                  </span>
                  <KotakIsian ikon="cake" label="Tanggal lahir siswa">
                    <input
                      type="date"
                      required
                      min="2000-01-01"
                      max={new Date().toISOString().slice(0, 10)}
                      value={lahir}
                      onChange={(e) => setLahir(e.target.value)}
                      className={ISIAN}
                      aria-label="Tanggal lahir siswa"
                    />
                  </KotakIsian>
                </>
              )}
              {mode !== "lupa" && (
                <KotakIsian ikon="lock" label="Kata sandi">
                  <input
                    type={lihatSandi ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete={
                      mode === "masuk" ? "current-password" : "new-password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={ISIAN}
                    placeholder="Kata sandi (min. 6 karakter)"
                    aria-label="Kata sandi"
                  />
                  <button
                    type="button"
                    onClick={() => setLihatSandi((v) => !v)}
                    aria-label={
                      lihatSandi
                        ? "Sembunyikan kata sandi"
                        : "Tampilkan kata sandi"
                    }
                    className="-mr-2 flex size-11 shrink-0 items-center justify-center rounded-full active:bg-[#e3e8f0]"
                  >
                    <Icon
                      name={lihatSandi ? "visibility_off" : "visibility"}
                      size={22}
                      style={{ color: "#5b6b85" }}
                    />
                  </button>
                </KotakIsian>
              )}
              {mode === "masuk" && (
                <button
                  type="button"
                  onClick={() => gantiMode("lupa")}
                  className="-mt-0.5 self-end py-1 text-[14px] font-extrabold"
                  style={{ color: "#0567c2" }}
                >
                  Lupa kata sandi?
                </button>
              )}
              <ErrorLine msg={err} />
              <div className="mt-auto flex flex-col gap-3 pt-3">
                <button
                  type="submit"
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 transition-transform active:translate-y-[3px] disabled:opacity-60"
                  style={{ ...L.primary, height: 56 }}
                >
                  {busy
                    ? "Sebentar…"
                    : mode === "masuk"
                      ? "Masuk"
                      : mode === "lupa"
                        ? "Kirim tautan"
                        : "Daftar gratis"}
                  {!busy && <Icon name="arrow_forward" size={22} />}
                </button>
                <a
                  href="/privasi"
                  className="flex items-center gap-1 self-center py-1 text-[13px] font-bold"
                  style={{ color: L.muted }}
                >
                  <Icon name="verified_user" size={16} /> Kebijakan Privasi
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const ISIAN =
  "min-w-0 flex-1 bg-transparent text-[16px] font-bold text-[#0b2545] outline-none placeholder:font-semibold placeholder:text-[#8a97ab]";

/** Kolom isian ala aplikasi: ikon di kiri, latar abu lembut, garis biru saat aktif. */
function KotakIsian({
  ikon,
  label,
  children,
}: {
  ikon: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <label
      className="flex h-[56px] items-center gap-3 rounded-[16px] border-2 border-transparent bg-[#f2f5f9] px-4 transition-colors focus-within:border-[#0567c2] focus-within:bg-white"
      title={label}
    >
      <Icon name={ikon} size={22} style={{ color: "#5b6b85" }} />
      {children}
    </label>
  );
}

/* ---------------- Buat rumah ---------------- */

export function SetupStage({
  theme,
  email,
}: {
  theme: Theme;
  email: string | null;
}) {
  const L = useLook(theme);
  // Orang tua membuat rumah keluarga; siswa (mis. 12 tahun) boleh mendaftar sendiri dan langsung belajar.
  const [siswa, setSiswa] = useState(false);
  // Peran & tanggal lahir dari form daftar. Akun tanpa data ini dibuat sebagai rumah orang tua:
  // siswa hanya lewat form daftar, yang memeriksa tanggal lahir (13 tahun ke atas).
  const [daftar, setDaftar] = useState<ReturnType<typeof dataDaftar>>({
    peran: null,
    lahir: null,
  });
  useEffect(() => {
    supabase()
      .auth.getUser()
      .then(({ data }) => {
        const d = dataDaftar(data.user?.user_metadata);
        setDaftar(d);
        if (d.peran) setSiswa(d.peran === "siswa");
      })
      .catch(() => {});
  }, []);
  const [family, setFamily] = useState("");
  const [name, setName] = useState("");
  const [c, setC] = useState<ColorKey>("indigo");
  const [pin, setPinVal] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ok = (siswa || family.trim()) && name.trim() && /^\d{4}$/.test(pin);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ok) return;
    setErr("");
    setBusy(true);
    try {
      const status = await createFamily(
        siswa ? name.trim() : family.trim(),
        name.trim(),
        c,
        pin,
      );
      if (siswa && status === "ready") {
        const saya = useRumila.getState().members.find((m) => m.admin);
        if (saya) {
          setPeranAkademi(saya.id, "anak");
          useRumila.getState().updateMember(saya.id, { peran: "anak" });
          const umur = daftar.lahir ? umurDari(daftar.lahir) : null;
          if (umur !== null) setUsiaAnak(saya.id, umur);
        }
      }
    } catch (e) {
      setErr(friendlyError(e));
      setBusy(false);
    }
  };

  return (
    <div
      className="anim-fade relative flex w-full max-w-[460px] flex-col gap-5 bg-white px-7 pt-8 pb-7"
      style={L.card}
    >
      <div className="text-center">
        <h1 style={L.title}>
          {siswa ? "Daftar sebagai siswa" : "Buat rumah keluargamu"}
        </h1>
        <p
          className="mt-1.5"
          style={{ color: L.muted, fontWeight: 600, fontSize: 14 }}
        >
          {siswa
            ? "Langsung belajar. Orang tua bisa ikut bergabung kapan saja lewat Ruang Orang Tua."
            : "Setelah ini, daftarkan anak di Ruang Orang Tua. Anak masuk cukup dengan PIN."}
        </p>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-3.5">
        {!siswa && (
          <Field label="Nama rumah" muted={L.muted}>
            <div
              className="flex items-center gap-2"
              style={{ ...L.input, padding: "0 14px" }}
            >
              <span style={{ color: L.muted, fontWeight: 700 }}>Rumah</span>
              <input
                required
                maxLength={40}
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                placeholder="Pratama"
                className="min-w-0 flex-1 bg-transparent outline-none"
                aria-label="Nama rumah"
              />
            </div>
          </Field>
        )}
        <Field label="Nama panggilanmu" muted={L.muted}>
          <input
            required
            maxLength={24}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={L.input}
            placeholder={siswa ? "Misal: Raka" : "Misal: Ayah, Bunda, Mama"}
          />
        </Field>
        <div className="flex flex-col gap-2">
          <span style={{ fontSize: 13, fontWeight: 700, color: L.muted }}>
            Warna profil
          </span>
          <div
            className="flex gap-2.5"
            role="radiogroup"
            aria-label="Warna profil"
          >
            {MEMBER_COLORS.map((k) => {
              const main = L.play ? PLAY[k][1] : CAT[k][1];
              return (
                <button
                  type="button"
                  key={k}
                  role="radio"
                  aria-checked={c === k}
                  aria-label={`Warna ${k}`}
                  onClick={() => setC(k)}
                  className="size-11 rounded-full"
                  style={{
                    background: main,
                    boxShadow:
                      c === k ? `0 0 0 3px #fff, 0 0 0 5px ${main}` : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
        <Field
          label={siswa ? "PIN masuk (4 angka)" : "PIN orang tua (4 angka)"}
          muted={L.muted}
        >
          <input
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={pin}
            onChange={(e) =>
              setPinVal(e.target.value.replace(/\D/g, "").slice(0, 4))
            }
            style={{ ...L.input, letterSpacing: pin ? ".5em" : undefined }}
            placeholder={
              siswa
                ? "Dipakai setiap kali masuk"
                : "Kunci profilmu dari anak-anak"
            }
          />
        </Field>
        <ErrorLine msg={err} />
        <button
          type="submit"
          disabled={!ok || busy}
          className="mt-1 transition-transform active:translate-y-[3px] disabled:opacity-50"
          style={L.primary}
        >
          {busy ? "Menyiapkan…" : siswa ? "Mulai belajar" : "Masukkan ke rumah"}
        </button>
      </form>
      <p
        className="text-center"
        style={{ fontSize: 13, fontWeight: 600, color: L.muted }}
      >
        Masuk sebagai {displayLogin(email) ?? "akun ini"} ·{" "}
        <button
          onClick={() => signOutAccount()}
          className="font-bold underline underline-offset-2"
          style={{ color: L.ink }}
        >
          ganti akun
        </button>
      </p>
    </div>
  );
}
