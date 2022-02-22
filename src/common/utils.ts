export function urlToObj(str: string): any {
  const obj: any = {};
  const arr1 = str.includes('?') ? str.split('?') : ['', str];
  const arr2 = arr1[1].split('&');
  for (let i = 0; i < arr2.length; i++) {
    const res = arr2[i].split('=');
    obj[res[0]] = res[1];
  }
  return obj;
}

/**
 * 将扁平化数据转换为树形结构
 * @param data 源数据
 * @param parentKey 父级标识
 * @param childrenKey 子级标识
 * @returns
 */
export function toTreeByRecursion(data: any[], parentKey = 'id', childrenKey = 'parentMenu') {
  /**
   * 1. 将顶级与子级数据分开
   */
  const parents = data.filter((children) => !children[childrenKey]),
    children = data.filter((children) => children[childrenKey]);

  dataToTree(parents, children);

  function dataToTree(parents: any[], children: any[]) {
    parents.map((p) => {
      children.map((c, i) => {
        if (p[parentKey].equals(c[childrenKey])) {
          const _children = [...children];
          _children.splice(i, 1);
          dataToTree([c], _children);
          if (p.children) {
            p.children.push(c);
          } else {
            p.children = [c];
          }
        } else {
          // 判断没有父级树
          if (!parents.find((item) => item._id.equals(c[childrenKey]))) {
            parents.push(c);
          }
        }
      });
    });
    if (parents.length === 0 && children.length > 0) {
      parents.push(...children);
    }
  }

  return parents;
}
