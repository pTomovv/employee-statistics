function sortPairs(pairs) {
    pairs.sort((a, b) => {
        return b.totalDaysWorkedTogether - a.totalDaysWorkedTogether;
    });
}

export { sortPairs };
