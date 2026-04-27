'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface Task {
  id: string;
  title: string;
  agent: string;
  status: 'backlog' | 'in-progress' | 'review' | 'completed';
}

interface Agent {
  name: string;
  role: string;
  emoji: string;
  color: string;
  shirtColor: string;
  status: 'working' | 'idle' | 'break';
}

const AGENTS: Agent[] = [
  { name: 'MegaManager', role: 'Team Lead', emoji: '🤖', color: '#8b5cf6', shirtColor: '#8b5cf6', status: 'working' },
  { name: 'Designer', role: 'Website Designer', emoji: '🎨', color: '#3b82f6', shirtColor: '#3b82f6', status: 'working' },
  { name: 'SMM', role: 'Social Media', emoji: '🎬', color: '#10b981', shirtColor: '#10b981', status: 'working' },
  { name: 'MetaADS', role: 'Meta Ads', emoji: '🎯', color: '#f59e0b', shirtColor: '#f59e0b', status: 'idle' },
  { name: 'GoogleADS', role: 'Google Ads', emoji: '🔍', color: '#ef4444', shirtColor: '#ef4444', status: 'working' },
  { name: 'Youtube', role: 'YouTube Manager', emoji: '📺', color: '#f97316', shirtColor: '#f97316', status: 'working' },
  { name: 'LeadGen', role: 'Lead Generator', emoji: '🧲', color: '#6366f1', shirtColor: '#6366f1', status: 'idle' },
  { name: 'CRM', role: 'Sales & CRM', emoji: '📞', color: '#06b6d4', shirtColor: '#06b6d4', status: 'working' },
  { name: 'PhoneCaller', role: 'Phone Sales', emoji: '☎️', color: '#ec4899', shirtColor: '#ec4899', status: 'working' },
  { name: 'Copywriter', role: 'Copywriter', emoji: '✍️', color: '#84cc16', shirtColor: '#84cc16', status: 'idle' },
  { name: 'Email Marketing Manager', role: 'Email Marketing', emoji: '📧', color: '#e11d48', shirtColor: '#e11d48', status: 'working' },
  { name: 'AI Analyst', role: 'Data Science', emoji: '📊', color: '#0ea5e9', shirtColor: '#0ea5e9', status: 'working' },
  { name: 'Automation Engineer', role: 'Automation', emoji: '⚙️', color: '#14b8a6', shirtColor: '#14b8a6', status: 'idle' },
  { name: 'SEO Specialist', role: 'SEO Expert', emoji: '🔎', color: '#7c3aed', shirtColor: '#7c3aed', status: 'working' },
  { name: 'Customer Support Rep', role: 'Support', emoji: '🗣️', color: '#dc2626', shirtColor: '#dc2626', status: 'working' },
];

