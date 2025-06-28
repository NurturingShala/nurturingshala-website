function determineDosha(answers) {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    if (!answers) {
        return { dominant: null, secondary: null, scores };
    }
    const values = Array.isArray(answers) ? answers : Object.values(answers);
    for (const val of values) {
        if (scores.hasOwnProperty(val)) {
            scores[val] += 1;
        }
    }
    const dominant = Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );
    const secondary = Object.keys(scores)
        .filter(d => d !== dominant)
        .reduce((a, b) => scores[a] > scores[b] ? a : b);
    return { dominant, secondary, scores };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = determineDosha;
} else {
    window.determineDosha = determineDosha;
}
