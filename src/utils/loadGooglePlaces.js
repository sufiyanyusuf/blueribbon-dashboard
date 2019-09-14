const Load = (callback) => {
  const existingScript = document.getElementById('googlePlaces');

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBe12m5Dr_Nl4Npazinei3sQoJKr3MbuuY&libraries=places";
    script.id = 'googlePlaces';
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) callback();
    };
  }

  if (existingScript && callback) callback();
};

export default Load;