export const mapOrder = (array, order , key) => {
    array.sort((a, b) =>  order.indexOf(a.id) -order.indexOf(b.id))
    return array
}