type HashMap = {
  [key: string] : HashMap | string;
}

export function constantTree<T extends HashMap>(tree: T, route: string = ""): T {
  for(const item in tree) {
    const currentRoute = `${route}${route !== "" ? "." : ""}${item}`;
    if (typeof(tree[item]) === "string" && tree[item].length === 0) {
      (tree[item] as string) = currentRoute;
    } else if (typeof(tree[item]) === "object") {
      constantTree(tree[item] as HashMap, currentRoute);
    }
  }

  return tree;
}