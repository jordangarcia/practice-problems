function Philo(pos) {
	this.pos = pos;
	this.eating = false;
	this.ate = false;

	this.eat = function(fork1, fork2, cb) {
		if (fork1 === fork2) {
			throw "Must use two unique forks";
		}
		if (fork1.inUse || fork2.inUse) {
			throw "Fork in use";
		}

		// use the forks to eat
		fork1.inUse = true;
		fork2.inUse = true;
		this.eating = true;

		setTimeout(function() {
			// finished eating
			fork1.inUse = false;
			fork2.inUse = false;
			this.eating = false;
			this.ate = true;
			// done eating
			cb(this);
		}.bind(this), 1000);
		console.log('Philosopher #%d eating with fork %d and fork %d', this.pos, fork1.pos, fork2.pos);
	};
}

function Fork(pos) {
	this.pos = pos;
	this.inUse = false;
}

function genTable(n) {
	var table = {
		size: n,
		philos: [],
		forks: []
	};

	for (var i = 0; i < n; i++) {
		table.philos.push(new Philo(i));
		table.forks.push(new Fork(i));
	}

	return table;
}

function Butler(table, finishCb) {
	// checks if a philo can eat
	function canEat(table, philo) {
		return (
			!philo.ate &&
			!leftFork(table, philo.pos).inUse &&
			!rightFork(table, philo.pos).inUse
		);
	}

	function leftFork(table, pos) {
		return table.forks[pos];
	}

	function rightFork(table, pos) {
		return table.forks[(pos + 1) % table.size];
	}

	function feed(table) {
		var finished = true;
		table.philos.forEach(function(philo, index) {
			if (philo.eating || !philo.ate) {
				finished = false;
			}
			if (canEat(table, philo)) {
				philo.eat(leftFork(table, philo.pos), rightFork(table, philo.pos), function() {
					feed(table);
				});
			}
		});
		if (finished) {
			finishCb();
		}
	}

	feed(table);
}

var butler = new Butler(genTable(99), function() {
	console.log('all finished');
});
