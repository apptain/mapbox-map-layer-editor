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