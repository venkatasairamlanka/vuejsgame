var vm = new Vue({
	el: '#app',
	data : {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunningHere: false,
		turns: []
	},
	methods : {
		startGame: function() {
			this.gameIsRunningHere = true;
			this.monsterHealth = 100;
			this.playerHealth = 100;
			this.turns = [];
		},

		attack: function() {
			let damage = this.caluclateDamage(3, 10);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits monster for '+damage
			});
			if(this.checkWIn()) {
				return;
			}

			this.monsterAttack();
		},
		specialAttack: function() {
			let damage = this.caluclateDamage(10, 20);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits monster hard for '+damage
			});
			if(this.checkWIn()) {
				return;
			}

			this.monsterAttack();
		},
		heal: function() {
			if(this.playerHealth <= 90) {
				this.playerHealth += 10;
			} else {
				this.playerHealth = 100;
			}
			this.turns.unshift({
				isPlayer: true,
				text: 'Player heals for 10'
			});
			this.monsterAttack();

		},
		giveUp: function() {
			this.gameIsRunningHere = false;
		},
		monsterAttack: function() {
			let damage = this.caluclateDamage(5, 12);
			this.playerHealth -= damage;
			this.checkWIn();
			this.turns.unshift({
				isPlayer: false,
				text: 'monster hits Player for '+damage
			});
		},
		caluclateDamage: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWIn: function() {
			if(this.monsterHealth <= 0) {
				if(confirm("You won!. New game?")) {
					this.startGame();
				} else {
					this.gameIsRunningHere = false;
				}
				return true;
			} else if(this.playerHealth <= 0) {
				if(confirm("You Lost!. New game?")) {
					this.startGame();
				} else {
					this.gameIsRunningHere = false;
				}
				return true;
			}
			return false;
		}
	}
});