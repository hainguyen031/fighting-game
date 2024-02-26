const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

function start() {
    audio.play();
    animate();
    decreaseTimer();
    document.getElementById('total').style.display = "inline-block";
    document.querySelector("button").style.display = "none";
}

// Sound Game
let audio = new Audio('./sound/DVRST  YOUR NAME.mp3');
let soundKnight = new Audio('./sound/sound-guom-dam.mp3');
let soundWizard = new Audio('./sound/sound-phep.mp3');
let soundWinner = new Audio('./sound/Tieng-danh-cong-chieng-vang-vong-www_tiengdong_com.mp3');

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./img2/background2.png"
})

const player = new Fighter({
    position: {
        x: 50,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "./img2/Medieval King Pack/Idle.png",
    framesMax: 6,
    scale: 1.75,
    offset: {
        x: 100,
        y: 50
    },
    sprites: {
        idle: {
            imageSrc: "./img2/Medieval King Pack/Idle.png",
            framesMax: 6
        },
        run: {
            imageSrc: "./img2/Medieval King Pack/Run.png",
            framesMax: 8,
        },
        run2: {
            imageSrc: "./img2/Medieval King Pack/Run2.png",
            framesMax: 8,
        },

        jump: {
            imageSrc: "./img2/Medieval King Pack/Jump.png",
            framesMax: 3,
        },
        fall: {
            imageSrc: "./img2/Medieval King Pack/Fall.png",
            framesMax: 3,
        },
        attack1: {
            imageSrc: "./img2/Medieval King Pack/Attack_1.png",
            framesMax: 6,
        },
        takeHit: {
            imageSrc: "./img2/Medieval King Pack/Hit.png",
            framesMax: 4,
        },
        death: {
            imageSrc: "./img2/Medieval King Pack/Death.png",
            framesMax: 11,
        },

    },
    attackBox: {
        offset: {
            x: 50,
            y: 50
        },
        width: 100,
        height: 50
    }
    
})


const enemy = new Fighter({
    position: {
      x: 700,
      y: 100
    },
    velocity: {
      x: 0,
      y: 0
    },
    imageSrc: './img2/Evil Wizard/Sprites/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
      x: 215,
      y: 265
    },
    sprites: {
      idle: {
        imageSrc: './img2/Evil Wizard/Sprites/Idle.png',
        framesMax: 8
      },
      run: {
        imageSrc: './img2/Evil Wizard/Sprites/Run.png',
        framesMax: 8
      },
      run2: {
        imageSrc: './img2/Evil Wizard/Sprites/Run2.png',
        framesMax: 8
      },
      jump: {
        imageSrc: './img2/Evil Wizard/Sprites/Jump.png',
        framesMax: 2
      },
      fall: {
        imageSrc: './img2/Evil Wizard/Sprites/Fall.png',
        framesMax: 2
      },
      attack1: {
        imageSrc: './img2/Evil Wizard/Sprites/Attack1.png',
        framesMax: 8
      },
      takeHit: {
        imageSrc: './img2/Evil Wizard/Sprites/Take hit.png',
        framesMax: 3
      },
      death: {
        imageSrc: './img2/Evil Wizard/Sprites/Death.png',
        framesMax: 7
      }
    },
    attackBox: {
      offset: {
        x: -120,
        y: 50
      },
      width: 120,
      height: 50
    }
  })

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
}




function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    
    // player move
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
        player.switchSprite('run2'); 
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');  
    } else {
        player.switchSprite('idle');
    }

    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }
    
    // enemy move
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run2');
    } else {
        enemy.switchSprite('idle');
    }

    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }

    // detect for collision & enemy get hit
    if( rectangularCollision({
        rectangular1: player,
        rectangular2: enemy
        }) &&
        player.isAttacking && 
        player.framesCurrent === 4
        ) {
        enemy.takeHit()
        player.isAttacking = false;
        gsap.to('#enemyHealth', {
            width: enemy.health +'%'
        })
    }

    //if player missed
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }

    if( rectangularCollision({
        rectangular1: enemy,
        rectangular2: player
        }) &&
        enemy.isAttacking &&
        enemy.framesCurrent === 2
        ) {
        player.takeHit();
        enemy.isAttacking = false;
        gsap.to('#playerHealth', {
            width: player.health +'%'
        })

    }

    //if enemy missed
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }
    
    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
      determineWinner({ player, enemy, timerId })
    }
}




window.addEventListener('keydown' , (event) => {
    if (!player.death) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastKey ='d';
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey ='a';
                break;
            case 'w':
                player.velocity.y = -20;
                break;
            case ' ':
                player.attack();
                soundKnight.currentTime = 0;
                soundKnight.play();
                break;
        }
    }    

    if (!enemy.death) {
        switch (event.key) {
            //enemy keydown
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                enemy.velocity.y = -20;
                break;
            case 'ArrowDown':
                enemy.attack();
                soundWizard.currentTime = 0;
                soundWizard.play();
                break;
    
        }        
    }
})

window.addEventListener('keyup' , (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    //enemy keyUp
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})