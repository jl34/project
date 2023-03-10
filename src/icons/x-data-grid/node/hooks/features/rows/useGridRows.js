"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRows = exports.rowsStateInitializer = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _useGridApiMethod = require("../../utils/useGridApiMethod");

var _useGridLogger = require("../../utils/useGridLogger");

var _gridRowsSelector = require("./gridRowsSelector");

var _useGridApiEventHandler = require("../../utils/useGridApiEventHandler");

var _useGridVisibleRows = require("../../utils/useGridVisibleRows");

var _gridSortingSelector = require("../sorting/gridSortingSelector");

var _gridFilterSelector = require("../filter/gridFilterSelector");

var _gridRowsUtils = require("./gridRowsUtils");

var _pipeProcessing = require("../../core/pipeProcessing");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const rowsStateInitializer = (state, props, apiRef) => {
  apiRef.current.unstable_caches.rows = (0, _gridRowsUtils.createRowsInternalCache)({
    rows: props.rows,
    getRowId: props.getRowId,
    loading: props.loading,
    rowCount: props.rowCount
  });
  return (0, _extends2.default)({}, state, {
    rows: (0, _gridRowsUtils.getRowsStateFromCache)({
      apiRef,
      previousTree: null,
      rowCountProp: props.rowCount,
      loadingProp: props.loading
    })
  });
};

exports.rowsStateInitializer = rowsStateInitializer;

