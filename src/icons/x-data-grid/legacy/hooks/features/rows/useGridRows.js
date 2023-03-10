import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { gridRowCountSelector, gridRowsLookupSelector, gridRowTreeSelector, gridRowIdsSelector, gridRowGroupingNameSelector, gridRowsIdToIdLookupSelector } from './gridRowsSelector';
import { GridSignature, useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { useGridVisibleRows } from '../../utils/useGridVisibleRows';
import { gridSortedRowIdsSelector } from '../sorting/gridSortingSelector';
import { gridFilteredRowsLookupSelector } from '../filter/gridFilterSelector';
import { getTreeNodeDescendants, createRowsInternalCache, getRowsStateFromCache, getRowIdFromRowModel } from './gridRowsUtils';
import { useGridRegisterPipeApplier } from '../../core/pipeProcessing';
export var rowsStateInitializer = function rowsStateInitializer(state, props, apiRef) {
  apiRef.current.unstable_caches.rows = createRowsInternalCache({
    rows: props.rows,
    getRowId: props.getRowId,
    loading: props.loading,
    rowCount: props.rowCount
  });
  return _extends({}, state, {
    rows: getRowsStateFromCache({
      apiRef: apiRef,
      previousTree: null,
      rowCountProp: props.rowCount,
      loadingProp: props.loading
    })
  });
};
export var useGridRows = function useGridRows(apiRef, props) {
  if (process.env.NODE_ENV !== 'production') {
    try {
      // Freeze the `rows` prop so developers have a fast failure if they try to use Array.prototype.push().
      Object.freeze(props.rows);
    } catch (error) {// Sometimes, it's impossible to freeze, so we give up on it.
    }
  }

  var logger = useGridLogger(apiRef, 'useGridRows');
  var currentPage = useGridVisibleRows(apiRef, props);
  var lastUpdateMs = React.useRef(Date.now());
  var timeout = React.useRef(null);
  var getRow = React.useCallback(function (id) {
    var _ref;

    return (_ref = gridRowsLookupSelector(apiRef)[id]) != null ? _ref : null;
  }, [apiRef]);
  var lookup = React.useMemo(function () {
    return currentPage.rows.reduce(function (acc, _ref2, index) {
      var id = _ref2.id;
      acc[id] = index;
      return acc;
    }, {});
  }, [currentPage.rows]);
  var throttledRowsChange = React.useCallback(function (newCache, throttle) {
    var run = function run() {
      timeout.current = null;
      lastUpdateMs.current = Date.now();
      apiRef.current.setState(function (state) {
        return _extends({}, state, {
          rows: getRowsStateFromCache({
            apiRef: apiRef,
            previousTree: gridRowTreeSelector(apiRef),
            rowCountProp: props.rowCount,
            loadingProp: props.loading
          })
        });
      });
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

    var throttleRemainingTimeMs = props.throttleRowsMs - (Date.now() - lastUpdateMs.current);

    if (throttleRemainingTimeMs > 0) {
      timeout.current = setTimeout(run, throttleRemainingTimeMs);
      return;
    }

    run();
  }, [props.throttleRowsMs, props.rowCount, props.loading, apiRef]);
  /**
   * API METHODS
   */

  var setRows = React.useCallback(function (rows) {
    logger.debug("Updating all rows, new length ".concat(rows.length));
    var cache = createRowsInternalCache({
      rows: rows,
      getRowId: props.getRowId,
      loading: props.loading,
      rowCount: props.rowCount
    });
    var prevCache = apiRef.current.unstable_caches.rows;
    cache.rowsBeforePartialUpdates = prevCache.rowsBeforePartialUpdates;
    throttledRowsChange(cache, true);
  }, [logger, props.getRowId, props.loading, props.rowCount, throttledRowsChange, apiRef]);
  var updateRows = React.useCallback(function (updates) {
    if (props.signature === GridSignature.DataGrid && updates.length > 1) {
      // TODO: Add test with direct call to `apiRef.current.updateRows` in DataGrid after enabling the `apiRef` on the free plan.
      throw new Error(["MUI: You can't update several rows at once in `apiRef.current.updateRows` on the DataGrid.", 'You need to upgrade to DataGridPro or DataGridPremium component to unlock this feature.'].join('\n'));
    } // we remove duplicate updates. A server can batch updates, and send several updates for the same row in one fn call.


    var uniqueUpdates = new Map();
    updates.forEach(function (update) {
      var id = getRowIdFromRowModel(update, props.getRowId, 'A row was provided without id when calling updateRows():');

      if (uniqueUpdates.has(id)) {
        uniqueUpdates.set(id, _extends({}, uniqueUpdates.get(id), update));
      } else {
        uniqueUpdates.set(id, update);
      }
    });
    var deletedRowIds = [];
    var prevCache = apiRef.current.unstable_caches.rows;
    var newCache = {
      rowsBeforePartialUpdates: prevCache.rowsBeforePartialUpdates,
      loadingPropBeforePartialUpdates: prevCache.loadingPropBeforePartialUpdates,
      rowCountPropBeforePartialUpdates: prevCache.rowCountPropBeforePartialUpdates,
      idRowsLookup: _extends({}, prevCache.idRowsLookup),
      idToIdLookup: _extends({}, prevCache.idToIdLookup),
      ids: _toConsumableArray(prevCache.ids)
    };
    uniqueUpdates.forEach(function (partialRow, id) {
      // eslint-disable-next-line no-underscore-dangle
      if (partialRow._action === 'delete') {
        delete newCache.idRowsLookup[id];
        delete newCache.idToIdLookup[id];
        deletedRowIds.push(id);
        return;
      }

      var oldRow = apiRef.current.getRow(id);

      if (!oldRow) {
        newCache.idRowsLookup[id] = partialRow;
        newCache.idToIdLookup[id] = id;
        newCache.ids.push(id);
        return;
      }

      newCache.idRowsLookup[id] = _extends({}, apiRef.current.getRow(id), partialRow);
    });

    if (deletedRowIds.length > 0) {
      newCache.ids = newCache.ids.filter(function (id) {
        return !deletedRowIds.includes(id);
      });
    }

    throttledRowsChange(newCache, true);
  }, [props.signature, props.getRowId, throttledRowsChange, apiRef]);
  var getRowModels = React.useCallback(function () {
    var allRows = gridRowIdsSelector(apiRef);
    var idRowsLookup = gridRowsLookupSelector(apiRef);
    return new Map(allRows.map(function (id) {
      return [id, idRowsLookup[id]];
    }));
  }, [apiRef]);
  var getRowsCount = React.useCallback(function () {
    return gridRowCountSelector(apiRef);
  }, [apiRef]);
  var getAllRowIds = React.useCallback(function () {
    return gridRowIdsSelector(apiRef);
  }, [apiRef]);
  var getRowIndexRelativeToVisibleRows = React.useCallback(function (id) {
    return lookup[id];
  }, [lookup]);
  var setRowChildrenExpansion = React.useCallback(function (id, isExpanded) {
    var currentNode = apiRef.current.getRowNode(id);

    if (!currentNode) {
      throw new Error("MUI: No row with id #".concat(id, " found"));
    }

    var newNode = _extends({}, currentNode, {
      childrenExpanded: isExpanded
    });

    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        rows: _extends({}, state.rows, {
          tree: _extends({}, state.rows.tree, _defineProperty({}, id, newNode))
        })
      });
    });
    apiRef.current.forceUpdate();
    apiRef.current.publishEvent('rowExpansionChange', newNode);
  }, [apiRef]);
  var getRowNode = React.useCallback(function (id) {
    var _gridRowTreeSelector$;

    return (_gridRowTreeSelector$ = gridRowTreeSelector(apiRef)[id]) != null ? _gridRowTreeSelector$ : null;
  }, [apiRef]);
  var getRowGroupChildren = React.useCallback(function (_ref3) {
    var _ref3$skipAutoGenerat = _ref3.skipAutoGeneratedRows,
        skipAutoGeneratedRows = _ref3$skipAutoGenerat === void 0 ? true : _ref3$skipAutoGenerat,
        groupId = _ref3.groupId,
        applySorting = _ref3.applySorting,
        applyFiltering = _ref3.applyFiltering;
    var tree = gridRowTreeSelector(apiRef);
    var children;

    if (applySorting) {
      var groupNode = tree[groupId];

      if (!groupNode) {
        return [];
      }

      var sortedRowIds = gridSortedRowIdsSelector(apiRef);
      children = [];
      var startIndex = sortedRowIds.findIndex(function (id) {
        return id === groupId;
      }) + 1;

      for (var index = startIndex; index < sortedRowIds.length && tree[sortedRowIds[index]].depth > groupNode.depth; index += 1) {
        var id = sortedRowIds[index];
        var node = tree[id];

        if (!skipAutoGeneratedRows || !node.isAutoGenerated) {
          children.push(id);
        }
      }
    } else {
      children = getTreeNodeDescendants(tree, groupId, skipAutoGeneratedRows);
    }

    if (applyFiltering) {
      var filteredRowsLookup = gridFilteredRowsLookupSelector(apiRef);
      children = children.filter(function (childId) {
        return filteredRowsLookup[childId] !== false;
      });
    }

    return children;
  }, [apiRef]);
  var setRowIndex = React.useCallback(function (rowId, targetIndex) {
    var allRows = gridRowIdsSelector(apiRef);
    var oldIndex = allRows.findIndex(function (row) {
      return row === rowId;
    });

    if (oldIndex === -1 || oldIndex === targetIndex) {
      return;
    }

    logger.debug("Moving row ".concat(rowId, " to index ").concat(targetIndex));

    var updatedRows = _toConsumableArray(allRows);

    updatedRows.splice(targetIndex, 0, updatedRows.splice(oldIndex, 1)[0]);
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        rows: _extends({}, state.rows, {
          ids: updatedRows
        })
      });
    });
    apiRef.current.unstable_caches.rows.ids = updatedRows;
    apiRef.current.publishEvent('rowsSet');
  }, [apiRef, logger]);
  var replaceRows = React.useCallback(function (firstRowToRender, newRows) {
    if (props.signature === GridSignature.DataGrid && newRows.length > 1) {
      throw new Error(["MUI: You can't replace rows using `apiRef.current.unstable_replaceRows` on the DataGrid.", 'You need to upgrade to DataGridPro or DataGridPremium component to unlock this feature.'].join('\n'));
    }

    if (newRows.length === 0) {
      return;
    }

    var allRows = gridRowIdsSelector(apiRef);

    var updatedRows = _toConsumableArray(allRows);

    var idRowsLookup = gridRowsLookupSelector(apiRef);
    var idToIdLookup = gridRowsIdToIdLookupSelector(apiRef);
    var tree = gridRowTreeSelector(apiRef);

    var updatedIdRowsLookup = _extends({}, idRowsLookup);

    var updatedIdToIdLookup = _extends({}, idToIdLookup);

    var updatedTree = _extends({}, tree);

    var newRowEntries = newRows.map(function (newRowModel) {
      var rowId = getRowIdFromRowModel(newRowModel, props.getRowId, 'A row was provided without id when calling replaceRows().');
      return {
        id: rowId,
        model: newRowModel
      };
    });
    newRowEntries.forEach(function (row, index) {
      var _updatedRows$splice = updatedRows.splice(firstRowToRender + index, 1, row.id),
          _updatedRows$splice2 = _slicedToArray(_updatedRows$splice, 1),
          replacedRowId = _updatedRows$splice2[0];

      delete updatedIdRowsLookup[replacedRowId];
      delete updatedIdToIdLookup[replacedRowId];
      delete updatedTree[replacedRowId];
    });
    newRowEntries.forEach(function (row) {
      var rowTreeNodeConfig = {
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
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        rows: _extends({}, state.rows, {
          idRowsLookup: updatedIdRowsLookup,
          idToIdLookup: updatedIdToIdLookup,
          tree: updatedTree,
          ids: updatedRows
        })
      });
    });
    apiRef.current.publishEvent('rowsSet');
  }, [apiRef, props.signature, props.getRowId]);
  var rowApi = {
    getRow: getRow,
    getRowModels: getRowModels,
    getRowsCount: getRowsCount,
    getAllRowIds: getAllRowIds,
    setRows: setRows,
    setRowIndex: setRowIndex,
    updateRows: updateRows,
    setRowChildrenExpansion: setRowChildrenExpansion,
    getRowNode: getRowNode,
    getRowIndexRelativeToVisibleRows: getRowIndexRelativeToVisibleRows,
    getRowGroupChildren: getRowGroupChildren,
    unstable_replaceRows: replaceRows
  };
  /**
   * EVENTS
   */

  var groupRows = React.useCallback(function () {
    logger.info("Row grouping pre-processing have changed, regenerating the row tree");
    var cache;

    if (apiRef.current.unstable_caches.rows.rowsBeforePartialUpdates === props.rows) {
      // The `props.rows` did not change since the last row grouping
      // We can use the current rows cache which contains the partial updates done recently.
      cache = apiRef.current.unstable_caches.rows;
    } else {
      // The `props.rows` has changed since the last row grouping
      // We must use the new `props.rows` on the new grouping
      // This occurs because this event is triggered before the `useEffect` on the rows when both the grouping pre-processing and the rows changes on the same render
      cache = createRowsInternalCache({
        rows: props.rows,
        getRowId: props.getRowId,
        loading: props.loading,
        rowCount: props.rowCount
      });
    }

    throttledRowsChange(cache, false);
  }, [logger, apiRef, props.rows, props.getRowId, props.loading, props.rowCount, throttledRowsChange]);
  var handleStrategyProcessorChange = React.useCallback(function (methodName) {
    if (methodName === 'rowTreeCreation') {
      groupRows();
    }
  }, [groupRows]);
  var handleStrategyActivityChange = React.useCallback(function () {
    // `rowTreeCreation` is the only processor ran when `strategyAvailabilityChange` is fired.
    // All the other processors listen to `rowsSet` which will be published by the `groupRows` method below.
    if (apiRef.current.unstable_getActiveStrategy('rowTree') !== gridRowGroupingNameSelector(apiRef)) {
      groupRows();
    }
  }, [apiRef, groupRows]);
  useGridApiEventHandler(apiRef, 'activeStrategyProcessorChange', handleStrategyProcessorChange);
  useGridApiEventHandler(apiRef, 'strategyAvailabilityChange', handleStrategyActivityChange);
  /**
   * APPLIERS
   */

  var applyHydrateRowsProcessor = React.useCallback(function () {
    apiRef.current.setState(function (state) {
      return _extends({}, state, {
        rows: _extends({}, state.rows, apiRef.current.unstable_applyPipeProcessors('hydrateRows', state.rows.groupingResponseBeforeRowHydration))
      });
    });
    apiRef.current.publishEvent('rowsSet');
    apiRef.current.forceUpdate();
  }, [apiRef]);
  useGridRegisterPipeApplier(apiRef, 'hydrateRows', applyHydrateRowsProcessor);
  useGridApiMethod(apiRef, rowApi, 'GridRowApi');
  /**
   * EFFECTS
   */

  React.useEffect(function () {
    return function () {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
    };
  }, []); // The effect do not track any value defined synchronously during the 1st render by hooks called after `useGridRows`
  // As a consequence, the state generated by the 1st run of this useEffect will always be equal to the initialization one

  var isFirstRender = React.useRef(true);
  React.useEffect(function () {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    var areNewRowsAlreadyInState = apiRef.current.unstable_caches.rows.rowsBeforePartialUpdates === props.rows;
    var isNewLoadingAlreadyInState = apiRef.current.unstable_caches.rows.loadingPropBeforePartialUpdates === props.loading;
    var isNewRowCountAlreadyInState = apiRef.current.unstable_caches.rows.rowCountPropBeforePartialUpdates === props.rowCount; // The new rows have already been applied (most likely in the `'rowGroupsPreProcessingChange'` listener)

    if (areNewRowsAlreadyInState) {
      // If the loading prop has changed, we need to update its value in the state because it won't be done by `throttledRowsChange`
      if (!isNewLoadingAlreadyInState) {
        apiRef.current.setState(function (state) {
          return _extends({}, state, {
            rows: _extends({}, state.rows, {
              loading: props.loading
            })
          });
        });
        apiRef.current.unstable_caches.rows.loadingPropBeforePartialUpdates = props.loading;
        apiRef.current.forceUpdate();
      }

      if (!isNewRowCountAlreadyInState) {
        apiRef.current.setState(function (state) {
          return _extends({}, state, {
            rows: _extends({}, state.rows, {
              totalRowCount: Math.max(props.rowCount || 0, state.rows.totalRowCount),
              totalTopLevelRowCount: Math.max(props.rowCount || 0, state.rows.totalTopLevelRowCount)
            })
          });
        });
        apiRef.current.unstable_caches.rows.rowCountPropBeforePartialUpdates = props.rowCount;
        apiRef.current.forceUpdate();
      }

      return;
    }

    logger.debug("Updating all rows, new length ".concat(props.rows.length));
    throttledRowsChange(createRowsInternalCache({
      rows: props.rows,
      getRowId: props.getRowId,
      loading: props.loading,
      rowCount: props.rowCount
    }), false);
  }, [props.rows, props.rowCount, props.getRowId, props.loading, logger, throttledRowsChange, apiRef]);
};