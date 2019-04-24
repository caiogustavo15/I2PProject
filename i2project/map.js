function Map(){
  var self=this;
  this.name = "World Map";
  this.id = "maps";
  this.teste =[];
  this.start = function(){

    //creates new object to place svg in
    var map = document.createElement('object');
    map.id = 'map';
    map.data = 'media/world.svg';
    map.height = '100%';
    map.width = '100%';
    //append div
    document.getElementById('mapW').appendChild(map);

    map.addEventListener("load", function() {

      // create a map object
      var mapObject = document.getElementById('map').contentDocument;

      // create an array with every element (country) from the document object
      var countries = Array.from(mapObject.querySelectorAll('path'));

      // loop over array countries and adds event listener for each of them
      countries.forEach(function (c){self.teste.push(c.getAttributeNS(null,'title'))});
      countries.forEach(function (country){

        country.addEventListener('click', returnID);

        function returnID (e){

          p.draw(this.getAttributeNS(null,'title'));

          //set fill of "not clicked" country back to black
          countries.forEach(function (country){
            country.setAttributeNS(null,'fill','black');
            country.setAttributeNS(null,'stroke', '');
          });

          // set this element fill to blue
          this.setAttributeNS(null,'fill','#282828');
          this.setAttributeNS(null,'stroke', 'green');          this.setAttributeNS(null,'stroke-width', '1px');
          return country;

        }
      });
      svgPanZoom(map, {
        zoomEnabled: true,
        controlIconsEnabled: true
      });
    });

  };

}
