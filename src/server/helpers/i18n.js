module.exports = function(i18n) {
  var self = i18n;
  self.momentLng = function() {
    switch(i18n.lng().toLowerCase()) {
      case 'en-us':
      case 'xx-xx':
        return 'en';
      case 'es-mx':
        return 'es';
      case 'fr-ca':
        return 'fr';
      case 'zh-cn':
        return 'zh-cn';
      case 'jp-ja':
        return 'ja';
      default:
        return i18n.lng().toLowerCase();
    }
  };

  return self;
};
