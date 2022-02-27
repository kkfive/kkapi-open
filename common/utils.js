"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTreeByRecursion = exports.urlToObj = void 0;
function urlToObj(str) {
    const obj = {};
    const arr1 = str.includes('?') ? str.split('?') : ['', str];
    const arr2 = arr1[1].split('&');
    for (let i = 0; i < arr2.length; i++) {
        const res = arr2[i].split('=');
        obj[res[0]] = res[1];
    }
    return obj;
}
exports.urlToObj = urlToObj;
function toTreeByRecursion(data, parentKey = 'id', childrenKey = 'parentMenu') {
    const parents = data.filter((children) => !children[childrenKey]), children = data.filter((children) => children[childrenKey]);
    dataToTree(parents, children);
    function dataToTree(parents, children) {
        parents.map((p) => {
            children.map((c, i) => {
                if (p[parentKey].equals(c[childrenKey])) {
                    const _children = [...children];
                    _children.splice(i, 1);
                    dataToTree([c], _children);
                    if (p.children) {
                        p.children.push(c);
                    }
                    else {
                        p.children = [c];
                    }
                }
                else {
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
exports.toTreeByRecursion = toTreeByRecursion;
//# sourceMappingURL=utils.js.map