import Phaser from 'phaser';
import JumperDude from '../Js/JumperDude';
import PlayerLaser from '../Js/PlayerLaser';
import Player from '../Js/Player';
import LaserGroup from '../Js/LaserGroup'
// import Enemy from '../Js/Enemy';


// let player;
let monster;
let mon1;
let mon2;
let monsters;
let cursors;
let speedX =385;
let gameOver = false;
let score=0;
let blast;




const backgroundCreatorForest1=(scene,count,texture,scrollFactor,coordY) => {
    let x=0
    
    for(let i=0;i<count;i++){
       const m= scene.add.image(x, scene.scale.height ,texture).setScale(1.3).setScrollFactor(scrollFactor);
       x+=m.width
    }
}   

const damage = (player, monster) =>{
    player.setTint(0xff0000);
    player.body.setVelocity(0, 0);
    monster.body.setVelocity(0, 0);
  
    gameOver = true;
}




const enemyMoves=(mon,count)=>{
    for(let i=0;i<count;i++){
        mon.setVelocity(Phaser.Math.Between(-50, -200), 20);
    }
    count++
    
    

}

// const backgroundCreatorGround2=(scene,count,texture,scrollFactor,coordY) => {
//     let x=0
    
//     for(let i=0;i<count;i++){
//        const m= scene.add.image(x, scene.scale.height * 0.97,texture).setScale(1.6).setScrollFactor(scrollFactor);
//        x+=m.width*0.80
//     }
// }
    

export default class GameScene extends Phaser.Scene {
    constructor() {
      super('Game');
      this.laserGroup
    }
    

    preload(){
        
        

    }
     
