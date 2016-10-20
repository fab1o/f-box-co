console.info([
    '=========================================',
    '*** FantasticBoxCo is working :)       ***',
    '=========================================',
].join('\n'));

angular
    .module('app', [])
    .controller('OrderController', OrderController);

function OrderController() {

    this.isValid = false;

    this.step1 = {
        title: "Step 1 - Dimensions &amp; Quantity",

        width: 0.0,
        height: 0.0,
        length: 0.0,
        quantity: 0,

        get isValid () {
            return this.area > 0 && this.quantity > 0;
        },
        get area () {

            if (this.width <= 0 || this.height <= 0 || this.length <= 0)
                return 0;

            var hw = this.width * this.height;
            var hl = this.height * this.length;
            var wl = this.width * this.length;

            return (2 * hw) + (2 * hl) + (2 * wl);
        }
    };

    this.step2 = {
        title: "Step 2 - Cardboard Grade",

        choice: null,
        options: [
            {
                key: "A",
                name: "A Grade",
                price: 0.20
            },
            {
                key: "B",
                name: "B Grade",
                price: 0.10
            },
            {
                key: "C",
                name: "C Grade",
                price: 0.05,
                validation: function (area) {

                	if (area <= 2)
	                    return {
	                        result: true
	                    };

                    return {
                        result: false,
                        code: -2.1,
                        message: this.name + " cannot be chosen for box size of larger than 2 square metres",
                        fix: "Go back to step 2 and choose a different grade."
                    };

                }

            }
        ],
        find: function (key) {
            var found = null;
            this.options.forEach(function (option){
                if (option.key == key) {
                    found = option;
                }
            });
            return found;
        },
        get chosen () {
            return this.find(this.choice);
        },
        get price () { //per area

            var option = this.find(this.choice);

            if (option)
                return option.price;
            else
                return 0;
        }
    };

    this.step3 = {
        title: "Step 3 - Print Quality",

        choice: null,
        options: [
            {
                key: "3-color",
                name: "3 colours",
                price: 0.20
            },
            {
                key: "2-color",
                name: "2 colours",
                price: 0.10
            },
            {
                key: "black-only",
                name: "Black only",
                price: 0.05
            },
            {
                key: "no-printing",
                name: "No printing",
                price: 0
            },
            {
                key: "FantasticBoxCo-branding",
                name: "FantasticBoxCo branding",
                discount: 100 * 0.05
            }
        ],
        find: function (key) {
            var found = null;
            this.options.forEach(function (option){
                if (option.key == key) {
                    found = option;
                }
            });
            return found;
        },
        get chosen () {
            return this.find(this.choice);
        },
        get price () {

            var option = this.find(this.choice);

            if (option && option.price)
                return option.price;
            else
                return 0;

        },
        get discount () {

            var option = this.find(this.choice);

            if (option && option.discount)
                return option.discount;
            else
                return 0;

        }
    };

    this.step4 = {
        title: "Step 4 - Optional Extras",

        options: [
            {
                key: "handles",
                name: "Handles",
                enabled: false,
                price: 0.10
            },
            {

                key: "reinforced-bottom",
                name: "Reinforced bottom",
                enabled: false,
                price: 0.05
            }
        ],
        get price () { //per box

            var total = 0;

            this.options.forEach(function (option) {

                if (option.enabled) {
                    total += option.price;
                }

            });

            return total;
        }
    };

    this.costPerBox = function () {

        var cost = (this.step1.area * this.step2.price) + (this.step1.area * this.step3.price) + this.step4.price;

        if (this.step3.discount) {
            cost = ((100 - this.step3.discount) / 100) * cost;
        }

        return cost;
    };

    this.totalCost = function () {

        var total = this.costPerBox() * this.step1.quantity;

        return total.toFixed(3);
    };

    this.finish = function () {

        var validation = this.validate();

        this.isValid = validation.result;
    };

    this.validate = function () {

        this.validation = {
            result: true,
            errors: []
        };

        if (!this.step1.isValid) {
            this.validation.errors.push({
                code: -1,
                message: "Please ensure quantity and box dimensions are entered;",
                fix: "Go back to step 1 and fill out: Width, Height, Length and Quantity."
            });
        }

        var step2_chosen = this.step2.chosen;

        if (!step2_chosen) {
            this.validation.errors.push({
                code: -2,
                message: "Please ensure a cardboard grade is chosen;",
                fix: "Go back to step 2 and choose a grade."
            });
        }

        if (this.step1 && step2_chosen &&
            typeof step2_chosen.validation != "undefined" && !step2_chosen.validation(this.step1.area).result) {

            this.validation.errors.push(step2_chosen.validation());
        }

        var step3_chosen = this.step3.chosen;

        if (!step3_chosen) {
            this.validation.errors.push({
                code: -3,
                message: "Please ensure a print quality is chosen;",
                fix: "Go back to step 3 and choose a print quality."
            });
        }

        if (this.validation.errors.length) {
            this.validation.result = false;
        }

        return this.validation;

    };

}