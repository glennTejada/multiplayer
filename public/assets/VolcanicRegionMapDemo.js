class VolcanicRegionMapDemo extends Phaser.Scene {
    constructor() {
        super();
        this.players = {};

    }
    preload() {
        this.load.image('bg', '/assets/VolcanicRegion.png');

        this.load.image('block', '/assets/character.png');
    }

    create() {
        //  Set the camera and physics bounds to be the size of bg images
        this.cameras.main.setBounds(0, 0, 2000, 2000);
        this.physics.world.setBounds(0, 0, 2000, 2000);

        // create our background
        this.add.image(0, 0, 'bg').setOrigin(0);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.image(400, 300, 'block');
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update() {

        this.player.setVelocity(0);

        if (the_data.type == "new_player") {
            myID = the_data.content.id;
            for (var i = 0; i < the_data.content.players.length; i++) {
                this.players[the_data.content.players[i]] = this.physics.add.image(400, 300, 'block');
            }
            the_data.type = "";
        }

        if (the_data.type == "joined") {
            this.players[the_data.content.id] = this.physics.add.image(400, 300, 'block');
            the_data.type = "";
        }

        if (the_data.type == "move") {
            var values = the_data.content.split(',');
            console.log(this.players);
            try {

                this.players[values[0]].x = parseInt(values[1]);
                this.players[values[0]].y = parseInt(values[2]);
            }
            catch (err) {
            } 
            the_data.type = "";
        }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            send_now(this.player.x + "," + this.player.y);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            send_now(this.player.x + "," + this.player.y);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
            send_now(this.player.x + "," + this.player.y);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
            send_now(this.player.x + "," + this.player.y);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'volcanic_region_map',
    physics: {
        default: 'arcade',
    },
    scene: [VolcanicRegionMapDemo]
};

const game = new Phaser.Game(config);

