import { Project, ProjectCategory, Innovation, TechItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'robotic-arm-6dof',
    title: '6-DOF Robotic Arm',
    category: ProjectCategory.MECHATRONICS,
    description: 'A modular 6-axis manipulator using a CNC-machined 6061 aluminum frame and MG996R high-torque servos. Currently optimizing Inverse Kinematics for smooth trajectory planning and hardware stress testing.',
    specs: ['MG996R High-Torque Servos', 'CNC 6061 Aluminum Structure', 'ESP32-WROVER / PCA9685 Control'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800', // Robotic Arm
    currentPhase: 'Assembly',
    phaseDetails: [
      'Joint 3 Servo Calibration',
      'Base Frame Reinforcement',
      'Cable Management Routing'
    ]
  },
  {
    id: 'claw-head-v2',
    title: 'Mechanical Claw Head',
    category: ProjectCategory.MECHATRONICS,
    description: 'A study in end-effector mechanics focusing on gripper geometry and contact pressure. Iterative testing of mechanical linkages using MG90S and SG90 precision micro-servos.',
    specs: ['Precision Linkage System', 'Anodized Aluminum Components', 'MG90S / SG90 Actuation'],
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800', // Artificial Hand/Claw
    currentPhase: 'Design',
    phaseDetails: [
      'Grip Force Simulation',
      'Linkage Material Stress Test',
      'Servo Horn Selection'
    ]
  },
  {
    id: 'mimic-1-jarvis',
    title: 'Project Mimic1',
    category: ProjectCategory.SOFTWARE,
    description: 'Neural command layer for robotic systems. Utilizing Gemini-3-pro for advanced reasoning control logic and natural language interface.',
    specs: ['Gemini API Integration', 'Distributed Control', 'Python / C++ Bridge'],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800', // AI Face
    currentPhase: 'Firmware Debugging',
    phaseDetails: [
      'Packet Latency Optimization',
      'Context Window Pruning',
      'Exception Recovery Logic'
    ]
  },
  {
    id: 'afton-web-log',
    title: 'Afton Industries Portal',
    category: ProjectCategory.SOFTWARE,
    description: 'Official web interface and engineering documentation portal. Built to showcase hardware implementation and project status.',
    specs: ['React / TypeScript', 'Tailwind CSS', 'Vite ESM'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800', // Code Screen
    currentPhase: 'UI/UX Dev',
    phaseDetails: [
      'Mobile Responsiveness Audit',
      'Animation Performance Tuning',
      'Component Modularization'
    ]
  }
];

export const FUTURE_INNOVATIONS: Innovation[] = [
  {
    id: 'zero-point',
    title: 'Precision Actuator',
    tag: 'HARDWARE_R&D',
    description: 'High-torque, zero-backlash harmonic drive gearing systems for industrial mechatronics.',
    blueprintUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' // Gears
  },
  {
    id: 'mimic-2-core',
    title: 'Mimic-2 Architecture',
    tag: 'SYSTEM_DESIGN',
    description: 'Next-generation distributed processing nodes for localized automation control.',
    blueprintUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=800' // PCB / Hardware
  },
  {
    id: 'synth-skin',
    title: 'Haptic Sensors',
    tag: 'MATERIAL_SCIENCE',
    description: 'Pressure-sensitive conductive materials for enhanced feedback in robotic systems.',
    blueprintUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800' // Abstract Mesh
  }
];

/**
 * Technical infrastructure stack for Afton Industries projects
 */
export const TECH_STACK: TechItem[] = [
  {
    id: 'esp32',
    category: 'Microcontroller',
    name: 'ESP32-WROVER',
    details: 'Dual-core processor with 8MB PSRAM, integrated Wi-Fi and Bluetooth for high-throughput peripheral coordination.',
    imageUrl: 'https://images.unsplash.com/photo-1555664424-778a69032054?auto=format&fit=crop&q=80&w=800', // Electronics Board
    size: 'large'
  },
  {
    id: 'gemini-ai',
    category: 'Intelligence',
    name: 'Gemini 3',
    details: 'Leveraging multi-modal reasoning for advanced robotic decision making and natural language processing.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800', // AI Network Abstract
    size: 'normal'
  },
  {
    id: 'servos',
    category: 'Actuation',
    name: 'Standardized Servos',
    details: 'Inventory includes MG996R (high torque), MG90S (metal gear micro), and SG90 (nylon gear micro) for diverse actuation needs.',
    imageUrl: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=800', // Mechanical Part/Motor
    size: 'normal'
  },
  {
    id: 'python-cpp',
    category: 'Development',
    name: 'Python / C++',
    details: 'Unified development environment bridging high-level logic with low-level hardware control.',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800', // Computer Code
    size: 'normal'
  }
];