# Emergent Platform Fit: Scrap Metal ERP & POS

If you need a **native Windows desktop app (`.exe`)** for a Scrap Metal ERP & POS system, this repo documents the current platform fit and a practical path forward.

## What Emergent Supports Today
- **Web apps** (React + FastAPI + MongoDB, Next.js)
- **Mobile apps** (Expo / React Native)
- **Backend services and APIs**

## Current Limitation
Emergent does **not** currently support building or deploying true native Windows desktop apps such as:
- .NET Framework applications
- WPF applications
- Windows Forms applications
- Native `.exe` desktop deployment workflows

## Practical Paths Forward

### 1) Web App with Desktop-Like Experience (Recommended)
- Build a Progressive Web App (PWA) installable on Windows
- Support offline-friendly behavior and desktop-style UX
- Optionally package with Electron for a more native desktop feel
- Implement ERP/POS needs: inventory, customer debt tracking, multi-branch, dark theme

### 2) Hybrid Packaging Strategy
- Build the core product as a web app in Emergent
- Wrap it with Electron or Tauri for desktop distribution
- Keep support for LAN/offline-oriented workflows

### 3) Fully Native Windows Route
- Use a Windows-native stack and tooling (for example, Visual Studio + .NET)
- Best when strict native desktop requirements are non-negotiable

## Recommendation
Start with a web-first architecture in Emergent to deliver ERP/POS functionality quickly (including offline-oriented flows and multi-branch support), then package for desktop if needed.

If you'd like, the next step can be a concrete implementation plan for the web-based version (modules, data model, and rollout phases).
