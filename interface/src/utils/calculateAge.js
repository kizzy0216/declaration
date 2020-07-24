const calculateAge = (datetime) => {
 const difference = Date.now() - datetime;
 const dateAge = new Date(difference); // miliseconds from epoch
 return Math.abs(dateAge.getUTCFullYear() - 1970);
}

export default calculateAge;
