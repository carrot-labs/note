Polymer('main-drawer', {
  created: function() {
    this.links = [
      {
        name: 'All',
        url: '/'
      },
      {
        name: 'Favorites',
        url: '/favorites'
      },
      {
        name: 'Archived',
        url: '/archived'
      }
    ];
  }
});