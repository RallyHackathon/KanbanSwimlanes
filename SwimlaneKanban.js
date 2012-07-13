Ext.define('SwimlaneKanban', {
    alias:'widget.appswimlanekanban',
    extend: 'Ext.Container',
    componentCls: 'swimlanekanban',

    config:{
        cardboardConfig:{
            xtype:'rallycardboard',
            filters:[]
        },
        swimlaneAttribute:'ScheduleState',
        model:'story'
    },

    initComponent:function() {
        Rally.data.ModelFactory.getModel({
            type: 'User Story',
            success: this.getSwimlaneValues,
            scope:this
        });
    },

    getSwimlaneValues:function(model) {
        var field = model.getField(this.getSwimlaneAttribute());
        Ext.Array.each(field.allowedValues, function(value) {
            this.addCardboard(field, value.StringValue);
        }, this);
    },

    addCardboard:function(field, value) {
        var config = Ext.clone(this.getCardboardConfig());
        config.filters.push({
            property: field,
            value: value
        });
        this.add({html:"hgjfdskgfjkgfdsjgfd"});
        var cardboard = Ext.widget(config.xtype, config);
        this.add(cardboard);
    },

    constructor:function(config) {
        this.initConfig(config);
        this.callParent(arguments);
    }
});
