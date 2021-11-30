export const ccxtFormDefinition = {
    "name": "generalPurposeForm",
    "ui": {
        "label": "General purpose form"
    },
    "items": [
        {
            "name": "exchanges",
            "renderer": "container",
            "items": [
                {
                    "name": "exchanges",
                    "binding": "exchange",
                    "renderer": "dropdown",
                    "dictionary": "http://129.159.253.20/exchanges",
                    "ui": {
                        "label": "Exchanges"
                    }
                }
            ]
        },
        {
            "name": "exchange-binance",
            "renderer": "container",
            "binding": "exchanges.binance",
            "valueSource": "http://129.159.253.20/exchange/binance",
            "ui": {
                "label": "Binance exchange"
            },
            "items": [
                {
                    "name": "name",
                    "binding": "name",
                    "renderer": "label",
                    "ui": {
                        "label": "Exchange name"
                    }
                },
                {
                    "name": "load-markets",
                    "binding": "has.loadMarkets",
                    "renderer": "label",
                    "type": "bool",
                    "ui": {
                        "label": "Support load markets"
                    }
                },
                {
                    "name": "cancel-order",
                    "binding": "has.cancelOrder",
                    "renderer": "label",
                    "type": "bool",
                    "ui": {
                        "label": "Support cancel order"
                    }
                },
                {
                    "name": "cancel-orders",
                    "binding": "has.cancelOrders",
                    "renderer": "label",
                    "type": "bool",
                    "ui": {
                        "label": "Support cancel orders"
                    }
                }
            ]
        }
    ],
    "dictionaries": {
        "static": [
            {
                "key": 1,
                "name": "first"
            },
            {
                "key": 2,
                "name": "second"
            },
            {
                "key": 3,
                "name": "third"
            }
        ]
    }
};