function MinecraftAgent({ agent, position, destination }: { agent: Agent; position: THREE.Vector3; destination: THREE.Vector3 }) {
  const groupRef = useRef<THREE.Group>(null);
  const posRef = useRef(new THREE.Vector3(...position.toArray()));
  const destRef = useRef(destination.clone());
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const nextDestTimeRef = useRef(Math.random() * 8 + 4);
  const elapsedRef = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;

    // Movement towards destination
    const distance = posRef.current.distanceTo(destRef.current);
    
    if (distance > 0.3) {
      const direction = new THREE.Vector3().subVectors(destRef.current, posRef.current).normalize();
      const speed = 1.5;
      velocityRef.current.copy(direction).multiplyScalar(speed);
      posRef.current.add(velocityRef.current.clone().multiplyScalar(0.016));
    } else {
      velocityRef.current.multiplyScalar(0.8);
      posRef.current.add(velocityRef.current.clone().multiplyScalar(0.016));
    }

    groupRef.current.position.copy(posRef.current);

    // Pick new destination periodically
    elapsedRef.current += 0.016;
    if (elapsedRef.current > nextDestTimeRef.current) {
      elapsedRef.current = 0;
      nextDestTimeRef.current = Math.random() * 6 + 4;
      
      const rand = Math.random();
      if (rand < 0.4) {
        destRef.current.set(Math.random() * 20 - 10, 0, Math.random() * 16 - 8);
      } else if (rand < 0.8) {
        const pois = [
          new THREE.Vector3(8, 0, 6),
          new THREE.Vector3(-8, 0, 6),
          new THREE.Vector3(0, 0, -7),
          new THREE.Vector3(8, 0, -6),
          new THREE.Vector3(-8, 0, -6),
        ];
        destRef.current.copy(pois[Math.floor(Math.random() * pois.length)]);
      } else {
        destRef.current.set(Math.random() * 10 - 5, 0, Math.random() * 10 - 5);
      }
    }

    // Walking animation - arms and legs
    const time = Date.now() * 0.003;
    const walkSpeed = Math.min(velocityRef.current.length(), 1.5) / 1.5;
    
    groupRef.current.children.forEach((child) => {
      if (child.name === 'leftArm') {
        child.rotation.z = Math.sin(time * 2 + Math.PI) * 0.4 * walkSpeed;
      } else if (child.name === 'rightArm') {
        child.rotation.z = Math.sin(time * 2) * 0.4 * walkSpeed;
      } else if (child.name === 'leftLeg') {
        child.rotation.z = Math.sin(time * 2) * 0.3 * walkSpeed;
      } else if (child.name === 'rightLeg') {
        child.rotation.z = Math.sin(time * 2 + Math.PI) * 0.3 * walkSpeed;
      }
    });
  });

  const shirtColor = new THREE.Color(agent.shirtColor);
  const skinColor = new THREE.Color('#D4956A');

  return (
    <group ref={groupRef} position={position}>
      {/* Head */}
      <mesh position={[0, 1.3, 0]} name="head">
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.8, 0]} name="body">
        <boxGeometry args={[0.4, 0.8, 0.3]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.35, 0.85, 0]} name="leftArm">
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.35, 0.85, 0]} name="rightArm">
        <boxGeometry args={[0.15, 0.7, 0.15]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.15, 0.2, 0]} name="leftLeg">
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.15, 0.2, 0]} name="rightLeg">
        <boxGeometry args={[0.15, 0.6, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Name Tag - Better visibility with dark background */}
      <mesh position={[0, 2.1, 0.1]}>
        <planeGeometry args={[1.2, 0.4]} />
        <meshStandardMaterial color="#000000" emissive="#1a1a1a" />
      </mesh>
      <Text position={[0, 2.1, 0.15]} fontSize={0.25} color="#8b5cf6" anchorY="middle" anchorX="center">
        {agent.name}
      </Text>
    </group>
  );
}

function LogoPlane({ position, rotation }: { position: THREE.Vector3Tuple; rotation: THREE.Euler }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    // Create canvas texture with logo
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background
      ctx.fillStyle = '#F5F0E8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Border
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Logo text
      ctx.fillStyle = '#8b5cf6';
      ctx.font = 'bold 64px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("MAIRAJ'S", canvas.width / 2, canvas.height / 2 - 60);
      ctx.fillText('COMMAND', canvas.width / 2, canvas.height / 2 + 20);

      // Subtitle
      ctx.fillStyle = '#111127';
      ctx.font = '28px Arial';
      ctx.fillText('AI Team Mission Control', canvas.width / 2, canvas.height / 2 + 100);

      // Create texture
      const texture = new THREE.CanvasTexture(canvas);
      textureRef.current = texture;
    }
  }, []);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[3, 3]} />
      <meshStandardMaterial map={textureRef.current} emissive="#8b5cf6" emissiveIntensity={0.2} />
    </mesh>
  );
}

