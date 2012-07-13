Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        this.add({
            xtype:'appswimlanekanban'
        });
    }
});
