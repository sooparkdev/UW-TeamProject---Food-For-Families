export default function parseData(data) {
    try {
        let JSONData = JSON.parse(data)
        return JSONData
    } catch (err) {
        return {}
    }
}