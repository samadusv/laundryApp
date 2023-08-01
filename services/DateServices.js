export const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;

}
// const givenDate =getCurrentDate();
// console.log("ggggggggg",givenDate);
// export const  getEndOfCurrentMonth = ()=> {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();

//     const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
//     const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

//     const endOfMonth = new Date(nextYear, nextMonth, 0);

//     const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(endOfMonth.getDate()).padStart(2, '0')}`;
//     console.log(formattedDate);
//     return formattedDate;
//   }
  

  export const  getNextMonthDate=(dateString)=> {
    const givenDate = new Date(dateString);
    const year = givenDate.getFullYear();
    const month = givenDate.getMonth() + 1; 
    let nextMonth = month === 12 ? 1 : month + 1;
    let nextYear = month === 12 ? year + 1 : year;
    const endOfMonth = new Date(nextYear, nextMonth, 0);
    const formattedDate = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(endOfMonth.getDate()).padStart(2, '0')}`;
    return formattedDate;
  }
  
  // const nextMonthDate = getNextMonthDate(givenDate);
  // console.log("ccccccc",nextMonthDate);