function Desk({ position, agentName, color }: { position: THREE.Vector3; agentName: string; color: string }) {
  return (
    <group position={position}>
      {/* Desk Surface */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Monitor Stand */}
      <mesh position={[0.6, 0.7, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.08]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Monitor Screen */}
      <mesh position={[0.6, 1.0, 0.05]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>

      {/* Label */}
      <Text position={[0, 1.5, 0]} fontSize={0.25} color="white" anchorY="bottom">
        {agentName}
      </Text>
    </group>
  );
}

function Office() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const deskPositions: { [key: string]: THREE.Vector3 } = {
    MegaManager: new THREE.Vector3(0, 0, 8),
    Designer: new THREE.Vector3(-8, 0, 7),
    SMM: new THREE.Vector3(8, 0, 7),
    MetaADS: new THREE.Vector3(-10, 0, -4),
    GoogleADS: new THREE.Vector3(10, 0, -4),
    Youtube: new THREE.Vector3(-6, 0, -8),
    LeadGen: new THREE.Vector3(6, 0, -8),
    CRM: new THREE.Vector3(-9, 0, 0),
    PhoneCaller: new THREE.Vector3(9, 0, 0),
    Copywriter: new THREE.Vector3(-4, 0, 2),
    'Email Marketing Manager': new THREE.Vector3(4, 0, 2),
    'AI Analyst': new THREE.Vector3(-3, 0, -5),
    'Automation Engineer': new THREE.Vector3(3, 0, -5),
    'SEO Specialist': new THREE.Vector3(0, 0, -3),
    'Customer Support Rep': new THREE.Vector3(-2, 0, 5),
  };

  const agentPositions = useMemo(() => {
    const positions: { [key: string]: THREE.Vector3 } = {};
    AGENTS.forEach(agent => {
      positions[agent.name] = deskPositions[agent.name]?.clone() || new THREE.Vector3(0, 0, 0);
    });
    return positions;
  }, []);

  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[24, 20]} />
        <meshStandardMaterial color="#F5F0E8" />
      </mesh>

      {/* Walls - Reduced height */}
      <mesh position={[0, 3, -10]}>
        <boxGeometry args={[24, 6, 0.2]} />
        <meshStandardMaterial color="#EEEADF" />
      </mesh>
      <mesh position={[0, 3, 10]}>
        <boxGeometry args={[24, 6, 0.2]} />
        <meshStandardMaterial color="#EEEADF" />
      </mesh>
      <mesh position={[-12, 3, 0]}>
        <boxGeometry args={[0.2, 6, 20]} />
        <meshStandardMaterial color="#EEEADF" />
      </mesh>
      <mesh position={[12, 3, 0]}>
        <boxGeometry args={[0.2, 6, 20]} />
        <meshStandardMaterial color="#EEEADF" />
      </mesh>

      {/* Logos on walls - Back wall (left side) */}
      <LogoPlane position={[-4, 3.5, -9.9]} rotation={new THREE.Euler(0, 0, 0)} />

      {/* Logos on walls - Back wall (right side) */}
      <LogoPlane position={[4, 3.5, -9.9]} rotation={new THREE.Euler(0, 0, 0)} />

      {/* Logo on left wall */}
      <LogoPlane position={[-11.9, 3.5, -4]} rotation={new THREE.Euler(0, Math.PI / 2, 0)} />

      {/* Logo on right wall */}
      <LogoPlane position={[11.9, 3.5, 4]} rotation={new THREE.Euler(0, -Math.PI / 2, 0)} />

      {/* Meeting Room - Center */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[6, 0.1, 6]} />
        <meshStandardMaterial color="#E8E4D8" />
      </mesh>

      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[5.8, 3, 5.8]} />
        <meshStandardMaterial color="rgba(100,100,150,0.2)" transparent opacity={0.2} />
      </mesh>

      {/* Meeting Table */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Server Rack - Left Wall */}
      <mesh position={[-10, 2, 0]}>
        <boxGeometry args={[1, 4, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Coffee Station - Back Right */}
      <mesh position={[9, 0.5, -8]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#8B6F47" />
      </mesh>

      {/* TV Lounge - Front Right */}
      <mesh position={[10, 3, 8]}>
        <boxGeometry args={[0.1, 3, 4]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      <mesh position={[10, 2.5, 8]}>
        <boxGeometry args={[1.5, 2, 0.05]} />
        <meshStandardMaterial color="#0066cc" emissive="#0066cc" emissiveIntensity={0.6} />
      </mesh>

      {/* Table Tennis - Back Left */}
      <mesh position={[-9, 0.6, -8]}>
        <boxGeometry args={[3, 0.1, 1.5]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>

      {/* Whiteboard - Back Wall */}
      <mesh position={[0, 4, -9.9]}>
        <boxGeometry args={[5, 3, 0.05]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Plants - Corners */}
      {[
        [-10, 0.5, -9],
        [10, 0.5, -9],
        [-10, 0.5, 9],
        [10, 0.5, 9],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.3]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        </group>
      ))}

      {/* Ceiling Lights */}
      {[-8, -4, 0, 4, 8, 12].map((x) => (
        <group key={x} position={[x, 9.8, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.2, 0.8]} />
            <meshStandardMaterial color="#cccccc" />
          </mesh>
          <pointLight intensity={0.5} distance={15} position={[0, -0.5, 0]} color="white" />
        </group>
      ))}

      {/* All 15 Agent Desks */}
      {AGENTS.map((agent) => (
        <Desk key={agent.name} position={deskPositions[agent.name] || new THREE.Vector3(0, 0, 0)} agentName={agent.name} color={agent.color} />
      ))}

      {/* All 15 Agents Walking */}
      {AGENTS.map((agent) => (
        <MinecraftAgent
          key={agent.name}
          agent={agent}
          position={agentPositions[agent.name]}
          destination={deskPositions[agent.name] || new THREE.Vector3(0, 0, 0)}
        />
      ))}

      {/* Lights */}
      <ambientLight intensity={0.8} color="white" />
      <directionalLight position={[10, 15, 10]} intensity={0.8} color="white" />
    </>
  );
}

export default function Office3DScene() {
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 60px)' }}>
      <Canvas
        camera={{ position: [0, 18, 14], fov: 45 }}
        style={{ background: '#000000' }}
      >
        <Office />
        <OrbitControls
          minDistance={8}
          maxDistance={35}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
