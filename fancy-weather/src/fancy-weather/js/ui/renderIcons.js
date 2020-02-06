export default function renderIconFn(icon) {
  const className = `.${icon}`;
  const containers = document.querySelectorAll(className);

  containers.forEach((container) => {

    switch (icon) {
      case "clear-day":
        container.innerHTML = '<i class="wi wi-day-sunny"></i>';
        break;
      case "clear-night":
        container.innerHTML = '<i class="wi wi-night-clear"></i>';
        break;
      case "rain":
        container.innerHTML = '<i class="wi wi-rain"></i>';
        break;
      case "snow":
        container.innerHTML = '<i class="wi wi-snow"></i>';
        break;
      case "sleet":
        container.innerHTML = '<i class="wi wi-sleet"></i>';
        break;
      case "wind":
        container.innerHTML = '<i class="wi wi-windy"></i>';
        break;
      case "fog":
        container.innerHTML = '<i class="wi wi-fog"></i>';
        break;
      case "cloudy":
        container.innerHTML = '<i class="wi wi-cloudy"></i>';
        break;
      case "partly-cloudy-day":
        container.innerHTML = '<i class="wi wi-day-cloudy"></i>';
        break;
      case "partly-cloudy-night":
        container.innerHTML = '<i class="wi wi-night-alt-cloudy"></i>';
        break;
      case "hail":
        container.innerHTML = '<i class="wi wi-hail"></i>';
        break;
      case "thunderstorm":
        container.innerHTML = '<i class="wi wi-thunderstorm"></i>';
        break;
      case "tornado":
        container.innerHTML = '<i class="wi wi-tornado"></i>';
        break;
      default:
        console.log("icon not found");
    }

  });
}