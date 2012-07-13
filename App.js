Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    defaultCardboardConfig:{
        xtype:'rallycardboard',
        filters:[],
        listeners:{}
    },
    swimlaneAttribute:'KanbanState',
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
        Ext.Array.each(field.allowedValues, function(value, index) {
            this.addRow(field, value.StringValue, index);
        }, this);
    },

    addRow:function(field, value, destroyHeader) {
        var plus = "+";
        var minus = "-";
        var button = {
            xtype:"rallybutton",
            text: minus,
            handler: function(button) {
                var card = this.up('.container').down('#cardboard');
                if (minus == button.getText()) {
                    card.setVisible(false);
                    button.setText(plus);
                }
                else {
                    button.setText(minus);
                    card.setVisible(true);
                }
            }
        };
        var cardboardConfig = Ext.clone(this.defaultCardboardConfig);
        var row = {
            items:[button,cardboardConfig]

        };

        cardboardConfig.itemId = 'cardboard';
        cardboardConfig.filters.push({
            property: field,
            value: value
        });
        if (destroyHeader) {
            cardboardConfig.listeners.load = function(cardboard) {
                Ext.each(cardboard.getColumns(), function(column) {
                    column.down('#columnHeader').destroy();
                });
            };
        }
        this.add(row);
    }
});
