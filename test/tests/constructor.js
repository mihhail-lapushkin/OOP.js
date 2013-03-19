describe('Constructor functionality:', function() {
	it('constructor works', function() {
		var b = 0;
		var Child = Base.extend({
			init: function(a) {
				b = a;
			}
		});
		
		new Child(1);
		
		expect(b).toBe(1);
	});
	
	it('calling super constructors works', function() {
		var b = 0;
		var Child = Base.extend({
			init: function(a) {
				b = a;
			}
		});
		
		var ChildOfChild = Child.extend({
			init: function(a) {
				this._super(a);
			}
		});
		
		var ChildOfChildOfChild = ChildOfChild.extend({
			init: function(a) {
				this._super(a);
			}
		});
		
		new ChildOfChildOfChild(1);
		
		expect(b).toBe(1);
	});
});
	