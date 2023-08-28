import { useTypedSelector } from './use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunction = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
          const root = document.querySelector('#root');
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        };
        `;
    const showFunctionNoop = 'var show = () => {}';
    const result = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          result.push(showFunction);
        } else {
          result.push(showFunctionNoop);
        }
        result.push(c.content);
      }
      // Stop loop when we get to the current cell,
      // we have joined all the code from the previous cells up to the current one
      if (c.id === cellId) {
        break;
      }
    }
    return result;
  }).join('\n');
};
