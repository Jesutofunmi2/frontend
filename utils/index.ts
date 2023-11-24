export const TitleCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formattedDate = () => {
  
const  currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);
  return `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`

}
