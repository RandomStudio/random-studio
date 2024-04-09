import { useEffect, useState } from 'react';
import { Box3, Mesh, Group } from 'three';

const getGroupBoundingBox = (el: Mesh | Group | null) => {
  const box = new Box3();

  if (!el) {
    return null;
  }

  if (el instanceof Mesh) {
    el.geometry.computeBoundingBox();
    el.geometry.computeBoundingSphere();
    box.expandByObject(el);
  }

  el.children.forEach(child => {
    if (!child) {
      return;
    }

    if (el instanceof Mesh) {
      el.geometry.computeBoundingBox();
      el.geometry.computeBoundingSphere();
    }

    box.expandByObject(child);
  });

  return box;
};

const useBoundingBox = (el: Mesh | Group | null) => {
  const [boundingBox, setBoundingBox] = useState(getGroupBoundingBox(el));

  useEffect(() => {
    if (!el) {
      return;
    }

    const sphere = getGroupBoundingBox(el);

    if (!sphere) {
      return;
    }

    setBoundingBox(sphere);
  }, [el]);

  return boundingBox;
};

export default useBoundingBox;
