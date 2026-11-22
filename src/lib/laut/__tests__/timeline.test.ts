import { statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { TUR_LAUT } from '../misi';
import { SEA_RECORDING, SEA_TRACKS, validTrack } from '../narration';
import { chapterAtTime, diveAtTime, SEA_SHOTS, shotAtTime, subLightAtTime } from '../timeline';

describe('timestamp asli pengguna mengendalikan semua adegan', () => {
  it('paragraf dan bab cocok dengan rekaman aktif tanpa celah waktu', () => {
    for(const [i,s] of TUR_LAUT.entries()) {
      const t=SEA_TRACKS[s.id]; expect(validTrack(t,s.lines.length)).toBe(true);
      expect(chapterAtTime(t.start!)).toBe(i);
      expect(chapterAtTime(t.end!-.001)).toBe(i);
      if(i>0) expect(t.start).toBe(SEA_TRACKS[TUR_LAUT[i-1].id].end);
      expect(t.src).toBe(SEA_RECORDING.src);
    }
    expect(SEA_TRACKS[TUR_LAUT.at(-1)!.id].end).toBeCloseTo(SEA_RECORDING.duration,1);
    expect(statSync(`public${SEA_RECORDING.src}`).size).toBeLessThan(6*1024*1024);
  });
  it('kamera hewan hanya dipilih dalam bab yang tepat', () => {
    expect(Object.keys(SEA_SHOTS)).toHaveLength(TUR_LAUT.length);
    for(const [id,shots] of Object.entries(SEA_SHOTS)) for(const shot of shots) {
      expect(shot.at).toBeGreaterThanOrEqual(SEA_TRACKS[id].start!);
      expect(shot.at).toBeLessThan(SEA_TRACKS[id].end!);
      expect(shot.distance).toBeGreaterThan(0);
    }
    expect(shotAtTime('terumbu-karang',90.6)).toBeNull();
    expect(shotAtTime('terumbu-karang',91)?.target).toBe('ikan-badut');
    expect(shotAtTime('bioluminesensi',314.6)?.target).toBe('ikan-pemancing');
    expect(shotAtTime('bioluminesensi',328.1)?.target).toBe('hewan-sisir');
  });
  it('Agam masuk air tepat saat byur dan lampu mengikuti ucapan', () => {
    expect(diveAtTime(0)).toEqual({walk:0,jump:0,sink:0,standing:true});
    expect(diveAtTime(4.99).standing).toBe(true);
    expect(diveAtTime(5.48)).toMatchObject({jump:1,sink:0,standing:false});
    expect(diveAtTime(12.5).sink).toBe(1);
    expect(subLightAtTime('makin-redup',251.5)).toBe(0);
    expect(subLightAtTime('makin-redup',252)).toBe(.5);
    expect(subLightAtTime('makin-redup',255)).toBe(1);
  });
});
