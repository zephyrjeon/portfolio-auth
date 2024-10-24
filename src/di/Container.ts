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

    if ('deps' in provision && this.isCyclic(token, provision.deps)) {
      throw new Error(`Cycle detected with the new token "${token}"`);
    }

    this.registry.set(token, provision);
  }

  public resolve<T>(token: TOKEN): T {
    const provision = this.registry.get(token);

    if (!provision) throw new Error(`${token} is not registered`);

    if ('value' in provision) return (provision as UseValue).value;

    if ('class' in provision) {
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

  // DFS to detect a cycle
  private isCyclic(token: TOKEN, deps: TOKEN[]) {
    const check = (
      // Pointers of stack where search is to happen on each route to leaf
      stack: { node: TOKEN; visited: Set<TOKEN> }[],
      // Graph as a map where key is a node and value is its adjcent nodes
      graph: Map<TOKEN, TOKEN[]>
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

    this.registry.forEach((provision, token) => {
      const adj = 'deps' in provision ? provision.deps : [];
      graph.set(token, adj);
    });

    return check([{ node: token, visited: new Set() }], graph);
  }
}
