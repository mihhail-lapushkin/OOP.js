/* 
 * OOP.js
 * By Mihhail Lapushkin
 * MIT Licensed
 * 
 * Based on:
 * Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * 
 * http://ejohn.org/blog/simple-javascript-inheritance/
 * 
 * Inspired by base2 and Prototype
 */
(function(){
	var initializing, fnTest = /x/.test(function(){x;}) ? /\b_super\b/ : /.*/;
 
	// The Base class implementation (does nothing)
	Base = function() {};
 
	// Create a new class that inherits from this class
	Base.extend = function(newClassProps) {
		var SuperClass = this;
		var superClassProto = SuperClass.prototype;
   
		// Instantiate a base class (but only create the instance, don't run the init constructor)
		initializing = true;
		var newClassProto = new SuperClass();
		initializing = false;
    
		// Extract static variables
		var newClassStaticProps = newClassProps.statics;
		delete newClassProps.statics;
   
		// Copy the properties over onto the new prototype
		for (var prop in newClassProps) {
			newClassProto[prop] = 
				// Check if we're overwriting an existing function
				typeof newClassProps[prop] == 'function' && typeof superClassProto[prop] == 'function'
				// And that the overwritten function is calling a _super method
				&& fnTest.test(newClassProps[prop])
			? // Proxy the call to super-method
				(function(prop, fn){
					return function() {
						// backup in case there is a real value in this property
						var tmp = this._super;
	           
						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = superClassProto[prop];
	           
						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
	            
						// restore the value
						this._super = tmp;
	           
						return ret;
					};
				})(prop, newClassProps[prop])
			: // Just return the value
				newClassProps[prop];
		}
   
		// The dummy class constructor
		function NewClass() {
			// All construction is actually done in the init method
			if (!initializing && this.init) this.init.apply(this, arguments);
		}
    
		// Copy the static properties over onto the new class
		// First of all parent properties
		for (var prop in SuperClass) NewClass[prop] = SuperClass[prop];
		// And then new class properties
		if (newClassStaticProps) for (var prop in newClassStaticProps) NewClass[prop] = newClassStaticProps[prop];
   
		// Populate our constructed prototype object
		NewClass.prototype = newClassProto;
   
		// Enforce the constructor to be what we expect
		NewClass.prototype.constructor = NewClass;
 
		// And make this class extendable
		NewClass.extend = arguments.callee;
   
		return NewClass;
	};
})();