// https://www.typescriptlang.org/docs/handbook/2/functions.html#construct-signatures
type Constructor<T = any> = { new (...args: any[]): T };

type Scope = 'singleton' | 'transient';

type UseValue = {
  value: any;
};

type UseClass<T, TOKEN = string> = {
  constructor: Constructor<T>;
  deps: TOKEN[];
  scope: Scope;
};

type Provision<T, TOKEN = string> = UseValue | UseClass<T, TOKEN>;

export class Container<TOKEN = string> {
  private registry = new Map<TOKEN, Provision<any, TOKEN>>();
  private instances = new Map<TOKEN, any>();

  public register(token: TOKEN, provision: UseValue | UseClass<any, TOKEN>) {
    if (this.registry.get(token)) {
      throw new Error(`${token} is already registered`);
    }

    if (
      'deps' in provision &&
      this.isCyclic(token, provision.deps, this.registry)
    ) {
      throw new Error(`Cycle detected with the new token "${token}"`);
    }

    this.registry.set(token, provision);
  }

  public resolve<T>(token: TOKEN): T {
    const provision = this.registry.get(token);

    if (!provision) throw new Error(`${token} is not registered`);

    if ('value' in provision) return (provision as UseValue).value;

    if ('constructor' in provision) {
      const { constructor, deps, scope } = provision as UseClass<T, TOKEN>;

      if (scope === 'singleton' && !!this.instances.get(token)) {
        return this.instances.get(token);
      }

      const args: unknown[] = deps.map((dep) => this.resolve(dep));
      const instance = new constructor(...args);

      if (scope === 'singleton') {
        this.instances.set(token, instance);
      }

      return instance;
    }

    throw new Error(`${token} is not resolved`);
  }

  // Detect a cycle if registry have one with the new token and deps being added
  // Registry and tokens are represented as graph and nodes, and pointers will traverse in a fasion of DFS
  // A pointer is where checking is to happen and consists of node and visited
  // Node is where a pointer is and visited is a list of nodes where the pointer has visited so far
  // Cycle exists when node in a pointer appears in its visited
  private isCyclic(
    token: TOKEN,
    deps: TOKEN[],
    registry: Map<TOKEN, Provision<any, TOKEN>>
  ) {
    const check = (
      stack: { node: TOKEN; visited: Set<TOKEN> }[], // Stack of pointers
      graph: Map<TOKEN, TOKEN[]> // key is a node and value is its adjcent nodes
    ) => {
      if (stack.length === 0) return false;

      const pointer = stack[stack.length - 1];

      if (pointer.visited.has(pointer.node)) return true;

      const newStack = stack.slice(0, stack.length - 1);
      const newVisited = new Set([...pointer.visited, pointer.node]);
      const adj = graph.get(pointer.node);

      adj?.forEach((node) => newStack.push({ node, visited: newVisited }));

      return check(newStack, graph);
    };

    const graph = new Map<TOKEN, TOKEN[]>([[token, deps]]);

    registry.forEach((provision, token) => {
      const adj = 'deps' in provision ? provision.deps : [];
      graph.set(token, adj);
    });

    return check([{ node: token, visited: new Set() }], graph);
  }
}
