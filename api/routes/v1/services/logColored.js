export default function logColored(string, color) {
    // Base cases
    if (color === null && string === null) {
        return
    } else if (color === null) {
        return
    } else if (string === null) {
        return
    }

    // Console log the given color
    color = color.toLowerCase()
    let colorCode
    switch (color) {
        case "black":
            colorCode = "\x1b[30m"
            break
        case "red":
            colorCode = "\x1b[31m"
            break
        case "green":
            colorCode = "\x1b[32m"
            break
        case "yellow":
            colorCode = "\x1b[33m"
            break
        case "blue":
            colorCode = "\x1b[34m"
            break
        case "magenta":
            colorCode = "\x1b[35m"
            break
        case "cyan":
            colorCode = "\x1b[36m"
            break
        case "white":
            colorCode = "\x1b[37m"
            break
        default:
            colorCode = "\x1b[30m"
            break
    }

    console.log(`${colorCode}%s\x1b[0m`, string)
}