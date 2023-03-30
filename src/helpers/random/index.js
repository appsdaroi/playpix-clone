const randomBetweenRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)

}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export { randomBetweenRange, randomDate }