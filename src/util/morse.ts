export const textToMorseArray = (text: string): string[] => {
    const morseCode: { [key: string]: string } = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
      'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
      'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
      'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
      'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..',
      '0': '-----', '1': '.----', '2': '..---', '3': '...--',
      '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.',
      '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.',
      '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
      '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
      '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
      '$': '...-..-', '@': '.--.-.'
    }
  
    // Split text into characters, and translate each into morse code
    // Non-mapped characters result in ' ' (space) which indicates a pause in Morse code
    return text.toUpperCase().split('').flatMap(character => (morseCode[character] || ' ').split(''))
  }