Template.iconSelect.helpers({
  settings: function () {
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
  fontIcons: function () {
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
  "autocompleteselect input": function (event, template, doc) {
    Session.set('selectedFontIcon', doc);
  },
  'click #size': function (event, template) {
    switch (event.target.value) {
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
    if (template.$('#spin').is(':checked')) {
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