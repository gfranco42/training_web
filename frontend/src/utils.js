import moment from 'moment';

export const string_cut = (base, len) => {
    // const len = cutter.length - 1;
    if (len >= 1)
        return base.slice(0, len * -1);
    else
        return base;
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