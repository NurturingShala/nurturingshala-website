const determineDosha = require('../js/dosha');

test('calculates dominant dosha correctly for vata', () => {
  const answers = {q1:'vata', q2:'pitta', q3:'vata', q4:'kapha', q5:'vata'};
  const result = determineDosha(answers);
  expect(result.dominant).toBe('vata');
});

test('calculates dominant dosha correctly for pitta', () => {
  const answers = ['pitta','vata','pitta','kapha','pitta'];
  const { dominant } = determineDosha(answers);
  expect(dominant).toBe('pitta');
});

test('calculates dominant dosha correctly for kapha', () => {
  const answers = ['kapha','kapha','vata','pitta'];
  const res = determineDosha(answers);
  expect(res.dominant).toBe('kapha');
});
