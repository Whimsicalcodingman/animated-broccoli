import { Component, ElementRef, OnInit, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-background-animation-three',
  standalone: true,
  templateUrl: './background-animation-three.component.html',
  styleUrls: ['./background-animation-three.component.scss'],
})
export class BackgroundAnimationThreeComponent implements OnInit, AfterViewInit {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private plane!: THREE.Mesh;
  private clock = new THREE.Clock();

  private mouseX = 0;
  private mouseY = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initThree();
    this.addGridPlane();
    this.animate();
  }

  private initThree() {
    const container = this.elementRef.nativeElement.querySelector('#threejs-container');

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.position.set(20, 50, 20); // Adjusted perspective
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  private addGridPlane() {
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: 0x888888,
      wireframe: true,
      opacity: 0.3, // Slight transparency
      transparent: true,
    });

    this.plane = new THREE.Mesh(planeGeometry, material);
    this.plane.rotation.x = -Math.PI / 2;

    this.updatePlaneVertices();

    this.scene.add(this.plane);
  }

  private updatePlaneVertices() {
    const geometry = this.plane.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes['position'] as THREE.BufferAttribute;

    for (let i = 0; i < positions.count; i++) {
      const z = Math.random() * 10 - 5; // Subtle depth variation
      positions.setZ(i, z);
      (positions as any)._myZ = z; // Store original Z positions
    }

    positions.needsUpdate = true;
  }

  private animate = () => {
    const elapsedTime = this.clock.getElapsedTime();
    const geometry = this.plane.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes['position'] as THREE.BufferAttribute;
  
    // Wave animation for the grid
    for (let i = 0; i < positions.count; i++) {
      const originalZ = (positions as any)._myZ || 0;
      const wave = Math.sin(elapsedTime * 2 + i * 0.25) * 2; // Subtle wave
      positions.setZ(i, originalZ + wave);
    }
  
    positions.needsUpdate = true;
  
    // Subtle parallax effect
    const parallaxFactor = 0.02; // Scale for subtler movements
    const tiltFactor = 0.035; // Scale for subtler camera tilts
  
    // Calculate target positions
    const targetX = this.mouseX * 70 * parallaxFactor;
    const targetZ = this.mouseY * 70 * parallaxFactor;
  
    // Smoothly move the camera
    this.camera.position.x += (targetX - this.camera.position.x) * 0.05; // Horizontal parallax
    this.camera.position.z += (targetZ - this.camera.position.z) * 0.05; // Vertical parallax
  
    // Smoothly tilt the camera (more subtle near center)
    this.camera.rotation.x += ((-this.mouseY * tiltFactor) - this.camera.rotation.x) * 0.05;
    this.camera.rotation.z += ((this.mouseX * tiltFactor) - this.camera.rotation.z) * 0.05;
  
    // Keep the camera looking at the center
    this.camera.lookAt(new THREE.Vector3(20, 20, 20));
  
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
  

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = (event.clientX / window.innerWidth) * 5 - 1;
    this.mouseY = -(event.clientY / window.innerHeight) * 5 + 1;
  }
}
