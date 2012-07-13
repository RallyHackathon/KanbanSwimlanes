Ext.define('Rally.ui.cardboard.SwimlanesColumn', {
    extend: 'Rally.ui.cardboard.Column',
    alias: 'widget.swimlanescolumn',
    getColumnHeightFromCards: function() {

        var contentMinHeight = 50;

        var bottomPadding = 30;
        var cards = this.query(this.cardConfig.xtype);
        var height = bottomPadding;

        Ext.each(cards, function(card) {
            height += card.getHeight();
        });

        height = height < contentMinHeight ? contentMinHeight : height;

        height += this.down('#columnHeader').getHeight();

        return height;
    }
});
