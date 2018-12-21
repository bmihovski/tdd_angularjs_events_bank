describe('Given we are broadcast an event', function() {
	var topEventSpy = jasmine.createSpy();
	var bottomEventSpy = jasmine.createSpy();
	beforeEach(function() {
		module('pubSub');
		inject(function($controller, $rootScope) {
			var topScope = $rootScope.$new();
			var middleScope = topScope.$new();
			var bottomScope = middleScope.$new();
			$controller('TopController', {$scope : topScope});
			$controller('MiddleController', {$scope : middleScope});
			$controller('BottomController', {$scope : bottomScope});
			topScope.$on('MIDDLEBROADCAST', topEventSpy);
			bottomScope.$on('MIDDLEBROADCAST', bottomEventSpy);
			middleScope.$broadcast('MIDDLEBROADCAST');
		});
	});
	afterEach(function() {
		topEventSpy.calls.reset();
		bottomEventSpy.calls.reset();
	});
	it('Should not notify top controller', function() {
		expect(topEventSpy.calls.any()).toBe(false);
	});
	it('Should notify bottom controller', function() {
		expect(bottomEventSpy).toHaveBeenCalled();
	});
})