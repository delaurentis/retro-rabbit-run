import { Story } from '../data/types'
import { stories } from '../data/stories'
import { textToMorseArray } from './morse'

export const createStory = (): Story => {
  
  // Randomly pick a story from the list
  const paragraphs: string[] = stories[Math.floor(Math.random() * stories.length)]

  // Word wrap the lines into shorter lines
  const lines = paragraphs.flatMap(paragraph => wordWrap(paragraph, 32))

  // Initialize our data
  const story = {
    characterIndex: 0,
    lineIndex: 0,
    lines: lines,
    morse: []
  }

  // Preload the first character from the story
  return story
}

type SkipOptions = {
  skip: string[]
}

export const nextCharacterFromStory = (story: Story): string | undefined => {

  // Start our values appropriately if they're not already set
  story.characterIndex = story.characterIndex || 0
  story.lineIndex = story.lineIndex || 0

  // Check if we've reached the end of the story
  if (story.lineIndex >= story.lines.length) {
    return undefined
  }

  // Get the current paragraph
  const line = story.lines[story.lineIndex]
  if ( line ) {
    
    // Return the current character and afterward, increment the character index
    story.currentCharacter = line[story.characterIndex]
    story.characterIndex++
  
    // Check if we've reached the end of the current paragraph
    if (story.characterIndex >= line.length) {
      story.characterIndex = 0 // Reset character index
      story.lineIndex++ // Move to the next paragraph
    }

    // Return the character we retrieved
    return story.currentCharacter
  }
  return undefined
}

// Get the next character, but skip certain characters we don't want to make them type
export const nextCharacterFromStoryExcept = (story: Story, options: SkipOptions): string | undefined => {
  let currentCharacter: string | undefined;
  do {
    currentCharacter = nextCharacterFromStory(story);
  } while (currentCharacter && options.skip.includes(currentCharacter));
  
  return currentCharacter;
}
// Advance the current character and generate another morse code
export const nextMorseFromStory = (story: Story): string | undefined => {

  // Make sure we have a morse array to work with
  story.morse = story.morse || []

  // If the length is zero, let's make one from the next character in our list
  if ( story.morse.length == 0 ) {
    const character = nextCharacterFromStory(story)
    if ( character ) {
      story.morse = textToMorseArray(character)
    }
  }

  // Compute the next character's morse code
  const nextMorseCharacter: string | undefined = story.morse.shift()

  // Return the next morse character
  return nextMorseCharacter
}

/**
 * Breaks a text into lines of up to maxLineLength characters.
 * @param {string} text - The text to be wrapped.
 * @param {number} maxLineLength - The maximum length of each line.
 * @returns {string[]} An array of strings, each representing a line.
 */
const wordWrap = (text: string, maxLineLength: number): string[] => {
  const words = text.split(' ')
  const wrappedLines = words.reduce((lines: string[][], word: string ) => {
    if (lines.length === 0) lines.push([]); // Ensure there's at least one line to start with

    let currentLine: string[] = lines[lines.length - 1]
    let testLine: string[] = [...currentLine, word]; // Add the new word to see if it fits
    let testLineString: string = testLine.join(' ')

    if (testLineString.length <= maxLineLength) {
      // If the line with the new word fits, update the current line
      lines[lines.length - 1] = testLine
    } else {
      // Otherwise, start a new line with the current word
      lines.push([word])
    }
    return lines
  }, [])
  return wrappedLines.map(line => line.join(' ')); // Join each line's words with spaces
}