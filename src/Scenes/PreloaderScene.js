import Phaser from 'phaser';
import moon from '../assets/moon.png';
import clouds from '../assets/clouds.png';
import forest1 from '../assets/forest1.png';
import forest2 from '../assets/forest2.png';
import forest3 from '../assets/forest3.png'
import hills from '../assets/hills.png';
import ground from '../assets/ground.png';
import ground2 from '../assets/ground2.png';
import shooter from '../assets/shooter2.png';
import shooterRun from '../assets/Robokid_Run_Blue.png';
import shooterJump from '../assets/Robokid_Jump_Blue.png';
import shooterStand from '../assets/Robokid_Idle_Blue.png';
import shooterSlash from '../assets/Robokid_Slash_Blue.png';
import shooterDash from '../assets/Robokid_Dash_Blue.png';
import button from '../assets/button.png';
import button2 from '../assets/button2.png';
import star from '../assets/star.png';
import bomb from '../assets/bomb.png';





export default class PreloaderScene extends Phaser.Scene {
    constructor() {
      super('Preloader')

    };

    init() {
        this.readyCount = 0;
    }

    

    preload() {
        const width = this.scale.width * 0.5;
        const height = this.scale.height * 0.5;
        this.add.image(width, height, 'logo').setScale(1.3, 1.4);
        
        this.load.image('button',button);
        this.load.image('button2',button2);
        this.load.image('moon',moon);
        this.load.image('clouds',clouds);
        this.load.image('forest1',forest1);
        this.load.image('forest2',forest2);
        this.load.image('forest3',forest3);
        this.load.image('hills',hills);
        this.load.image('ground',ground);
        this.load.image('star',star);
        this.load.image('bomb',bomb);
        this.load.spritesheet('walk', 
        shooterRun,
        { frameWidth:165.5, frameHeight: 208,spacing:17,
           margin:0}
        );
        this.load.spritesheet('jump', 
            shooterJump,
            { frameWidth:139.4, frameHeight: 208,margin:2,
                spacing:12.2}
        );
        this.load.spritesheet('stand', 
            shooterStand,
            { frameWidth:130.4, frameHeight: 208,margin:0,
                spacing:15.2}
        );
        this.load.spritesheet('dash', 
            shooterDash,
            { frameWidth:310.4, frameHeight: 208,margin:7,
                spacing:8.2}
        );
        this.load.spritesheet('slash', 
            shooterSlash,
            { frameWidth:296, frameHeight: 208,margin:99,
                spacing:13.2}
        );
        


       
        

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 1.78, 270, 320, 50);
        const loadingText = this.make.text({
          x: width,
          y: height - 50,
          text: 'Loading...',
          style: {
            font: '20px monospace',
            fill: 'white',
          },
        });
        loadingText.setOrigin(0.5, 0.5);
    
        const percentText = this.make.text({
          x: width - 25,
          y: height - 5,
          text: '0%',
          style: {
            font: '18px monospace',
            fill: 'white',
          },
        });
        percentText.setOrigin(0.5, 0.5);
    
        const assetText = this.make.text({
          x: width,
          y: height + 50,
          text: '',
          style: {
            font: '18px monospace',
            fill: 'white',
          },
        });
        assetText.setOrigin(0.5, 0.5);
        this.load.on('progress', (value) => {
            percentText.setText(`${parseInt(value * 100, 10)}%`);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 1.7, 280, 300 * value, 30);
          });
      
          this.load.on('fileprogress', (file) => {
            assetText.setText(`Loading asset: ${file.key}`);
          });
      
          this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.ready();
          });
      
          this.timedEvent = this.time.delayedCall(2850, this.ready, [], this);
        }
      
        ready() {
          this.readyCount += 1;
          if (this.readyCount === 2) {
            this.scene.start('Menu');
        }
    
    
    }

    
   

    

}