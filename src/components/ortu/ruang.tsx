"use client";

// Ruang Orang Tua: dibuka dengan PIN admin rumah. Dua kelompok supaya tidak bercampur:
//   Belajar anak  = pilih anak → Ringkasan · Rapor · Ujian & Tes · Sertifikat · Profil Berpikir
//   Kelola rumah  = Anggota & PIN · Langganan · Sedang disiapkan (berlaku untuk semua anak)
// Satu bagian tampil pada satu waktu. iPad miring: menu di kolom kiri; berdiri: menu di atas.
// Terkunci lagi otomatis setelah 15 menit atau lewat tombol Kunci.

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { levelMeta } from "@akademi/schema";
import { BALOO, MemberAvatar, NUNITO } from "@/components/launcher";
import { Icon } from "@/components/ui";
import { LemariPiagam, usePenghargaan } from "@/components/akademi/lemari";
import { hitungStreak, tanggalJam, TRACK_SLICE } from "@/components/akademi/portal/bersama";
import { RaporAnak } from "@/components/akademi/portal/rapor";
import { ProfilBerpikirOrtu } from "@/components/ortu/profil-berpikir";
import { hapusFoto, unggahFoto, useFotoAnak } from "@/lib/akademi/foto";
import { useEvents } from "@/lib/akademi/jejak";
import { KOMPETENSI, PAKET, anakRumah, levelAnak, setTanggalLahirAnak, umurDari, useProfilAkademiVersi, useTanggalLahirAnak } from "@/lib/akademi/konten";
import { BUKU_PRINT_CSS, BukuSertifikat } from "@/components/akademi/buku-sertifikat";
import { LAMBANG } from "@/components/akademi/portal/tangga";
import { nomorInduk, tahunMasuk } from "@/lib/akademi/kartu-pelajar";
import { snapshotSertifikat } from "@/lib/akademi/sertifikat-inti";
import { penilaianKampus, snapshotPraktik } from "@/lib/akademi/praktik-kampus";
import { proyeksi } from "@/lib/akademi/mastery";
import { kompetensiSelesai, petaJenjang, progresMisi } from "@/lib/akademi/peta";
import { sinkronSiswa } from "@/lib/akademi/siswa";
import { NAMA_UJIAN, predikat, type HasilUjian } from "@/lib/akademi/ujian";
import { adminBerPin, bukaDenganPin, bukaRuang, ruangTerbuka, sisaKunci, tutupRuang } from "@/lib/ortu";
import { isOrangTua, profilTerbuka } from "@/lib/profil";
import { BuatPin, LupaPin } from "@/components/pin-pad";
import { AnggotaRumah } from "@/components/ortu/anggota";
import { LanggananKeluarga } from "@/components/ortu/langganan";
import { useModeApp } from "@/lib/mode-app";
import { daftarDisiapkan } from "@/lib/kampus";
import { useMe, useRumila, type Member } from "@/lib/store";

const INK = "#0b2545";
const KARTU = "rounded-[22px] bg-white shadow-[0_4px_0_rgba(11,37,69,.06)]";
const KELOMPOK = [
  {
    id: "anak",
    label: "Belajar anak",
    ikon: "school",
    menu: [
      { id: "ringkasan", label: "Ringkasan", ikon: "dashboard", jelas: "Kemajuan dan langkah berikutnya" },
      { id: "rapor", label: "Rapor", ikon: "assignment", jelas: "Penguasaan tiap pelajaran" },
      { id: "ujian", label: "Ujian & Tes", ikon: "quiz", jelas: "Riwayat nilai dan kelulusan" },
      { id: "sertifikat", label: "Sertifikat", ikon: "workspace_premium", jelas: "Identitas siswa dan piagam" },
      { id: "berpikir", label: "Profil Berpikir", ikon: "psychology", jelas: "Kekuatan dan arah latihan" },
    ],
  },
  {
    id: "rumah",
    label: "Kelola rumah",
    ikon: "home",
    menu: [
      { id: "anggota", label: "Anggota & PIN", ikon: "manage_accounts", jelas: "Profil, PIN, dan tablet anak" },
      { id: "langganan", label: "Langganan", ikon: "card_membership", jelas: "Paket dan pembayaran keluarga" },
      { id: "keluarga", label: "Sedang disiapkan", ikon: "family_restroom", jelas: "Alat keluarga dan kegiatan yang belum siap" },
    ],
  },
] as const;
type Kelompok = (typeof KELOMPOK)[number];
type Menu = Kelompok["menu"][number];
type Tab = Menu["id"];
const kelompokTab = (tab: Tab): Kelompok => KELOMPOK.find((k) => k.menu.some((x) => x.id === tab)) ?? KELOMPOK[0];

