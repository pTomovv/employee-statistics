function sortPairs(pairs) {
    pairs.sort((a, b) => {
        return b.totalDaysWorkedTogether - a.totalDaysWorkedTogether;
    });
}

function sortCommonProjects(commonProjects) {
    commonProjects.sort((a, b) => {
        return b.daysWorkedOn - a.daysWorkedOn;
    });
}
export { sortPairs, sortCommonProjects };
