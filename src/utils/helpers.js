function date(x) {
  let _ = new Date(x).getDay();
  let day;
  switch (_) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thu";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
    default:
      break;
  }
  let month = new Date(x).getMonth();
  let year = new Date(x).getFullYear();
  let date = new Date(x).getDate();
  return `${day}, ${date} of ${month} ${year}`;
}
