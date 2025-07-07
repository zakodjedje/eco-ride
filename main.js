fetch('http://localhost/eco-ride/back/api/trips.php')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
