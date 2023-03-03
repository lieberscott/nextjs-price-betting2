export const displayDate = (seconds) => {
  const sec = parseInt(seconds) * 1000;
  const d = new Date(sec);
  const month = parseInt(d.getMonth()) + 1;
  const date = d.getDate();
  const year = d.getFullYear();
  const hour0 = parseInt(d.getHours());
  const hour = hour0 % 12 === 0 ? 12 : hour0 % 12;
  const amPm = hour0 >= 12 ? "p.m." : "a.m.";
  const minute = parseInt(d.getMinutes()).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  return `${month}/${date}/${year}, ${hour}:${minute} ${amPm}`;
}