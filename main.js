var mainState = {
  preload: function(){
      game.load.image('bird2', 'assets/bird2.png');
      game.load.image('brick', 'assets/brick.png');
  },
  create: function(){
    this.bricks = game.add.group();
    game.stage.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bird2 = game.add.sprite(100, 245, 'bird2');
    game.physics.arcade.enable(this.bird2);
    this.bird2.body.gravity.y=2000;
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    spaceKey.onDown.add(this.jump, this);
    this.timer = game.time.events.loop(1500, this.addRowOfbricks, this);
    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0",
            {font: "30px Arial", fill:"#ffffff"});
  },
  addOnebrick: function(x, y){
    var brick = game.add.sprite(x, y, 'brick');
    this.bricks.add(brick);
    game.physics.arcade.enable(brick);
    brick.body.velocity.x = -300;
    brick.checkWorldBounds = true;
    brick.outOfBoundsKill = true;
  },
  addRowOfbricks: function(){
    this.score += 1;
    this.labelScore.text = this.score;
    var hole=Math.floor(Math.random()*8)+2;
    for(var i=0; i<15; i++)
      if(i!= hole && i !=hole+1)
        this.addOnebrick(400, i*42);
  },
  update: function(){
    game.physics.arcade.overlap(
      this.bird2, this.bricks, this.restartGame, null, this);
    if(this.bird2.y < 0 || this.bird2.y > 490)
        this.restartGame();
  },
  jump: function(){
    this.bird2.body.velocity.y = -650;
  },
  restartGame: function(){
    game.state.start('main');
  }
};
var game = new Phaser.Game(400, 490);
game.state.add('main',mainState);
game.state.start('main');