const useGridRows = (apiRef, props) => {
  if (process.env.NODE_ENV !== 'production') {
    try {
      // Freeze the `rows` prop so developers have a fast failure if they try to use Array.prototype.push().
      Object.freeze(props.rows);
    } catch (error) {// Sometimes, it's impossible to freeze, so we give up on it.
    }
  }

  const logger = (0, _useGridLogger.useGridLogger)(apiRef, 'useGridRows');
  const currentPage = (0, _useGridVisibleRows.useGridVisibleRows)(apiRef, props);
  const lastUpdateMs = React.useRef(Date.now());
  const timeout = React.useRef(null);
  const getRow = React.useCallback(id => {
    var _ref;

    return (_ref = (0, _gridRowsSelector.gridRowsLookupSelector)(apiRef)[id]) != null ? _ref : null;
  }, [apiRef]);
  const lookup = React.useMemo(() => currentPage.rows.reduce((acc, {
    id
  }, index) => {
    acc[id] = index;
    return acc;
  }, {}), [currentPage.rows]);
  const throttledRowsChange = React.useCallback((newCache, throttle) => {
    const run = () => {
      timeout.current = null;
      lastUpdateMs.current = Date.now();
      apiRef.current.setState(state => (0, _extends2.default)({}, state, {
        rows: (0, _gridRowsUtils.getRowsStateFromCache)({
          apiRef,
          previousTree: (0, _gridRowsSelector.gridRowTreeSelector)(apiRef),
          rowCountProp: props.rowCount,
          loadingProp: props.loading
        })
      }));
      apiRef.current.publishEvent('rowsSet');
      apiRef.current.forceUpdate();
    };

    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    apiRef.current.unstable_caches.rows = newCache;

    if (!throttle) {
      run();
      return;
    }

    const throttleRemainingTimeMs = props.throttleRowsMs - (Date.now() - lastUpdateMs.current);

    if (throttleRemainingTimeMs > 0) {
      timeout.current = setTimeout(run, throttleRemainingTimeMs);
      return;
    }

    run();
  }, [props.throttleRowsMs, props.rowCount, props.loading, apiRef]);
  /**
   * API METHODS
   */

  const setRows = React.useCallback(rows => {
    logger.debug(`Updating all rows, new length ${rows.length}`);
    const cache = (0, _gridRowsUtils.createRowsInternalCache)({
      rows,
      getRowId: props.getRowId,
      loading: props.loading,
      rowCount: props.rowCount
    });
    const prevCache = apiRef.current.unstable_caches.rows;
    cache.rowsBeforePartialUpdates = prevCache.rowsBeforePartialUpdates;
    throttledRowsChange(cache, true);
  }, [logger, props.getRowId, props.loading, props.rowCount, throttledRowsChange, apiRef]);
  const updateRows = React.useCallback(updates => {
    if (props.signature === _useGridApiEventHandler.GridSignature.DataGrid && updates.length > 1) {
      // TODO: Add test with direct call to `apiRef.current.updateRows` in DataGrid after enabling the `apiRef` on the free plan.
      throw new Error(["MUI: You can't update several rows at once in `apiRef.current.updateRows` on the DataGrid.", 'You need to upgrade to DataGridPro or DataGridPremium component to unlock this feature.'].join('\n'));
    } // we remove duplicate updates. A server can batch updates, and send several updates for the same row in one fn call.


    const uniqueUpdates = new Map();
    updates.forEach(update => {
      const id = (0, _gridRowsUtils.getRowIdFromRowModel)(update, props.getRowId, 'A row was provided without id when calling updateRows():');

      if (uniqueUpdates.has(id)) {
        uniqueUpdates.set(id, (0, _extends2.default)({}, uniqueUpdates.get(id), update));
      } else {
        uniqueUpdates.set(id, update);
      }
    });
    const deletedRowIds = [];
    const prevCache = apiRef.current.unstable_caches.rows;
    const newCache = {
      rowsBeforePartialUpdates: prevCache.rowsBeforePartialUpdates,
      loadingPropBeforePartialUpdates: prevCache.loadingPropBeforePartialUpdates,
      rowCountPropBeforePartialUpdates: prevCache.rowCountPropBeforePartialUpdates,
      idRowsLookup: (0, _extends2.default)({}, prevCache.idRowsLookup),
      idToIdLookup: (0, _extends2.default)({}, prevCache.idToIdLookup),
      ids: [...prevCache.ids]
    };
    uniqueUpdates.forEach((partialRow, id) => {
      // eslint-disable-next-line no-underscore-dangle
      if (partialRow._action === 'delete') {
        delete newCache.idRowsLookup[id];
        delete newCache.idToIdLookup[id];
        deletedRowIds.push(id);
        return;
      }

      const oldRow = apiRef.current.getRow(id);

      if (!oldRow) {
        newCache.idRowsLookup[id] = partialRow;
        newCache.idToIdLookup[id] = id;
        newCache.ids.push(id);
        return;
      }

      newCache.idRowsLookup[id] = (0, _extends2.default)({}, apiRef.current.getRow(id), partialRow);
    });

    if (deletedRowIds.length > 0) {
      newCache.ids = newCache.ids.filter(id => !deletedRowIds.includes(id));
    }

    throttledRowsChange(newCache, true);
  }, [props.signature, props.getRowId, throttledRowsChange, apiRef]);
  const getRowModels = React.useCallback(() => {
    const allRows = (0, _gridRowsSelector.gridRowIdsSelector)(apiRef);
    const idRowsLookup = (0, _gridRowsSelector.gridRowsLookupSelector)(apiRef);
    return new Map(allRows.map(id => [id, idRowsLookup[id]]));
  }, [apiRef]);
  const getRowsCount = React.useCallback(() => (0, _gridRowsSelector.gridRowCountSelector)(apiRef), [apiRef]);
  const getAllRowIds = React.useCallback(() => (0, _gridRowsSelector.gridRowIdsSelector)(apiRef), [apiRef]);
  const getRowIndexRelativeToVisibleRows = React.useCallback(id => lookup[id], [lookup]);
  const setRowChildrenExpansion = React.useCallback((id, isExpanded) => {
    const currentNode = apiRef.current.getRowNode(id);

    if (!currentNode) {
      throw new Error(`MUI: No row with id #${id} found`);
    }

    const newNode = (0, _extends2.default)({}, currentNode, {
      childrenExpanded: isExpanded
    });
    apiRef.current.setState(state => {
      return (0, _extends2.default)({}, state, {
        rows: (0, _extends2.default)({}, state.rows, {
          tree: (0, _extends2.default)({}, state.rows.tree, {
            [id]: newNode
          })
        })
      });
    });
    apiRef.current.forceUpdate();
    apiRef.current.publishEvent('rowExpansionChange', newNode);
  }, [apiRef]);
  const getRowNode = React.useCallback(id => {
    var _gridRowTreeSelector$;

    return (_gridRowTreeSelector$ = (0, _gridRowsSelector.gridRowTreeSelector)(apiRef)[id]) != null ? _gridRowTreeSelector$ : null;
  }, [apiRef]);
  const getRowGroupChildren = React.useCallback(({
    skipAutoGeneratedRows = true,
    groupId,
    applySorting,
    applyFiltering
  }) => {
    const tree = (0, _gridRowsSelector.gridRowTreeSelector)(apiRef);
    let children;

    if (applySorting) {
      const groupNode = tree[groupId];

      if (!groupNode) {
        return [];
      }

      const sortedRowIds = (0, _gridSortingSelector.gridSortedRowIdsSelector)(apiRef);
      children = [];
      const startIndex = sortedRowIds.findIndex(id => id === groupId) + 1;

      for (let index = startIndex; index < sortedRowIds.length && tree[sortedRowIds[index]].depth > groupNode.depth; index += 1) {
        const id = sortedRowIds[index];
        const node = tree[id];

        if (!skipAutoGeneratedRows || !node.isAutoGenerated) {
          children.push(id);
        }
      }
    } else {
      children = (0, _gridRowsUtils.getTreeNodeDescendants)(tree, groupId, skipAutoGeneratedRows);
    }

    if (applyFiltering) {
      const filteredRowsLookup = (0, _gridFilterSelector.gridFilteredRowsLookupSelector)(apiRef);
      children = children.filter(childId => filteredRowsLookup[childId] !== false);
    }

    return children;
  }, [apiRef]);
  const setRowIndex = React.useCallback((rowId, targetIndex) => {
    const allRows = (0, _gridRowsSelector.gridRowIdsSelector)(apiRef);
    const oldIndex = allRows.findIndex(row => row === rowId);

    if (oldIndex === -1 || oldIndex === targetIndex) {
      return;
    }

    logger.debug(`Moving row ${rowId} to index ${targetIndex}`);
    const updatedRows = [...allRows];
    updatedRows.splice(targetIndex, 0, updatedRows.splice(oldIndex, 1)[0]);
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      rows: (0, _extends2.default)({}, state.rows, {
        ids: updatedRows
      })
    }));
    apiRef.current.unstable_caches.rows.ids = updatedRows;
    apiRef.current.publishEvent('rowsSet');
  }, [apiRef, logger]);
  const replaceRows = React.useCallback((firstRowToRender, newRows) => {
    if (props.signature === _useGridApiEventHandler.GridSignature.DataGrid && newRows.length > 1) {
      throw new Error(["MUI: You can't replace rows using `apiRef.current.unstable_replaceRows` on the DataGrid.", 'You need to upgrade to DataGridPro or DataGridPremium component to unlock this feature.'].join('\n'));
    }

    if (newRows.length === 0) {
      return;
    }

    const allRows = (0, _gridRowsSelector.gridRowIdsSelector)(apiRef);
    const updatedRows = [...allRows];
    const idRowsLookup = (0, _gridRowsSelector.gridRowsLookupSelector)(apiRef);
    const idToIdLookup = (0, _gridRowsSelector.gridRowsIdToIdLookupSelector)(apiRef);
    const tree = (0, _gridRowsSelector.gridRowTreeSelector)(apiRef);
    const updatedIdRowsLookup = (0, _extends2.default)({}, idRowsLookup);
    const updatedIdToIdLookup = (0, _extends2.default)({}, idToIdLookup);
    const updatedTree = (0, _extends2.default)({}, tree);
    const newRowEntries = newRows.map(newRowModel => {
      const rowId = (0, _gridRowsUtils.getRowIdFromRowModel)(newRowModel, props.getRowId, 'A row was provided without id when calling replaceRows().');
      return {
        id: rowId,
        model: newRowModel
      };
    });
    newRowEntries.forEach((row, index) => {
      const [replacedRowId] = updatedRows.splice(firstRowToRender + index, 1, row.id);
      delete updatedIdRowsLookup[replacedRowId];
      delete updatedIdToIdLookup[replacedRowId];
      delete updatedTree[replacedRowId];
    });
    newRowEntries.forEach(row => {
      const rowTreeNodeConfig = {
        id: row.id,
        parent: null,
        depth: 0,
        groupingKey: null,
        groupingField: null
      };
      updatedIdRowsLookup[row.id] = row.model;
      updatedIdToIdLookup[row.id] = row.id;
      updatedTree[row.id] = rowTreeNodeConfig;
    });
    apiRef.current.unstable_caches.rows.idRowsLookup = updatedIdRowsLookup;
    apiRef.current.unstable_caches.rows.idToIdLookup = updatedIdToIdLookup;
    apiRef.current.unstable_caches.rows.ids = updatedRows;
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      rows: (0, _extends2.default)({}, state.rows, {
        idRowsLookup: updatedIdRowsLookup,
        idToIdLookup: updatedIdToIdLookup,
        tree: updatedTree,
        ids: updatedRows
      })
    }));
    apiRef.current.publishEvent('rowsSet');
  }, [apiRef, props.signature, props.getRowId]);
  const rowApi = {
    getRow,
    getRowModels,
    getRowsCount,
    getAllRowIds,
    setRows,
    setRowIndex,
    updateRows,
    setRowChildrenExpansion,
    getRowNode,
    getRowIndexRelativeToVisibleRows,
    getRowGroupChildren,
    unstable_replaceRows: replaceRows
  };
  /**
   * EVENTS
   */

  const groupRows = React.useCallback(() => {
    logger.info(`Row grouping pre-processing have changed, regenerating the row tree`);
    let cache;

    if (apiRef.current.unstable_caches.rows.rowsBeforePartialUpdates === props.rows) {
      // The `props.rows` did not change since the last row grouping
      // We can use the current rows cache which contains the partial updates done recently.
      cache = apiRef.current.unstable_caches.rows;
    } else {
      // The `props.rows` has changed since the last row grouping
      // We must use the new `props.rows` on the new grouping
      // This occurs because this event is triggered before the `useEffect` on the rows when both the grouping pre-processing and the rows changes on the same render
      cache = (0, _gridRowsUtils.createRowsInternalCache)({
        rows: props.rows,
        getRowId: props.getRowId,
        loading: props.loading,
        rowCount: props.rowCount
      });
    }

    throttledRowsChange(cache, false);
  }, [logger, apiRef, props.rows, props.getRowId, props.loading, props.rowCount, throttledRowsChange]);
  const handleStrategyProcessorChange = React.useCallback(methodName => {
    if (methodName === 'rowTreeCreation') {
      groupRows();
    }
  }, [groupRows]);
  const handleStrategyActivityChange = React.useCallback(() => {
    // `rowTreeCreation` is the only processor ran when `strategyAvailabilityChange` is fired.
    // All the other processors listen to `rowsSet` which will be published by the `groupRows` method below.
    if (apiRef.current.unstable_getActiveStrategy('rowTree') !== (0, _gridRowsSelector.gridRowGroupingNameSelector)(apiRef)) {
      groupRows();
    }
  }, [apiRef, groupRows]);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'activeStrategyProcessorChange', handleStrategyProcessorChange);
  (0, _useGridApiEventHandler.useGridApiEventHandler)(apiRef, 'strategyAvailabilityChange', handleStrategyActivityChange);
  /**
   * APPLIERS
   */

  const applyHydrateRowsProcessor = React.useCallback(() => {
    apiRef.current.setState(state => (0, _extends2.default)({}, state, {
      rows: (0, _extends2.default)({}, state.rows, apiRef.current.unstable_applyPipeProcessors('hydrateRows', state.rows.groupingResponseBeforeRowHydration))
    }));
    apiRef.current.publishEvent('rowsSet');
    apiRef.current.forceUpdate();
  }, [apiRef]);
  (0, _pipeProcessing.useGridRegisterPipeApplier)(apiRef, 'hydrateRows', applyHydrateRowsProcessor);
  (0, _useGridApiMethod.useGridApiMethod)(apiRef, rowApi, 'GridRowApi');
  /**
   * EFFECTS
   */

  React.useEffect(() => {
    return () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    };
  }, []); // The effect do not track any value defined synchronously during the 1st render by hooks called after `useGridRows`
  // As a consequence, the state generated by the 1st run of this useEffect will always be equal to the initialization one

  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const areNewRowsAlreadyInState = apiRef.current.unstable_caches.rows.rowsBeforePartialUpdates === props.rows;
    const isNewLoadingAlreadyInState = apiRef.current.unstable_caches.rows.loadingPropBeforePartialUpdates === props.loading;
    const isNewRowCountAlreadyInState = apiRef.current.unstable_caches.rows.rowCountPropBeforePartialUpdates === props.rowCount; // The new rows have already been applied (most likely in the `'rowGroupsPreProcessingChange'` listener)

    if (areNewRowsAlreadyInState) {
      // If the loading prop has changed, we need to update its value in the state because it won't be done by `throttledRowsChange`
      if (!isNewLoadingAlreadyInState) {
        apiRef.current.setState(state => (0, _extends2.default)({}, state, {
          rows: (0, _extends2.default)({}, state.rows, {
            loading: props.loading
          })
        }));
        apiRef.current.unstable_caches.rows.loadingPropBeforePartialUpdates = props.loading;
        apiRef.current.forceUpdate();
      }

      if (!isNewRowCountAlreadyInState) {
        apiRef.current.setState(state => (0, _extends2.default)({}, state, {
          rows: (0, _extends2.default)({}, state.rows, {
            totalRowCount: Math.max(props.rowCount || 0, state.rows.totalRowCount),
            totalTopLevelRowCount: Math.max(props.rowCount || 0, state.rows.totalTopLevelRowCount)
          })
        }));
        apiRef.current.unstable_caches.rows.rowCountPropBeforePartialUpdates = props.rowCount;
        apiRef.current.forceUpdate();
      }

      return;
    }

    logger.debug(`Updating all rows, new length ${props.rows.length}`);
    throttledRowsChange((0, _gridRowsUtils.createRowsInternalCache)({
      rows: props.rows,
      getRowId: props.getRowId,
      loading: props.loading,
      rowCount: props.rowCount
    }), false);
  }, [props.rows, props.rowCount, props.getRowId, props.loading, logger, throttledRowsChange, apiRef]);
};

exports.useGridRows = useGridRows;