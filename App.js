Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    defaultCardboardConfig:{
        xtype:'rallycardboard',
        filters:[]
    },
    swimlaneAttribute:'ScheduleState',
    model:'story',

    launch: function() {
        Rally.data.ModelFactory.getModel({
            type: this.model,
            success: this.getSwimlaneValues,
            scope:this
        });
    },
    getSwimlaneValues:function(model) {
        var field = model.getField(this.swimlaneAttribute);
        Ext.Array.each(field.allowedValues, function(value,index) {
            this.addCardboard(field, value.StringValue,index);
        }, this);
    },

    addCardboard:function(field, value, destroyHeader) {
        var config = Ext.clone(this.defaultCardboardConfig);
        config.filters.push({
            property: field,
            value: value
        });
        var cardboard = Ext.widget(config.xtype, config);
        if (destroyHeader) {
            cardboard.on('load', function(cardboard) {
                Ext.each(cardboard.getColumns(), function(column) {
                    column.down('#columnHeader').destroy();
                });
            });
        }
        this.add(cardboard);
    }
});
