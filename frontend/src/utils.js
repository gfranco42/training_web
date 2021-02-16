import moment from 'moment';

export const stringCut = (url, len) => {
    // const len = cutter.length - 1;
    return url.slice(len);
}

export const translate_date = (date) => {
    const localTime = moment.utc().format('YYYY-MM-DD')
    const today = new Date(localTime);
    const birthDate = new Date(date);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    return (age_now);
}

export const readableDate = (date) => {
  const newDate = new Date(date);
  // recup annee
  const getYear = newDate.getFullYear();
  // recup le numéro du mois (janvier commence a 0)
  const getMonth = newDate.getMonth() > 9 ? newDate.getMonth() : "0" + (newDate.getMonth() + 1);
  // /!\ ne pas confondre avec getDay (jour de la semaine), getdate recup jour du mois
  const getDay = newDate.getDate() > 9 ?  newDate.getDate() : "0" +  newDate.getDate();
  const getHours = newDate.getHours() > 9 ? newDate.getHours() : "0" +  newDate.getHours(); 
  const getMinutes = newDate.getMinutes() > 9 ? newDate.getMinutes() : "0" +  newDate.getMinutes(); 
  return (`${getDay}/${getMonth}/${getYear} ${getHours}:${getMinutes}`)
}

export const LineBreakMaker = (string) => {
    string.split("\n").map((item, idx) => {
      return (
        <span key={idx}>
          {item}
          <br />
        </span>
      )
    })
}