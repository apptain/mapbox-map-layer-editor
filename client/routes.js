Router.route('/', {
  template: 'mapEditor',
  loadingTemplate: 'loading',
  waitOn: function () {
    return [Meteor.subscribe("fontIcons"), Mapbox.load()];
  }
}); 

