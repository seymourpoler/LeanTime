import { vi } from "vitest";

/**
 * Spies all methods on the prototype chain, and ensures any provided method names are also mocked.
 */
export function spyAllMethodsOf<T extends object>(element: T): void {
    // Walk up prototype chain (excluding Object.prototype)
    let proto = Object.getPrototypeOf(element);
    const seen = new Set<string>();
    while (proto && proto !== Object.prototype) {
        const propertyNames = Object.getOwnPropertyNames(proto);
        for (const name of propertyNames) {
            if (name !== 'constructor' && !seen.has(name)) {
                (element as any)[name] = vi.fn();
                seen.add(name);
            }
        }
        proto = Object.getPrototypeOf(proto);
    }
}
