Template.widgets.events({
  'click .js-show-sidebar': function (event, t) {
    Session.set('widgets', true);
  },
  'click .js-hide-sidebar': function () {
    Session.set('widgets', false);
  }
});
