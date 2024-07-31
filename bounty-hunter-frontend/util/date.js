let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy = today.getFullYear();
const fullYear = `${yyyy - 1}-${yyyy}`;
export { fullYear };

today = `${mm}/${dd}/${yyyy}`;
export default today;
