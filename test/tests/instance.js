describe('Instance property functionality:', function() {
	it('field and method inheritance works', function() {
		var Child = Base.extend({
			prop: 1,
			method: function() {
				this.prop2 = 2;
			}
		});
		
		var ChildOfChild = Child.extend({});
		
		var c = new Child();
		var coc = new ChildOfChild();
		c.method();
		coc.method();
		
		expect(c.prop).toBe(1);
		expect(c.prop2).toBe(2);		

		expect(coc.prop).toBe(1);
		expect(coc.prop2).toBe(2);
	});
	
	it('calling super methods works', function() {
		var b = 0;
		var Child = Base.extend({
			method: function(a) {
				b = a;
			}
		});
		
		var ChildOfChild = Child.extend({
			method: function(a) {
				this._super(a);
			}
		});
		
		var ChildOfChildOfChild = ChildOfChild.extend({
			method: function(a) {
				this._super(a);
			}
		});
		
		new ChildOfChildOfChild().method(1);
		
		expect(b).toBe(1);
	});
});
	