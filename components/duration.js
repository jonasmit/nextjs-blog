export default function Duration({ durationInMinutes }) {
  var h = Math.floor(durationInMinutes / 60);
  var m = durationInMinutes % 60;
  h = h < 10 ? h + "h" : h + "h";
  m = m < 10 ? m + "m" : m + "m";

  return h + ":" + m;
}
