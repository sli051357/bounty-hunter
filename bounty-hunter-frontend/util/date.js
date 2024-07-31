let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
let fullYear = (yyyy - 1) + '-' + yyyy;
export { fullYear };

today = mm + '/' + dd + '/' + yyyy;
export default today
