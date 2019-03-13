function findComponentsDownward (context, compName) {
  return context.$children.reduce((component, child) => {
    if (child.$options.name === compName) component.push(child);
    const foundChilds = findComponentsDownward(child, compName);
    return component.concat(foundChilds);
  }, [])
}

export { findComponentsDownward }
