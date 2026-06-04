/** True when `value` is a DOM node (works across realms better than `instanceof Node`). */
export function isDomNode(value: unknown): value is Node {
  if (!value || typeof value !== 'object') return false
  const nodeType = (value as Node).nodeType
  return typeof nodeType === 'number' && nodeType >= 1 && nodeType <= 12
}

/**
 * Mouse left `container` for somewhere outside its subtree.
 * Safe when `relatedTarget` is null or not a DOM node (avoids Node.contains TypeError).
 */
export function pointerLeftContainer(
  container: EventTarget,
  relatedTarget: EventTarget | null | undefined,
): boolean {
  if (!isDomNode(container)) return true
  if (!isDomNode(relatedTarget)) return true
  return !container.contains(relatedTarget)
}
