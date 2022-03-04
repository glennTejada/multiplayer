class VolcanicRegionMapDemo extends Phaser.Scene {
    constructor() {
        super();
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

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
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

