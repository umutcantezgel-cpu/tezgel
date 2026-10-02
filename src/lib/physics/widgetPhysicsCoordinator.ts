/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 2-Body Widget Physics Coordinator - Fliesenverlegung Tezgel
 * ═══════════════════════════════════════════════════════════════════════════
 * Manages spatial awareness and elastic 2D collision resolution between:
 *  1. WhatsApp Circular Floating Widget (Circle, mass = 1)
 *  2. Cookie-Consent Banner Card (AABB Box, mass = 4)
 *
 * Guarantees zero-dependency, 60fps performance and prevents overlapping.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export interface CircleBody {
  id: "whatsapp-btn";
  mass: number;
  radius: number;
  getCenter: () => { x: number; y: number };
  getVel: () => { x: number; y: number };
  applyImpulse: (vx: number, vy: number) => void;
  displace: (dx: number, dy: number) => void;
  wakePhysics: () => void;
}

export interface BoxBody {
  id: "cookie-banner";
  mass: number;
  getBounds: () => { left: number; top: number; right: number; bottom: number };
  getVel: () => { x: number; y: number };
  applyImpulse: (vx: number, vy: number) => void;
  displace: (dx: number, dy: number) => void;
  wakePhysics: () => void;
}

class WidgetPhysicsCoordinator {
  private circle: CircleBody | null = null;
  private box: BoxBody | null = null;
  private lastCollisionTime = 0;

  public registerCircle(body: CircleBody) {
    this.circle = body;
    return () => {
      if (this.circle === body) this.circle = null;
    };
  }

  public registerBox(body: BoxBody) {
    this.box = body;
    return () => {
      if (this.box === body) this.box = null;
    };
  }

  /**
   * Resolves collision between Circle (WhatsApp) and Box (Cookie Banner).
   * Returns true if a collision occurred.
   */
  public checkAndResolveCollision(): boolean {
    if (!this.circle || !this.box) return false;

    const { x: cx, y: cy } = this.circle.getCenter();
    const r = this.circle.radius;
    const box = this.box.getBounds();

    // Check if box has valid dimensions
    if (box.right <= box.left || box.bottom <= box.top) return false;

    // Find closest point on Box AABB to Circle center
    const qx = Math.max(box.left, Math.min(box.right, cx));
    const qy = Math.max(box.top, Math.min(box.bottom, cy));

    const dx = cx - qx;
    const dy = cy - qy;
    const distSq = dx * dx + dy * dy;

    let nx = 0;
    let ny = 0;
    let overlap = 0;

    const w = typeof window !== "undefined" ? window.innerWidth : 1280;
    const canEscapeLeft = box.left > r + 12;
    const canEscapeRight = box.right < w - r - 12;

    // Case 1: Circle center is strictly inside the box
    if (distSq === 0) {
      const dLeft = canEscapeLeft ? cx - box.left : Infinity;
      const dRight = canEscapeRight ? box.right - cx : Infinity;
      const dTop = cy - box.top;
      const dBottom = box.bottom - cy;
      const minDist = Math.min(dLeft, dRight, dTop, dBottom);

      if (minDist === dLeft) {
        nx = -1;
        ny = 0;
        overlap = r + (cx - box.left);
      } else if (minDist === dRight) {
        nx = 1;
        ny = 0;
        overlap = r + (box.right - cx);
      } else if (minDist === dTop) {
        nx = 0;
        ny = -1;
        overlap = r + dTop;
      } else {
        nx = 0;
        ny = 1;
        overlap = r + dBottom;
      }
    } else if (distSq < r * r) {
      // Case 2: Circle intersects Box boundary
      const dist = Math.sqrt(distSq);
      overlap = r - dist;
      nx = dx / dist;
      ny = dy / dist;

      // If pushed sideways into a blocked viewport margin, redirect vertically
      if (nx < 0 && !canEscapeLeft) {
        nx = 0;
        ny = cy >= (box.top + box.bottom) / 2 ? 1 : -1;
      } else if (nx > 0 && !canEscapeRight) {
        nx = 0;
        ny = cy >= (box.top + box.bottom) / 2 ? 1 : -1;
      }
    } else {
      // No collision
      return false;
    }

    // Distribute separation inversely proportional to mass
    const invM1 = 1 / this.circle.mass;
    const invM2 = 1 / this.box.mass;
    const totalInvM = invM1 + invM2;

    const sep1 = overlap * (invM1 / totalInvM);
    const sep2 = overlap * (invM2 / totalInvM);

    this.circle.displace(nx * sep1, ny * sep1);
    this.box.displace(-nx * sep2, -ny * sep2);

    // Compute relative velocity along collision normal
    const v1 = this.circle.getVel();
    const v2 = this.box.getVel();
    const relVx = v1.x - v2.x;
    const relVy = v1.y - v2.y;
    const velAlongNormal = relVx * nx + relVy * ny;

    // Only apply impulse if moving towards each other or stuck
    if (velAlongNormal < 0 || overlap > 2) {
      const restitution = 0.72; // Elastic bounce
      const effectiveRelVel = Math.min(velAlongNormal, -1.5);
      const impulse = (-(1 + restitution) * effectiveRelVel) / totalInvM;

      const impulseX = impulse * nx;
      const impulseY = impulse * ny;

      this.circle.applyImpulse(impulseX * invM1, impulseY * invM1);
      this.box.applyImpulse(-impulseX * invM2, -impulseY * invM2);

      // Trigger physics loops on both bodies so they react immediately
      this.circle.wakePhysics();
      this.box.wakePhysics();

      const now = performance.now();
      if (now - this.lastCollisionTime > 100) {
        this.lastCollisionTime = now;
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          try {
            navigator.vibrate(10);
          } catch {
            // ignore
          }
        }
      }
    }

    return true;
  }

  public getBoxBounds() {
    return this.box ? this.box.getBounds() : null;
  }
}

// Global singleton instance for seamless cross-component coordination
export const widgetPhysicsCoordinator = new WidgetPhysicsCoordinator();
