
export const customFilterPerson = (_: string, queryText: string, item: any) => {
    const textOne = item.raw.name.toLowerCase()
    const textTwo = item.raw.family.toLowerCase()
    const searchText = queryText.toLowerCase()

    return textOne.indexOf(searchText) > -1 ||
        textTwo.indexOf(searchText) > -1
}