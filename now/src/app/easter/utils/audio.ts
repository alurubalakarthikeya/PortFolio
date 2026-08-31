// Web Audio API Synthesis for 8-bit Retro Sound Effects
// This avoids downloading or checking in audio assets, providing instant load and reliability.

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!audioCtx) {
        // Standard AudioContext
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
}

export function setMuted(muted: boolean) {
    isMuted = muted;
    // Try to resume context if unmuting
    if (!muted) {
        getAudioContext();
    }
}

export function getMuted(): boolean {
    return isMuted;
}

// 1. Walking: low-passed blip / crackle
export function playStepSound() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(10, t + 0.08);

    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    // Bandpass filter to make it sound like feet tapping/shuffling
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(120, t);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.09);
}

// 2. Dialogue character scroll blip: very short high tone
export function playDialogueBlip() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Pulse-like wave shape: square or triangle
    osc.type = "sine";
    // Randomize frequency slightly to sound organic (retro style)
    const freq = 400 + Math.random() * 80;
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.015, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
}

// 3. Item Collect: short upward arpeggio
export function playCollectSound() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    gain.connect(ctx.destination);

    // Quick 2-stage arpeggio
    const playTone = (freq: number, delay: number, duration: number) => {
        const osc = ctx.createOscillator();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, t + delay);
        osc.connect(gain);
        osc.start(t + delay);
        osc.stop(t + delay + duration);
    };

    playTone(523.25, 0, 0.06); // C5
    playTone(659.25, 0.06, 0.06); // E5
    playTone(783.99, 0.12, 0.12); // G5
}

// 4. Hit/Defeat Bug: low frequency pitch sweep
export function playHitSound() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(20, t + 0.15);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.2);
}

// 5. Achievement Unlocked: triumph arpeggio
export function playAchievementSound() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    gain.connect(ctx.destination);

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
    notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t + index * 0.06);
        osc.connect(gain);
        osc.start(t + index * 0.06);
        osc.stop(t + index * 0.06 + 0.12);
    });
}

// 6. Quest Complete: nice major chord sequence
export function playQuestCompleteSound() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    gain.connect(ctx.destination);

    // Play final fan-fare
    const playOsc = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t + start);
        osc.connect(gain);
        osc.start(t + start);
        osc.stop(t + start + duration);
    };

    playOsc(261.63, 0, 0.15); // C4
    playOsc(329.63, 0.15, 0.15); // E4
    playOsc(392.00, 0.3, 0.15); // G4
    playOsc(523.25, 0.45, 0.35); // C5
    playOsc(392.00, 0.45, 0.35); // G4 harmony
}
