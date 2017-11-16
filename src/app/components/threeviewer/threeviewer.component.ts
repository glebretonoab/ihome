import { Component, ElementRef, OnInit, Input } from '@angular/core';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);
import { Study } from '../../models/study.model';

@Component({
    selector: 'threeviewer',
    templateUrl: './threeviewer.component.html'
})

export class ThreeviewerComponent implements OnInit {

  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  directionalLight: THREE.DirectionalLight;
  controls: any;
  hostElement: ElementRef;
  radius:number = 300;
  @Input() study: Study;

  constructor(private el:ElementRef) {
      this.hostElement = this.el;
  }

  ngOnInit() {
      console.log(this.study);
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
      this.camera.up = new THREE.Vector3(0,0,1);

      this.renderer = new THREE.WebGLRenderer({alpha: true});
      this.hostElement.nativeElement.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			this.controls.autoRotate = true;
			this.controls.enablePan = false;
			this.controls.minDistance = 200;
			this.controls.maxDistance = 600;
			this.controls.minPolarAngle = 0; // radians
			this.controls.maxPolarAngle =  5 * Math.PI / 12 ; // radians

			this.directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1);
			this.directionalLight.position.set(0,-1,0);
			this.scene.add(this.directionalLight);

			var light = new THREE.AmbientLight(0x404040, 2); // soft white light
			this.scene.add(light);

      var geometry = new THREE.BoxGeometry(100, 100, 100);
      var geometry = new THREE.BoxGeometry(250, 250, 250);
			var material = new THREE.MeshBasicMaterial({
        color: 0X005faa,
        wireframe: true
      });
			var cube = new THREE.Mesh(geometry, material);
			this.scene.add(cube);

      this.camera.position.set(this.radius, this.radius, this.radius);
			this.controls.target.set = cube.position;

      let _self = this;
      let animate = function() {
    		requestAnimationFrame(animate);
    		_self.controls.update();
    		_self.renderer.render(_self.scene, _self.camera);
    	};

			animate();
  }
}
