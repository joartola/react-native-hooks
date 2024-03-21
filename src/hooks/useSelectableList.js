import {useCallback, useMemo, useState} from 'react';

const useSelectableList = ({
  idKey,
  initValue = {},
  list = [],
}) => {
 
  const [selectedItems, setSelectedItems] = useState(initValue);

  const isItemSelected = useCallback(
    (item) => {
      return !!selectedItems[item[idKey]];
    },
    [idKey, selectedItems],
  );

  const addItem = useCallback(
    (item) => {
      setSelectedItems(prevState => {
        const newState = {...prevState};
        newState[item[idKey]] = item;
        return newState;
      });
    },
    [idKey],
  );

  const addItems = useCallback(
    (items) => {
      setSelectedItems(prevState => {
        const newState = {...prevState};
        items.forEach(item => {
          newState[item[idKey]] = item;
        });
        return newState;
      });
    },
    [idKey],
  );

  const removeItem = useCallback(
    (item) => {
      setSelectedItems(prevState => {
        const newState = {...prevState};
        delete newState[item[idKey]];
        return newState;
      });
    },
    [idKey],
  );

  const removeItems = useCallback(
    (items) => {
      setSelectedItems(prevState => {
        const newState = {...prevState};
        items.forEach(item => {
          delete newState[item[idKey]];
        });
        return newState;
      });
    },
    [idKey],
  );

  const selectableList = useMemo(() => {
    const result = list.map(item => {
      return {
        item,
        isSelected: isItemSelected(item),
      };
    });

    return result;
  }, [list, isItemSelected]);

  const selectAll = useCallback(() => {
    setSelectedItems(prevState => {
      const newState = {...prevState};
      list.forEach(item => {
        newState[item[idKey]] = item;
      });
      return newState;
    });
  }, [idKey, list]);

  const unselectAll = useCallback(() => {
    setSelectedItems({});
  }, []);

  return {
    addItem,
    addItems,
    removeItem,
    removeItems,
    selectAll,
    unselectAll,
    isItemSelected,
    setSelectedItems,
    selectableList,
    selectedItems,
  };
};

export default useSelectableList;
