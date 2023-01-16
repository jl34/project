import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { GridFeatureModeConstant } from '../../../models/gridFeatureMode';
import { useGridApiEventHandler } from '../../utils/useGridApiEventHandler';
import { useGridApiMethod } from '../../utils/useGridApiMethod';
import { useGridLogger } from '../../utils/useGridLogger';
import { gridFilterableColumnLookupSelector } from '../columns/gridColumnsSelector';
import { GridPreferencePanelsValue } from '../preferencesPanel/gridPreferencePanelsValue';
import { getDefaultGridFilterModel } from './gridFilterState';
import { gridFilterModelSelector, gridVisibleSortedRowEntriesSelector } from './gridFilterSelector';
import { useFirstRender } from '../../utils/useFirstRender';
import { gridRowIdsSelector } from '../rows';
import { useGridRegisterPipeProcessor } from '../../core/pipeProcessing';
import { GRID_DEFAULT_STRATEGY, useGridRegisterStrategyProcessor } from '../../core/strategyProcessing';
import { buildAggregatedFilterApplier, sanitizeFilterModel, mergeStateWithFilterModel, cleanFilterItem, passFilterLogic } from './gridFilterUtils';
import { isDeepEqual } from '../../../utils/utils';
import { jsx as _jsx } from "react/jsx-runtime";
export var filterStateInitializer = function filterStateInitializer(state, props, apiRef) {
  var _ref, _props$filterModel, _props$initialState, _props$initialState$f;

  var filterModel = (_ref = (_props$filterModel = props.filterModel) != null ? _props$filterModel : (_props$initialState = props.initialState) == null ? void 0 : (_props$initialState$f = _props$initialState.filter) == null ? void 0 : _props$initialState$f.filterModel) != null ? _ref : getDefaultGridFilterModel();
  return _extends({}, state, {
    filter: {
      filterModel: sanitizeFilterModel(filterModel, props.disableMultipleColumnsFiltering, apiRef),
      visibleRowsLookup: {},
      filteredDescendantCountLookup: {}
    }
  });
};
/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 * @requires useGridRows (event)
 */

