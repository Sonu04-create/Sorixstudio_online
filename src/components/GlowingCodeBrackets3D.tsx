import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GlowingCodeBrackets3DProps {
  className?: string;
  variant?: 'badge' | 'hero-card';
  accentColor?: string;
}

export function GlowingCodeBrackets3D({
  className = '',
  variant = 'badge',
  accentColor = '#ef4444',
}: GlowingCodeBrackets3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'red' | 'cyan' | 'gold' | 'purple'>('red');

  // Map theme names to color hex
  const themeColors = {
    red: '#ef4444',
    cyan: '#06b6d4',
    gold: '#f59e0b',
    purple: '#8b5cf6',
  };

  const currentColorHex = themeColors[activeTheme] || accentColor;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const isBadge = variant === 'badge';
    const width = isBadge ? 48 : (container.clientWidth || 420);
    const height = isBadge ? 48 : (container.clientHeight || 420);

    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isBadge ? 5.6 : 6.5;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Group setup for brackets
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 5. Create 3D Bracket Geometries
    // Extrude settings for metallic 3D volume & smooth bevels
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      steps: 2,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.05,
      bevelSegments: 5,
    };

    // Left Bracket <
    const shapeLeft = new THREE.Shape();
    shapeLeft.moveTo(0.5, 0.95);
    shapeLeft.lineTo(-0.55, 0.0);
    shapeLeft.lineTo(0.5, -0.95);
    shapeLeft.lineTo(0.85, -0.65);
    shapeLeft.lineTo(-0.05, 0.0);
    shapeLeft.lineTo(0.85, 0.65);
    shapeLeft.closePath();
    const geomLeft = new THREE.ExtrudeGeometry(shapeLeft, extrudeSettings);
    geomLeft.center();

    // Slash /
    const shapeSlash = new THREE.Shape();
    shapeSlash.moveTo(-0.25, -1.05);
    shapeSlash.lineTo(0.12, 1.05);
    shapeSlash.lineTo(0.42, 1.05);
    shapeSlash.lineTo(0.05, -1.05);
    shapeSlash.closePath();
    const geomSlash = new THREE.ExtrudeGeometry(shapeSlash, extrudeSettings);
    geomSlash.center();

    // Right Bracket >
    const shapeRight = new THREE.Shape();
    shapeRight.moveTo(-0.5, 0.95);
    shapeRight.lineTo(0.55, 0.0);
    shapeRight.lineTo(-0.5, -0.95);
    shapeRight.lineTo(-0.85, -0.65);
    shapeRight.lineTo(0.05, 0.0);
    shapeRight.lineTo(-0.85, 0.65);
    shapeRight.closePath();
    const geomRight = new THREE.ExtrudeGeometry(shapeRight, extrudeSettings);
    geomRight.center();

    // 6. Metallic Materials
    const metalColor = new THREE.Color('#384152');
    const accentColorThree = new THREE.Color(currentColorHex);

    // Chrome/Dark Metallic Alloy Material
    const metallicMaterial = new THREE.MeshStandardMaterial({
      color: metalColor,
      metalness: 0.92,
      roughness: 0.18,
      wireframe: false,
    });

    // Glowing Neon Edge Core Material
    const glowMaterial = new THREE.MeshStandardMaterial({
      color: accentColorThree,
      emissive: accentColorThree,
      emissiveIntensity: 1.4,
      metalness: 0.2,
      roughness: 0.1,
    });

    // Wireframe Overlay for High-Tech Cyber Aesthetic
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: accentColorThree,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // Create Mesh Pairs for Left, Slash, Right
    const meshLeftMetal = new THREE.Mesh(geomLeft, metallicMaterial);
    const meshLeftWire = new THREE.Mesh(geomLeft, wireframeMaterial);
    const leftGroup = new THREE.Group();
    leftGroup.add(meshLeftMetal, meshLeftWire);
    leftGroup.position.x = -1.45;

    const meshSlashMetal = new THREE.Mesh(geomSlash, metallicMaterial);
    const meshSlashGlow = new THREE.Mesh(geomSlash, glowMaterial);
    meshSlashGlow.scale.set(0.96, 0.96, 0.96);
    const slashGroup = new THREE.Group();
    slashGroup.add(meshSlashMetal, meshSlashGlow);
    slashGroup.position.x = 0;

    const meshRightMetal = new THREE.Mesh(geomRight, metallicMaterial);
    const meshRightWire = new THREE.Mesh(geomRight, wireframeMaterial);
    const rightGroup = new THREE.Group();
    rightGroup.add(meshRightMetal, meshRightWire);
    rightGroup.position.x = 1.45;

    mainGroup.add(leftGroup, slashGroup, rightGroup);

    // 7. Lighting setup (Dynamic Metallic Specular Glints & Neon Glow)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 5, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x4060ff, 1.8);
    dirLight2.position.set(-5, -5, -4);
    scene.add(dirLight2);

    // Orbiting Glowing Point Lights
    const neonPointLight = new THREE.PointLight(accentColorThree, 6, 12);
    scene.add(neonPointLight);

    const secondaryPointLight = new THREE.PointLight(0x7c3aed, 4, 10);
    scene.add(secondaryPointLight);

    // 8. Particle System (Orbiting Metallic Code Sparks)
    const particleCount = variant === 'badge' ? 60 : 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      scales[i] = Math.random() * 0.05 + 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: accentColorThree,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 9. Mouse interaction & animation state
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 1.4;
      targetMouseY = y * 1.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 10. Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Mouse Movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Group Floating & Rotations
      mainGroup.rotation.y = Math.sin(elapsedTime * 0.7) * 0.2 + mouseX * 0.8;
      mainGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.12 - mouseY * 0.6;
      mainGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.18;

      // Interactive hover pulse - separate brackets along Z & X axis on hover
      const expandTarget = isHovered ? 0.4 : 0;
      leftGroup.position.z += (-expandTarget - leftGroup.position.z) * 0.1;
      leftGroup.position.x += ((-1.45 - expandTarget * 0.3) - leftGroup.position.x) * 0.1;

      rightGroup.position.z += (expandTarget - rightGroup.position.z) * 0.1;
      rightGroup.position.x += ((1.45 + expandTarget * 0.3) - rightGroup.position.x) * 0.1;

      slashGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.08;

      // Move orbiting neon point light
      neonPointLight.position.x = Math.sin(elapsedTime * 1.8) * 3;
      neonPointLight.position.y = Math.cos(elapsedTime * 1.5) * 2;
      neonPointLight.position.z = Math.cos(elapsedTime * 2) * 2.5 + 2;

      secondaryPointLight.position.x = Math.cos(elapsedTime * 1.2) * 3;
      secondaryPointLight.position.y = Math.sin(elapsedTime * 1.8) * 2;
      secondaryPointLight.position.z = Math.sin(elapsedTime * 1.5) * 2;

      // Rotate particle field
      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.x = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      if (!container || !canvas || variant === 'badge') return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geomLeft.dispose();
      geomSlash.dispose();
      geomRight.dispose();
      metallicMaterial.dispose();
      glowMaterial.dispose();
      wireframeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [variant, currentColorHex, isHovered]);

  return (
    <div
      ref={containerRef}
      className={`glowing-code-brackets-container ${variant === 'badge' ? 'is-badge' : 'is-hero-card'} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="brackets-3d-glow-backdrop" style={{ '--glow-color': currentColorHex } as React.CSSProperties} />
      <canvas ref={canvasRef} className="brackets-3d-canvas" />

      {variant === 'hero-card' && (
        <div className="brackets-3d-overlay-card">
          <div className="brackets-card-header">
            <span className="brackets-pill">3D METALLIC SYMBOLS</span>
            <div className="theme-color-picker">
              {(['red', 'cyan', 'gold', 'purple'] as const).map((t) => (
                <button
                  key={t}
                  className={`color-dot color-dot-${t} ${activeTheme === t ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTheme(t);
                  }}
                  title={`Switch glow color to ${t}`}
                />
              ))}
            </div>
          </div>

          <div className="brackets-card-body">
            <h3>Custom Metallic &lt; / &gt; Engine</h3>
            <p>Interactive 3D WebGL code brackets with metallic chrome reflections &amp; real-time neon emission cast.</p>
          </div>

          <div className="brackets-card-footer">
            <span>Hover / Drag to rotate in 3D</span>
            <span className="status-live-dot">LIVE 3D</span>
          </div>
        </div>
      )}

      {variant === 'badge' && (
        <div className="badge-caption">
          <span className="crystal-tag">&lt;/&gt; 3D METALLIC CODE</span>
        </div>
      )}
    </div>
  );
}
