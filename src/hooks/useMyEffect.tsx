import { useEffect } from "react";

// mesma coisa que useEffect, mas começa listando as deps
export const useMyEffect = (
  deps: React.DependencyList,
  effect: React.EffectCallback
) => {
  return useEffect(effect, deps);
};
