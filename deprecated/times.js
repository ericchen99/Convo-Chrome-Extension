function times_good(times) {
  const MINUTES_APART = 15
  const date = new Date()

  const current_time = date.getHours() * 60 + date.getMinutes()

  console.log(times)
  for (var idx = 0; idx < times.length; idx++) {
    var [hours_1, minutes_1] = times[idx].split(":")
    var time_1 = (parseInt(hours_1) * 60 + parseInt(minutes_1)).toString()

    if (time_1 < current_time + 15) {
      alert("Times must be at least 15 minutes after the current time")
      return false;
    }
  }
  return true
}


function format_time_24_to_meridian(time) {
  var date = new Date()
  var month = date.getMonth() + 1, day = date.getDate()
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  date = `${month}/${day}/${date.getFullYear()}` 

  var [hours, minutes] = time.split(":")
  if (hours == 0) hours = 12
  if (hours > 12 ){
    return `${date} ${hours - 12}:${minutes} PM`
  }
  else {
    return `${date} ${hours}:${minutes} AM`
  }
}