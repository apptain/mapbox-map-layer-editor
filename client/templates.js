Template.widgets.events({
  'click .js-show-sidebar': function (event, t) {
    Session.set('widgets', true);
  },
  'click .js-hide-sidebar': function () {
    Session.set('widgets', false);
  }
});

Session.set('showStateBorders', true);
Session.set('stateBordersColor', 'black');
Template.stateBorderSettings.events({
  'click #borders': function (event, template) {
    debugger;
    switch (event.target.value) {
      case 'show':
        Session.set('showStateBorders', true);
        break;
      case 'hide':
        Session.set('showStateBorders', false);
        break;
      default:
        Session.set('showStateBorders', false);
    }
  },
  'change #borders-color': function (event, template) {
    Session.set('stateBordersColor', event.target.value); 
  }
}); 

Template.iconSelect.helpers({
  settings: function() {
    return {
      position: Session.get("position"),
      limit: 10,
      rules: [
        {
          collection: FontIcons,
          field: 'class',
          matchAll: true,
          template: Template.iconSelectItem
        }
      ]
    };
  },
  fontIcons: function() {
    return FontIcons.find();
  }, 
  selectedFontIconClass: function () {
    var selectedFontIcon = Session.get('selectedFontIcon'); 
    if (selectedFontIcon) {
      return 'fa-' + selectedFontIcon.class + ' ' + Session.get('fontIconSize') + ' ' + Session.get('fontIconSize') + Session.get('fontIconAnimations');
    } else {
      return null;
    }
  }
});

Session.set('selectedFontIcon', null);
Session.set('fontIconSize', '');
Session.set('fontIconAnimations', '');
Template.iconSelect.events({
  "autocompleteselect input": function(event, template, doc) {
    Session.set('selectedFontIcon', doc); 
  }, 
  'click #size': function (event, template) {
    switch(event.target.value){
      case 'small':
        Session.set('fontIconSize', '');
        break;
      case 'medium':
        Session.set('fontIconSize', 'fa-3x');
        break;
      case 'large':
        Session.set('fontIconSize', 'fa-4x');
        break;
      default:
        Session.set('fontIconSize', '');
    }
  },
  'click .animation-checkbox': function (event, template) {
    var animationClass = '';
    if(template.$('#spin').is(':checked')){
      animationClass += ' fa-spin';
    }
    if (template.$('#pulse').is(':checked')) {
      animationClass += ' fa-pulse';
    }
    Session.set('fontIconAnimations', animationClass); 
  },
  'click #icon-to-map': function (event, template) {
    Session.set('addingFontIcon', true);
  },
  'click #cancel-icon-to-map': function (event, template) {
    Session.set('addingFontIcon', false);
  }
});

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
          if(Session.get('addingFontIcon') && Session.get('selectedFontIcon')) {
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
          if(Session.get('showStateBorders')){
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
