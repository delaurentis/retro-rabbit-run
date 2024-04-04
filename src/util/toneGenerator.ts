export class ToneGenerator {
    private audioCtx: AudioContext
    private dotDuration: number
    private dashDuration: number
  
    constructor() {
        this.audioCtx = new (window.AudioContext || window['webkitAudioContext'])()
        this.dotDuration = 0.1 // seconds
        this.dashDuration = 0.3 // seconds
    }
  
    playDot() {
        this.playSound(750, this.dotDuration, 0.25)
    }
  
    playDash() {
        this.playSound(750, this.dashDuration, 0.25)
    }
  
    // Play a sequence of notes
    playSequence(notes: { frequency: number, duration: number, volume: number }[]) {
        let currentTime = 0
        const player = this
        notes.forEach(note => {
            setTimeout(() => {
                player.playSound(note.frequency, note.duration, note.volume)
            }, currentTime * 1000)
            currentTime += note.duration
        })
    }
  
    // Not currently used, but a fun coin sound (ala Mario)
    playCoin() {
        const notes = [
            { frequency: 659.25, duration: 0.1, volume: 0.5 }, // E5
            { frequency: 1318.51, duration: 0.1, volume: 0.5 } // E6
        ]
        this.playSequence(notes)
    }
  
    // Play a sound when we get a good item
    playHappy() {
        const notes = [ 
            { frequency: 523.25, duration: 0.15, volume: 0.1}, // C5
            { frequency: 587.33, duration: 0.05, volume: 0.05 }, // D5
            { frequency: 659.25, duration: 0.05, volume: 0.05 }, // E5
            { frequency: 698.46, duration: 0.05, volume: 0.05 }, // F5
            { frequency: 783.99, duration: 0.05, volume: 0.05 }, // G5
            { frequency: 880.00, duration: 0.05, volume: 0.05 }, // A5
            { frequency: 987.77, duration: 0.05, volume: 0.05 }, // B5
            { frequency: 1046.50, duration: 0.2, volume: 0.05 }  // C6, held longer for completion
        ]
        this.playSequence(notes)
    }
  
    // Play a sound when we hit an obstacle
    playOuch() {
  
        const baseFrequency = 300
        const alternateFrequency = 350
        const duration = 0.05
        const volume = 0.4
        const repeats = 20
    
        for (let i = 0; i < repeats; i++) {
            setTimeout(() => {
                const frequency = i % 2 === 0 ? baseFrequency : alternateFrequency
                this.playSound(frequency, duration, volume * ((repeats - i)/repeats) * ((repeats - i)/repeats))
            }, i * 150)
        }
    }
  
    // Play the sound with given frequency, duration, and volume
    playSound(frequency: number, duration: number, volume: number) {
        const oscillator = this.audioCtx.createOscillator()
        const gainNode = this.audioCtx.createGain()
    
        oscillator.connect(gainNode)
        gainNode.connect(this.audioCtx.destination)
    
        oscillator.type = 'sine'
        gainNode.gain.value = volume
        oscillator.frequency.value = frequency
        oscillator.start(this.audioCtx.currentTime)
        oscillator.stop(this.audioCtx.currentTime + duration)
    }
  
    // Play shaped white noise for a given duration and volume
    // Can be used to create percussive sounds
    // Attribution: GPT 4.0
    playPercussion(duration: number = 0.1, volume: number = 1, attack: number = 0.01) {
        // Create an empty stereo buffer at the sample rate of the AudioContext
        const sampleRate = this.audioCtx.sampleRate
        const frameCount = sampleRate * duration
        const myArrayBuffer = this.audioCtx.createBuffer(2, frameCount, sampleRate)
    
        // Fill the buffer with white noise;
        // just random values between -1.0 and 1.0
        for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
            // This gives us the actual array that contains the data
            const nowBuffering = myArrayBuffer.getChannelData(channel)
            for (let i = 0; i < frameCount; i++) {
                // Math.random() is in [0; 1.0]
                // audio needs to be in [-1.0; 1.0]
                nowBuffering[i] = Math.random() * 2 - 1
            }
        }
    
        // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer
        const source = this.audioCtx.createBufferSource()
        source.buffer = myArrayBuffer
  
        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        const gainNode = this.audioCtx.createGain()
        gainNode.gain.value = volume
        source.connect(gainNode)
        gainNode.connect(this.audioCtx.destination)
  
        // Shape the gain to create a percussive envelope
        const now = this.audioCtx.currentTime
        gainNode.gain.setValueAtTime(0, now)
        gainNode.gain.linearRampToValueAtTime(volume, now + attack) // Apply specified attack
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration) // Quick decay
  
        // start the source playing
        source.start()
        source.stop(now + duration)
    }
  }
  