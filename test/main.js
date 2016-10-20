
describe("OrderController", function() {

    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('OrderController.step1', function() {

        var controller;

        beforeEach(function() {
            controller = $controller('OrderController', { $scope: null });
        });

        it('calculates a valid surface area for a 1x1x1 box', function() {

            controller.step1.width = 1;
            controller.step1.height = 1;
            controller.step1.length = 1;

            expect(controller.step1.area).toBe(6);

        });

        it('calculates a valid surface area for a 2.58x2.58x2.58 box', function() {

            controller.step1.width = 2.58;
            controller.step1.height = 2.58;
            controller.step1.length = 2.58;

            expect(controller.step1.area).toBeCloseTo(39.9384);
        });



    });

    describe('OrderController.step2', function() {

        var controller;

        beforeEach(function() {
            controller = $controller('OrderController', { $scope: null });
        });

        it('calculates total cost of 10 1x1x1 boxes with B grade so far', function() {

            controller.step1.width = 1;
            controller.step1.height = 1;
            controller.step1.length = 1;
            controller.step1.quantity = 10;

            controller.step2.choice = "B";

            expect(controller.totalCost()).toBeCloseTo(6);

        });

    });

    describe('OrderController.step3', function() {

        var controller;

        beforeEach(function() {
            controller = $controller('OrderController', { $scope: null });
        });

        it('calculates total cost of 1 2.58x2.58x2.58 A grade with FantasticBoxCo branding 5% discount', function() {

            controller.step1.width = 2.58;
            controller.step1.height = 2.58;
            controller.step1.length = 2.58;
            controller.step1.quantity = 1;

            controller.step2.choice = "A";

            controller.step3.choice = "FantasticBoxCo-branding";

            expect(controller.totalCost()).toBeCloseTo(7.59);

        });

    });

    describe('OrderController.finalstep', function() {

        var controller;

        beforeEach(function() {
            controller = $controller('OrderController', { $scope: null });
        });

        it('calculates total cost of 10 0.9x2.07x1.06 A grade boxes with no branding', function() {

            controller.step1.width = .9;
            controller.step1.height = 2.07;
            controller.step1.length = 1.06;
            controller.step1.quantity = 10;

            controller.step2.choice = "A";

            controller.step3.choice = "no-printing";

            expect(controller.totalCost()).toBeCloseTo(20.05);

        });

        it('invalidates an order of a C grade box larger than 2 square meters', function() {

            controller.step1.width = 1;
            controller.step1.height = 1;
            controller.step1.length = 1;
            controller.step1.quantity = 1;

            controller.step2.choice = "C";

            controller.step3.choice = "no-printing";

            controller.finish();

            expect(controller.isValid).not.toBeTruthy();

        });

        it('finishes an order of 1 1x1x1 B grade box with black-only branding plus handles option', function() {

            controller.step1.width = 1;
            controller.step1.height = 1;
            controller.step1.length = 1;
            controller.step1.quantity = 1;

            controller.step2.choice = "B";

            controller.step3.choice = "black-only";

            controller.step4.options[0].enabled = true;

            controller.finish();

            expect(controller.isValid && controller.totalCost() == 1).toBeTruthy();

        });

        it('finishes an order of 1000 1x1x1 A grade boxes with black-only branding plus both handles and reinforced bottom options', function() {

            controller.step1.width = 1;
            controller.step1.height = 1;
            controller.step1.length = 1;
            controller.step1.quantity = 1000;

            controller.step2.choice = "A";

            controller.step3.choice = "black-only";

            controller.step4.options[0].enabled = true;
            controller.step4.options[1].enabled = true;

            controller.finish();

            expect(controller.isValid && controller.totalCost() == 1650).toBeTruthy();

        });

    });



});