export var useGridFilter = function useGridFilter(apiRef, props) {
  var _props$initialState3, _props$initialState3$, _props$componentsProp2;

  var logger = useGridLogger(apiRef, 'useGridFilter');
  apiRef.current.unstable_registerControlState({
    stateId: 'filter',
    propModel: props.filterModel,
    propOnChange: props.onFilterModelChange,
    stateSelector: gridFilterModelSelector,
    changeEvent: 'filterModelChange'
  });
  var updateFilteredRows = React.useCallback(function () {
    apiRef.current.setState(function (state) {
      var filterModel = gridFilterModelSelector(state, apiRef.current.instanceId);
      var isRowMatchingFilters = props.filterMode === GridFeatureModeConstant.client ? buildAggregatedFilterApplier(filterModel, apiRef) : null;
      var filteringResult = apiRef.current.unstable_applyStrategyProcessor('filtering', {
        isRowMatchingFilters: isRowMatchingFilters,
        filterModel: filterModel != null ? filterModel : getDefaultGridFilterModel()
      });
      return _extends({}, state, {
        filter: _extends({}, state.filter, filteringResult)
      });
    });
    apiRef.current.publishEvent('filteredRowsSet');
  }, [props.filterMode, apiRef]);
  /**
   * API METHODS
   */

  var applyFilters = React.useCallback(function () {
    updateFilteredRows();
    apiRef.current.forceUpdate();
  }, [apiRef, updateFilteredRows]);
  var upsertFilterItem = React.useCallback(function (item) {
    var filterModel = gridFilterModelSelector(apiRef);

    var items = _toConsumableArray(filterModel.items);

    var itemIndex = items.findIndex(function (filterItem) {
      return filterItem.id === item.id;
    });

    if (itemIndex === -1) {
      items.push(item);
    } else {
      items[itemIndex] = item;
    }

    apiRef.current.setFilterModel(_extends({}, filterModel, {
      items: items
    }), 'upsertFilterItem');
  }, [apiRef]);
  var upsertFilterItems = React.useCallback(function (items) {
    var filterModel = gridFilterModelSelector(apiRef);

    var existingItems = _toConsumableArray(filterModel.items);

    items.forEach(function (item) {
      var itemIndex = items.findIndex(function (filterItem) {
        return filterItem.id === item.id;
      });

      if (itemIndex === -1) {
        existingItems.push(item);
      } else {
        existingItems[itemIndex] = item;
      }
    });
    apiRef.current.setFilterModel(_extends({}, filterModel, {
      items: items
    }), 'upsertFilterItems');
  }, [apiRef]);
  var deleteFilterItem = React.useCallback(function (itemToDelete) {
    var filterModel = gridFilterModelSelector(apiRef);
    var items = filterModel.items.filter(function (item) {
      return item.id !== itemToDelete.id;
    });

    if (items.length === filterModel.items.length) {
      return;
    }

    apiRef.current.setFilterModel(_extends({}, filterModel, {
      items: items
    }), 'deleteFilterItem');
  }, [apiRef]);
  var showFilterPanel = React.useCallback(function (targetColumnField) {
    logger.debug('Displaying filter panel');

    if (targetColumnField) {
      var filterModel = gridFilterModelSelector(apiRef);
      var filterItemsWithValue = filterModel.items.filter(function (item) {
        var _column$filterOperato;

        if (item.value !== undefined) {
          return true;
        }

        var column = apiRef.current.getColumn(item.columnField);
        var filterOperator = (_column$filterOperato = column.filterOperators) == null ? void 0 : _column$filterOperato.find(function (operator) {
          return operator.value === item.operatorValue;
        });
        var requiresFilterValue = typeof (filterOperator == null ? void 0 : filterOperator.requiresFilterValue) === 'undefined' ? true : filterOperator == null ? void 0 : filterOperator.requiresFilterValue; // Operators like `isEmpty` don't have and don't require `item.value`.
        // So we don't want to remove them from the filter model if `item.value === undefined`.
        // See https://github.com/mui/mui-x/issues/5402

        if (requiresFilterValue) {
          return false;
        }

        return true;
      });
      var newFilterItems;
      var filterItemOnTarget = filterItemsWithValue.find(function (item) {
        return item.columnField === targetColumnField;
      });

      if (filterItemOnTarget) {
        newFilterItems = filterItemsWithValue;
      } else if (props.disableMultipleColumnsFiltering) {
        newFilterItems = [cleanFilterItem({
          columnField: targetColumnField
        }, apiRef)];
      } else {
        newFilterItems = [].concat(_toConsumableArray(filterItemsWithValue), [cleanFilterItem({
          columnField: targetColumnField
        }, apiRef)]);
      }

      apiRef.current.setFilterModel(_extends({}, filterModel, {
        items: newFilterItems
      }));
    }

    apiRef.current.showPreferences(GridPreferencePanelsValue.filters);
  }, [apiRef, logger, props.disableMultipleColumnsFiltering]);
  var hideFilterPanel = React.useCallback(function () {
    logger.debug('Hiding filter panel');
    apiRef.current.hidePreferences();
  }, [apiRef, logger]);
  var setFilterLinkOperator = React.useCallback(function (linkOperator) {
    var filterModel = gridFilterModelSelector(apiRef);

    if (filterModel.linkOperator === linkOperator) {
      return;
    }

    apiRef.current.setFilterModel(_extends({}, filterModel, {
      linkOperator: linkOperator
    }), 'changeLogicOperator');
  }, [apiRef]);
  var setQuickFilterValues = React.useCallback(function (values) {
    var filterModel = gridFilterModelSelector(apiRef);

    if (isDeepEqual(filterModel.quickFilterValues, values)) {
      return;
    }

    apiRef.current.setFilterModel(_extends({}, filterModel, {
      quickFilterValues: _toConsumableArray(values)
    }));
  }, [apiRef]);
  var setFilterModel = React.useCallback(function (model, reason) {
    var currentModel = gridFilterModelSelector(apiRef);

    if (currentModel !== model) {
      logger.debug('Setting filter model');
      apiRef.current.unstable_updateControlState('filter', mergeStateWithFilterModel(model, props.disableMultipleColumnsFiltering, apiRef), reason);
      apiRef.current.unstable_applyFilters();
    }
  }, [apiRef, logger, props.disableMultipleColumnsFiltering]);
  var getVisibleRowModels = React.useCallback(function () {
    var visibleSortedRows = gridVisibleSortedRowEntriesSelector(apiRef);
    return new Map(visibleSortedRows.map(function (row) {
      return [row.id, row.model];
    }));
  }, [apiRef]);
  var filterApi = {
    setFilterLinkOperator: setFilterLinkOperator,
    unstable_applyFilters: applyFilters,
    deleteFilterItem: deleteFilterItem,
    upsertFilterItem: upsertFilterItem,
    upsertFilterItems: upsertFilterItems,
    setFilterModel: setFilterModel,
    showFilterPanel: showFilterPanel,
    hideFilterPanel: hideFilterPanel,
    getVisibleRowModels: getVisibleRowModels,
    setQuickFilterValues: setQuickFilterValues
  };
  useGridApiMethod(apiRef, filterApi, 'GridFilterApi');
  /**
   * PRE-PROCESSING
   */

  var stateExportPreProcessing = React.useCallback(function (prevState, context) {
    var _props$initialState2, _props$initialState2$;

    var filterModelToExport = gridFilterModelSelector(apiRef);
    var shouldExportFilterModel = // Always export if the `exportOnlyDirtyModels` property is activated
    !context.exportOnlyDirtyModels || // Always export if the model is controlled
    props.filterModel != null || // Always export if the model has been initialized
    ((_props$initialState2 = props.initialState) == null ? void 0 : (_props$initialState2$ = _props$initialState2.filter) == null ? void 0 : _props$initialState2$.filterModel) != null || // Export if the model is not equal to the default value
    !isDeepEqual(filterModelToExport, getDefaultGridFilterModel());

    if (!shouldExportFilterModel) {
      return prevState;
    }

    return _extends({}, prevState, {
      filter: {
        filterModel: filterModelToExport
      }
    });
  }, [apiRef, props.filterModel, (_props$initialState3 = props.initialState) == null ? void 0 : (_props$initialState3$ = _props$initialState3.filter) == null ? void 0 : _props$initialState3$.filterModel]);
  var stateRestorePreProcessing = React.useCallback(function (params, context) {
    var _context$stateToResto;

    var filterModel = (_context$stateToResto = context.stateToRestore.filter) == null ? void 0 : _context$stateToResto.filterModel;

    if (filterModel == null) {
      return params;
    }

    apiRef.current.unstable_updateControlState('filter', mergeStateWithFilterModel(filterModel, props.disableMultipleColumnsFiltering, apiRef), 'restoreState');
    return _extends({}, params, {
      callbacks: [].concat(_toConsumableArray(params.callbacks), [apiRef.current.unstable_applyFilters])
    });
  }, [apiRef, props.disableMultipleColumnsFiltering]);
  var preferencePanelPreProcessing = React.useCallback(function (initialValue, value) {
    if (value === GridPreferencePanelsValue.filters) {
      var _props$componentsProp;

      var FilterPanel = props.components.FilterPanel;
      return /*#__PURE__*/_jsx(FilterPanel, _extends({}, (_props$componentsProp = props.componentsProps) == null ? void 0 : _props$componentsProp.filterPanel));
    }

    return initialValue;
  }, [props.components.FilterPanel, (_props$componentsProp2 = props.componentsProps) == null ? void 0 : _props$componentsProp2.filterPanel]);
  var flatFilteringMethod = React.useCallback(function (params) {
    if (props.filterMode === GridFeatureModeConstant.client && params.isRowMatchingFilters) {
      var rowIds = gridRowIdsSelector(apiRef);
      var filteredRowsLookup = {};

      for (var i = 0; i < rowIds.length; i += 1) {
        var rowId = rowIds[i];
        var isRowPassing = void 0;

        if (typeof rowId === 'string' && rowId.startsWith('auto-generated-group-footer')) {
          isRowPassing = true;
        } else {
          var _params$isRowMatching = params.isRowMatchingFilters(rowId),
              passingFilterItems = _params$isRowMatching.passingFilterItems,
              passingQuickFilterValues = _params$isRowMatching.passingQuickFilterValues;

          isRowPassing = passFilterLogic([passingFilterItems], [passingQuickFilterValues], params.filterModel, apiRef);
        }

        filteredRowsLookup[rowId] = isRowPassing;
      }

      return {
        filteredRowsLookup: filteredRowsLookup,
        // For flat tree, the `visibleRowsLookup` and the `filteredRowsLookup` since no row is collapsed.
        visibleRowsLookup: filteredRowsLookup,
        filteredDescendantCountLookup: {}
      };
    }

    return {
      visibleRowsLookup: {},
      filteredRowsLookup: {},
      filteredDescendantCountLookup: {}
    };
  }, [apiRef, props.filterMode]);
  useGridRegisterPipeProcessor(apiRef, 'exportState', stateExportPreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'restoreState', stateRestorePreProcessing);
  useGridRegisterPipeProcessor(apiRef, 'preferencePanel', preferencePanelPreProcessing);
  useGridRegisterStrategyProcessor(apiRef, GRID_DEFAULT_STRATEGY, 'filtering', flatFilteringMethod);
  /**
   * EVENTS
   */

  var handleColumnsChange = React.useCallback(function () {
    logger.debug('onColUpdated - GridColumns changed, applying filters');
    var filterModel = gridFilterModelSelector(apiRef);
    var filterableColumnsLookup = gridFilterableColumnLookupSelector(apiRef);
    var newFilterItems = filterModel.items.filter(function (item) {
      return item.columnField && filterableColumnsLookup[item.columnField];
    });

    if (newFilterItems.length < filterModel.items.length) {
      apiRef.current.setFilterModel(_extends({}, filterModel, {
        items: newFilterItems
      }));
    }
  }, [apiRef, logger]);
  var handleStrategyProcessorChange = React.useCallback(function (methodName) {
    if (methodName === 'filtering') {
      apiRef.current.unstable_applyFilters();
    }
  }, [apiRef]); // Do not call `apiRef.current.forceUpdate` to avoid re-render before updating the sorted rows.
  // Otherwise, the state is not consistent during the render

  useGridApiEventHandler(apiRef, 'rowsSet', updateFilteredRows);
  useGridApiEventHandler(apiRef, 'rowExpansionChange', apiRef.current.unstable_applyFilters);
  useGridApiEventHandler(apiRef, 'columnsChange', handleColumnsChange);
  useGridApiEventHandler(apiRef, 'activeStrategyProcessorChange', handleStrategyProcessorChange);
  /**
   * 1ST RENDER
   */

  useFirstRender(function () {
    apiRef.current.unstable_applyFilters();
  });
  /**
   * EFFECTS
   */

  React.useEffect(function () {
    if (props.filterModel !== undefined) {
      apiRef.current.setFilterModel(props.filterModel);
    }
  }, [apiRef, logger, props.filterModel]);
};