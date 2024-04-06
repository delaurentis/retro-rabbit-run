import { createStory, nextCharacterFromStory } from './story'
import { Story } from '../data/types'

describe('story creation and navigation', () => {
  let paragraphs: string[]
  let story: Story

  beforeEach(() => {
    paragraphs = ['Hello, world!', 'This is a test.']
    story = createStory(paragraphs)
  })

  test('navigates to the next character correctly', () => {
    expect(nextCharacterFromStory(story)).toBe('H')
    expect(nextCharacterFromStory(story)).toBe('e')
    expect(nextCharacterFromStory(story)).toBe('l')
    // Continue testing a few more characters...
  })

  test('returns undefined at the end of the story', () => {
    // Fast forward to the end of the story
    while (nextCharacterFromStory(story) !== undefined) {}
    expect(nextCharacterFromStory(story)).toBeUndefined()
  })
})
