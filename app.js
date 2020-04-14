window.addEventListener("load", () => {
  let long;
  let lat;
  const degree = document.querySelector(".degree");
  const tempDescription = document.querySelector(".temperature-description");
  const timezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";

      const API = `${proxy}https://api.darksky.net/forecast/d4ba9f2e8326591e9ba6e832af6d9077/${lat},${long}`;

      fetch(API)
        .then((response) => response.json())
        .then((data) => {
          // Destructuring data.currently object
          const { temperature, summary, icon } = data.currently;
          // Prikazujem konvertovanu temperaturu u celzijusima zato sto ovaj API daje samo farenhajte
          let celsius = (temperature - 32) * (5 / 9);
          degree.textContent = Math.floor(celsius);
          tempDescription.textContent = summary;
          timezone.textContent = data.timezone;

          setIcons(icon, document.querySelector(".icon"));
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    // Zamenice svaki - sa _
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});
