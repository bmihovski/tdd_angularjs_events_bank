describe('', function() {
	var topEventSpy = jasmine.createSpy();
	var bottomEventSpy = jasmine.createSpy();
	beforeEach(function() {
		module('pubSub');
		inject(function($controller, $rootScope) {
			var $topScope = $rootScope.$new();
			var $middleScope = $topScope.$new();
			var $bottomScope = $middleScope.$new();
			$controller('TopScope', {$scope : $topScope});
			$controller('MiddleScope', {$scope : $middleScope});
			$controller('BottomScope', {$scope : $bottomScope});
			$topScope.$on('MIDDLEEMIT', topEventSpy);
			$bottomScope.$on('MIDDLEEMIT', bottomEventSpy);
			$middleScope.$emit('MIDDLEEMIT');
		})
	});
	it('Should notify top controller', function() {
		expect(topEventSpy.wasCalled()).toBe(true);
	});
	it('Should not notify bottom controller', function() {
		expect(bottomEventSpy.wasCalled()).toBe(false);
	})
});