# Symmetry

**Interactive 3D Molecular and Crystal Structure Visualisation Platform**

A modern web application for visualising and exploring molecular and crystal structures in real-time, built with cutting-edge web technologies and 3D rendering capabilities.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.181-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.81-green?style=flat-square&logo=supabase)](https://supabase.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Background](#project-background)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Core Functionality](#core-functionality)
- [Installation & Setup](#installation--setup)
- [Database Schema](#database-schema)
- [3D Visualisation Implementation](#3d-visualisation-implementation)
- [User Management & Security](#user-management--security)
- [Roadmap](#roadmap)
- [Developer](#developer)

---

## Overview

Symmetry is a modern web-based platform designed to visualise molecular and crystal structures in an interactive 3D environment. Built for educational and research purposes, it provides an intuitive interface for exploring chemical structures, their properties, and spatial arrangements using the industry-standard PDB (Protein Data Bank) file format.

**Core Value Proposition:**
- Real-time 3D rendering of molecular structures in the browser
- Intuitive exploration of chemical properties and spatial symmetry
- Collaborative platform for students and researchers
- Educational tool for understanding molecular geometry and crystallography
- Modern, responsive interface accessible from any device

---

## 🔍 Project Background

### The Challenge

During my Masters in Game Development (2021-2022) at the University of the West of England Bristol, I undertook a placement project for the physics department at Nantes Université. The challenge was to create an accessible web application that would allow students and researchers to visualise and interact with molecular and crystal structures without requiring expensive desktop software or specialised hardware.

The original application ([UDN_Application_Dev](https://github.com/Eliotthb/UDN_Application_Dev)) was built using traditional web technologies and served as a proof of concept. Whilst functional, it highlighted several areas for improvement:

1. **Performance Limitations**: Rendering complex molecules in traditional web frameworks
2. **User Experience**: Dated interface and limited interactivity
3. **Scalability**: Difficulty managing multiple structures and user access
4. **Mobile Support**: Poor responsiveness on smaller devices
5. **Maintenance**: Outdated dependencies and architecture patterns

### The Solution

Symmetry represents a complete refactoring and modernisation of the original application, addressing these challenges through:

- **Modern React Framework**: Next.js 16 with React 19 for optimal performance and developer experience
- **Hardware-Accelerated 3D**: React Three Fiber leveraging WebGL for smooth, real-time rendering
- **Responsive Design**: Mobile-first approach using Tailwind CSS and Radix UI
- **Scalable Backend**: Supabase providing PostgreSQL database, authentication, and file storage
- **Type Safety**: Full TypeScript implementation for reliability and maintainability
- **Component Architecture**: Modular design with Shadcn UI for consistency and reusability

**Target Users**: University students, researchers, educators, and chemistry enthusiasts requiring an accessible platform for molecular structure visualisation and education.

---

## Key Features

### **Interactive 3D Molecular Viewer**
- Hardware-accelerated WebGL rendering using Three.js
- Auto-rotating camera with smooth orbit controls
- CPK colour scheme for atomic visualisation (industry standard)
- Dynamic lighting system with ambient and directional lights
- Zoom, pan, and rotate capabilities with mouse/touch controls

### **Comprehensive Model Management**
- Upload and parse PDB (Protein Data Bank) files
- Store molecular structures in cloud storage (Supabase)
- Edit molecular properties and metadata
- Delete structures with automatic cleanup
- Searchable and filterable model library

### **Molecular Property Display**
- Chemical formula and molecular weight
- Symmetry group classification
- Space group notation
- Unit cell parameters and angles
- Descriptive annotations
- Responsive side panel for desktop and bottom sheet for mobile

### **Visual Controls & Tools**
- Reset camera view to initial position
- Toggle XYZ axes helper with colour-coded directions
- Screenshot capture functionality for documentation
- Collapsible control panel to maximise viewing area
- Real-time model switching with URL-based navigation

### **User Management System**
- Role-based access control (Admin/Student)
- Email-based authentication via Supabase Auth
- Invitation system with expiring tokens
- User profile management
- Administrative dashboard for user oversight

### **Responsive Interface**
- Mobile-first design philosophy
- Adaptive layouts for tablet and desktop
- Touch-optimised controls for mobile devices
- Accessible keyboard navigation
- Dark/light theme support

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Next.js 16.0 (App Router, Server Components, Server Actions)
- **Language**: TypeScript 5
- **UI Library**: React 19.2
- **3D Rendering**: Three.js 0.181, React Three Fiber 9.4, Drei 10.7
- **Styling**: Tailwind CSS 4, Radix UI primitives
- **State Management**: React Server Components, URL parameters
- **Data Tables**: TanStack Table 8.21
- **Notifications**: Sonner (toast notifications)

### **Backend**
- **Runtime**: Node.js
- **Framework**: Next.js Server Actions & Route Handlers
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth (Email OTP, OAuth ready)
- **File Storage**: Supabase Storage (PDB files)
- **Schema Validation**: Zod 4.1

### **Infrastructure & DevOps**
- **Hosting**: Vercel (recommended) or any Node.js host
- **Database Hosting**: Supabase (managed PostgreSQL)
- **File Storage**: Supabase Storage (CDN-backed)
- **Version Control**: Git

### **Developer Tools**
- **Package Manager**: pnpm 10.17
- **Code Quality**: ESLint 9, Next.js config
- **Type Safety**: TypeScript strict mode
- **Build Tool**: Next.js compiler (Turbopack compatible)

---

## System Architecture

### **Application Architecture**

```
Client (Browser)
Next.js App Router, React 19, Three.js
│
▼
Vercel Edge Network
Static Generation, ISR, Server-Side Rendering
│
▼
Next.js Server (Node.js)
│
├─ Server Components (RSC)
│   ├─ Data Fetching (Supabase)
│   ├─ Authentication
│   └─ Model Retrieval
│
└─ Server Actions
    ├─ Model Upload
    ├─ User Management
    └─ Invitation System
│
▼
Supabase
├─ PostgreSQL (models, users, profiles, invitations)
└─ Storage (PDB files)
```

### **3D Rendering Pipeline**

```
PDB File Upload
    ↓
Supabase Storage
    ↓
Public URL Generation
    ↓
Client-side PDB Loader
    ↓
Three.js Geometry Creation
    ├─ Parse Atoms (positions, elements)
    ├─ Generate Bond Geometry
    ├─ Apply CPK Colours
    └─ Create Mesh Objects
    ↓
WebGL Rendering (GPU)
    ↓
Interactive Canvas
```

### **Authentication Flow**

```
User Request
    ↓
Invitation Check (optional)
    ↓
Supabase Auth (Email OTP)
    ↓
Profile Creation/Retrieval
    ↓
Role Assignment (Admin/Student)
    ↓
Protected Route Access
```

---

## ⚙️ Core Functionality

### **1. Molecular Visualisation**

**PDB Parsing & Rendering:**

```typescript
// PDB file is loaded and parsed
loader.load(url, (pdb) => {
  // Extract atomic data
  const atoms: Atom[] = pdb.json.atoms;
  
  // Create 3D geometry for each atom
  atoms.forEach((atom) => {
    const [x, y, z, , element] = atom;
    const color = CPK_COLORS[element] || 0xffffff;
    
    // Create sphere mesh with element-specific colour
    const atomMesh = new Mesh(
      new IcosahedronGeometry(1, 2),
      new MeshPhongMaterial({ color, shininess: 30 })
    );
    
    atomMesh.position.set(x, y, z);
    atomMesh.scale.setScalar(element === 'H' ? 0.5 : 0.5);
    
    group.add(atomMesh);
  });
  
  // Create bonds as line segments
  const bonds = new LineSegments(
    pdb.geometryBonds,
    new LineBasicMaterial({ color: 0xffffff })
  );
  
  group.add(bonds);
});
```

**Technical Implementation:**
- Uses Three.js `PDBLoader` for parsing standard PDB format
- Atoms rendered as icosahedron meshes (low-poly spheres)
- Bonds rendered as line segments connecting atomic centres
- CPK colour scheme following International Union of Pure and Applied Chemistry (IUPAC) standards
- Automatic centring of molecules using bounding box calculations
- Phong shading model for realistic lighting

### **2. Model Management**

**Upload Workflow:**

```
User Selects PDB File
    ↓
Client-side Validation
    ├─ File extension check (.pdb)
    ├─ File size validation
    └─ Metadata validation (Zod schema)
    ↓
Server Action (Next.js)
    ├─ Admin role verification
    ├─ Sanitise filename
    ├─ Generate timestamp
    └─ Create storage path
    ↓
Supabase Storage Upload
    ├─ Upload to 'models' bucket
    └─ Get public URL
    ↓
Database Insert
    ├─ Store metadata
    ├─ Link storage path
    └─ Timestamp creation
    ↓
Revalidate Cache
    └─ Update model list
```

**Implementation Details:**
- Sanitised filenames prevent injection attacks
- Atomic operations ensure consistency (rollback on failure)
- Public URLs enable direct browser access
- Metadata validation using Zod schemas
- Path revalidation for instant UI updates

### **3. Interactive Controls**

**Camera Management:**
```typescript
// OrbitControls configuration
<OrbitControls
  ref={controlsRef}
  autoRotate               // Automatic rotation
  autoRotateSpeed={1}      // Slow, smooth rotation
  enableDamping            // Smooth camera movement
  dampingFactor={0.05}     // Momentum effect
  minDistance={20}         // Closest zoom
  maxDistance={200}        // Furthest zoom
/>

// Reset view functionality
const handleResetView = () => {
  controlsRef.current.object.position.set(0, 0, 90);
  controlsRef.current.target.set(0, 0, 0);
  controlsRef.current.update();
};
```

**Screenshot Capture:**
```typescript
// Capture current rendered frame
gl.render(scene, camera);

// Convert canvas to blob
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `molecule-${Date.now()}.png`;
  link.click();
}, 'image/png');
```

---

## 🚀 Installation & Setup

### **Prerequisites**

- Node.js 20+
- pnpm 10+ (or npm/yarn)
- Supabase account (free tier available)
- Git

### **1. Clone Repository**

```bash
git clone https://github.com/yourusername/symmetry.git
cd symmetry/symmetry-app
```

### **2. Install Dependencies**

```bash
pnpm install
```

### **3. Environment Variables**

Create `.env.local` file in `symmetry-app/`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Optional: Development
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Obtaining Supabase Credentials:**
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → API
4. Copy Project URL and anon/public key

### **4. Database Setup**

Run the following SQL in your Supabase SQL Editor:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin', 'student')),
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create models table
CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  formula TEXT,
  molecular_weight TEXT,
  symmetry TEXT,
  space_group TEXT,
  unit_cell TEXT,
  unit_cell_angles TEXT,
  description TEXT,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create invitations table
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student',
  token UUID NOT NULL DEFAULT uuid_generate_v4(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  invited_by UUID REFERENCES auth.users(id),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage bucket for PDB files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('models', 'models', true);

-- Storage policies
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'models');

CREATE POLICY "Authenticated Upload" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'models' AND auth.role() = 'authenticated');

-- Row Level Security policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles but only update their own
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Models: Readable by authenticated users
CREATE POLICY "Models are viewable by authenticated users" 
ON models FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert models" 
ON models FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can update models" 
ON models FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete models" 
ON models FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Invitations: Only admins can manage
CREATE POLICY "Admins can view all invitations" 
ON invitations FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can create invitations" 
ON invitations FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

CREATE POLICY "Admins can delete invitations" 
ON invitations FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
```

### **5. Create First Admin User**

After setting up the database:

1. Sign up through the application
2. In Supabase Dashboard → Authentication → Users
3. Find your user
4. Go to SQL Editor and run:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### **6. Run Development Server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### **7. Add Sample Molecules**

Sample PDB files are included in `public/`:
- `allene.pdb` - Allene molecule (C₃H₄)
- `diazene.pdb` - Diazene molecule (N₂H₂)

Upload these through the Models page after signing in as admin.

---

## 🗄️ Database Schema

### **Core Entities**

```typescript
// Simplified schema overview

Profile {
  id: UUID              // References auth.users
  role: 'admin' | 'student'
  full_name: string
  email: string
  created_at: timestamp
  updated_at: timestamp
}

Model {
  id: UUID
  name: string          // Display name
  type: string          // Molecule/Crystal type
  formula: string       // Chemical formula (e.g., "C₃H₄")
  molecular_weight: string
  symmetry: string      // Symmetry group
  space_group: string   // Crystallographic space group
  unit_cell: string     // Unit cell parameters
  unit_cell_angles: string
  description: string
  storage_path: string  // Supabase storage path
  created_at: timestamp
  updated_at: timestamp
}

Invitation {
  id: UUID
  email: string
  role: 'admin' | 'student'
  token: UUID           // Unique invitation token
  status: 'pending' | 'accepted' | 'expired'
  invited_by: UUID      // References profiles
  expires_at: timestamp // 7 days from creation
  created_at: timestamp
}
```

**Key Relationships:**
- Profile → User (1:1, references Supabase Auth)
- Model → Storage (1:1, storage_path reference)
- Invitation → Profile (many:1, invited_by)

**Storage Structure:**
```
models/
  ├─ molecule_name_timestamp1.pdb
  ├─ molecule_name_timestamp2.pdb
  └─ crystal_structure_timestamp3.pdb
```

---

## 🎨 3D Visualisation Implementation

### **CPK Colour Scheme**

The application uses the Corey-Pauling-Koltun (CPK) colour scheme, the standard for molecular visualisation:

```typescript
const CPK_COLORS = {
  H: 0xFFFFFF,  // Hydrogen - White
  C: 0x909090,  // Carbon - Grey
  N: 0x3050F8,  // Nitrogen - Blue
  O: 0xFF0D0D,  // Oxygen - Red
  S: 0xFFFF30,  // Sulphur - Yellow
  P: 0xFF8000,  // Phosphorus - Orange
  F: 0x90E050,  // Fluorine - Green
  Cl: 0x1FF01F, // Chlorine - Light green
  Br: 0xA62929, // Bromine - Dark red
  I: 0x940094,  // Iodine - Purple
  Fe: 0xE06633, // Iron - Orange-red
  Ca: 0x3DFF00, // Calcium - Bright green
};
```

### **Lighting System**

Multi-directional lighting for optimal molecular visibility:

```typescript
// Ambient light - overall base illumination
<ambientLight intensity={0.3} />

// Primary directional light
<directionalLight 
  position={[10, 10, 10]} 
  intensity={0.8} 
/>

// Secondary directional light (opposite angle)
<directionalLight 
  position={[-10, -10, -10]} 
  intensity={0.4} 
/>

// Point light at origin
<pointLight 
  position={[0, 0, 0]} 
  intensity={0.3} 
/>
```

**Rationale:**
- Ambient light prevents completely black shadows
- Primary directional provides main illumination
- Secondary directional adds depth and dimension
- Point light at centre ensures internal structure visibility

### **Performance Optimisations**

1. **Instanced Rendering**: Atoms use shared geometry
2. **LOD (Level of Detail)**: Icosahedron with 2 subdivisions balances quality and performance
3. **Efficient Materials**: Phong material provides good quality without PBR overhead
4. **Automatic Centring**: Reduces camera travel distance
5. **Damping**: Smooth animations reduce GPU load

### **Camera Configuration**

```typescript
camera={{
  position: [0, 0, 90],  // Start 90 units away
  fov: 10,               // Narrow field of view (orthographic-like)
}}
```

**Design Decision**: Narrow FOV (10°) creates near-orthographic projection, reducing perspective distortion for accurate spatial understanding of molecular geometry.

---

## 🔒 User Management & Security

### **Authentication Flow**

1. **Email OTP (One-Time Password)**
   - User requests sign-in with email
   - Supabase sends 6-digit code
   - Code verified server-side
   - Session token issued

2. **Automatic Profile Creation**
   - Database trigger creates profile on first sign-in
   - Default role: `student`
   - Admin can upgrade roles

### **Role-Based Access Control (RBAC)**

**Student Role:**
- View all molecular models
- Interact with 3D viewer
- View model properties
- Take screenshots

**Admin Role:**
- All student permissions
- Upload new models
- Edit model metadata
- Delete models
- Manage users
- Create invitations
- Change user roles

### **Server-Side Authorization**

All mutations protected by server actions:

```typescript
export async function addModelAction(formData: FormData) {
  // Verify authentication
  const supabase = await createActionClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Unauthorized' };
  }
  
  // Verify admin role (enforced by RLS policies)
  // Row Level Security automatically checks permissions
  const { error } = await supabase
    .from('models')
    .insert({ /* data */ });
    
  // RLS policy ensures only admins can insert
}
```

### **Security Best Practices**

1. **Row Level Security (RLS)**: All tables protected by PostgreSQL policies
2. **Input Validation**: Zod schemas validate all user input
3. **File Upload Sanitisation**: Filenames sanitised, extensions validated
4. **Server Actions**: All mutations happen server-side
5. **Environment Variables**: Secrets never exposed to client
6. **HTTPS Only**: Enforced in production
7. **Token Expiry**: Invitation tokens expire after 7 days

### **Invitation System**

**Creating Invitations:**
```typescript
// Admin creates invitation
const token = crypto.randomUUID();
const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

await supabase.from('invitations').insert({
  email: 'newuser@example.com',
  role: 'student',
  token,
  status: 'pending',
  invited_by: adminId,
  expires_at: expiresAt,
});

// Email sent to user (to be implemented)
// User signs up using invitation link
// Token validated and marked as 'accepted'
```

---

## 🛤️ Roadmap

### **Phase 1: Core Enhancements** (Q1 2025)
- [ ] Email delivery for invitation system (Resend/SendGrid)
- [ ] Model upload functionality
- [ ] Advanced search and filtering for model library
- [ ] Model categories and tags
- [ ] User favourites system

### **Phase 2: Advanced Visualisation** (Q2 2025)
- [ ] Multiple rendering modes (ball-and-stick, space-filling, wireframe)
- [ ] Custom colour schemes
- [ ] Measurement tools (distances, angles, dihedrals)
- [ ] Atom labelling toggle
- [ ] Export to various formats (PNG, SVG, OBJ)

### **Phase 3: Collaborative Features** (Q3 2025)
- [ ] Annotations and comments on models
- [ ] Share links with specific views
- [ ] Collections and workspaces
- [ ] Activity feed
- [ ] Real-time collaboration (multiple cursors)

### **Phase 4: Educational Tools** (Q4 2025)
- [ ] Guided tours of molecular features
- [ ] Quiz and assessment integration
- [ ] Lesson plans and course materials
- [ ] Student progress tracking
- [ ] Assignment submission system

### **Future Considerations**
- [ ] VR/AR support for immersive exploration
- [ ] Molecular dynamics simulation integration
- [ ] Quantum chemistry calculations
- [ ] Protein structure prediction
- [ ] Mobile native applications (React Native)
- [ ] API for programmatic access
- [ ] Plugin system for extensions

---

## 👨‍💻 Developer

**Eliot Herbert-Byrnes**  
**Email**: eliott.c.h.byrnes@googlemail.com  
**GitHub**: [@Eliotthb](https://github.com/Eliotthb)  

### **About This Project**

Symmetry represents a complete refactoring of my Masters placement project from 2021-2022, showcasing:

- **Modern React Expertise**: Next.js 16 App Router, React 19 Server Components, Server Actions
- **3D Graphics Programming**: Three.js, React Three Fiber, WebGL optimisation
- **Full-Stack Development**: Next.js API routes, Supabase integration, PostgreSQL
- **TypeScript Proficiency**: Strict type safety, Zod validation, type inference
- **UI/UX Design**: Responsive design, mobile-first approach, accessibility
- **Database Design**: PostgreSQL schema design, Row Level Security, efficient queries
- **Authentication & Security**: Supabase Auth, role-based access control, secure file uploads
- **Performance Optimisation**: 3D rendering optimisation, efficient asset loading
- **Modern Tooling**: pnpm, ESLint, Tailwind CSS 4, Radix UI

### **Academic Background**

**MSc Game Development** 
University of the West of England Bristol | 2021-2022

**Placement Project**: Web Application for Molecular Structure Visualisation  
Nantes Université, Physics Department | 2022

Worked with the research team to develop an accessible web-based tool for visualising complex molecular and crystal structures. The project addressed the need for a platform-independent solution that didn't require expensive commercial software licenses.

**Key Achievements:**
- Application adopted by physics department for undergraduate teaching
- Positive feedback from faculty and students on usability

**Technical Learning Outcomes:**
- 3D graphics programming and WebGL
- Scientific data visualisation techniques
- Crystallography and molecular geometry fundamentals
- Collaborative development with domain experts
- Academic software development standards

---

## 📄 License

This project is private and proprietary. All rights reserved.

For academic or educational use, please contact the developer.

---

## 🙏 Acknowledgements

- **Nantes Université Physics Department** for the original project opportunity
- **University of the West of England Bristol** for academic support
- **Next.js team** for the exceptional framework
- **React Three Fiber community** for 3D rendering tools
- **Supabase** for the comprehensive backend platform
- **The open-source community** for enabling modern web development

---

## 📚 References

### **PDB Format**
- [Protein Data Bank Format Specification](http://www.wwpdb.org/documentation/file-format)
- [PDB File Format Guide](https://www.cgl.ucsf.edu/chimera/docs/UsersGuide/tutorials/pdbintro.html)

### **CPK Colour Scheme**
- [IUPAC Colour Scheme Standards](https://iupac.org)
- [Jmol Colour Scheme Reference](http://jmol.sourceforge.net/jscolors/)

### **Crystallography**
- [International Tables for Crystallography](https://it.iucr.org/)
- [Space Group Notation](http://img.chem.ucl.ac.uk/sgp/mainmenu.htm)

### **Technologies**
- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)

---

