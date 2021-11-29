
export const cutStrForYear = (time)=>{
  let options = { month: 'short' };
  let newItem =new Date(time).toLocaleDateString("ru", options);
  if (window.innerWidth >= 768) {
    options= {month : 'short'}
    return newItem = new Date(time).toLocaleDateString("ru", options).substring(0,3);
  }
  newItem = new Date(time).toLocaleDateString("ru", options).substring(0,2);

  return newItem;
}
