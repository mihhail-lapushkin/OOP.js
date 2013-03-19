describe('Core functionality:', function() {
	it('base class exists', function() {
		expect(Base).toEqual(jasmine.any(Function));
		expect(Base.extend).toEqual(jasmine.any(Function));
	});
	
	it('child class has a valid constructor and extend function', function() {
		var Child = Base.extend({});
		
		expect(Child).toEqual(jasmine.any(Function));
		expect(Child.prototype).toEqual(jasmine.any(Object));
		expect(Child.extend).toEqual(jasmine.any(Function));
	});
});
	