export function RuangOrangTua() {
  const members = useRumila((s) => s.members);
  const [buka, setBuka] = useState(false);
  const me = useMe();
  // Orang tua yang baru masuk ke profilnya dengan PIN tidak perlu mengetik PIN lagi.
  useEffect(() => {
    if (!ruangTerbuka() && isOrangTua(me) && !!me.pin && profilTerbuka(me.id)) bukaRuang();
    setBuka(ruangTerbuka());
  }, [me]);
  // kunci otomatis saat waktu habis
  useEffect(() => {
    if (!buka) return;
    const t = setInterval(() => !ruangTerbuka() && setBuka(false), 30_000);
    return () => clearInterval(t);
  }, [buka]);
  return (
    <div className="rapor-root min-h-dvh latar-biru" style={{ fontFamily: NUNITO, color: INK }}>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-4 py-4 sm:px-6" style={{ paddingTop: "max(16px, env(safe-area-inset-top))", paddingBottom: "max(32px, env(safe-area-inset-bottom))" }}>
        {buka ? <Isi members={members} onKunci={() => (tutupRuang(), setBuka(false))} /> : <PinPad members={members} onBuka={() => setBuka(true)} />}
      </div>
    </div>
  );
}

/* ---------------- PIN ---------------- */

function PinPad({ members, onBuka }: { members: Member[]; onBuka: () => void }) {
  const [pin, setPin] = useState("");
  const [pesan, setPesan] = useState<string | null>(null);
  const [sibuk, setSibuk] = useState(false);
  const [lupa, setLupa] = useState(false);
  const adaPin = adminBerPin(members).length > 0;
  const pemilik = adminBerPin(members)[0] ?? members.find((m) => m.admin);

  useEffect(() => {
    if (pin.length !== 4) return;
    setSibuk(true);
    void bukaDenganPin(members, pin).then((r) => {
      setSibuk(false);
      setPin("");
      if (r.ok) return onBuka();
      setPesan(r.alasan === "salah" ? `PIN salah. Sisa ${r.sisa} kali percobaan.` : r.alasan === "terkunci" ? `Terlalu banyak percobaan. Coba lagi ${Math.ceil((r.sisa ?? sisaKunci()) / 60000)} menit lagi.` : r.alasan === "tanpa_pin" ? "Belum ada PIN orang tua." : "PIN belum bisa diperiksa. Periksa koneksi.");
    });
  }, [pin, members, onBuka]);

  const tekan = (d: string) => !sibuk && setPin((p) => (p.length < 4 ? p + d : p));
  if (pemilik && (lupa || !adaPin))
    return (
      <div className="mx-auto mt-6 flex w-full max-w-[380px] flex-col items-center gap-4">
        <Link href="/beranda" className="inline-flex min-h-11 min-w-11 items-center self-start px-1 text-[14px] font-extrabold text-ink-3">
          ← Kembali
        </Link>
        {lupa ? (
          <LupaPin m={pemilik} onSelesai={() => (bukaRuang(), onBuka())} onBatal={() => setLupa(false)} />
        ) : (
          <BuatPin m={pemilik} jenis="angka" judul={`Buat PIN orang tua untuk ${pemilik.name}`} onSelesai={() => (bukaRuang(), onBuka())} />
        )}
      </div>
    );
  return (
    <div className="mx-auto mt-6 flex w-full max-w-[360px] flex-col items-center gap-5 text-center">
      <Link href="/beranda" className="inline-flex min-h-11 min-w-11 items-center self-start px-1 text-[14px] font-extrabold text-ink-3">
        ← Kembali
      </Link>
      <span className="flex size-16 items-center justify-center rounded-[20px] bg-white text-[#0567c2] shadow-[0_4px_0_rgba(11,37,69,.08)]">
        <Icon name="lock" size={34} />
      </span>
      <div>
        <h1 style={{ fontFamily: BALOO, fontSize: 26, fontWeight: 800, lineHeight: 1.05 }}>Ruang Orang Tua</h1>
        <p className="mt-1 text-[14px] font-bold text-ink-3">{adaPin ? "Masukkan PIN Ayah/Ibu" : "PIN orang tua belum dibuat"}</p>
      </div>
      {adaPin ? (
        <>
          <div className="flex gap-3" aria-label={`${pin.length} dari 4 angka`}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="size-4 rounded-full" style={{ background: i < pin.length ? INK : "#e6dccd" }} />
            ))}
          </div>
          <p className="min-h-5 text-[13px] font-bold text-[#c2410c]" aria-live="polite">
            {pesan}
          </p>
          <div className="grid w-full grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((d, i) =>
              d === "" ? (
                <span key={i} />
              ) : (
                <button
                  key={i}
                  onClick={() => (d === "⌫" ? setPin((p) => p.slice(0, -1)) : tekan(d))}
                  aria-label={d === "⌫" ? "Hapus" : d}
                  className="h-16 rounded-[20px] bg-white text-[26px] font-extrabold shadow-[0_4px_0_rgba(11,37,69,.08)] active:translate-y-0.5"
                  style={{ fontFamily: BALOO }}
                >
                  {d}
                </button>
              ),
            )}
          </div>
          <button onClick={() => setLupa(true)} className="min-h-11 px-3 text-[14px] font-extrabold text-[#083e73]">
            Lupa PIN?
          </button>
        </>
      ) : (
        <p className={`${KARTU} p-4 text-[14px] font-bold text-ink-3`}>Buka Pengaturan → pilih profil Ayah/Ibu (admin) → pasang PIN 4 angka. Setelah itu Ruang Orang Tua bisa dibuka dengan PIN tersebut.</p>
      )}
    </div>
  );
}

