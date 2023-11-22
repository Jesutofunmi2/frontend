export const TitleCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formattedDate = () => {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

}
