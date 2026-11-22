-- RINOYA Academy: istilah jenjang = pangkat (owner 22 Nov 2026: layar dan konten tanpa PAUD/TK/SD).
-- Nomor resmi: RA/<tahun>/<PANGKAT>/<6 digit>. Kode level internal tidak berubah.
-- Saat dibuat belum ada sertifikat terbit, jadi tidak ada nomor lama yang diubah.
create or replace function public.akademi_certificate_isi_nomor()
returns trigger
language plpgsql
set search_path to ''
as $$
begin
  if new.nomor is null then
    new.nomor := 'RA/' || to_char(new.issued_at at time zone 'Asia/Jakarta', 'YYYY') || '/'
      || case new.level
           when 'PAUD' then 'TUNAS' when 'TKA' then 'KADET' when 'TKB' then 'NAVIGATOR'
           when 'SD1' then 'PILOT' when 'SD2' then 'KAPTEN' when 'SD3' then 'KOMANDAN'
           when 'SD4' then 'LAKSAMANA' when 'SD5' then 'PENJELAJAH' when 'SD6' then 'LEGENDA'
         end || '/'
      || lpad(nextval('public.akademi_certificate_no')::text, 6, '0');
  end if;
  return new;
end;
$$;

update public.akademi_paket
set deskripsi = 'Semua pangkat dari Tunas sampai Legenda (usia 3–12 tahun), ujian, rapor, dan sertifikat. Tambah anak lewat add-on.'
where id = 'satu-anak';
