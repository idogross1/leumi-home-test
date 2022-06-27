function convertTimestampToDateString(ts) {
  const date = new Date(ts * 1000);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

module.exports = { convertTimestampToDateString };
