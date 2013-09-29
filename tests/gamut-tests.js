var expect = chai.expect;

describe("Color Average Analysis", function(){
	it("average color of red image should be red", function(done){

		gamut('tests/test-images/red.bmp').onComplete(function(data){
			expect(data.average.red).equal(100);
			expect(data.average.green).equal(0);
			expect(data.average.blue).equal(0);

			done();
		});
	});
	it("average color of green image should be green", function(done){
		
		gamut('tests/test-images/green.bmp').onComplete(function(data){
			expect(data.average.red).equal(0);
			expect(data.average.green).equal(100);
			expect(data.average.blue).equal(0);

			done();
		});
	});

	it("average color of blue image should be blue", function(done){
		
		gamut('tests/test-images/blue.bmp').onComplete(function(data){
			expect(data.average.red).equal(0);
			expect(data.average.green).equal(0);
			expect(data.average.blue).equal(100);

			done();
		});
	});

	it("average colors of 75-red-25-blue image should be 75% red, 25% blue", function(done){
		
		gamut('tests/test-images/75-red-25-blue.bmp').onComplete(function(data){
			expect(data.average.red).equal(75);
			expect(data.average.green).equal(0);
			expect(data.average.blue).equal(25);

			done();
		});
	});

	it("average brightness of white image should be 100%", function(done){
		
		gamut('tests/test-images/white.bmp').onComplete(function(data){
			expect(data.average.brightness).equal(100);
			done();
		});
	});

	it("average brightness of black image should be 0%", function(done){
		
		gamut('tests/test-images/black.bmp').onComplete(function(data){
			expect(data.average.brightness).equal(0);
			done();
		});
	});

});