/* ---------------- isi ---------------- */

function Isi({ members, onKunci }: { members: Member[]; onKunci: () => void }) {
  const versi = useProfilAkademiVersi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const anak = useMemo(() => anakRumah(members), [members, versi]);
  const [anakId, setAnakId] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("ringkasan");
  // /beranda/keluarga & /beranda/kesehatan lama dialihkan ke ?tab=keluarga
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    const cocok = KELOMPOK.flatMap<Menu>((k) => [...k.menu]).find((x) => x.id === t);
    if (cocok) setTab(cocok.id);
  }, []);
  const terpilih = anak.find((m) => m.id === anakId) ?? anak[0];
  const app = useModeApp();
  const kelompok = kelompokTab(tab);
  const namaMenu = (x: Menu) => (app && x.id === "langganan" ? "Akun" : x.label);
  const menu = ([] as Menu[]).concat(...kelompok.menu);
  const aktif = menu.find((x) => x.id === tab)!;

  return (
    <>
      <header className="no-print flex flex-wrap items-center gap-3">
        <Link href="/beranda" aria-label="Kembali" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white">
          <Icon name="arrow_back" size={22} />
        </Link>
        <h1 className="min-w-0 flex-1" style={{ fontFamily: BALOO, fontSize: 26, fontWeight: 800, lineHeight: 1.2 }}>
          Ruang Orang Tua
        </h1>
        <button onClick={onKunci} className="inline-flex h-11 items-center gap-1.5 rounded-full bg-white px-4 text-[14px] font-extrabold">
          <Icon name="lock" size={18} /> Kunci
        </button>
      </header>
      {!terpilih ? (
        <>
          <p className={`${KARTU} p-5 text-[14px] font-bold text-ink-3`}>Belum ada profil anak. Daftarkan anak di bawah ini, lalu anak bisa masuk dengan PIN-nya sendiri.</p>
          <AnggotaRumah />
          <LanggananKeluarga />
        </>
      ) : (
        <div className="grid items-start gap-5 min-[900px]:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="no-print flex min-w-0 flex-col overflow-hidden rounded-[26px] bg-white min-[900px]:sticky min-[900px]:top-4">
            {/* 1. urusan siapa */}
            <div className="grid grid-cols-2 bg-[#135385]">
              {KELOMPOK.map((k) => {
                const on = k.id === kelompok.id;
                return (
                  <button
                    key={k.id}
                    aria-pressed={on}
                    onClick={() => !on && setTab(k.menu[0].id)}
                    className="flex min-h-[60px] items-center justify-center gap-2 px-2 text-center text-[15px] leading-tight font-black min-[900px]:flex-col min-[900px]:gap-0.5 min-[900px]:py-2 min-[900px]:text-[14px]"
                    style={{ background: on ? "#fdb724" : "transparent", color: on ? INK : "#fff" }}
                  >
                    <Icon name={k.ikon} size={22} /> {k.label}
                  </button>
                );
              })}
            </div>

            {/* 2. anak yang mana (hanya untuk urusan belajar) */}
            {kelompok.id === "anak" && (
              <div className="flex flex-col gap-2 border-b-2 border-[#d6ecff] p-3">
                <p className="text-[12px] font-extrabold text-ink-3 uppercase">Pilih anak</p>
                <div className="grid grid-cols-2 gap-2 min-[640px]:grid-cols-4 min-[900px]:grid-cols-2" role="tablist" aria-label="Pilih anak">
                  {anak.map((m) => {
                    const on = m.id === terpilih.id;
                    return (
                      <button
                        key={m.id}
                        role="tab"
                        aria-selected={on}
                        onClick={() => setAnakId(m.id)}
                        className="flex min-h-12 min-w-0 items-center gap-2 rounded-[16px] py-1.5 pr-2 pl-1.5 text-left text-[14px] leading-tight font-extrabold"
                        style={{ background: on ? INK : "#d6ecff", color: on ? "#fff" : INK }}
                      >
                        <MemberAvatar m={m} size={32} theme="playful" />
                        <span className="min-w-0 break-words">{m.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. bagian yang dibuka */}
            <nav
              className={`grid gap-2 p-3 min-[900px]:grid-cols-1 ${kelompok.id === "anak" ? "grid-cols-2 min-[460px]:grid-cols-3 min-[640px]:grid-cols-5" : "grid-cols-3"}`}
              aria-label={kelompok.label}
            >
              {menu.map((x) => {
                const on = x.id === tab;
                return (
                  <button
                    key={x.id}
                    aria-current={on ? "page" : undefined}
                    onClick={() => setTab(x.id)}
                    className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-[16px] px-1 py-1.5 text-center text-[13px] leading-tight font-extrabold min-[900px]:min-h-[52px] min-[900px]:flex-row min-[900px]:justify-start min-[900px]:gap-3 min-[900px]:px-3 min-[900px]:text-left min-[900px]:text-[15px]"
                    style={{ background: on ? "#0567c2" : "transparent", color: on ? "#fff" : INK }}
                  >
                    <Icon name={app && x.id === "langganan" ? "manage_accounts" : x.ikon} size={24} />
                    {namaMenu(x)}
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="flex min-w-0 flex-col gap-4">
            <div className="no-print flex items-center gap-3 px-1">
              {kelompok.id === "anak" && <MemberAvatar m={terpilih} size={48} theme="playful" />}
              <div className="min-w-0">
                <h2 className="break-words" style={{ fontFamily: BALOO, fontSize: 24, fontWeight: 800, lineHeight: 1.2 }}>
                  {namaMenu(aktif)}
                  {kelompok.id === "anak" ? ` ${terpilih.name}` : ""}
                </h2>
                <p className="text-[14px] font-bold text-ink-3">{app && aktif.id === "langganan" ? "Akun keluarga" : aktif.jelas}</p>
              </div>
            </div>
            <Bagian key={`${terpilih.id}-${tab}`} anak={terpilih} tab={tab} />
          </main>
        </div>
      )}
    </>
  );
}

function Bagian({ anak, tab }: { anak: Member; tab: Tab }) {
  const [lihat, setLihat] = useState<string | null>(null);
  useEffect(() => void sinkronSiswa(anak.id), [anak.id]);
  if (tab === "rapor") return <RaporAnak anak={anak} />;
  if (tab === "sertifikat")
    return (
      <div className="flex flex-col gap-4">
        {!lihat && <KartuIdentitas anak={anak} />}
        {!lihat && <ContohSertifikat anak={anak} onLihat={() => setLihat("contoh")} />}
        {lihat === "contoh" ? <BukuContoh anak={anak} onTutup={() => setLihat(null)} /> : <LemariPiagam anak={anak} lihat={lihat} onLihat={setLihat} tertanam />}
      </div>
    );
  if (tab === "ujian") return <DaftarUjian anak={anak} />;
  if (tab === "berpikir") return <ProfilBerpikirOrtu anak={anak} />;
  if (tab === "keluarga") return <SedangDisiapkan />;
  if (tab === "anggota") return <AnggotaRumah />;
  if (tab === "langganan") return <LanggananKeluarga />;
  return <Ringkasan anak={anak} />;
}

/* ---------------- keluarga, kesehatan & yang sedang disiapkan ---------------- */

/** Alat keluarga/kesehatan dan kartu kampus yang belum berisi: tidak tampil di layar anak, dicatat di sini. */
function SedangDisiapkan() {
  const daftar = daftarDisiapkan();
  return (
    <div className="flex flex-col gap-3">
      <p className={`${KARTU} p-4 text-[14px] font-bold text-ink-2`}>
        Yang ada di sini belum bisa dipakai dan tidak tampil di layar anak. Begitu siap, otomatis muncul di gedung kampusnya. Ketuk untuk melihat isinya.
      </p>
      {daftar.map(({ tempat, alat }) => (
        <details key={tempat} className={`${KARTU} group overflow-hidden`}>
          <summary className="flex min-h-[60px] cursor-pointer list-none items-center gap-2 px-4 [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1" style={{ fontFamily: BALOO, fontSize: 18, fontWeight: 800 }}>{tempat}</span>
            <span className="rounded-full bg-[#ffdc7a] px-2.5 py-0.5 text-[12px] font-extrabold text-[#6b4700]">{alat.length} disiapkan</span>
            <Icon name="expand_more" size={24} className="transition-transform group-open:rotate-180" />
          </summary>
          <ul className="grid gap-x-5 px-4 pb-3 sm:grid-cols-2">
            {alat.map((t) => (
              <li key={t.id} className="flex items-start gap-2.5 border-t border-[#d6ecff] py-3">
                <Icon name={t.icon} size={22} />
                <span className="min-w-0">
                  <span className="block text-[14px] font-extrabold">{t.name}</span>
                  <span className="block text-[13px] font-bold text-ink-3">{t.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

/* ---------------- identitas siswa & contoh sertifikat ---------------- */

/** Data diri anak untuk buku sertifikat: foto, nama, tanggal lahir & umur, NIS, jenjang & lencana pangkat. */
function KartuIdentitas({ anak }: { anak: Member }) {
  const foto = useFotoAnak(anak.id);
  const lahir = useTanggalLahirAnak(anak.id);
  const { hasil, jenjang, modul, semester } = usePenghargaan(anak.id);
  const level = levelAnak(anak.id);
  const lv = levelMeta(level);
  const { ikon, warna } = LAMBANG[level];
  const umur = lahir ? umurDari(lahir) : null;
  const nis = nomorInduk(anak.id, tahunMasuk(hasil));
  const [sibuk, setSibuk] = useState(false);
  const [pesan, setPesan] = useState<string | null>(null);
  const pilih = async (f: File | undefined) => {
    if (!f) return;
    setSibuk(true);
    setPesan(null);
    try {
      await unggahFoto(anak.id, f);
      setPesan("Foto tersimpan. Tampil di lembar Sertifikat saat dibuka atau dicetak.");
    } catch (e) {
      setPesan(e instanceof Error ? e.message : "Foto belum tersimpan.");
    } finally {
      setSibuk(false);
    }
  };
  const hariIni = new Date().toISOString().slice(0, 10);
  return (
    <section className={`${KARTU} overflow-hidden`}>
      <div className="flex items-center gap-2 bg-[#135385] px-4 py-2.5 text-white">
        <Icon name="badge" size={20} />
        <span style={{ fontFamily: BALOO, fontSize: 16, fontWeight: 800 }}>Kartu Identitas Siswa</span>
        <span className="ml-auto text-[12px] font-extrabold">Dipakai di buku sertifikat</span>
      </div>
      <div className="flex flex-wrap items-start gap-4 p-4">
        <div className="flex flex-col items-center gap-2">
          <span className="flex h-28 w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#efe6d0] text-[11px] font-extrabold text-ink-3" style={{ boxShadow: "inset 0 0 0 2px #e6dccd" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {foto ? <img src={foto} alt={`Foto ${anak.name}`} className="h-full w-full object-cover" /> : "Pas foto 3 × 4"}
          </span>
          <label htmlFor={`foto-${anak.id}`} className="inline-flex h-11 cursor-pointer items-center gap-1 rounded-full px-3 text-[12px] font-extrabold text-white" style={{ background: "#0567c2", opacity: sibuk ? 0.6 : 1 }}>
            <Icon name="add_a_photo" size={15} /> {sibuk ? "Mengunggah…" : foto ? "Ganti" : "Unggah"}
          </label>
          <input id={`foto-${anak.id}`} type="file" accept="image/*" className="sr-only" disabled={sibuk} onChange={(e) => void pilih(e.target.files?.[0])} />
          {foto && (
            <button onClick={() => void hapusFoto(anak.id)} className="min-h-11 px-2 text-[12px] font-extrabold text-ink-3 underline">
              Hapus foto
            </button>
          )}
        </div>
        <div className="flex min-w-[220px] flex-1 flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="leading-tight" style={{ fontFamily: BALOO, fontSize: 24, fontWeight: 800 }}>{anak.name}</h3>
              <p className="text-[13px] font-bold text-ink-3">NIS {nis}</p>
            </div>
            <span title={`Lencana pangkat ${lv.pangkat}`} className="flex size-[90px] shrink-0 flex-col items-center justify-center rounded-full text-white" style={{ background: `radial-gradient(circle at 35% 30%, ${warna[0]}, ${warna[1]})`, boxShadow: `0 4px 0 ${warna[1]}55, inset 0 0 0 3px #ffffff66` }}>
              <Icon name={ikon} size={28} />
              <span className="font-black uppercase" style={{ fontSize: 11 }}>{lv.pangkat}</span>
            </span>
          </div>
          <dl className="grid grid-cols-2 gap-2 text-[13px]">
            <div className="rounded-[14px] bg-[#ffe49a] p-2.5">
              <dt className="text-[11px] font-extrabold text-ink-3 uppercase">Tanggal lahir</dt>
              <dd>
                <input
                  type="date"
                  aria-label={`Tanggal lahir ${anak.name}`}
                  value={lahir ?? ""}
                  max={hariIni}
                  onChange={(e) => setTanggalLahirAnak(anak.id, e.target.value || null)}
                  className="mt-0.5 min-h-11 w-full bg-transparent text-[14px] font-extrabold outline-none"
                />
              </dd>
            </div>
            <div className="rounded-[14px] bg-[#ffe49a] p-2.5">
              <dt className="text-[11px] font-extrabold text-ink-3 uppercase">Umur</dt>
              <dd className="mt-0.5 text-[14px] font-extrabold">{umur ? `${umur.tahun} tahun${umur.bulan ? ` ${umur.bulan} bulan` : ""}` : "isi tanggal lahir"}</dd>
            </div>
            <div className="rounded-[14px] bg-[#ffe49a] p-2.5">
              <dt className="text-[11px] font-extrabold text-ink-3 uppercase">Jenjang</dt>
              <dd className="mt-0.5 text-[14px] font-extrabold">
                {lv.pangkat}
              </dd>
            </div>
            <div className="rounded-[14px] bg-[#ffe49a] p-2.5">
              <dt className="text-[11px] font-extrabold text-ink-3 uppercase">Penghargaan</dt>
              <dd className="mt-0.5 text-[14px] font-extrabold">
                {jenjang.length} jenjang · {semester.length} semester · {modul.length} modul
              </dd>
            </div>
          </dl>
          <p className="text-[12.5px] font-bold text-ink-3">
            Foto dan tanggal lahir disimpan privat untuk keluarga dan tercetak di buku sertifikat; tidak tampil di halaman verifikasi publik.
          </p>
          {pesan && <p className="text-[13px] font-bold text-[#0567c2]">{pesan}</p>}
        </div>
      </div>
    </section>
  );
}

/** Data buku sertifikat contoh untuk jenjang aktif: kemajuan anak saat ini, bertanda DRAFT. */
function useContoh(anak: Member) {
  const events = useEvents(anak.id);
  const level = levelAnak(anak.id);
  const snapshot = useMemo(() => {
    const dasar = snapshotSertifikat(proyeksi(events, KOMPETENSI), KOMPETENSI, level);
    const praktik = snapshotPraktik(penilaianKampus(events, KOMPETENSI, level));
    return praktik ? { ...dasar, praktik } : dasar;
  }, [events, level]);
  return { level, snapshot, issuedAt: new Date().toISOString() };
}

function ContohSertifikat({ anak, onLihat }: { anak: Member; onLihat: () => void }) {
  const foto = useFotoAnak(anak.id);
  const lahir = useTanggalLahirAnak(anak.id);
  const { jenjang } = usePenghargaan(anak.id);
  const { level, snapshot, issuedAt } = useContoh(anak);
  if (jenjang.some((s) => s.level === level)) return null; // sertifikat jenjang ini sudah terbit: lihat di Lemari Piagam
  const lv = levelMeta(level);
  return (
    <section className={`${KARTU} flex flex-col gap-3 p-4`}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="min-w-0 flex-1">
          <h3 style={{ fontFamily: BALOO, fontSize: 18, fontWeight: 800 }}>Contoh Sertifikat {lv.pangkat}</h3>
          <p className="text-[13px] font-bold text-ink-3">
            Begini sertifikat {anak.name} nanti. Isinya mengikuti kemajuan saat ini ({snapshot.dikuasai} dari {snapshot.total} kompetensi inti dikuasai); sertifikat asli terbit setelah lulus Ujian Akhir.
          </p>
        </div>
        <button onClick={onLihat} className="inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-[13px] font-extrabold text-white" style={{ background: "#0567c2" }}>
          <Icon name="menu_book" size={18} /> Lihat buku contoh
        </button>
      </div>
      <BukuSertifikat nama={anak.name} level={level} kode="CONTOH" issuedAt={issuedAt} snapshot={snapshot} foto={foto} lahir={lahir} draft hanya="sertifikat" />
    </section>
  );
}

function BukuContoh({ anak, onTutup }: { anak: Member; onTutup: () => void }) {
  const foto = useFotoAnak(anak.id);
  const lahir = useTanggalLahirAnak(anak.id);
  const { level, snapshot, issuedAt } = useContoh(anak);
  return (
    <div className="sertifikat-root flex flex-col gap-4">
      <style>{BUKU_PRINT_CSS}</style>
      <div className="no-print flex items-center gap-2">
        <button onClick={onTutup} aria-label="Kembali" className="flex size-11 items-center justify-center rounded-full bg-white">
          <Icon name="arrow_back" size={22} />
        </button>
        <h2 style={{ fontFamily: BALOO, fontSize: 22, fontWeight: 800 }}>Buku Sertifikat · Contoh (DRAFT)</h2>
      </div>
      <BukuSertifikat nama={anak.name} level={level} kode="CONTOH" issuedAt={issuedAt} snapshot={snapshot} foto={foto} lahir={lahir} draft />
    </div>
  );
}

/* ---------------- ringkasan ---------------- */

function Ringkasan({ anak }: { anak: Member }) {
  const events = useEvents(anak.id);
  const { hasil, jenjang, modul, semester } = usePenghargaan(anak.id);
  const level = levelAnak(anak.id);
  const lv = levelMeta(level);
  const peng = useMemo(() => proyeksi(events, KOMPETENSI), [events]);
  const peta = useMemo(() => petaJenjang(peng, kompetensiSelesai(events, PAKET), KOMPETENSI, level, TRACK_SLICE, progresMisi(events, PAKET), hasil), [peng, events, level, hasil]);
  const seminggu = Date.now() - 7 * 86400_000;
  const pekan = events.filter((e) => Date.parse(e.clientAt) >= seminggu);
  const menit = Math.round(pekan.filter((e) => e.type === "activity_end").reduce((n, e) => n + (Number((e.payload as { durationMs?: number }).durationMs) || 0), 0) / 60000);
  const jawab = pekan.filter((e) => e.type === "attempt");
  const benar = jawab.filter((e) => (e.payload as { correct?: boolean }).correct).length;
  const terakhir = [...hasil].sort((a, b) => (a.at < b.at ? 1 : -1))[0];

  const kemajuan = [
    { label: "Misi selesai", n: peta.selesai, dari: peta.total, warna: "#0567c2" },
    { label: "Kompetensi inti dikuasai", n: peta.inti.dikuasai, dari: peta.inti.total, warna: "#12803f" },
  ];
  const rincian: [string, string][] = [
    ["Belajar 7 hari terakhir", `${menit} menit · ${hitungStreak(events)} hari aktif`],
    ["Jawaban 7 hari terakhir", jawab.length ? `${benar}/${jawab.length} benar (${Math.round((benar / jawab.length) * 100)}%)` : "Belum ada"],
    ["Penghargaan", `${jenjang.length} jenjang · ${semester.length} semester · ${modul.length} modul`],
    ...(terakhir ? ([["Ujian terakhir", `${NAMA_UJIAN[terakhir.jenis]} · nilai ${terakhir.nilai} (${terakhir.lulus ? "lulus" : "belum lulus"}) · ${tanggalJam(terakhir.at)}`]] as [string, string][]) : []),
  ];
  return (
    <div className="flex flex-col gap-4">
      {/* yang paling ditanya orang tua: habis ini apa */}
      <section className="rounded-[22px] bg-[#fdb724] p-5">
        <p className="flex items-center gap-1.5 text-[12px] font-black tracking-wide uppercase">
          <Icon name="flag" size={18} /> Langkah berikutnya
        </p>
        <p className="mt-1.5 text-[17px] leading-snug font-extrabold text-pretty">
          {peta.sekarang
            ? `Misi ${peta.sekarang.nomor}: ${peta.sekarang.kompetensi.statement.id}`
            : peta.ujian
              ? `${NAMA_UJIAN[peta.ujian.jenis]} ${peta.ujian.unit ? `· ${peta.ujian.unit.nama.id}` : peta.ujian.semester ? `· Semester ${peta.ujian.semester}` : ""}`
              : peta.lulusJenjang
                ? "Jenjang ini tuntas. Sertifikat Kenaikan Jenjang siap."
                : peta.pemantapan
                  ? `Latihan pemantapan: ${peta.pemantapan.kompetensi.statement.id}`
                  : "Belum ada misi berikutnya."}
        </p>
      </section>

      <section className={`${KARTU} flex flex-col gap-4 p-5`}>
        <h3 style={{ fontFamily: BALOO, fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>
          {lv.pangkat} · Semester {peta.semesterAktif}
        </h3>
        {kemajuan.map((k) => (
          <div key={k.label}>
            <p className="flex items-baseline justify-between gap-3 text-[14px] font-extrabold">
              <span>{k.label}</span>
              <span className="shrink-0 tabular-nums" style={{ fontFamily: BALOO, fontSize: 20 }}>{k.n} dari {k.dari}</span>
            </p>
            <div className="mt-1.5 h-3.5 overflow-hidden rounded-full bg-[#d6ecff]">
              <div className="h-full rounded-full" style={{ width: `${k.dari ? (k.n / k.dari) * 100 : 0}%`, background: k.warna }} />
            </div>
          </div>
        ))}
      </section>

      <dl className={`${KARTU} px-5 py-1`}>
        {rincian.map(([k, v], i) => (
          <div key={k} className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-3 ${i ? "border-t border-[#d6ecff]" : ""}`}>
            <dt className="text-[14px] font-bold text-ink-3">{k}</dt>
            <dd className="text-[15px] font-extrabold">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------------- ujian & tes ---------------- */

function namaRuang(h: HasilUjian) {
  if (h.jenis === "kuis") return KOMPETENSI.find((c) => c.level === h.level && c.unit.id === h.ruang)?.unit.nama.id ?? h.ruang;
  if (h.jenis === "semester") return `Semester ${h.ruang.slice(1)}`;
  return levelMeta(h.level).pangkat;
}

function DaftarUjian({ anak }: { anak: Member }) {
  const { hasil } = usePenghargaan(anak.id);
  const urut = [...hasil].sort((a, b) => (a.at < b.at ? 1 : -1));
  const lulus = hasil.filter((h) => h.lulus);
  const rata = lulus.length ? Math.round(lulus.reduce((n, h) => n + h.nilai, 0) / lulus.length) : 0;
  return (
    <section className={`${KARTU} p-5`}>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 style={{ fontFamily: BALOO, fontSize: 20, fontWeight: 800 }}>Riwayat ujian & tes</h2>
        <p className="text-[13px] font-bold text-ink-3">
          {hasil.length} percobaan · {lulus.length} lulus{lulus.length ? ` · rata-rata nilai lulus ${rata}` : ""}
        </p>
      </div>
      {urut.length === 0 ? (
        <p className="text-[14px] font-bold text-ink-3">Belum ada ujian. Ulangan Modul pertama muncul setelah semua misi satu modul selesai.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[13.5px]">
            <thead>
              <tr className="text-[11px] tracking-wide text-ink-3 uppercase">
                <th className="py-2 pr-3">Tanggal</th>
                <th className="py-2 pr-3">Ujian</th>
                <th className="py-2 pr-3">Jenjang</th>
                <th className="py-2 pr-3 text-right">Benar</th>
                <th className="py-2 pr-3 text-right">Nilai</th>
                <th className="py-2">Hasil</th>
              </tr>
            </thead>
            <tbody>
              {urut.map((h) => (
                <tr key={h.sessionId} className="border-t border-[#f1e6d6]">
                  <td className="py-2 pr-3 whitespace-nowrap">{tanggalJam(h.at)}</td>
                  <td className="py-2 pr-3">
                    <b>{NAMA_UJIAN[h.jenis]}</b> · {namaRuang(h)}
                  </td>
                  <td className="py-2 pr-3">{levelMeta(h.level).pangkat}</td>
                  <td className="py-2 pr-3 text-right tabular-nums">
                    {h.benar}/{h.total}
                  </td>
                  <td className="py-2 pr-3 text-right font-extrabold tabular-nums">{h.nilai}</td>
                  <td className="py-2">
                    <span className="rounded-full px-2.5 py-0.5 text-[12px] font-extrabold" style={{ background: h.lulus ? "#e3f6ec" : "#fff1e0", color: h.lulus ? "#13794a" : "#a34a00" }}>
                      {h.lulus ? predikat(h.nilai, h.jenis) : "Belum lulus"}
                      {h.pending ? " · menunggu sinkron" : ""}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