    create(){
        let groundX=0
        let groundY=589
        let platforms = this.physics.add.staticGroup();
       
        const backgroundCreatorGround=(scene,count,texture,scrollFactor) => {
            let y=0
            
            for(let j=0;j<count;j++){
               let g= platforms.create(groundX, groundY,texture).setScale(2).refreshBody();
               let body = g.body
               body.updateFromGameObject()
               y+=g.width
               groundX+=4240            
            }
        }
        const width=this.scale.width;
        const height=this.scale.height;
       

        this.add.image(width * 0.5, height * 0.5, 'moon').setScale(0.6,0.6).setScrollFactor(0);
        this.add.image(0,height,'clouds').setScale(0.5,0.5).setOrigin(0,1.2).setScrollFactor(0);
        backgroundCreatorForest1(this,10,'forest1',0.25);
        backgroundCreatorForest1(this,10,'forest2',0.35);
        backgroundCreatorForest1(this,10,'forest3',0.50);
       
        backgroundCreatorGround(this,4,'ground');
        this.cameras.main.setBounds(0,0,60000,height);
        
       
        
        this.player = new Player({scene:this,
            x: 400,
            y: 100, 
            key:'stand'
        });
       
        this.laserGroup=new LaserGroup(this);
        
        // blast = new PlayerLaser(this);
        // blast=new PlayerLaser({scene:this,
        //     x:player.x+20,
        //     y:player.y+20,
        //     key:'blast',
        // })
        
        //  blast.setSize(260,337)
        // attackInterval=() =>{
        //     this.timer = false;
        //     this.time.addEvent({
        //       delay: 10,
        //       repeat: 0,
        //       callbackScope: this,
        //       callback() {
        //         // eslint-disable-next-line no-undef
        //         Phaser.Actions.Call(PlayerLaser => {
        //           child.active = false;
        //           this.time.addEvent({
        //             delay: 500,
        //             repeat: 0,
        //             callbackScope: this,
        //             callback() {
        //               this.timer = true;
        //               child.disableBody(true, true);
        //             },
        //           });
        //         });
        //       },
        //     });
        //   }
       
       
        // player.body.checkCollision.up = false
        this.physics.add.collider(platforms, this.player);
        
        const monsters = this.physics.add.group();
        this.physics.add.collider(monsters, platforms);
        
        
        // this.JumperDude=this.add.group();
        // mon2 =this.JumperDude.get()
        mon2=new JumperDude({
            scene: this,
            x: 3900,
            y: 16,
            key: 'dude',
        })
        
        this.physics.add.collider(mon2, this.player,damage,null,this);
        this.physics.add.collider(platforms,mon2);
        
        mon2.setBounce(2400,0,5900,height);

      
        this.physics.add.collider(platforms,blast);
       
        this.enemies = this.add.group();
        // this.playerLasers = this.add.group();
       
        // player.setBounce(0,0,60000,height);
        // this.physics.add.sprite(240, 320, 'star');
        this.cameras.main.startFollow(this.player);
        

        
        cursors = this.input.keyboard.createCursorKeys();
        this.keyQ=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        this.anims.create({
            key: 'blast',
            frames: this.anims.generateFrameNumbers('blast', { start: 3, end: 5 }),
            frameRate: 7,
            repeat: -1
        }); 
        this.anims.create({
            key: 'attackD',
            frames: this.anims.generateFrameNumbers('attackD', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'dash',
            frames: [{ key: 'dash', frame: 10 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('stand', { start: 47, end: 49 }),
            frameRate: 5
        });
        this.anims.create({
            key: 'slash',
            frames: this.anims.generateFrameNames('slash', {frames:[1,2,3,4,5,6,7,8]}),
            frameRate: 10
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('walk', {frames:[6,7,8,9,6,5,4,3]}),
            frameRate: 10,
            yoyo:true,
            repeat: -1
        });
    
        this.anims.create({
            key: 'jump',
            frames:  this.anims.generateFrameNumbers('jump', { start: 39, end: 42 }),
            frameRate: 5,    
        }); 
        this.anims.create({
            key: 'look',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 10,
        });
        this.anims.create({
            key: 'dudeleft',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
      
        // this.anims.create({
        //     key: 'duderight',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        //     frameRate: 10,
        //     repeat: -1,
        // });
        // this.laserGroup.anims.play('blast')
        
             
    }
    
    update(){
        
    const onGround = this.player.body.touching.down;
    this.player.update();
    mon2.update()
    
    
    if (gameOver) {
        this.physics.pause();
        this.scene.stop('Game');
        this.scene.start('GameOver');
        
        gameOver = false;
        score = 0;
    }
    if (cursors.left.isDown&& onGround)
    {
        this.player.setVelocityX(-460);
      
        this.player.flipX = true;
        this.player.anims.play('right', true);

    }
    else if (cursors.right.isDown && onGround)
    {
        this.player.setVelocityX(460);
       
        this.player.flipX = false;
        this.player.anims.play('right', true);
    }
    else if (cursors.right.isDown){
        this.player.setVelocityX(speedX);
        
        this.player.flipX = false;
        this.player.anims.play('jump', true);
    }
    else if (cursors.left.isDown){
        this.player.setVelocityX(-speedX);
        
        this.player.flipX = true;
        this.player.anims.play('jump', true);
    }
    else if (cursors.down.isDown){
        this.player.setVelocityY(550);
    }
    else if (cursors.down.isDown&&onGround){
        
        this.player.anims.play('down', true);
    }

    
    
    else if (this.keyW.isDown ){
       
        this.player.anims.play('slash',true);
        
        
    }
    else if (this.keyE.isDown){
        // this.player.anims.stop('right');
        // 
        this.laserGroup.fireLaser(this.player.x,this.player.y-25)
        this.player.anims.play('attackD');
        // blast(this,this.player.x,this.player.y,'blast')
        // blast.anims.play('blast')
        // blast.setVelocityX(550);

           
    }
 

    else if(onGround)
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn', true);
    }
    else if(!onGround)
    {
        this.player.setVelocityX(0);

        this.player.anims.play('jump', true);
    }

    if (cursors.up.isDown&&onGround)
    {   
        
        this.player.setVelocityY(-470);
        
    }
    
    if (this.keyQ.isDown &&this.player.flipX===true){
        this.player.anims.stop('right')
        this.player.anims.play('dash',true);
        this.player.setVelocityX(-670*3);
        
    }
    if (this.keyQ.isDown &&this.player.flipX===false){
        this.player.anims.stop('right')
        this.player.anims.play('dash',true);
        this.player.setVelocityX(670*3);
        
    }
   
    if(this.player.y>this.scale.height){
        this.physics.pause();
        this.player.setTint(0xff0000);
        this.scene.stop('Game');
        this.scene.start('GameOver');
    }
        
    }
    
}    



