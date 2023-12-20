function handleFilter(pairs, filterBy) {
    if (filterBy === 'all') {
        return pairs;
    }
    const result = pairs.filter((pair) => {
        return pair.employees.includes(Number(filterBy));
    });
    return result;
}

export { handleFilter };
