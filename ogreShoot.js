AFRAME.registerComponent("ogre-fireball", {
    init: function () {
        setInterval(this.shootOgreBullet, 2000)
    },
    shootOgreBullet: function () {

        var els = document.querySelectorAll(".ogre");

        for (var i = 0; i < els.length; i++) {           

            var ogreFireball = document.createElement("a-entity");

            ogreFireball.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            ogreFireball.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            ogreFireball.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(ogreFireball);


            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            var direction = new THREE.Vector3();

            direction.subVectors(position1, position2).normalize();

            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));

            ogreFireball.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);

            ogreFireball.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    if (playerLife > 0) {
                        playerLife -= 1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }
                    if (playerLife <= 0) {
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible", true);
                    
                        var ogreEl = document.querySelectorAll(".ogre")

                        for (var i = 0; i < ogreEl.length; i++) {
                            scene.removeChild(ogreEl[i])

                        }
                    }

                }
            });
            
        }
    },

});

