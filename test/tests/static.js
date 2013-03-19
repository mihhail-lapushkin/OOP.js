describe('Static property functionality:', function() {
	it('child class has static properties', function() {
		var f = function() {};
		var Child = Base.extend({
			statics: {
				var1: f,
				var2: 2
			}
		});
		
		expect(Child.var1).toBe(f);
		expect(Child.var2).toBe(2);
	});
	
	it('child class has static properties of every parent class', function() {
		var Child = Base.extend({
			statics: {
				var1: 1,
				var2: 2
			}
		});
		
		var ChildOfChild = Child.extend({
			statics: {
				var3: 3,
				var4: 4
			}
		});
		
		expect(ChildOfChild.var1).toBe(1);
		expect(ChildOfChild.var2).toBe(2);
		expect(ChildOfChild.var3).toBe(3);
		expect(ChildOfChild.var4).toBe(4);
	});
	
	it('static property overwrite works', function() {
		var Child = Base.extend({
			statics: {
				var1: 1,
				var2: 2
			}
		});
		
		var ChildOfChild = Child.extend({
			statics: {
				var1: 3,
				var3: 4
			}
		});
		
		expect(ChildOfChild.var1).toBe(3);
		expect(ChildOfChild.var2).toBe(2);
		expect(ChildOfChild.var3).toBe(4);
	});
	
	it('cannot overwrite extend static property', function() {
		var Child = Base.extend({
			statics: {
				extend: 1
			}
		});
		
		expect(Child.extend).not.toBe(1);
	});
	
	it('statics property is deleted', function() {
		var Child = Base.extend({
			statics: {
				var1: 1
			}
		});
		
		expect(new Child().statics).not.toBeDefined();
	});
});