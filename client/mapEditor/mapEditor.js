
Template.mapEditor.created = function () {
  var instance = this;

  instance.map = null;
  instance.statesLayer = null;
}

Template.mapEditor.rendered = function () {
  this.autorun(function () {
    if (Mapbox.loaded()) {
      instance = this.templateInstance();
      L.mapbox.accessToken = "pk.eyJ1IjoiYXBwdGFpbiIsImEiOiJ1LXBYUGQwIn0.MD973vNNwbovnHdOdM0ekg";

      instance.map = L.mapbox.map('map', 'apptain.8476284b').setView([38, -102.0], 6);
      instance.map.tileLayer.setOpacity(0.9);

      $.getJSON("data/states.json", function (data) {
        instance.statesLayer = L.mapbox.featureLayer(data);
        instance.statesLayer.addTo(instance.map);

        var clickEvent = function (e) {
          debugger;
          if (Session.get('addingFontIcon') && Session.get('selectedFontIcon')) {
            var marker = L.marker(e.latlng, {
              icon: L.divIcon({
                className: 'fa',
                html: '<i class="fa fa-' + Session.get('selectedFontIcon').class + ' ' + Session.get('fontIconSize') + Session.get('fontIconAnimations') + '"></i>',
                iconSize: [80, 80]
              })
            });
            marker.addTo(instance.map);
            Session.set('addingFontIcon', false);
          }
        };

        instance.map.on('click', clickEvent);
        instance.statesLayer.on('click', clickEvent);

        instance.autorun(function () {
          if (Session.get('showStateBorders')) {
            instance.map.addLayer(instance.statesLayer);
          } else {
            instance.map.removeLayer(instance.statesLayer);
          }
          instance.statesLayer.setStyle({ color: Session.get('stateBordersColor') });
        });
      });
    }
  });
};
