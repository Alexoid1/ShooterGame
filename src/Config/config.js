import 'phaser';
var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 630,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 520 },
            
        },
    },
   
};

export default config;