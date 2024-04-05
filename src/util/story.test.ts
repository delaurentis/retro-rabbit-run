import { createStory, nextCharacterFromStory } from './story'
import { Story } from '../data/types'

describe('story creation and navigation', () => {
  let lines: string[]
  let story: Story

  beforeEach(() => {
    lines = ['Hello, world!', 'This is a test.']
    story = createStory(lines)
  })

  test('creates a story with initial values', () => {
    expect(story).toEqual({
      characterIndex: 1, // because nextCharacterFromStory preloads the first character
      lineIndex: 0,
      lines,
      currentCharacter: 'H', // this is preloaded by createStory calling nextCharacterFromStory
    })
  })

  test('navigates to the next character correctly', () => {
    expect(nextCharacterFromStory(story)).toBe('e')
    expect(nextCharacterFromStory(story)).toBe('l')
    // Continue testing a few more characters...
  })

  test('handles line transitions correctly', () => {
    // Fast forward to the end of the first line
    for (let i = 0; i < 'Hello, world!'.length - 1; i++) {
      nextCharacterFromStory(story)
    }

    expect(story.characterIndex).toBe(0); // should reset character index at the start of a new line
    expect(story.lineIndex).toBe(1); // should move to the next line
    expect(nextCharacterFromStory(story)).toBe('T'); // first character of the next line
  })

  test('returns undefined at the end of the story', () => {
    // Fast forward to the end of the story
    while (nextCharacterFromStory(story) !== undefined) {}

    expect(nextCharacterFromStory(story)).toBeUndefined()
  })
})
